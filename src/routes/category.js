const categoryRouter = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const ErrorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const CategoryValidator = require("../validators/CategoryValidator");
const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage,
});

categoryRouter.post("/add",
    upload.single('image'),
    AuthMiddleware().verifyAdminToken,
    CategoryValidator().addValidator,
    ErrorHandlerMiddleware(CategoryController().add),
    ResponseMiddleware

);

module.exports = categoryRouter;