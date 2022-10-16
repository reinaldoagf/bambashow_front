import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  declarations: [ 
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  providers: [
  ],
  schemas: [],
})
export class ComponentsModule {}
