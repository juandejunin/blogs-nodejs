const validator = require("validator")
const Articulo = require('../modelos/Articulo')

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una accion de prueba en mi controlador de articulos"
    })
}
const cursos = (req, res) => {
    return res.status(200).json([{
        curso: "master en chamuyo",
        autor: "te paese que",
        url: "elfantasma.com.ar"
    },
    {
        curso: "master en chamuyo",
        autor: "te paese que",
        url: "elfantasma.com.ar"
    }]
    )
}

const crear = (req, res) => {
    //Recoger los parametros por post a guardar
    let parametros = req.body

    //Validar datos
    try {
        let = validar_titulo = !validator.isEmpty(parametros.titulo) &&
            validator.isLength(parametros.titulo, { min: 5, max: undefined })
        let = validar_contenido = !validator.isEmpty(parametros.contenido)

        if (!validar_titulo || !validar_contenido) {
            throw new Error("No se ha validado la informacion")
        }


    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })

    }

    //Crear el objeto a guardar
    const articulo = new Articulo(parametros)

    //Asignar valores al objeto basado en el modelo (de manera manual o automatica)
    //manual
    //Articulo.titulo = parametros.titulo
    //automatica, pasando el parametro 
    //const Articulo = new Articulo(parametro)


    //Guardar en la base de datos
    articulo.save((error, articuloGuardado) => {

        if (error || !articuloGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha guardado el articulo"

            })
        }

        ///en caso que esto no sucediera devolvemos el articulo guardado
        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Articulo creado con exito!!"
        })

    })


}

const listar = (req, res) => {

    let consulta = Articulo.find({})

    if(req.params.ultimos){
        consulta.limit(3)
    }

    

    consulta.sort({ fecha: -1 })
        .exec((error, articulos) => {
            if (error || !articulos) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "No se han encontrado articulos"
                })
            }

            return res.status(200).send({
                status: "success",
                articulos
            })
        })
}
module.exports = {
    prueba,
    cursos,
    crear,
    listar
}


