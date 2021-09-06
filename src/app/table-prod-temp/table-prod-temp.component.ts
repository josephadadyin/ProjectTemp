import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import axios from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import { map, filter, switchMap } from 'rxjs/operators';

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
  dataSource: PeriodicElement[] = [
    {
      ProductName: 'Rice',
      price: '87$',
      weight: '76',
      density: '76',
      AvgDensity: '1bag/box',
      costAdd: 35,
      waste: 0,
      class: 'NA',
    },
    {
      ProductName: 'Salt',
      price: '76$',
      weight: '54',
      density: '54',
      AvgDensity: '1bag/box',
      costAdd: 25,
      waste: 0,
      class: 'NA',
    },
    {
      ProductName: 'Water',
      price: '84$',
      weight: '90',
      density: '',
      AvgDensity: '1bag/box',
      costAdd: 25,
      waste: 0,
      class: 'NA',
    },
  ];
  // dataSource1: any;
  // dataSource = new MatTableDataSource<PeriodicElement>(dataSource1);

  public dataArray: Array<any> = [
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
  constructor() {}

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.Conversion();
  }

  Conversion() {
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/conversion_types/'
      )
      .then((response) => {
        this.conversionCost = response.data;
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
}
