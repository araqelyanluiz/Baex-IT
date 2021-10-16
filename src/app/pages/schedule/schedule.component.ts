import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartRef: any;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Schedule of Trade Changes',
    },
    yAxis: {
      title: {
        text: 'Profit',
      },
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%Y-%b-%e}',
      },
    },
    plotOptions: {
      series: {
        lineWidth: 0.8,
      },
    },
    series: [{ type: 'line', data: [] }],
  };

  trades: any[] = [];
  constructor() {}

  ngOnInit(): void {
    this.getTrades();
  }

  getTrades() {
    this.trades = JSON.parse(localStorage.getItem('trades') || '[]');
  }

  callbackFunction = (chart: any) => {
    this.chartRef = chart;
    while(this.chartRef.series.length > 0)
    this.chartRef.series[0].remove(true);

    const chartData: any[] = [];
    this.trades.forEach((element) => {
      chartData.push([new Date(element.createDate).getTime(), +element.profit]);
    });
    this.chartRef.addSeries({
      type: 'line',
      data: chartData,
    });
  };
}
