import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class DataService {
  constructor(private auth: AngularFireAuth) {}
  getUserDetail(user:any){
    let ref = firebase.database().ref('userProfile/');
  }
}