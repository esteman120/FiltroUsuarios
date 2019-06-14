import * as React from 'react';
import styles from './FiltroUsuarios.module.scss';
import { IFiltroUsuariosProps } from './IFiltroUsuariosProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button} from 'reactstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../components/estilos.css";
import {usuariosState} from './usuariosState';
import { servicio } from '../servicios/servicio';
import { IComboBoxOption, VirtualizedComboBox, Fabric } from 'office-ui-fabric-react/lib/index';
import { empleados } from './empleados';


export default class FiltroUsuarios extends React.Component<IFiltroUsuariosProps, usuariosState> {
  
  private servicio: servicio;
  private _options: IComboBoxOption[] = [];
  private objEmpleado: any[];
  private infoEmpleado: {
    nombre: string;
    apellido: string;
    cargo: string;
    email: string;
    extension: string;
    departamento: string;
    fotoPerfil: string;
    urlHojaVida: string;
  };

  constructor(props: IFiltroUsuariosProps, state: usuariosState){
    super(props);
    // alert(props.RutaSitio);
    this.servicio = new servicio(props);
    this.state = {
      filtroEmpleado: [],
      buscarEmpleado: "",
      mostrarBusqueda: true,
      nombre: "",
      apellido: "",
      cargo: "",
      email: "",
      extension: "",
      departamento: "",
      fotoPerfil: "",      
      urlHojaVida: ""
    };
    this.obtenerTodoslosUsuarios();
  }

  public render(): JSX.Element {

    var shown = {
      display: this.state.mostrarBusqueda ? "none" : "block"
    };

    return (
      <div>
        <div className="row">
          <div className="col-md-9">
            <VirtualizedComboBox
              defaultSelectedKey=""
              label="Buscar usuario"
              allowFreeform={true}
              autoComplete="on"
              options={this._options}
              onChanged={(val)=>this.seleccionarUsuario(val)}
            />
          </div>          
        </div>
        <br/>
        {/* PArate del cuadrito de informacion */}
        <div className="caja" style={shown}>
          <div className="body-box">
            <div className="barraLateral"></div>
            <div className="fotoUsuario"> 
              <img className="img-size user_img_blank mCS_img_loaded" src={this.state.fotoPerfil} alt="" />
            </div>
            <a href={"sip:" + this.state.email}> 
                <img src="https://aribasas.sharepoint.com/sites/Intranet/SiteAssets/ImgBuscadorUsuarios/33.png" className="iconoskype" alt="Foto de perfil" />
              </a>
            <div className="cuerpo">              
              <h3 className="espacioTexto">
                {this.state.nombre}
              </h3>
              <h3>
                {this.state.apellido} 
              </h3>
              <hr /> 
              <h5>
                {this.state.cargo} 
              </h5>
              <h6>
                <p>{this.state.email}</p>
                <p>Área: {this.state.departamento}</p>
                <p>Ext: {this.state.extension}</p>                
              </h6>
              <div className="verMas">
                <a href={this.state.urlHojaVida} target="_blank">VER MÁS</a>
              </div>
            </div>
          </div>
        </div> 
        {/* aca termina el cuadrito */}
      </div>          
    );
  }   

  private seleccionarUsuario(val): any {
    
      let objEmpleado = this.objEmpleado.filter(x=> x.usuarioId === val.key);

      if (objEmpleado.length > 0) {
        this.setState({
          mostrarBusqueda: false
        });
      }
      else {
        this.setState({
          mostrarBusqueda: true
        });
      }
      
      this.setState(
        {
            nombre: objEmpleado[0].nombre1 + " "+ objEmpleado[0].nombre2,
            apellido: objEmpleado[0].apellido1 + " "+ objEmpleado[0].apellido2,
            cargo: objEmpleado[0].cargo,
            email: objEmpleado[0].email,
            extension: objEmpleado[0].extension,
            departamento: objEmpleado[0].area,
            fotoPerfil: objEmpleado[0].rutaImagen,
            urlHojaVida: objEmpleado[0].urlHojaVida
        }
      );
  }

  private obtenerTodoslosUsuarios(): any {
    this.servicio.obtenerEmpleados().then(
      (respuesta)=>{
        this.objEmpleado = empleados.fromJsonList(respuesta);
        if (this.objEmpleado.length > 0) {
          this.objEmpleado.map(
            (x)=>{
              this._options.push({key: x.usuarioId, text: x.nombre1 +" "+ x.nombre2 +" "+ x.apellido1 +" "+ x.apellido2});
            }
          );         
        }  
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    );
  }
}
