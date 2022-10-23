import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthService {
  currentUser: any;
  constructor(private auth: AngularFireAuth, private toastCtrl: ToastController, ) {

  }
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.auth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
          .catch(err => {
            console.log(err);
            let toast = this.toastCtrl.create({
              message: err,
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            observer.next(false);
            observer.complete();
            return Observable.throw(err);
          })
          .then(
          data => {
            if (data) {
              this.currentUser = data;
              if (!data.error)
                observer.next(true);
              observer.complete();
            }
          }
          );
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        this.auth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
          .catch(
          err => {
            let toast = this.toastCtrl.create({
              message: err,
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            observer.next(false);
            return Observable.throw(err);
          }
          ).then(
          data => {
            console.log(data);
            if (data) {
              firebase
                .database()
                .ref('/userProfile')
                .child(data.uid)
                .set({ Dname: credentials.Dname, email: data.email, role: credentials.role, uid: data.uid, enable: false });
            }
            observer.next(true);
            observer.complete();
          }
          );
      });
    }
  }

  public getUserInfo(): any {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}