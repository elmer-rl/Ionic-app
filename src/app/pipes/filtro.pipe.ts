import { Pipe, PipeTransform } from '@angular/core';
import {List} from '../models/lista.model'
@Pipe({
  name: 'filtro',
  pure: false
})
export class FiltroPipe implements PipeTransform {

  transform(listas: List[], completada : boolean = true): List[] {


  return listas.filter( lista => lista.completada === completada);

  }

}
