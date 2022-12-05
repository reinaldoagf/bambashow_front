import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
import { AdminNavbarService } from '../../core/services/admin-navbar.service';
import { User } from "src/app/core/models/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  datasets: any;
  data: any;
  salesChart;
  clicked: boolean = true;
  clicked1: boolean = false;
  user: User = new User();

  constructor(public adminNavbarService: AdminNavbarService) { }

  ngOnInit() {
    this.adminNavbarService.changePage({
      path: '/admin/dashboard',
      breadcumbs: ['Dashboard']
    })
    this.getUser()
  }
  ngAfterViewInit() {
    this.initCharts();
  }
  /*obtiene usuario en sesión desde localStorage*/
  getUser() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  initCharts() {
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];
    var chartOrders: any = document.getElementById('chart-bars');
    parseOptions(Chart, chartOptions());
    if (chartOrders) {
      var ordersChart = new Chart(chartOrders, {
        type: 'bar',
        options: chartExample2.options,
        data: chartExample2.data
      });
    }
    var chartSales: any = document.getElementById('chart-sales-dark');
    if (chartSales) {
      this.salesChart = new Chart(chartSales, {
        type: 'line',
        options: chartExample1.options,
        data: chartExample1.data
      });
    }
  }
  updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
