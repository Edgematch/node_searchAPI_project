const express = require('express')
const Storage = require('../Storage')

const Router = express.Router()

Router.get('/', (req, res)=>{
    res.send('Hello World')//prueba de ruta principal
})

//Ruta para obtener todos los valores del archivo
Router.get('/data', (req, res)=>{
    Storage.getdata()
    .then(data =>{
        res.json(data)
    }).catch(err =>{
        res.sendStatus(500).json(err)
    })
})

//Ruta para ontener las ciudades disponibles 
Router.get('/data/ciudad', (req, res)=>{
    Storage.getdata()
    .then(data =>{
        let newData = []
        data.map(data=>{
            newData.push(data.Ciudad)
        })

        const unique = (value, index, self) => {
            return self.indexOf(value) === index
          }
          
        let ciudades = newData.filter(unique)

        res.json(ciudades)

    }).catch(err =>{
        res.sendStatus(500).json(err)
    })
})

//Ruta para obtener los tipos  de vivienda disponible
Router.get('/data/tipo', (req, res)=>{
    Storage.getdata()
    .then(data =>{
        let newData = []
        data.map(data=>{
            newData.push(data.Tipo)
        })

        const unique = (value, index, self) => {
            return self.indexOf(value) === index
          }
          
        let tipos = newData.filter(unique)

        res.json(tipos)

    }).catch(err =>{
        res.sendStatus(500).json(err)
    })

})

//Ruta para busqueda personalizada
Router.get('/data/:from/:to/:ciudad/:tipo', (req, res)=>{
    Storage.getdata()
    .then(data =>{

        function filtrarPorPrecio(obj){
            let price = obj.Precio
            let x = parseFloat(price.slice(1, price.lenght).replace(/,/g, ''))
             
             if (x >= parseFloat(req.params.from)  && x <= parseFloat(req.params.to) ){
                 return true
             }else{
                 return false
             }
        }

        function filtrarPorCiudad(obj){
            if(obj.Ciudad == req.params.ciudad){
                return true
            }else{
                return false
            }
        }

        function filtrarPorTipo(obj){
            if(obj.Tipo == req.params.tipo){
                return true
            }else{
                return false
            }
        }

        let newData = data.filter(filtrarPorPrecio)

        if(req.params.ciudad != '0'){
           newData =  newData.filter(filtrarPorCiudad)
        }

        if(req.params.tipo != '0'){
            newData = newData.filter(filtrarPorTipo)
        }

        res.json(newData)
        
    }).catch(err =>{
        res.sendStatus(500).json(err)
    })
})


module.exports = Router


