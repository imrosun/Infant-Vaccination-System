import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminJobListPage } from './admin-job-list';

@NgModule({
  declarations: [
    // AdminJobListPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminJobListPage),
  ],
})
export class AdminJobListPageModule {}
