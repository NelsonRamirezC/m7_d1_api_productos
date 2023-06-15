import express from "express";
import Producto from "./Producto.js";
import Usuario from "./Usuario.js";

const app = express();

//middleware
app.use(express.json()); //asignará el json que llegue a req.body

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

app.post("/api/usuarios", async (req, res) => {
    try {
        let nuevoUsuario = new Usuario(req.body);
        let respuesta = await nuevoUsuario.create();
        console.log(respuesta);
        res.status(201).send({ code: 201, data: respuesta });
    } catch (error) {
        console.log(error);
        res.status(400).send({ code: 400, message: error.message });
    }
});
