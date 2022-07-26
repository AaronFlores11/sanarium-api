const Router = require("express");
const router = Router();

const userController = require("../controllers/user.controller");

router.post("/createUser", userController.createUser);

router.post("/userAccess", userController.loginUser);

/*Quitar esta ruta al final de las pruebas */
router.get("/showUsers", userController.getUser);
module.exports = router;
