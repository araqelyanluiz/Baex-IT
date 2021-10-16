import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTradeDialog, TradesComponent } from './trades/trades.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [TradesComponent, ScheduleComponent,AddTradeDialog],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    HighchartsChartModule
  ],
})
export class PagesModule {}
