import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Form } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
@IonicPage()
@Component({
  selector: 'page-schedule-medicine',
  templateUrl: 'schedule-medicine.html',
})
export class ScheduleMedicinePage {
  patient: any;
  startDate: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private auth: AuthService
  ) {
    this.patient = this.navParams.get('patient');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleMedicinePage');
  }
  schedule(f) {
    let data = f.value;
    let dateObj = new Date(data['startDate']).getTime();
    data['v1'] = dateObj + 1000 * 60 * 60 * 24 * 42;    // 6w
    data['v2'] = dateObj + 1000 * 60 * 60 * 24 * 70;    // 10w
    data['v3'] = dateObj + 1000 * 60 * 60 * 24 * 98;    // 14w
    data['v4'] = dateObj + 1000 * 60 * 60 * 24 * 180;   // 6m
    data['v5'] = dateObj + 1000 * 60 * 60 * 24 * 270;   // 9m
    data['v6'] = dateObj + 1000 * 60 * 60 * 24 * 365;   // 12m
    data['v7'] = dateObj + 1000 * 60 * 60 * 24 * 450;   // 15m
    data['v8'] = dateObj + 1000 * 60 * 60 * 24 * 480;   // 16m
    data['v9'] = dateObj + 1000 * 60 * 60 * 24 * 730;   // 2y
    data['v10'] = dateObj + 1000 * 60 * 60 * 24 * 1460;   // 4y
    data['v11'] = dateObj + 1000 * 60 * 60 * 24 * 1825;   // 5y
    data['v12'] = dateObj + 1000 * 60 * 60 * 24 * 3650;   // 10y
    data['v13'] = dateObj + 1000 * 60 * 60 * 24 * 5475;   // 15y
    data['patient'] = this.patient.uid;
    data['Dname'] = this.patient.Dname;
    data['email'] = this.patient.email;
    data['hospital'] = this.auth.currentUser.uid;
    console.log(data);
    let ref = this.db.database.ref('schedule');
    let newKey = ref.push().key;
    data['key'] = newKey;
    ref.child(newKey).set(data);
    this.navCtrl.pop();
  }

}
