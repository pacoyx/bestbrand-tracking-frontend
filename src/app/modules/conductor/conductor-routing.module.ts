import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageConductorTrackComponent } from './pages/page-conductor-track/page-conductor-track.component';

const routes: Routes = [
  { path: '', redirectTo: 'driverTrack', pathMatch: 'full' },
  { path: 'driverTrack', component: PageConductorTrackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConductorRoutingModule { }
