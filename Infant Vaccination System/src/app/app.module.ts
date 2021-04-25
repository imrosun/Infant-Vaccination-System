import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthService } from './../providers/auth-service/auth-service';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage, RoundPipe } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AdminRequestPage } from '../pages/admin-request/admin-request';
import { CompanyJobListPage } from '../pages/company-job-list/company-job-list';
import { JobPostPage } from '../pages/job-post/job-post';
import { CompanyJobDetailPage } from '../pages/company-job-detail/company-job-detail';
import { CompanyEditJobPage } from '../pages/company-edit-job/company-edit-job';
import { AdminJobListPage } from '../pages/admin-job-list/admin-job-list';
import { AdminJobDetailPage } from '../pages/admin-job-detail/admin-job-detail';
import { UserJobListPage } from '../pages/user-job-list/user-job-list';
import { UserJobDetailPage } from '../pages/user-job-detail/user-job-detail';
import { ScheduleMedicinePage } from '../pages/schedule-medicine/schedule-medicine';
// import { MedicineList } from '../pages/medicine-list/medicine-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MomentModule } from 'angular2-moment';
import { EmailComposer } from '@ionic-native/email-composer';
export const firebaseConfig = { 
  apiKey: "AIzaSyC7GgnyQwIcJX44Z0sSUQf1io8AP2xCtqM",
  authDomain: "dks-styles.firebaseapp.com",
  databaseURL: "https://dks-styles.firebaseio.com",
  projectId: "dks-styles",
  storageBucket: "dks-styles.appspot.com",
  messagingSenderId: "826367760415"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    TabsPage,
    AboutPage,
    ContactPage,
    AdminRequestPage,
    CompanyJobListPage,
    JobPostPage,
    CompanyJobDetailPage,
    CompanyEditJobPage,
    AdminJobListPage,
    AdminJobDetailPage,
    UserJobListPage,
    UserJobDetailPage,
    ScheduleMedicinePage,
    // MedicineList,
    RoundPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    TabsPage,
    AboutPage,
    ContactPage,
    AdminRequestPage,
    CompanyJobListPage,
    JobPostPage,
    CompanyJobDetailPage,
    CompanyEditJobPage,
    AdminJobListPage,
    AdminJobDetailPage,
    UserJobListPage,
    UserJobDetailPage,
    ScheduleMedicinePage,
    // MedicineList
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    AngularFireDatabaseModule,
    EmailComposer,
  ]
})
export class AppModule { }
