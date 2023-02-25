const {Router} = require("express") 
const router = Router()
const ArticuloControlador = require("../controladores/articulo.Controlador")

//Rutas utiles
router.post('/crear', ArticuloControlador.crear)
router.get('/articulos/:ultimos?', ArticuloControlador.listar)
router.get('/articulo/:id', ArticuloControlador.listarUno)
router.delete('/articulo/:id', ArticuloControlador.borrar)
router.put('/articulo/:id', ArticuloControlador.editar)



module.exports = router