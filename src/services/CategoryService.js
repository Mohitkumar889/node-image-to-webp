const Category = require("../models/Category");
const helpers = require("../util/helpers");

module.exports = () => {
    const addCategory = (data) => {
        return new Promise(function (resolve, reject) {
            Category.create(data).then(resolve).catch(reject);
        });
    };







    return {
        addCategory,
    };
};