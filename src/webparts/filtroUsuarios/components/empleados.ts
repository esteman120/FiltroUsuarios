export class empleados{
    
    constructor(
        public nombre1: string,
        public nombre2: string,
        public apellido1: string,
        public apellido2: string,
        public tipoDocumento: string,
        public numeroDocumento: string,
        public lugarDocumento: string,        
        public fechaIngreso: Date,
        public cargo: string,
        public tipoContrato: string,
        public salario: string,
        public salarioTexto: string,
        public usuarioId: number,
        public area: string,
        public nombreDA: string,
        public rutaImagen: string,
        public email: string,
        public extension: string,
        public urlHojaVida: string    
        ){       
    }

    public static fromJson(element: any) {
        
        let SegundoNombre = element.SegundoNombre === null? "" : element.SegundoNombre;
        let SegundoApellido = element.SegundoApellido === null? "" : element.SegundoApellido;
        let urlhojaVida = null;
        let ruta = "";
        if (element.Attachments === true) {
            ruta = element.AttachmentFiles[element.AttachmentFiles.length-1].ServerRelativeUrl;
        }
        else {
            ruta = "/sites/Intranet/SiteAssets/ImgBuscadorUsuarios/contactimage_light.png";
        }

        if (element.UrlHojadeVida) {
            urlhojaVida = element.UrlHojadeVida.Url;
        }

        return new empleados(
            element.PrimerNombre,
            SegundoNombre,
            element.PrimerApellido,
            SegundoApellido,
            element.TipoDocumento,
            element.NumeroDocumento,
            element.lugarExpedicion,           
            new Date(element.FechaIngreso),
            element.Cargo,
            element.TipoContrato,
            element.Salario,
            element.salarioTexto,
            element.usuarioId,
            element.Area,
            element.usuario.Title,
            ruta,
            element.usuario.EMail,
            element.Extension,
            urlhojaVida);
               
    }

    public static fromJsonList(elements: any) {
        var list = [];
        elements.forEach(element => {  
            // tslint:disable-next-line:no-unused-expression
            element.usuarioId !== null? list.push(this.fromJson(element)) : null ;
        });        
        return list;
    }
}