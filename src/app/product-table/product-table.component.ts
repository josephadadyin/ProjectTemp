import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  tables = [0];
  AddProductData;
  xproductName = [];
  selectProductName;
  xselectCost = '';
  xselectDensity = '';
  ConversionName;
  processName;
  productWeight;
  productWaste;
  productOfProcess;
  conversionName;
  enterCost;
  static processNumber = 1;
  xprocessNumber;
  selectedProductNameIndex=0;

  constructor() {}

  ngOnInit(): void {
    this.AddProduct();
    this.Conversion();
    this.xprocessNumber = ProductTableComponent.processNumber;
    this.onProcessNumberChange.emit(this.xprocessNumber);
  }
  @Output() onProcessNameChange: EventEmitter<number> = new EventEmitter();
@Output() onProcessNumberChange: EventEmitter<number> = new EventEmitter();
@Output() onConversionChange: EventEmitter<number> = new EventEmitter();
@Output() onCostChange: EventEmitter<number> = new EventEmitter();

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
    this.productWeight = event.target.value;
    console.log(event.target.value);
  }
  ProductWasteChangeHandler(event: any) {
    this.productWaste = event.target.value;
    console.log(event.target.value);
  }

  ProcessNameChangeHandler(event: any) {
    this.processName = event.target.value;
    console.log(event.target.value);
    this.onProcessNameChange.emit(this.processName);
  }
  ProductOfProcessChangeHandler(event: any) {
    this.productOfProcess = event.target.value;
    console.log(event.target.value);
  }
  selectConverionChangeHandler(event: any) {
    this.conversionName = event.target.value;
    console.log(event.target.value);
    this.onConversionChange.emit(this.conversionName);
  }
  EnterCostChangeHandler(event: any) {
    this.enterCost = event.target.value;
    console.log(event.target.value);
    this.onCostChange.emit(this.enterCost);
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

  selectProductNameChangeHandler(event: any, index:any) {
    console.log('indexindex', index);
    this.selectedProductNameIndex = index;
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

  // ============================= Process Post Api ========================

  ProcessPost(payload) {
    console.log('ProcessPostAPi Is called');
    axios
      .post(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/processes/',
        payload
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log('Process post API is successfully Called:');
  }

  saveProcess() {
    console.log('SaveProcess function is called:');
    this.ProcessPost({
      description: this.processName,
      processProducts: [
        {
          product: this.productOfProcess,
          processProductAttributeValues: [
            {
              attribute: { description: this.selectProductName },
              attributeValue: null,
            },
          ],
          processConversionTypes: [
            {
              processConversionAttributeValues: [
                {
                  attribute: { description: this.conversionName },
                  attributeValue: this.enterCost,
                },
              ],
            },
          ],
          processCalculator: [null],
        },
      ],
    });
  }
}
