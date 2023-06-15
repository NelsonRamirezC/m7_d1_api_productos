import consulta from "./db.js";

class Producto {
    constructor(id, nombre, descripcion, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }

    static findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const query = {
                    text: "SELECT id::text, nombre, descripcion, precio, stock FROM Productos",
                    values: [],
                    //rowMode: "json", // opcional -> por defecto es json
                };
                let resultado = await consulta(query);
                return resolve(resultado);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default Producto;
