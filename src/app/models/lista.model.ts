import { ListaItem } from "./lista-item.model";

export class List {

    id: number;
    titulo: string;
    creada : Date;
    terminada : Date;
    completada : boolean;
    items:ListaItem[] = [];


    constructor(titulo){
        this.titulo = titulo;
        this.creada = new Date();
        this.completada = false;

        this.id = new Date().getTime();
    
    }

}