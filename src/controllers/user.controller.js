const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  createUser: async function (req, res) {
    const { _id, name, last_name, email, password } = req.body;
    console.log("Llega la informacion");
    console.log(_id, name, last_name, email, password);
    console.log(req.body);

    //Validacion si existe ya el email dentro de la bd
    const isEmailExist = await User.findOne({ email });

    if (isEmailExist)
      return res.status(400).json({ messageError: "Email already registered" });

    //Encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    // creating a new User
    const user = new User({
      _id,
      name,
      last_name,
      email,
      password: newPassword,
    });

    // Usamos .save() del model para almacenar los datos en Mongo
    try {
      const savedUser = await user.save();

      return res.status(200).json({
        _id: savedUser._id,
        message: "Successful registration",
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  loginUser: async function (req, res) {
    // Validaciond e existencia
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    // Validacion de password en la base de datos
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).json({ error: "Constraseña invalida" });

    return res.status(200).json({
      message: "bienvenido",
    });
  },

  /*Solo para pruebas, eliminar cuando terminen pruebas */
  getUser: async function (req, res) {
    const { username, email, password, roles } = req.body;

    //Validacion si existe ya el email dentro de la bd
    const users = await User.find();

    try {
      return res.status(200).json({ users });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
