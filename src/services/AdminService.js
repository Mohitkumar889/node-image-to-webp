const User = require("../models/User");
const helpers = require("../util/helpers");

module.exports = () => {
    const registerAdmin = (data) => {
        return new Promise(function (resolve, reject) {
            User.create(data).then(resolve).catch(reject);
        });
    };

    const fetch = (id) => {
        return new Promise(function (resolve, reject) {
            let orm = Admin.findById(id).select("-password,-time");
            orm.then(resolve).catch(reject);
        });
    };

    const fetchByQuery = (query) => {
        console.log("AdminService => fetchByQuery");
        return new Promise(function (resolve, reject) {
            let orm = User.findOne(query).select("-password");

            orm.then(resolve).catch(reject);
        });
    };

    const updateProfile = (adminId, data) => {
        console.log("AdminService => updateProfile");
        return new Promise(async function (resolve, reject) {
            let admin = await User.findByIdAndUpdate({ _id: adminId }, data).then(resolve).catch(reject);
        });
    };

    const verifyPassword = (id, password) => {
        console.log("AdminService => verifyPassword");
        return new Promise(async function (resolve, reject) {
            let admin = await User.findById(id);

            if (!admin) resolve(false);
            let v = await helpers().checkPassword(password, admin.password);

            return resolve(v);
        });
    };

    return {
        fetch,
        fetchByQuery,
        registerAdmin,
        updateProfile,
        verifyPassword
    };
};