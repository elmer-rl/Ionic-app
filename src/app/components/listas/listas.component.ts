import { Component, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/lista.model';
import { Alert } from 'selenium-webdriver';
import { AlertController, IonList } from '@ionic/angular';
import { viewClassName } from '@angular/compiler';
@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  @ViewChild(IonList, {static:true}) lista: IonList;

  listas :List []; 

  @Input() terminada  = true;


  constructor(public deseos : DeseosService ,
    private route : Router,private alert : AlertController, ) {
    this.listas = this.deseos.listas
    console.log('deseos',this.listas);
  }

  
  seleccionado(id){
    

  if (this.terminada) {
    this.route.navigateByUrl(`/tabs/tab2/agregar/${id}`);
  }else{
    this.route.navigateByUrl(`/tabs/tab1/agregar/${id}`)
  }

  }
  
  borrar(lista : List){
    this.deseos.borrarLista(lista);
  }

  async editar (lista:List){
    

  const alert = await this.alert.create({
    header : 'Nueva Lista',
    inputs : [
      {
        name:'titulo',
        type:'text',
        value: lista.titulo,
        placeholder:'Nombre de la lista'
      }
    ],
    buttons : [
      {
        text:'cancelar',
        role:'cancel',
        handler : ()=>{
          this.lista.closeSlidingItems();
          
        }
      },
      {
        text:'Actualizar',
        handler : (data)=>{
          // console.log(data);

          if (data.titulo.length === 0 ) {
            return;
          }

          // Crear lista

          lista.titulo = data.titulo;

          this.deseos.guardarStorage();

          this.lista.closeSlidingItems();
          
        }
      }
    ]
  });
  alert.present();
    
  }

}
