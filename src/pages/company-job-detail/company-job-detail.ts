import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanyEditJobPage } from '../company-edit-job/company-edit-job';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { Form } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-company-job-detail',
  templateUrl: 'company-job-detail.html',
})
export class CompanyJobDetailPage {
  patient: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private af: AngularFireDatabase,
    private toastCtrl: ToastController,
    private emailComposer: EmailComposer
  ) {
    this.patient = this.navParams.get('patient');
    console.log(this.patient);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyJobDetailPage');
  }

  remind() {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send
      }
    });
    var date = new Date(this.patient.v1);
    let d = date.toLocaleString();
    let email = {
      to: this.patient.email,
      cc: '',
      bcc: [],
      attachments: [],
      subject: 'Vaccine Reminder',
      body: 'Hi ' + this.patient.Dname + ', your vaccine is scheduled on ' + d,
      isHtml: true
    };
    // Send a text message using default options
    this.emailComposer.open(email);


    let toast = this.toastCtrl.create({
      message: 'Reminder is sent to patient',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  edit() {
    this.navCtrl.push(CompanyEditJobPage, { patient: this.patient });
  }
}
