import React from 'react';

class Tabla extends React.Component{

    /* constructor */

    constructor(props){
        super(props);
        this.state = {
            bddContext: this.props.bddContext,
            datos: []
        }

        /* provee del mismo contexto a todas las funciones de esta misma clase */

        this.obtenerDatos = this.obtenerDatos.bind(this);
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){

        /*Se hace la llamada a la bdd despues de haber renderizado el componente
        por priemra vez */

        this.obtenerDatos();
    }

    /*obtiene datos de la bdd */

    obtenerDatos(){
        const query = this.state.bddContext.database().ref();
        let almacen = [];
        
        /*Carga datos una sola vez, no se mantiene como en el metodo on */

        query.once('value')
        .then((snapshot)=>{

            /*Despues de obtener la referencia de firebase se recorre este objeto tipo lista 
            con el metodo foreach */

            snapshot.forEach((sameSnapshot)=>{

                /*crea un articulo al que se le agregan los campos, luego este se agrega
                a almacen, en cada iteracion la informacion se cambia */

                let articulo = [];

                articulo.push(sameSnapshot.child("nombre").val());
                articulo.push(sameSnapshot.child("descripcion").val());
                articulo.push(sameSnapshot.child("precio").val());
                articulo.push(sameSnapshot.child("serial").val());
                articulo.push(sameSnapshot.child("imgSrc").val());
                articulo.push(sameSnapshot.child("tipo").val());

                almacen.push(articulo);
            });
            
            /*Es muy importante cargar los datos del this state en este sitio, porque de no
            hacerlo, se carga con valor de undefined */
            /*Se carga this state tipos con la nueva lista previamente cargada */

            this.setState({datos: almacen});
        });
        
    }

    /*Renderizado del componente */
    
    render(){

        /*Se crea un nueva nueva lista pero esta vez de elementos jsx, mediante
        los datos de this state datos */
        
        let datosCarta = this.state.datos.map((elem)=>{
            return(
                <div key={elem[0]} className="card col-4 float-left">
                    <img src={elem[4]} alt="imagen del producto" className="card-img-top"></img>
                    <div className="card-body">
                        <h5 className="card-title">{elem[0]}</h5>
                        <p className="cart-text">{elem[1]}</p>
                        <a href="" className="btn btn-primary">comprar</a>
                    </div>
                </div>
            );
        });

        /*devuelve un unico elemento jsx que contiene a otros, en este caso
        el arreglo previamente hecho de objetos jsx */

        return(
            <div>
                  {datosCarta}
            </div>
            );
    }
}
export default Tabla;