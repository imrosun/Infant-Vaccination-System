import { Component, OnInit } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AdminRequestPage } from '../admin-request/admin-request';
import { CompanyJobListPage } from '../company-job-list/company-job-list';
import { AdminJobListPage } from '../admin-job-list/admin-job-list';
import { UserJobListPage } from '../user-job-list/user-job-list';
// import { MedicineList } from '../medicine-list/medicine-list';

import { AuthService } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = AdminRequestPage;
  tab5Root = CompanyJobListPage;
  tab6Root = AdminJobListPage;
  tab7Root = UserJobListPage;
  // tab8Root = MedicineList;

  private data: Observable<any>;
  companyEnabled = false;
  userAccount = false;
  adminAccount = false;
  constructor(private auth: AuthService) { }
  getUserDetail(info: any) {
    this.data = new Observable(observer => {
      let ref = firebase.database().ref('/userProfile/' + info['uid'])
        .once('value').then(function (snapshot) {
          console.log(snapshot.val());
          observer.next(snapshot.val());
        });
    });
    let subscription = this.data.subscribe(
      value => {
        this.auth.currentUser = value;
        if (value.role == 'User') this.userAccount = true;
        if (value.role == 'admin') this.adminAccount = true;
        if (value.role == 'Company' && value.enable)
          this.companyEnabled = true;
        console.log(this.auth.currentUser);
      },
      error => console.log(error),
      () => console.log('finished')//this.finished = true
    );
  }
  ngOnInit() {
    this.getUserDetail(this.auth.currentUser);
  }
}
