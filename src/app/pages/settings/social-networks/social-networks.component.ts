import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RestService } from 'src/app/core/services/rest.service';
import { SocialNetwork } from 'src/app/core/models/social-network.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.css']
})
export class SocialNetworksComponent implements OnInit {
  socialNetworks:SocialNetwork[]=[];
  socialNetwork:SocialNetwork= new SocialNetwork();
  constructor(
    private spinner: NgxSpinnerService,
    private restService: RestService,
    private adminNavbarService: AdminNavbarService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path: '/admin/settings/social-networks',
      breadcumbs: ['Configuración', 'Redes sociales']
    })
    this.getData()
  }

  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/settings/social-networks`),
      ]);
      this.spinner.hide();
      this.socialNetworks = response1.data ? response1.data : [];

    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  
  async save() {
    try {
      if(this.socialNetwork.id){
        this.spinner.show();
        const response: any = this.restService.put(`/settings/social-networks/update/${this.socialNetwork.id}`,this.socialNetwork);
        this.spinner.hide();
        this.socialNetwork = response.data ? response.data : this.socialNetwork;
        this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
      }
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  edit(item: any){
    this.socialNetwork = Object.assign({},item)
  }
}
