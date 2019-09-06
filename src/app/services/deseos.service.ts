import { Injectable } from '@angular/core';
import { List } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  listas : List [] = [];
  constructor() { 
   
  
   this.cargarStorage();
  

   }

   crearLista(titulo:string){
     const nuevalista = new List(titulo);
     this.listas.push(nuevalista);
     this.guardarStorage();

     return nuevalista.id;
   }

   borrarLista(lista : List){
    const index = this.listas.indexOf(lista); 
    this.listas.splice(index,1);
    this.guardarStorage();
   }
  
   obtenerLIsta (id: string |number) {
        
     id = Number(id);

     return this.listas.find( listaData => listaData.id  === id ); 
    

   }


  guardarStorage(){

    localStorage.setItem('data', JSON.stringify(this.listas) )

  }

  cargarStorage(){

  if(localStorage.getItem('data')){
    this.listas = JSON.parse( localStorage.getItem('data'));
  } else{
    this.listas =[];
  }




  }

}
