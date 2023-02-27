const fs = require("fs")
const path = require("path")

const { validarArticulo } = require("../helpers/validar")
const Articulo = require('../modelos/Articulo')

const { exists } = require("../modelos/Articulo")



const crear = (req, res) => {
    //Recoger los parametros por post a guardar
    let parametros = req.body

    //Validar datos
    try {
        validarArticulo(parametros)
    }

    catch (error) {
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

    //Validar datos de los parametros
    try {
        validarArticulo(parametros)
    }

    catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }

    //Buscar y actualizar articulo
    Articulo.findOneAndUpdate({ _id: id }, req.body, { new: true }, (error, articuloActualizado) => {
        if (error || !articuloActualizado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar"
            })
        }

        //Devolver respuesta
        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado
        })
    })
}

const subir = (req, res) => {

    //configurar multer (en el archivo .router)

    //recoger el fichero de imagen subido
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            mensaje: "peticion invalida"
        })
    }
    //nombre del archivo
    let nombreArchivo = req.file.originalname
    //extension del archivo
    let archivo_split = nombreArchivo.split("\.")
    let archivoExtension = archivo_split[1]
    //Comprobar que la extension sea la correcta
    if (archivoExtension != "png" && archivoExtension != "jpg" && archivoExtension != "jpeg" && archivoExtension != "gif" && archivoExtension != "PNG") {
        //borrar archivo y dar respuesta
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                mensaje: "imagen invalida"
            })
        })
    } else {
        //si todo esta ok, actualizar el archivo
        // Recoger un id por url
        let id = req.params.id

        //Buscar y actualizar articulo
        Articulo.findOneAndUpdate({ _id: id }, ({ imagen: req.file.filename }), { new: true }, (error, articuloActualizado) => {
            if (error || !articuloActualizado) {
                return res.status(500).json({
                    status: "error",
                    mensaje: "Error al actualizar"
                })
            }

            //Devolver respuesta
            return res.status(200).json({
                status: "success",
                articulo: articuloActualizado,
                fichero: req.file,
            })

        })
    }
}

const imagen = (req, res) => {
    let fichero = req.params.fichero
    let ruta_fisica = "./imagenes/articulos"+fichero

    

    fs.stat(ruta_fisica, (error,existe) => {
        if (existe) {
            return res.sendFile(path.resolve(ruta_fisica))
        } else {
            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe",
                fichero,
                ruta_fisica,
                existe
            })
        }
    })
}

const buscador = (req,res) =>{
    //obtener el string de busqueda
    let busqueda = req.params.busqueda

    ///find Or
    Articulo.find({"$or":[
        {"titulo": {"$regex":busqueda, "$options":"i"}},
        {"contenido": {"$regex":busqueda, "$options":"i"}}
    ]})
    //Orden
    .sort({fecha: -1})
    .exec((error,articulosEncontrados)=>{
        if(error || !articulosEncontrados || articulosEncontrados <= 0){
            res.status(404).json({
                status: "error",
                mensaje: "Articulo no encontrado"
            })
        }

        return res.status(200).json({
            status: "success",
            articulos: articulosEncontrados
        })
    })

    

    //Ejecutar consulta

    //Devolver resultado

}
module.exports = {
    crear,
    listar,
    listarUno,
    borrar,
    editar,
    subir,
    imagen,
    buscador
}


