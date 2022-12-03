import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { RestService } from 'src/app/core/services/rest.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HomeSection } from 'src/app/core/models/home-section.model';
import { ListItem } from 'src/app/core/models/list-item.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  section: HomeSection = new HomeSection();
  listItem: ListItem = new ListItem();
  fileData: File = null;
  previewUrl: any = null;
  dropdownSettings: any = {
    singleSelection: true,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
    textField: 'theme',
  }
  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private restService: RestService,
    private adminNavbarService: AdminNavbarService,
    private notificationService: NotificationService) { }
   get getFormData(){
    const formData: any = new FormData();
    const keys = Object.keys(this.section)
    keys.map(element => {
      if(this.section[element] !== null)
      formData.append(element, `${this.section[element]}`);
    });
    return formData;
   }
  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path: '/admin/pages-manager/home/form/:id',
      breadcumbs: ['Gestión de páginas', 'Inicio', 'Formulario']
    })
    this.activeRoute.params.subscribe(routeParams => {
      if (routeParams.id) {
        this.section.id = routeParams.id
        this.getData()
      }
    });
  }
  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/home/sections/get/${this.section.id}`),
      ]);
      this.spinner.hide();
      this.section = response1.data ? response1.data : [];
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  async save() {
    try {
      this.spinner.show();
      const response: any = this.restService.put(`/home/sections/update/${this.section.id}`, this.section);
      this.spinner.hide();
      this.section = response.data ? response.data : this.section;
      this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
      this.location.back();
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  addItem() {
    if (this.listItem.id) {
      this.section.list_items = this.section.list_items.map(e => e.id === this.listItem.id ? this.listItem : e)
    } else {
      this.section.list_items.push(this.listItem)
    }
    this.listItem = new ListItem();
  }
  editItem(item) {
    this.listItem = Object.assign({}, item);
  }
  confirmDeleted(item:any) {
    if (item) {
      Swal.fire({
        title: 'Confirmar operación',
        text: `¿Desea eliminar "${item.text}"?`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, Cancelar'
      }).then(async (result) => {
        if (result.value) {
          try {
            this.spinner.show();
            const response: any = await this.restService.delete(`/home/sections/list-item/delete/${item.id}`);
            this.spinner.hide();
            if (response !== undefined && response.data) {
              this.section.list_items = this.section.list_items.filter(( element: any ) => {
                if (element.id !== item.id) return element
              })
              this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
            }
          } catch (error) {
            this.spinner.hide();
            if (error.error)
              this.notificationService.showError('Error', error.error)
            console.log('error:', error)
          }
        }
      })
    }
  }
  /*<<<<<<<<<<<<<<<<<<<<<<<MANEJO DE IMAGEN>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
  async fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    if (
      this.fileData.type.match('image/png') ||
      this.fileData.type.match('image/jpg') ||
      this.fileData.type.match('image/jpeg')
    ) {
      this.section.image_side = this.fileData;
      var reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = _event => {
        this.previewUrl = reader.result;
      };

    } else {
      this.notificationService.showWarning('Formato no permitido', 'Solo se permite formato .png, .jpg, y .jpeg')
    }
  }
}
