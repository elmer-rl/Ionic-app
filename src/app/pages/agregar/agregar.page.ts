import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: List ;
  nombreItem = '';


  constructor(private deseos:DeseosService, private route:ActivatedRoute) {

      const listaId = this.route.snapshot.paramMap.get('id');
    
      // console.log('id enviado',listaId);
      

      this.lista = this.deseos.obtenerLIsta( listaId);

      // console.log('obtenido', this.lista);
      
      
   }

  ngOnInit() {
  }

  agregarItem(){
    if (this.nombreItem.length === 0 ) {
      return ;
    }

    const nuevoItem = new ListaItem( this.nombreItem);

    console.log('nuevo item', nuevoItem );
    
    this.lista.items.push( nuevoItem );
    this.nombreItem = '';
    this.deseos.guardarStorage();
  }
  
  cambioCheck(item : List){
   
    // console.log(item);
    const pendientes = this.lista.items
    .filter(itemsdata => !itemsdata.completado).length;

    if (pendientes == 0) {
      this.lista.terminada = new Date();
      this.lista.completada = true;
    } else{
      this.lista.terminada = null;
      this.lista.completada =  false;
    }
    
    // console.log(pendientes);
    
    this.deseos.guardarStorage();
    
  }

  borrar(i :number){
    this.lista.items.splice(i,1);
    this.deseos.guardarStorage();
  }

}
