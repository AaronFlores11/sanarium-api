const { json } = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //Obtenemos el token del header del reques
  const token = req.header("Auth-Token");
  //Validamos si no hay token
  if (!token) return res.status(401).json({ messageError: "Acceso denegado" });
  try {
    //Verificamos el token usando la dependecia de jwt y el método  .veridy
    const decode = jwt.verify(token, process.env.SECRET);
    let id = decode.id;
    //Si el token es correcto nos devolvera los datos que pusimos en el token
    return res.status(200).json({ id });
    //next() indica que el req paso la prueba y continue su camino
  } catch (error) {
    res.status(400).json({ messageError: "Token no validom accesso denegado" });
  }
};

module.exports = verifyToken;
