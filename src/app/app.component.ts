import { Component, OnInit } from '@angular/core';
import { ObserverTableEvents } from './interfaces/table.interface';
import { ObservableComponentsService } from './services/observable-components.service';

const ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'table';
  json: any;

  constructor( private obs : ObservableComponentsService ) {}

  ngOnInit(): void {
    // ! El objeto que se debe pasar al componente debe ser estar estructurado de esta manera
    // ! La propiedad config es la que se usara para crear los "th" de la tabla y para vincular las celdas por medio de ID}
    // ! Cada elemento del array config debe contener la propiedad title usada para el innerText de la "th" y el name para usarlo como id y class
    // ! En la propiedad data se colocaria la data en si que se desea generar la tabla

    // ! Esta data debe ser pasada al componente por medio de un @Input

    this.json = {
      config: [
        {title: 'Position', name: 'position'},
        {title: 'Name', name: 'name'},
        {title: 'Weight', name: 'weight'},
        {title: 'Symbol', name: 'symbol'},
      ],
      data: ELEMENT_DATA,

    }

    // ! Cada vez que se presione un de los botones (next, prev o el select para modificar la cantidad de registros) se va a obtener el valor del observable
    // ! En funcion al boton seleccionado se ejecuta una suscripcion especifica, dentro de la suscripcion se llamara la petición que proporciona la data para la tabla

    this.obs.nextObj.subscribe((res: ObserverTableEvents) => {
      this.peticion(res.page, res.totalReg)
    })

    this.obs.prevObj.subscribe((res: ObserverTableEvents) => {
      this.peticion(res.page, res.totalReg)
    })

    this.obs.modifyTotalReg.subscribe((res: ObserverTableEvents) => {
      this.peticion(res.page, res.totalReg)
    })
  }


  // ! Se debe crear el metodo en el cual se realizaria la petición a la API
  // ! Este metodo recibe dos parametros pagina y cantidad de registros a solicitar
  // ! Usar esos dos parametros para pasarlos a la petición

  peticion(page: any, cant: any) {
    console.log(page);
    console.log(cant);
  }
}
