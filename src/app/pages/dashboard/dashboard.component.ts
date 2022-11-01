import { Component, OnInit } from '@angular/core';
import { Chart }  from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
import {AdminNavbarService} from '../../core/services/admin-navbar.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  datasets: any;
  data: any;
  salesChart;
  clicked: boolean = true;
  clicked1: boolean = false;

  constructor(public adminNavbarService: AdminNavbarService) {}

  ngOnInit() {
    this.adminNavbarService.changePage({
      path:'/admin/dashboard',
      breadcumbs: ['Dashboard']
    })
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    var chartOrders: any = document.getElementById('chart-bars');

    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales: any = document.getElementById('chart-sales-dark');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
  }
  updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
