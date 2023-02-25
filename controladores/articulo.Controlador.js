const validator = require("validator")
const Articulo = require('../modelos/Articulo')



const crear = (req, res) => {
    //Recoger los parametros por post a guardar
    let parametros = req.body
    console.log(parametros)

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

    if (req.params.ultimos) {
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

const listarUno = (req, res) => {
    // Recoger un id por url
    let id = req.params.id


    // Buscar el articulo
    Articulo.findById(id, (error, articulo) => {
        // Si no existe devolver el error
        if (error || !articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado articulos"
            })
        }

        // Devolver el resultado

        return res.status(200).send({
            status: "success",
            articulo
        })

    })

}

const borrar = (req, res) => {
    // Recoger un id por url
    let id = req.params.id

    //buscar el articulo con la id recibida por parametro url
    Articulo.findByIdAndDelete({ _id: id }, (error, articuloBorrado) => {

        if (error || !articuloBorrado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han borrado el articulo"
            })
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloBorrado,
            mensaje: "El articulo se ha borrado con exito."
        })
    })


}

const editar = (req, res) => {
    // Recoger un id por url
    let id = req.params.id

    // Recoger los datos del body
    let parametros = req.body

    console.log(parametros)

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

    //Buscar y actualizar articulo
    Articulo.findOneAndUpdate({_id: id}, req.body,{new:true},(error, articuloActualizado)=>{
        if (error || !articuloActualizado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar"
            })
        }

         //Devolver respuesta
         return res.status(200).json({
            status:"success",
            articulo: articuloActualizado
         })

    })

   
}

module.exports = {
    crear,
    listar,
    listarUno,
    borrar,
    editar
}


