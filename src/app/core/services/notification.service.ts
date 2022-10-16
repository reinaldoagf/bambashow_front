import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(title, message = ''){
    this.toastr.success(message, title,{
      closeButton: true,
      timeOut:3000,
      enableHtml:true
    })
  }
  showInfo(title, message = ''){
    this.toastr.info(message, title,{
      closeButton: true,
      timeOut:3000,
      enableHtml:true
    })
  }
  showError(title, message = null) {
    if(message instanceof Object) {
      let array_mesages = ''
      for (let message_value of Object.values(message)) {
        array_mesages += message_value+'<br>' 
      }
      message = array_mesages
    }
    this.toastr.error(message, title,{
      closeButton: true,
      timeOut:3000,
      enableHtml:true
    })
  }
  showValidatorErrors(title, errors:any = null) {
    if(errors && errors.error && errors.error.errors){
      let array_mesages = ''
      for (const key of Object.keys( errors.error.errors )) {
        array_mesages += errors.error.errors[key].message+'<br>' 
      }
      this.toastr.error(array_mesages, title,{
        closeButton: true,
        timeOut:3000,
        enableHtml:true
      })
    }
    
  }
  showWarning(title, message = ''){
    this.toastr.warning(message, title,{
      closeButton: true,
      timeOut:3000,
      enableHtml:true
    })
  }
}
