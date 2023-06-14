import express from "express";
import Producto from "./Producto.js";

const app = express();

app.listen(3000, () =>
    console.log("servidor escuchando en http://localhost:3000")
);

//GET PRODUCTOS
app.get("/api/productos", (req, res) => {
    Producto.findAll()
        .then((resultado) => {
            res.send({ code: 200, data: resultado, message: "ok" });
        })
        .catch((error) => {
            res.status(500).send({ code: 500, error });
        });
});
