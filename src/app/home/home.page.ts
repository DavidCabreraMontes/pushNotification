import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ToastController } from '@ionic/angular';
import { FcmService } from '../fcm.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemons: any = [];
  ref = firebase.database().ref();
  
  constructor(
    private alertController: AlertController,
    private fcm: FcmService,
    public toastController: ToastController,
    public http: Http) {
      
    http.get('https://us-central1-todo-firebase-c4298.cloudfunctions.net/test')
      .subscribe((data) => {
      console.log('data', data);
    })
    //LISTAR POKEMONS
    
    this.ref.on('value',response => {
      let datos = snapshotToArray(response);
      console.log(datos);
      this.pokemons = datos;
    });

    /*let insert = this.ref.push();
    insert.set({name: 'Flareon'});*/

    /*firebase.database().ref('-LYbTr6HkpdiQ6tT9F2k').on('value',response => {
      console.log(response);
      let datos = snapshotToObject(response);
      console.log(datos);
    });

    let data ={
      name : 'Pitochu'
    }
    firebase.database().ref('-LYbTr6HkpdiQ6tT9F2k').update(data);*/

    
  }
  
  async add(){
    const alert = await this.alertController.create({
      header: 'NUEVO POKEMON',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok',data);
            //CREAR POKEMON
            let insert = this.ref.push();
            insert.set(data);
          }
        }
      ]
    });

    await alert.present();
  }
  async edit(pokemon:any){
    const alert = await this.alertController.create({
      header: 'EDITAR POKEMON',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',value :pokemon.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok',data);
            //edit
            firebase.database().ref(pokemon.key).update(data);
          }
        }
      ]
    });

    await alert.present();
  }
  delete(pokemon:any){
    console.log(pokemon);
    firebase.database().ref(pokemon.key).remove();
  }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key=childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
}

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;
  return item;
} 