const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  /*Crear un usuario */
  createUser: async function (req, res) {
    const { _id, name, last_name, email, password } = req.body;

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

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET
      );
      return res.status(200).json({
        data: { token },
        _id: savedUser._id,
        message: "Successful registration",
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  /*Login para usuario */
  loginUser: async function (req, res) {
    // Validaciond e existencia
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ messageError: "User not found" });

    // Validacion de password en la base de datos
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ messageError: "Invalid password" });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET
    );

    return res.status(200).header("auth-token", token).json({
      data: { token },
      id: user._id,
      message: "Bienvenido",
    });
  },
  /*Traer un solo usuario*/
  getSingleUser: async function (req, res) {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById({ _id: id });
    try {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      });
    } catch (error) {
      return res.status(400).json({ messageError: "User not found" });
    }
  },
  /*Solo para pruebas, eliminar cuando terminen pruebas */
  getUsers: async function (req, res) {
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
