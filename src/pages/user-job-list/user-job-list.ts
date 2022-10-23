import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { UserJobDetailPage } from '../user-job-detail/user-job-detail';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
@IonicPage()
@Component({
  selector: 'page-user-job-list',
  templateUrl: 'user-job-list.html',
})
export class UserJobListPage {
  medicines: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFireDatabase, private auth: AuthService) {
  }
  getMedicine() {
    let id = this.auth.currentUser.uid;
    let ref = this.af.list('schedule', ref => ref.orderByChild('patient').equalTo(id)).valueChanges();
    ref.subscribe(snapshots => {
      this.medicines = [];
      snapshots.forEach(snapshot => {
        // if (!snapshot['enable'])
        this.medicines.push(snapshot);
      });
    });
  }
  openDetail(detail) {
    this.navCtrl.push(UserJobDetailPage, { patient: detail });
  }
  ionViewDidLoad() {
    this.getMedicine();
  }

}
