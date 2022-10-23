import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Loading, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AngularFireDatabase } from 'angularfire2/database';
@IonicPage()
@Component({
  selector: 'page-user-job-detail',
  templateUrl: 'user-job-detail.html',
})
export class UserJobDetailPage {
  patient: any;
  loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private loadingCtrl: LoadingController, private auth: AuthService, private af: AngularFireDatabase) {
    this.patient = this.navParams.get('patient');
    console.log(this.patient);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserJobDetailPage');
  }
}
