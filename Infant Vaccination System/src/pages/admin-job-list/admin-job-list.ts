import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AdminJobDetailPage } from '../admin-job-detail/admin-job-detail';

@IonicPage()
@Component({
  selector: 'page-admin-job-list',
  templateUrl: 'admin-job-list.html',
})
export class AdminJobListPage {
  medicines: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private af: AngularFireDatabase) {
  }
  getPostedJobs() {
    const ref = this.af.list('schedule').valueChanges();
    ref.subscribe(snapshots => {
      this.medicines = [];
      snapshots.forEach(snapshot => {
        // if (!snapshot['enable'])
        this.medicines.push(snapshot);
        console.log(this.medicines);
      });
    });
  }
  openDetail(detail) {
    this.navCtrl.push(AdminJobDetailPage, { patient: detail });
  }
  ionViewDidLoad() {
    this.getPostedJobs();
  }

}
