const {Router} = require("express") 
const router = Router()
const ArticuloControlador = require("../controladores/articulo.Controlador")
//Rutas de prueba
router.get('/ruta-de-prueba', ArticuloControlador.prueba)
router.get('/cursos', ArticuloControlador.cursos)
router.post('/crear', ArticuloControlador.crear)

//Rutas utiles


module.exports = router