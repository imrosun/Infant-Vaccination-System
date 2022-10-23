import { Component, AfterViewInit, Pipe } from '@angular/core';
import { NavController, IonicPage, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Pipe({ name: 'round' })
export class RoundPipe {
  transform(input: number) {
    return Math.floor(input);
  }
}

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  userData = { email: '', Dname: '', role: '' };
  anyErrors: any;
  finished: any;
  medicines: any;
  private data: Observable<any>;
  constructor(private nav: NavController, private auth: AuthService, private app: App, private af: AngularFireDatabase) {

  }

  getUserDetail(info: any) {
    console.log(info);
    this.data = new Observable(observer => {
      let ref = firebase.database().ref('/userProfile/' + info['uid'])
        .once('value').then(function (snapshot) {
          console.log(snapshot);
          observer.next(snapshot.val());
        });
    });
    let subscription = this.data.subscribe(
      value => {
        this.userData = value;
        console.log(this.userData);
      },
      error => console.log(error),
      () => console.log('finished')//this.finished = true
    );
  }
  ngAfterViewInit() {
    console.log(this.auth.currentUser);
    this.getUserDetail(this.auth.currentUser);
    this.getMedicine();

  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
  getMedicine() {
    let id = this.auth.currentUser.uid;
    let ref = this.af.list('schedule', ref => ref.orderByChild('patient').equalTo(id)).valueChanges();
    ref.subscribe(snapshots => {
      this.medicines = [];
      snapshots.forEach(snapshot => {
        this.medicines.push(snapshot);
        console.log(this.medicines);
      });
    });
  }
}