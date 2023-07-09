const User = require("../models/User");

module.exports = ()=>{

	const fetchByQueryToEdit = (query) => {
    console.log("UserService => fetchByQueryToEdit");
    return new Promise(function (resolve, reject) {
    		let orm = User.findOne(query).select("-password");
			orm.then(resolve).catch(reject);
	    });
	};

	return {
	   
	    fetchByQueryToEdit,
	    
	};

};