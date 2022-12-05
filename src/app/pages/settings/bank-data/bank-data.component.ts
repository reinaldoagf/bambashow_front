import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RestService } from 'src/app/core/services/rest.service';
import { AccountBank } from 'src/app/core/models/account-bank.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank-data',
  templateUrl: './bank-data.component.html',
  styleUrls: ['./bank-data.component.css']
})
export class BankDataComponent implements OnInit {
  accountBank:AccountBank=new AccountBank();
  accountsBank:AccountBank[]=[];

  constructor(
    private spinner: NgxSpinnerService,
    private restService: RestService,
    private adminNavbarService: AdminNavbarService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path: '/admin/settings/social-networks',
      breadcumbs: ['Configuración', 'Cuentas bancarias']
    })
    this.getData()
  }

  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/settings/accounts-bank`),
      ]);
      this.spinner.hide();
      this.accountsBank = response1.data ? response1.data : [];

    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  async save() {
    try {
      if(this.accountBank.id){
        this.spinner.show();
        const response: any = this.restService.put(`/settings/accounts-bank/update/${this.accountBank.id}`,this.accountBank);
        this.spinner.hide();
        this.accountBank = response.data ? response.data : this.accountBank;
        this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
      }
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  edit(item: any){
    this.accountBank = Object.assign({},item)
  }
}
