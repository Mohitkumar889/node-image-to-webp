const adminRouter = require("express").Router();
const AdminController = require("../controllers/AdminController");
const ErrorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const AuthValidator = require("../validators/AuthValidator");



adminRouter.post(
  "/register",
  AuthMiddleware().checkEmailAndMobileToEditProfile,
  ErrorHandlerMiddleware(AdminController().register),
  ResponseMiddleware
);

adminRouter.post(
  "/login",
  AuthValidator().validateAdminLogin,
  ErrorHandlerMiddleware(AdminController().login),
  ResponseMiddleware
);

adminRouter.use("/category", require("./category"));


module.exports = adminRouter;