import express from "express";
import Producto from "./Producto.js";
import Usuario from "./Usuario.js";
import sanitizer from "perfect-express-sanitizer";

const app = express();

//middleware
app.use(express.json()); //asignará el json que llegue a req.body

/* app.use(
    sanitizer.clean(
        {
            xss: true,
            sql: true,
            sqlLevel: 5
        },
        [], //white list
        ["body", "query"] //lo que será analizado
    )
);
 */

const validarParametros = async (req, res, next) => {
    let parametrosBody = Object.values(req.body);
    let parametrosQuery = Object.values(req.query);
    let parametrosArray = parametrosBody.concat(parametrosQuery);
    for (const value of parametrosArray) {
        const result = await sanitizer.sanitize.detectSqlInj(value);
        if (result) {
            return res.status(400).send({
                code: 400,
                message:
                    "Se ha detectado un intento de inyección de código, si lo sigue intentando será bloqueado.",
            });
        }
    }
    next();
};

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

app.post("/api/usuarios",validarParametros,  async (req, res) => {
    try {
        console.log(req.body);
        res.send("ruta post usuarios");
        /*  let nuevoUsuario = new Usuario(req.body);
        let respuesta = await nuevoUsuario.create();
        console.log(respuesta);
        res.status(201).send({ code: 201, data: respuesta }); */
    } catch (error) {
        console.log(error);
        res.status(400).send({ code: 400, message: error.message });
    }
});
