import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
@IonicPage()
@Component({
  selector: 'page-admin-request',
  templateUrl: 'admin-request.html',
})
export class AdminRequestPage {
  disabledAccount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFireDatabase) {
  }
  getDisabledAccount() {
    const ref = this.af.list('/userProfile', ref => ref.orderByChild('role').equalTo('Company')).valueChanges();
    ref.subscribe(snapshots => {
      this.disabledAccount = [];
      snapshots.forEach(snapshot => {
        // if (!snapshot['enable'])
          this.disabledAccount.push(snapshot);
      });
    });
  }
  updateAccount(uid,status){
    firebase.database().ref('userProfile/'+uid).update({enable:status});
  }
  ionViewDidLoad() {
    this.getDisabledAccount();
  }

}
