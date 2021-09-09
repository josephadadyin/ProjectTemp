import { Component, OnInit, Type } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import axios from 'axios';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'ngbd-modal-confirm',
  templateUrl: './modal-add-new-process.html',
})
export class NgbdModalConfirm {
  processNumber;
  productName;
  usd;
  costAddon;
  processName;
  watsePersentage;
  INR;
  conversionCost;
  totalCost;
  usedPersentage;
  Density;
  averageDensity;
  constructor(public modal: NgbActiveModal, public fb: FormBuilder) {}
  ngOnInit(): void {}
  formSubmit() {
    console.log('hello');
  }
  onChangeprocessNumber(event: any) {
    console.log(event.target.value);
    this.processNumber = event.target.value;
  }
  onChangeproductName(event: any) {
    console.log(event.target.value);
    this.productName = event.target.value;
  }
  onChangeusd(event: any) {
    console.log(event.target.value);
    this.usd = event.target.value;
  }
  onChangecostAddon(event: any) {
    console.log(event.target.value);
    this.costAddon = event.target.value;
  }
  onChangeprocessName(event: any) {
    console.log(event.target.value);
    this.processName = event.target.value;
  }

  onChangewatsePersentage(event: any) {
    console.log(event.target.value);
    this.watsePersentage = event.target.value;
  }
  onChangeINR(event: any) {
    console.log(event.target.value);
    this.INR = event.target.value;
  }
  onChangeconversionCost(event: any) {
    console.log(event.target.value);
    this.conversionCost = event.target.value;
  }
  onChangetotalCost(event: any) {
    console.log(event.target.value);
    this.totalCost = event.target.value;
  }
  onChangeusedPersentage(event: any) {
    console.log(event.target.value);
    this.usedPersentage = event.target.value;
  }

  onChangeusedDensity(event: any) {
    console.log(event.target.value);
    this.Density = event.target.value;
  }

  onChangeusedaverageDensity(event: any) {
    console.log(event.target.value);
    this.averageDensity = event.target.value;
  }
}

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdModalConfirm,
};

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
  // dataSource: PeriodicElement[] = [
  //   {
  //     ProductName: 'Rice',
  //     price: '87$',
  //     weight: '76',
  //     density: '76',
  //     AvgDensity: '1bag/box',
  //     costAdd: 35,
  //     waste: 0,
  //     class: 'NA',
  //   },
  //   {
  //     ProductName: 'Salt',
  //     price: '76$',
  //     weight: '54',
  //     density: '54',
  //     AvgDensity: '1bag/box',
  //     costAdd: 25,
  //     waste: 0,
  //     class: 'NA',
  //   },
  //   {
  //     ProductName: 'Water',
  //     price: '84$',
  //     weight: '90',
  //     density: '',
  //     AvgDensity: '1bag/box',
  //     costAdd: 25,
  //     waste: 0,
  //     class: 'NA',
  //   },
  // ];

  dataSource: any[] = [];
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
  cost;
  cost1;
  cost2;
  addNewprocess = false;
  addingRow = false;
  addingConversionRow = false;
  constructor(private _modalService: NgbModal, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });
    this.AddProduct();
    // this.Conversion();
  }

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
      .then(function () {});
  }
  AddConversion() {
    axios
      .post(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/conversion_types/' +
          this.formGroup
      )
      .then((response) => {
        this.conversionCost = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {});
  }
  AddProduct() {
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/products/'
      )
      .then((response) => {
        this.dataSource = response.data.results;
        console.log(this.addNewProduct);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {});
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
    this.addNewprocess = true;
  }
  addRow() {
    this.addingRow = true;
    const newRow = {
      ProductName: '',
      price: '',
      weight: '15',
      density: '20',
      AvgDensity: '25',
      costAdd: 5,
      waste: 5,
      class: '',
      isEdit: true,
      selected: false,
    };
    this.dataSource = [...this.dataSource, newRow];
  }
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

  open(name: string) {
    this._modalService.open(MODALS[name]);
  }
  onChangeCost(event: any) {
    console.log(event.target.value);
    this.cost = event.target.value;
  }
  onChangeCost1(event: any) {
    console.log(event.target.value);
    this.cost1 = event.target.value;
  }
  onChangeCost2(event: any) {
    console.log(event.target.value);
    this.cost2 = event.target.value;
  }
  totalCost() {
    return this.cost + this.cost1 + this.cost2;
  }
}
function MyModalComponent(MyModalComponent: any, arg1: { size: any }) {
  throw new Error('Function not implemented.');
}
