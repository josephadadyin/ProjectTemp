import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  tables = [1];
  constructor() {}

  ngOnInit(): void {}
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }
  public fieldArray1: Array<any> = [];
  public newAttribute1: any = {};
  addFieldValue1() {
    this.fieldArray1.push(this.newAttribute1);
    this.newAttribute1 = {};
  }
}
