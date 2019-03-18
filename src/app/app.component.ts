import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { FcmService } from './fcm.service';

const config = {
  apiKey: "AIzaSyBD4G4XMw4o0_R9UgbMC2Of0WeE-M0j7xs",
  authDomain: "pokemon-528cd.firebaseapp.com",
  databaseURL: "https://pokemon-528cd.firebaseio.com",
  projectId: "pokemon-528cd",
  storageBucket: "pokemon-528cd.appspot.com",
  messagingSenderId: "810639197968"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    public toastController: ToastController,
  ) {
    this.initializeApp();
  }
  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }
  
  private notificationSetup() {
    console.log("Estoy aqui")
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg) => {
        this.presentToast(msg.body);
      });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log("ENTROO")
      this.notificationSetup();
    });
    
  }
}
