import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { CompanyEditJobPage } from '../company-edit-job/company-edit-job';
import { AngularFireDatabase } from 'angularfire2/database';
@IonicPage()
@Component({
  selector: 'page-admin-job-detail',
  templateUrl: 'admin-job-detail.html',
})
export class AdminJobDetailPage {
  patient: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private emailComposer: EmailComposer,
    private af: AngularFireDatabase) {
    this.patient = this.navParams.get('patient');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminJobDetailPage');
  }
  remind() {

    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send
      }
    });
    const date = new Date(this.patient.v1);
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
  delete() {
    console.log(this.patient);
    this.af.database.ref(`schedule/${this.patient.key}`).remove();
    this.navCtrl.pop();
  }
}
