//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$",
})



//clase buscador donde se encuentran todas las funcionalidades de busquyeda
class buscador {

  //constructor de la clase
  constructor(){
      this.veTodos = document.getElementById('buscar') //boton para ver todos los elementos
      this.container = document.getElementsByClassName('lista')[0] //contenedor de objetos
      this.selectCiudad = document.getElementById('ciudad')
      this.selectTipo = document.getElementById('tipo') 
      this.customSearch = false 
  }; 

  //metodo inicializador
  init(){
    
    this.setSearch()
    this.setValues('ciudad', this.selectCiudad)
    this.setValues('tipo', this.selectTipo)
    this.searchItems()
  
  };

  //metodo que permite definir el tipo de busqeda
  setSearch(){
    let busqueda = $('#checkPersonalizada')
    busqueda.on('change', (e) => {
      if (this.customSearch == false) {
        this.customSearch = true
      } else {
        this.customSearch = false
      }

    $('#personalizada').toggleClass('invisible')
  })
  };

  //carga los datos de categorias desde el documento
  setValues(endpoint, item){
    this.fetchData('/buscar/data/'+endpoint, 'GET')
    .then((myJson)=>{
      this.renderValues(myJson, item )
    }).catch((err)=>{
      console.log(err)
    })

  };

  //visualiza las categorias cargadas
  renderValues(data,item){
    item.style.display = 'inline-block'
    for(let i in data){
      let newValue = document.createElement('OPTION')
      newValue.value = data[i]
      newValue.innerHTML = data[i]
      item.appendChild(newValue)
    }
   
  }

  //busca los objetos especificados
  searchItems(){
    this.veTodos.addEventListener('click', ()=>{
      this.container.innerHTML =''

      if(this.customSearch == false){
        this.fetchData('/buscar/data', 'GET')
        .then((myJson)=> {
          this.renderSearch(myJson)
         })
         .catch((err)=>{
          console.log(err)
        })
      }else{
        let my_range = $("#rangoPrecio").data("ionRangeSlider")
        my_range.update()

        let from = my_range.options.from
        let to = my_range.options.to
        let selectedCity = this.selectCiudad.options[this.selectCiudad.selectedIndex].value;
        let selectedType = this.selectTipo.options[this.selectTipo.selectedIndex].value;
        
        let endpoint = `/buscar/data/${from}/${to}/${selectedCity}/${selectedType}`

        this.fetchData(endpoint, 'GET')
        .then((myJson)=> {
          this.renderSearch(myJson)
         })
         .catch((err)=>{
          console.log(err)
        })
        
      }

     
    })
  };

  //metodo para realizar peticiones al servidor
  fetchData(url, method){
    return fetch(url, {method: method })
    .then(function(response) {
        return response.json();
    })
    
};

//metodo que visualiza la busqueda especificada
  renderSearch(data){
    data.map((data)=>{
      let newdiv = document.createElement('div')

      let newInfo = `<div class="card horizontal">
      <div class="card-image">
        <img src="img/home.jpg">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <div>
            <b>Dirección: ${data.Direccion}</b><p></p>
          </div>
          <div>
            <b>Ciudad: ${data.Ciudad}</b><p></p>
          </div>
          <div>
            <b>Telefono: ${data.Telefono}</b><p></p>
          </div>
          <div>
            <b>Código postal: ${data.Codigo_Postal}</b><p></p>
          </div>
          <div>
            <b>Precio: ${data.Precio}</b><p></p>
          </div>
          <div>
            <b>Tipo: ${data.Tipo}</b><p></p>
          </div>
        </div>
        <div class="card-action right-align">
          <a href="#">Ver más</a>
        </div>
      </div>
    </div>`

    newdiv.innerHTML = newInfo 
    this.container.appendChild(newdiv)
    
    })
  };

  
}

//inicializar la clase buscador para que funcion
let buscar = new buscador
buscar.init()