import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { TradesComponent } from './pages/trades/trades.component';

const routes: Routes = [
  {path:'',redirectTo:'trades',pathMatch:'full'},
  {path:'trades',component:TradesComponent},
  {path:'balance-chart',component:ScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
