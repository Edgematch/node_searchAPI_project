//dependencias utilizadas
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const buscador = require('./Buscador')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//Ruta Base del servidor
app.use('/buscar', buscador )

//Carpeta de archivos estaticos
app.use(express.static('public'));


//puerto donde se escucha el servidor
const port = process.env.PORT || 3000

//servidor establecido
app.listen(port, ()=> console.log(`App is running on port http://localhost:${port}`))


