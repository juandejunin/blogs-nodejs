const {Router} = require("express") 
const router = Router()
const ArticuloControlador = require("../controladores/articulo.Controlador")
//Rutas de prueba
router.get('/ruta-de-prueba', ArticuloControlador.prueba)
router.get('/cursos', ArticuloControlador.cursos)


//Rutas utiles
router.post('/crear', ArticuloControlador.crear)
router.get('/listar/:ultimos?', ArticuloControlador.listar)
router.get('/listarUno/:id', ArticuloControlador.listarUno)
router.delete('/borrar/:id', ArticuloControlador.borrar)



module.exports = router