import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxFileDropModule } from 'ngx-file-drop';

import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AddNewComponent } from './add-new/add-new.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablePackageComponent } from './table-package/table-package.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { NewProdTempComponent } from './new-prod-temp/new-prod-temp.component';
import { TableProdTempComponent } from './table-prod-temp/table-prod-temp.component';
import { ProductTableComponent } from './product-table/product-table.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    AdminHeaderComponent,
    AddNewComponent,
    TablePackageComponent,
    DragDropComponent,
    NewProdTempComponent,
    TableProdTempComponent,
    ProductTableComponent,
  ],
  imports: [
    MatSidenavModule,
    MatPaginatorModule,
    MatSliderModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'admin-header', component: AdminHeaderComponent },
      // { path: '', redirectTo: 'admin-header', pathMatch: 'full' },
      { path: 'add-new', component: AddNewComponent },
      { path: 'table-package', component: TablePackageComponent },
      { path: 'new-prod-temp', component: NewProdTempComponent },
      { path: 'table-prod-temp', component: TableProdTempComponent },
      { path: 'product-table', component: ProductTableComponent },
    ]),
    NgbModule,
    BrowserAnimationsModule,
    NgxFileDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
