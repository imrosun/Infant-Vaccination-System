import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AngularFireDatabase } from 'angularfire2/database';

import { ScheduleMedicinePage } from '../schedule-medicine/schedule-medicine';
@IonicPage()
@Component({
  selector: 'page-job-post',
  templateUrl: 'job-post.html',
})
export class JobPostPage {
  public patientList: Array<any>;
  public loadedpatientList: Array<any>;
  public patientRef: firebase.database.Reference;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private af: AngularFireDatabase) {
    let ref = this.af.list('/userProfile', ref => ref.orderByChild('role').equalTo('User')).valueChanges();
    ref.subscribe(snapshots => {
      let patient = [];
      snapshots.forEach(snapshot => {
        patient.push(snapshot);
        return false;
      });
      this.patientList = patient;
      console.log(patient);
      this.loadedpatientList = patient;
    });
  }
  initializeItems(): void {
    this.patientList = this.loadedpatientList;
  }
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    this.patientList = this.patientList.filter((v) => {
      if (v.email && q) {
        if (v.email.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(q, this.patientList.length);
  }
  openDetail(detail) {
    this.navCtrl.push(ScheduleMedicinePage, { patient: detail });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad JobPostPage');
  }

}
