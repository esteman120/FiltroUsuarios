import { sp, Item, ItemAddResult, ItemUpdateResult } from '@pnp/sp';
import { IFiltroUsuariosProps } from '../components/IFiltroUsuariosProps';

export class servicio {
    private conexion: void;
    constructor(private props: IFiltroUsuariosProps){        
        this.conexion = sp.setup({
            sp: {
            headers: {
                "Accept": "application/json; odata=nometadata"
            },
            baseUrl: this.props.RutaSitio
            }
        }); 
    }

    public obtenerEmpleados(){
        let respuesta = sp.web.lists.getByTitle("empleados").items.filter("Activo eq 1").select("*, usuario/Title, usuario/EMail, Attachments, AttachmentFiles").expand("usuario, AttachmentFiles").getAll();
        return respuesta;
    }
    
    
}