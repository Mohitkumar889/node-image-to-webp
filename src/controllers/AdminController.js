const AdminService = require("../services/AdminService");

const helpers = require("../util/helpers.js");

module.exports = () => {

  const register = async (req, res, next) => {
    console.log("AdminController => register");
    let { email, password, name, mobileNumber, countryCode } = req.body;

    email = email.toLowerCase();
    let query = { email };
    let token = "";
    let admin = await AdminService().fetchByQuery(query);
    // console.log(admin);
    if (admin) {
      req.rCode = 0;
      req.msg = "admin_already_found";
      req.rData = { token };
    } else {
      password = await helpers().hashPassword(password);
      let userRole = "Admin";

      admin = { email, password, name, userRole, mobileNumber, countryCode };

      let result = await AdminService().registerAdmin(admin);

      admin = await AdminService().fetchByQuery(query);

      token = await helpers().createJWT({ adminId: admin._id, isAdmin: true });
      console.log(token);
      await AdminService().updateProfile(admin._id, { token });

      admin = await AdminService().fetchByQuery(query);

      req.rData = { admin };
    }

    next();
  };

  const login = async (req, res, next) => {
    console.log("AdminController => login");
    let { email, password } = req.body;
    email = email.toLowerCase();
    let query = { email };
    let admin = await AdminService().fetchByQuery(query);
    let token = "";
    if (admin) {
      let token = admin.token;

      console.log("admin", admin);
      token = await helpers().createJWT({
        adminId: admin._id,
        isAdmin: true,
      });

      let passwordVerify = await AdminService().verifyPassword(
        admin._id,
        password
      );

      if (!passwordVerify) {
        token = await helpers().createJWT({
          adminId: admin._id,
          isAdmin: true,
        });
        await AdminService().updateProfile(admin._id, { token });
        req.rCode = 0;
        req.msg = "incorrect_password";
        req.rData = {};
      } else {

        console.log("token", token);

        admin = await AdminService().fetchByQuery(query);

        req.rData = { admin, token };
      }
    } else {
      req.rCode = 0;
      req.msg = "admin_not_found";
      req.rData = {};
    }

    next();
  };


  return {
    register,
    login
  };
};
