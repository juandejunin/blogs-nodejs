const {Router} = require("express") 
const router = Router()
const multer = require ("multer")
const ArticuloControlador = require("../controladores/articulo.Controlador")
// Configurar el almacenamiento, donde se van a guardar mis archivos
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imagenes/articulos/')
    },
    filename:(req,file,cb) => {
        cb(null, "articulo" + Date.now() + file.originalname)

    }
})

const subidas = multer({storage:almacenamiento})


//Rutas utiles
router.post('/crear', ArticuloControlador.crear)
router.get('/articulos/:ultimos?', ArticuloControlador.listar)
router.get('/articulo/:id', ArticuloControlador.listarUno)
router.delete('/articulo/:id', ArticuloControlador.borrar)
router.put('/articulo/:id', ArticuloControlador.editar)
router.post('/subir-imagen/:id',[subidas.single("file0")], ArticuloControlador.subir)



module.exports = router