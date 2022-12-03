import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RestService } from 'src/app/core/services/rest.service';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*paginacion*/
  currentPage = 1;
  page = 1;
  itemsPerPage = 4;
  pageSize: number;
  paginations: any = {
    startItem: null,
    endItem: null
  }
  /*paginacion*/
  headerElements: any[] = [
    'Sección',
    'Activo',
  ];
  searchTable: string = '';
  section: any = null;
  sections: any[] = []
  constructor(
    private spinner: NgxSpinnerService,
    private restService: RestService,
    private adminNavbarService: AdminNavbarService,
    private notificationService: NotificationService) { }

    get paginateSections() {
      const startItem = this.paginations.startItem ? this.paginations.startItem : 0;
      const endItem = this.paginations.endItem ? this.paginations.endItem : this.itemsPerPage;
      return !this.searchTable.length ? this.sections.slice(startItem, endItem) : this.sections;
    }
  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path: '/admin/pages-manager/home',
      breadcumbs: ['Gestión de páginas', 'Home']
    })
    this.getData()
  }
  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/home/sections`),
      ]);
      this.spinner.hide();
      this.sections = response1.data ? response1.data : [];
      console.log(response1)
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }

  /* paginacion */
  onPageChange(event: any): void {
    this.paginations.startItem = (event - 1) * this.itemsPerPage
    this.paginations.endItem = event * this.itemsPerPage
  }
  /* paginacion */
  onCheck(event: any, item:any): void {
    this.section = item;
    this.section.active = event.target.checked;
    this.update()
  }
  async update() {
    try {
      this.spinner.show();
      const response: any = this.restService.put(`/home/sections/update/${this.section.id}`,this.section);
      this.spinner.hide();
      this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
      this.section = response.data ? response.data : this.section;
    } catch (error) {
      this.spinner.hide();
      if (error.error)
        this.notificationService.showError('Error', error.error)
      console.log(error);
    }
  }
}
