import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupmapService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    return `` +
      `<div>Capital: ${ data.name }</div>` +
      `<div>State: ${ data.state }</div>` +
      `<div>Population: ${ data.population }</div>`
  }

  makeDriverPopup(data: any): string {
    return `` +
      `<div>Conductor: ${ data.nombre }</div>` +
      `<div>Unidad: ${ data.unidad }</div>`
  }
  
}
