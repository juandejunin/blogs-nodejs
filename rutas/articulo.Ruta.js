const {Router} = require("express") 
const router = Router()
const ArticuloControlador = require("../controladores/articulo.Controlador")
//Rutas de prueba
router.get('/ruta-de-prueba', ArticuloControlador.prueba)
router.get('/cursos', ArticuloControlador.cursos)

module.exports = router