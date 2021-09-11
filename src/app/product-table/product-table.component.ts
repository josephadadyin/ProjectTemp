import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  tables = [1];
  AddProductData;
  xproductName = [];
  selectProductName;
  xselectCost = '';
  xselectDensity = '';
  ConversionName;
  constructor() {}

  ngOnInit(): void {
    this.AddProduct();
    this.Conversion();
  }
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

  // ==========================  Event Handler ===================
  ProductWeightChangeHandler(event: any) {
    console.log(event.target.value);
  }
  ProductWasteChangeHandler(event: any) {
    console.log(event.target.value);
  }
  ProductNameChangeHandler(event: any) {
    console.log(event.target.value);
  }
  ProductOfProcessChangeHandler(event: any) {
    console.log(event.target.value);
  }
  selectConverionChangeHandler(event: any) {
    console.log(event.target.value);
  }
  EnterCostChangeHandler(event: any) {
    console.log(event.target.value);
  }
  // ======================= Product Get API ======================================

  AddProduct() {
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/products/'
      )
      .then((response) => {
        this.AddProductData = response.data.results;
        this.xproductName = this.AddProductData.map((d) => ({
          description: d.description,
          id: d.id,
        }));
        // console.log(this.addNewProduct);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {});
  }

  getxPrice(description) {
    const selectedProduct = this.AddProductData.find(
      (d) => d.description === description
    );
    this.xselectCost = selectedProduct.productAttributeValues.find(
      (d) => d.attribute.description === 'Cost'
    )['attributeValue'];
  }

  getxDensity(description) {
    const selectedProduct = this.AddProductData.find(
      (d) => d.description === description
    );
    this.xselectDensity = selectedProduct.productAttributeValues.find(
      (d) => d.attribute.description === 'Density'
    )['attributeValue'];
  }

  selectProductNameChangeHandler(event: any) {
    this.selectProductName = event.target.value;
    console.log(event.target.value);
    this.getxDensity(event.target.value);
    this.getxPrice(event.target.value);
    this.getxPrice(event.tar);
    this.getxDensity(event.tar);
  }
  addData() {
    const selectedProduct = this.xproductName[0];
    this.getxPrice(selectedProduct.description);
    this.getxDensity(selectedProduct.description);
  }

  // ========================== Conversion Cost API ===================

  Conversion() {
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/conversion_types/'
      )
      .then((response) => {
        this.ConversionName = response.data.results;
        // console.log(this.conversionName);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {});
  }
}
