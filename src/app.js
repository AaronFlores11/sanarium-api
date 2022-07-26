const pkg = require("../package.json");
const express = require("express");
const userRoutes = require("./routes/user.routes");
const app = express();

//Settings

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("pkg", pkg);
app.set("port", process.env.PORT || 8005);
app.set("json spaces", 4);

// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome Sannarium API",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

// Routes
app.use("/api/users", userRoutes);

module.exports = app;
