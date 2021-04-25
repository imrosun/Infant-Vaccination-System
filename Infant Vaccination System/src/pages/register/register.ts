import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { Dname: '', email: '', password: '', role: '', address: '', phone: '', state: '' };
  constructor(public fauth: AngularFireAuth, private nav: NavController, private auth: AuthService, private toastCtrl: ToastController, private alertCtrl: AlertController) { }
  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        console.log(success);
        this.createSuccess = true;
        this.nav.popToRoot();
        let toast = this.toastCtrl.create({
          message: 'Account Created',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      } else {
        // this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}