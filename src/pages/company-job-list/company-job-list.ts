import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobPostPage } from '../job-post/job-post';
import { CompanyJobDetailPage } from '../company-job-detail/company-job-detail';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../providers/auth-service/auth-service';
@IonicPage()
@Component({
  selector: 'page-company-job-list',
  templateUrl: 'company-job-list.html',
})
export class CompanyJobListPage {
  patients: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private af: AngularFireDatabase,
  ) {
  }
  postjob() {
    this.navCtrl.push(JobPostPage);
  }
  openDetail(detail) {
    this.navCtrl.push(CompanyJobDetailPage, { patient: detail });
  }
  getPatient() {
    let id = this.auth.currentUser.uid;
    let ref = this.af.list('schedule', ref => ref.orderByChild('hospital').equalTo(id)).valueChanges();
    ref.subscribe(snapshots => {
      this.patients = [];
      snapshots.forEach(snapshot => {
        // if (!snapshot['enable'])
        this.patients.push(snapshot);
      });
    });
  }
  ionViewDidLoad() {
    this.getPatient();
  }
}
