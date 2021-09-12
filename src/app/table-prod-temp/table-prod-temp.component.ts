import { Component, EventEmitter, OnInit, Output, Type } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import axios from 'axios';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThrowStmt } from '@angular/compiler';

interface PeriodicElement {
  ProductName: string;
  price: string;
  weight: string;
  density: string;
  AvgDensity: string;
  costAdd: number;
  waste: number;
  class: string;
}

@Component({
  selector: 'app-table-prod-temp',
  templateUrl: './table-prod-temp.component.html',
  styleUrls: ['./table-prod-temp.component.scss'],
})
export class TableProdTempComponent implements OnInit {
  formGroup: FormGroup;
  displayedColumns: string[] = [
    'ProductName',
    'price',
    'weight',
    'density',
    'AvgDensity',
    'costAdd',
    'waste',
    'class',
  ];
  dataSource: any[] = [];
  tables = [1];
  dataArray = [
    { title: 'Cook carges', cost: 25 },
    { title: 'Gas', cost: 5 },
    { title: 'Cook charges', cost: 30 },
  ];
  @ViewChild(MatTable) table: MatTable<PeriodicElement>;

  addData() {
    const randomElementIndex = Math.floor(
      Math.random() * this.dataSource.length
    );
    this.dataSource.push(this.dataSource[randomElementIndex]);
    this.table.renderRows();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  conversionCost;
  addNewProduct;
  addNewConversion = false;
  addNewprocess = false;
  addingRow = false;
  addingConversionRow = false;
  xproductName = [];
  xproductsDetail = [];
  xselectCost = '';
  xselectDensity = '';
  xnewRow = {};
  processProducts;
  PrecessdataSource;
  selectProductName;
  processName;
  productOfProcess;
  percentageUsed;
  percentageWaste;
  selectConversion;
  cost;
  processNumberIs;
  static processNumber = 1;
  constructor(private _modalService: NgbModal, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });
    this.processNumberIs = 1;
    this.AddProduct();
    // this.Conversion();
  }
 
@Output() onProcessNameChange: EventEmitter<number> = new EventEmitter();
@Output() onProcessNumberChange: EventEmitter<number> = new EventEmitter();
@Output() onConversionChange: EventEmitter<number> = new EventEmitter();
@Output() onCostChange: EventEmitter<number> = new EventEmitter();

  Conversion() {
    this.addNewConversion = true;
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/conversion_types/'
      )
      .then((response) => {
        this.conversionCost = response.data.results;
        console.log(this.conversionCost);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () { });
  }
  // AddConversion() {
  //   axios
  //     .post(
  //       'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/conversion_types/' +
  //         this.formGroup
  //     )
  //     .then((response) => {
  //       this.conversionCost = response.data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .then(function () {});
  // }
  AddProduct() {
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/products/'
      )
      .then((response) => {
        this.dataSource = response.data.results;
        this.xproductName = this.dataSource.map((d) => ({
          description: d.description,
          id: d.id,
        }));
        console.log(this.addNewProduct);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () { });
  }
  processPostApi(payload) {
    axios
      .post(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/processes/',
        payload
      )
      .then((response) => {
        this.PrecessdataSource = response.data.results;
        console.log(this.addNewProduct);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () { });
  }
  getxPrice(description) {
    const selectedProduct = this.dataSource.find(
      (d) => d.description === description
    );
    this.xselectCost = selectedProduct.productAttributeValues.find(
      (d) => d.attribute.description === 'Cost'
    )['attributeValue'];
  }

  getxDensity(description) {
    const selectedProduct = this.dataSource.find(
      (d) => d.description === description
    );
    this.xselectDensity = selectedProduct.productAttributeValues.find(
      (d) => d.attribute.description === 'Density'
    )['attributeValue'];
  }

  ProcessNameChangeHandler(event: any) {
    this.processName = event.target.value;
    console.log('this.processName = event.target.value;', event.target.value);
    
    this.onProcessNameChange.emit(this.processName);
  }
  ProductOfProcessChangeHandler(event: any) {
    this.productOfProcess = event.target.value;
  }
  selectProductNameChangeHandler(event: any) {
    this.selectProductName = event.target.value;
    console.log(event.target.value);
    this.getxDensity(event.target.value);
    this.getxPrice(event.target.value);

    const proces = this.PrecessdataSource.find(
      (d) => d.id.toString() === event.target.value.toString()
    );
    this.processProducts = proces.processProducts;
    this.getxPrice(event.tar);
  }
  PercentageUsedChangeHandler(event: any) {
    this.percentageUsed = event.target.value;
  }
  PercentageWasteChangeHandler(event: any) {
    this.percentageWaste = event.target.value;
  }

  selectConversionChangeHandler(event: any) {
    this.selectConversion = event.target.value;
    this.onConversionChange.emit(this.selectConversion);
  }
  onChangeCost(event: any) {
    this.cost = event.target.value;
    console.log('hello', this.cost);
    this.onCostChange.emit(this.cost);
  }

  makeConversionPayload() {
    return {
      "conversionType": this.selectConversion,
      "processConversionAttributeValues": [
        {
          "attribute": {
            "id": 17,
            "description": "Cost"

          },
          "attributeValue": this.cost
        }
      ]
    }
  }

  makeAddProcessPayload(){

  }

  getTotalCost() {
    return this.dataSource
      .map((t) => t.costAdd)
      .reduce((acc, value) => acc + value, 0);
  }

  getCost() {
    return this.dataArray
      .map((t) => t.cost)
      .reduce((acc, value) => acc + value, 0);
  }

  AddProcess() {
    this.processNumberIs = this.processNumberIs + 1;
    this.addNewprocess = true;
    this.onProcessNumberChange.emit(this.processNumberIs);
  }
  addRow() {
    this.addingRow = true;

    // this.xproductName = this.dataSource.map(d=>(d.description));
    // this.xproductAttributeValues = this.dataSource.map(d=>(d.productAttributeValues))

    const selectedProduct = this.xproductName[0];
    this.getxPrice(selectedProduct.description);
    this.getxDensity(selectedProduct.description);

    // this.xnewRow = {
    //   price: this.xselectCost['attributeValue'],
    //   weight: '15',
    //   density: this.xselectDensity['attributeValue'],
    //   AvgDensity: '25',
    //   costAdd: 5,
    //   waste: 5,
    //   class: '',
    //   isEdit: true,
    //   selected: false,
    // };
  }

  setProductDataOnProductName(id) { }

  addRowConversion() {
    this.addingConversionRow = true;
    const newRow = {
      title: '1212',
      cost: 10,
      isEdit: true,
      selected: false,
    };
    this.dataArray = [...this.dataArray, newRow];
    this.addingConversionRow = false;
  }

  totalCost() {
    return this.cost;
  }
  Save(event: any) {
    const ProcessNumbers = 'New Process' + TableProdTempComponent.processNumber;
    TableProdTempComponent.processNumber++;
    this.processPostApi({
      description: this.processNumberIs,
      process_products: this.productOfProcess,
      process_conversion_types: this.selectConversion,
      process_calculator: this.processProducts,
    });
  }
}
function MyModalComponent(MyModalComponent: any, arg1: { size: any }) {
  throw new Error('Function not implemented.');
}
