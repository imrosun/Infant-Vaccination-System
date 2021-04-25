import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserJobListPage } from './user-job-list';

@NgModule({
  declarations: [
    // UserJobListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserJobListPage),
  ],
})
export class UserJobListPageModule {}
