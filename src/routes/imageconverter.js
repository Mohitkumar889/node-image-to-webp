const imageRouter = require("express").Router();
const ErrorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");
const CategoryController = require("../controllers/CategoryController");
const CategoryValidator = require("../validators/CategoryValidator");
const multer = require('multer');


const upload = multer({ dest: 'uploads/dimages' });

imageRouter.post("/",
    upload.single('image'),
    CategoryValidator().imageValidator,
    ErrorHandlerMiddleware(CategoryController().convertImage),
    ResponseMiddleware

);

module.exports = imageRouter;