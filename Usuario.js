import consulta from "./db.js";
class Usuario {
    constructor({ id = undefined, nombre, apellido, email }) {
        this.id = id;
        this.nombre = this.validarNombre(nombre);
        this.apellido = apellido;
        this.email = email;
    }

    validarNombre(nombre) {
        if (!nombre) {
            throw new Error(
                "El atributo 'nombre' debe tener un formato string"
            );
        }
        return nombre;
    }

    create() {
        return new Promise(async (resolve, reject) => {
            try {
                let objUsuario = {
                    nombre: this.nombre,
                    apellido: this.apellido,
                    email: this.email,
                };
                const query = {
                    text: "INSERT INTO USUARIOS (data) VALUES ($1) returning id, data",
                    values: [objUsuario],
                };

                let resultado = await consulta(query);
                return resolve(resultado);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default Usuario;
