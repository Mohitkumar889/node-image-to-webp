const ResponseMiddleware = require("./ResponseMiddleware");
const UserService = require("../services/UserService");
const jwt = require('jsonwebtoken');
const serverConfig = require("../../config/server");

module.exports = () => {

  const checkEmailAndMobileToEditProfile = async (req, res, next) => {
    console.log("AuthMiddleware => checkEmailAndMobileToEditProfile");

    try {
      let { name, countryCode, mobileNumber, email, password } = req.body;

      let mobileExist = null;
      if (countryCode && mobileNumber) {
        var query = { countryCode, mobileNumber };

        mobileExist = await UserService().fetchByQueryToEdit(query);
      }
      if (mobileExist) {
        req.rCode = 0;
        req.msg = "mobile_exist";
        ResponseMiddleware(req, res, next);
      } else {
        if (email) {
          query = { email };
          let emailExist = await UserService().fetchByQueryToEdit(query);
          if (emailExist) {
            req.rCode = 0;
            req.msg = "email_exist";
            ResponseMiddleware(req, res, next);
          } else {
            next();
          }
        } else {
          next();
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const verifyAdminToken = async (req, res, next) => {
    console.log("AuthMiddleware => verifyAdminToken");
    let { token } = req.headers;
    try {
      if (!token) {
        throw new Error("invalid_token");
      } else {
        let payload = jwt.verify(token, serverConfig.jwtSecret);
        console.log(payload);
        query = { _id: payload.adminId };
        let admin = await UserService().fetchByQueryToEdit(query);
        console.log(admin);
        if (!admin) {
          throw new Error("ac_deactivated");
        }

        //checking user must exist in our DB else throwing error
        if (admin) {
          console.log(`ADMIN with ID ${admin.id} entered.`);
          req.body.adminId = admin.id;
          req.authUser = admin;
          next()
        } else throw new Error("invalid_token");
      }
    } catch (ex) {
      req.msg = "invalid_token";
      if (ex.message == "ac_deactivated") req.msg = ex.message;
      req.rCode = 0;
      ResponseMiddleware(req, res, next);
    }
  }

  return {

    checkEmailAndMobileToEditProfile,
    verifyAdminToken
  };

};