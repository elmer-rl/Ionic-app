import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { List } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas :List []; 


  constructor(public deseos : DeseosService ,
     private alert : AlertController, 
    private route : Router) {
    this.listas = this.deseos.listas
    // console.log('deseos',this.listas);
  }

  async agregar(){


  const alert = await this.alert.create({
    header : 'Nueva Lista',
    inputs : [
      {
        name:'titulo',
        type:'text',
        placeholder:'Nombre de la lista'
      }
    ],
    buttons : [
      {
        text:'cancelar',
        role:'cancel',
        handler : ()=>{
          console.log('cancelar');
          
        }
      },
      {
        text:'crear',
        handler : (data)=>{
          // console.log(data);

          if (data.titulo.length === 0 ) {
            return;
          }

          // Crear lista

          const listaId = this.deseos.crearLista(data.titulo);

          this.route.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          
        }
      }
    ]
  });

  alert.present();

  }

  seleccionado(id){
    this.route.navigateByUrl(`/tabs/tab1/agregar/${id}`)
  }

}
