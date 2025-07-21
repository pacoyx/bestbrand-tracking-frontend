import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prependZeroOption',
  standalone: true
})
export class PrependZeroOptionPipe implements PipeTransform {

  transform(items: any[], label: string = 'Seleccione una opción'): any[] {
    if (!items) return [];
    const zeroOption = { id: 0, nombre: label };
    return [zeroOption, ...items];
  }


}
