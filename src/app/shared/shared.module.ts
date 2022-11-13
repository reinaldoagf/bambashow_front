import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//pipes
import { GenericFilterPipe } from 'src/app/shared/pipes/generic-filter.pipe';
//directives
import { BrokenPictureDirective } from './directives/broken-picture.directive';
import { MultiCheckboxDirective } from './directives/multi-checkbox.directive';
import { BadgeStatusDirective } from './directives/badge-status.directive';

@NgModule({
  declarations: [ 
    GenericFilterPipe,
    BrokenPictureDirective,
    MultiCheckboxDirective,
    BadgeStatusDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,    
    ToastrModule.forRoot({}),
    NgbModule
  ],
  exports: [
    GenericFilterPipe,
    BrokenPictureDirective,
    MultiCheckboxDirective,
    BadgeStatusDirective,
    CommonModule,  
    FormsModule,
    NgxSpinnerModule,    
    ToastrModule,
    NgbModule
  ],
  providers: [
    GenericFilterPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
