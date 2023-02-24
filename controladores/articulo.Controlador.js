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

module.exports = {
    prueba,
    cursos
}


