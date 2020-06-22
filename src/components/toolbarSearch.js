import React from 'react';

class ToolbarSearch extends React.Component{

    /*Obtencion de datos de la bdd de firebase y creacion del array que los contiene */

    obtenerKeyWordsArticulos(){
    let query = this.props.bddContext.database().ref();
    let almacenTemporal = [];
    query.once('value')
    .then((snapshot)=>{
        snapshot.forEach((sameSnapshot)=>{
            let articuloTemporal = [];
            articuloTemporal.push(sameSnapshot.child('nombre').val());
            articuloTemporal.push(sameSnapshot.child('keyWords').val());
            articuloTemporal.push(sameSnapshot.child('descripcion').val());
            articuloTemporal.push(sameSnapshot.child('serial').val());
            almacenTemporal.push(articuloTemporal);
        });
        this.setState({keyWordsArticulos: almacenTemporal});
    });
    }

    /*Esta es la parte interesante pues aqui se buscan las coincidencias
    de la cadena ingresada por el usuario en el array anterior y las muestra */

    buscarSugerenciasDe(palabra, arrARevisar){
    let sug = [];
    
    if( ((palabra || arrARevisar)=== null) || ((palabra.length || arrARevisar.length)===0) ){
      console.error("error en buscarSugerenciasDe: uno de los parametros es nulo");
      return null;
    }
    
    for(let i = palabra.length; i >=1 ; i--){

        let subCadena = "";

        if(palabra.length === 1){subCadena = palabra;}

        else{subCadena = palabra.substring(0,i);}

        let nuevaExp = new RegExp(subCadena.toUpperCase());

        if(((subCadena || nuevaExp) === null)||((subCadena.length || nuevaExp.length) === 0 )){
          console.error("error en buscarSugerenciasDe(palabra) : subCadena o nuevaExp estan vacias");
          return null;
        }

        else{
          for(let i in arrARevisar){
            for(let j in arrARevisar[i]){
              if(arrARevisar[i][j]!== null && arrARevisar[i][j].length !== 0){
                  if(nuevaExp.test(arrARevisar[i][j].toUpperCase())){
                      sug.push(arrARevisar[i][j]);
                  }
              }
            }
          }
        }
    }
    return sug;
    }

    /*Se comprueba que la cadena no esté vacía*/

    comprobarCampo(informacion){
      let cadenaVacia = new RegExp();
    }

    /*Como es de esperarse, cuando más de un elemento del array coincide
    puede ser porque contenga el mismo texto, si es así, solo aparece uno y
    los demás se eliminan*/

    borrarRepetidos(arr){
      let nuevoArr = arr;  

      for(let i in nuevoArr){
        let coincidencias = 0;
        let nuevaExp = new RegExp(nuevoArr[i]);

        for(let j in nuevoArr){
          if(nuevaExp.test(nuevoArr[j])){
            coincidencias++;
          }
          if(coincidencias === 2){
            nuevoArr.splice(j,1);
            coincidencias--;
          }
        }
      }
      return nuevoArr;
    }
    
    /*Obtiene la cadena tecleada por el usuario desde el input convirtiendola
    en String de javascript */

    getSearch(evt){

      let cadena = evt.target.value;
      let s = [];

      if(cadena === null || cadena.length === 0){
        this.setState({sugerencias: []});
        return;
      }

      s = this.buscarSugerenciasDe(cadena, this.state.keyWordsArticulos);
      if((s.length === 0) || s === null){
        console.warn("el valor de s es :");
        console.warn(s);
      }
      else{
        let ns = this.borrarRepetidos(s);
        this.setState({sugerencias: ns});
      }

      this.setState({search: cadena});
    }

    /*Evita que se redireccione la página cuando se efectua un evento */

    startSearch(evt){
      evt.preventDefault();
      
    }

    /*Constructor */

    constructor(props){

      super(props);

      this.state = {
        search: '',
        activarSugerencias: false,
        keyWordsArticulos: [],
        sugerencias: []
      };

      this.obtenerKeyWordsArticulos();
      console.log("datos obtenidos");

      this.obtenerKeyWordsArticulos = 
      this.obtenerKeyWordsArticulos.bind(this);
      this.buscarSugerenciasDe = 
      this.buscarSugerenciasDe.bind(this);
      this.getSearch = this.getSearch.bind(this);
      this.startSearch = this.startSearch.bind(this);
      this.render = this.render.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.borrarRepetidos = this.borrarRepetidos.bind(this);
    }
    
    /*Justo despues de ser colocado el toolbarSearch en el DOM */

    componentDidMount(){
      this.setState({sugerencias: []});
    }

    /*Cuando se renderice el toolbarSearch*/
    
    render(){

      let listaSugerencias = this.state.sugerencias.map((elem)=>{
        return(<li className ="list-group-item" key={elem}>{elem}</li>);
      });
      
        return(
            <div>
              <form autoComplete="off" className="form-inline my-2 my-lg-0 col-6">
                <input onChange={this.getSearch} className="form-control" 
                placeholder="search" aria-label="search"
                type="search"></input>
                <button onClick={this.startSearch} className="btn btn-outline-success my-2 my-sm-0">Search</button>
              </form>
              <ul className="list-group">{listaSugerencias}</ul>
            </div>
            
           );
    }
}
export default ToolbarSearch;