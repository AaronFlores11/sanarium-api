const Router = require("express");
const router = Router();

const userController = require("../controllers/user.controller");
const verifyToken = require("../controllers/validate-token.controller");

router.post("/createUser", userController.createUser);

router.post("/userAccess", userController.loginUser);

router.get("/getSingleUser/:id", userController.getSingleUser);

/*Verify Token */
router.get("/verifyToken", verifyToken);
/*Quitar esta ruta al final de las pruebas */
router.get("/showUsers", userController.getUsers);
module.exports = router;
