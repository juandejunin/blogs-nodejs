const { conexion } = require('./baseDeDatos/conexion')
const express = require("express")
const cors = require('cors')


//iniciar la app
console.log("App de node iniciada")

conexion()

//crear el servidor
const app = express()
const puerto = 5000

//configurar el cors
app.use(cors())

//convertir el body a un objeto js, esto es para recibir los parametros con conten type application  json
app.use(express.json())

//convertir cada propiedad de x www form urlencoded en json
app.use(express.urlencoded({extended:true}))

//Rutas pruebas harcodeadas
app.get('/', (req, res) => {
    console.log('se ejecuto el endpoint probando')

    return res.status(200).send(
        `<div>
        <h1>Blog con nodejs</h1>
        </div>`
    )
})
app.get('/probando', (req, res) => {
    console.log('se ejecuto el endpoint probando')

    return res.status(200).json(
        [{
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
})

//Rutas

const rutas_articulo = require("./rutas/articulo.Ruta")

//Cargar la ruta
app.use('/api', rutas_articulo)

//crear el servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log('servidor iniciado en puerto' + puerto)
})