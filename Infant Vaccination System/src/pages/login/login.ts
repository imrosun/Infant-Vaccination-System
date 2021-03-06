import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  entryComponents: [TabsPage]
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(
    private nav: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.registerCredentials = { email: '', password: '' };
  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials)
      .subscribe(allowed => {
        if (allowed) {
          this.nav.setRoot(TabsPage); // HomePage
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        console.log(error);
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
    const alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    // alert.present(prompt);
  }
}