import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Chart } from 'chart.js';
import { RestService } from 'src/app/core/services/rest.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
import { AdminNavbarService } from '../../core/services/admin-navbar.service';
import { User } from "src/app/core/models/user.model";
import { Provider } from 'src/app/core/models/provider.model';
import { OrderProduct } from 'src/app/core/models/order-product.model';

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
  providers: Provider[] = [];
  users: User[] = [];
  orders: OrderProduct[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private restService: RestService,
    public adminNavbarService: AdminNavbarService) { }

  ngOnInit() {
    this.adminNavbarService.changePage({
      path: '/admin/dashboard',
      breadcumbs: ['Dashboard']
    })
    this.getUser()
    this.getData()
  }
  ngAfterViewInit() {
    this.initCharts();
  }
  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
        response2,
        response3,
      ]: any[] = await Promise.all([
        this.restService.get(`/users`),
        this.restService.get(`/providers`),
        this.restService.get(`/products/orders`),
      ]);
      this.spinner.hide();
      this.users = response1.data ? response1.data : [];
      this.providers = response2.data ? response2.data : [];
      this.orders = response2.data ? response2.data : [];
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
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
