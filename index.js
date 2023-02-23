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

//convertir el body a un objeto js

app.use(express.json())

//crear el servidor y escuchar peticiones http

app.listen(puerto, ()=>{
    console.log('servidor iniciado en puerto' + puerto)
})