import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneButtonType
} from '@microsoft/sp-webpart-base';

import * as strings from 'FiltroUsuariosWebPartStrings';
import FiltroUsuarios from './components/FiltroUsuarios';
import { IFiltroUsuariosProps } from './components/IFiltroUsuariosProps';

export interface IFiltroUsuariosWebPartProps {
  description: string;  
  rutaSitio: string;
}

export default class FiltroUsuariosWebPart extends BaseClientSideWebPart<IFiltroUsuariosWebPartProps> {
    
  public render(): void {
    
    const element: React.ReactElement<IFiltroUsuariosProps > = React.createElement(
      FiltroUsuarios,
      {
        description: this.properties.description,
        RutaSitio: this.properties.rutaSitio  
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription            
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('rutaSitio',{
                  label: "ruta del sitio de la lista de empleados"
                })               
              ]
            }
          ]
        }
      ]
    };
  }
}
