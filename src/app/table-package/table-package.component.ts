import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  package: string;
  size: number;
  NoOfitem: string;
  relation: string;
  grossWeight: string;
  cost: number;
  volume: number;
  class: string;
  // view: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    size: 1,
    package: 'Hydrogen',
    NoOfitem: '1Bag',
    relation: '1bag/box',
    grossWeight: '1gm',
    cost: 25,
    volume: 0,
    class: 'NA',
    // view: 'View more',
  },
  {
    size: 2,
    package: 'Helium',
    NoOfitem: '1Bag',
    relation: '1bag/box',
    grossWeight: '2gm',
    cost: 25,
    volume: 0,
    class: 'NA',
    // view: 'View more',
  },
  {
    size: 3,
    package: 'Lithium',
    NoOfitem: '1Bag',
    relation: '1bag/box',
    grossWeight: '6.941gm',
    cost: 25,
    volume: 0,
    class: 'NA',
    // // view: 'View more',
  },
  {
    size: 4,
    package: 'Beryllium',
    NoOfitem: '1Bag',
    relation: '1bag/box',
    grossWeight: '922gm',
    cost: 25,
    volume: 0,
    class: 'NA',
    // view: 'View more',
  },
  {
    size: 5,
    package: 'Boron',
    NoOfitem: '1Bag',
    relation: '1bag/box',
    grossWeight: '922gm',
    cost: 25,
    volume: 0,
    class: 'NA',
    // view: 'View more',
  },
  {
    size: 6,
    package: 'Carbon',
    NoOfitem: '1Bag',
    relation: '1bag/box',
    grossWeight: '922gm',
    cost: 25,
    volume: 0,
    class: 'NA',
    // view: 'View more',
  },
  // { size: 7, package: 'Nitrogen', grossWeight: 14.0067, symbol: 'N' },
  // { size: 8, package: 'Oxygen', grossWeight: 15.9994, symbol: 'O' },
  // { size: 9, package: 'Fluorine', grossWeight: 18.9984, symbol: 'F' },
  // { size: 10, package: 'Neon', grossWeight: 20.1797, symbol: 'Ne' },
  // { size: 11, package: 'Sodium', grossWeight: 22.9897, symbol: 'Na' },
  // { size: 12, package: 'Magnesium', grossWeight: 24.305, symbol: 'Mg' },
  // { size: 13, package: 'Aluminum', grossWeight: 26.9815, symbol: 'Al' },
  // { size: 14, package: 'Silicon', grossWeight: 28.0855, symbol: 'Si' },
  // { size: 15, package: 'Phosphorus', grossWeight: 30.9738, symbol: 'P' },
  // { size: 16, package: 'Sulfur', grossWeight: 32.065, symbol: 'S' },
  // { size: 17, package: 'Chlorine', grossWeight: 35.453, symbol: 'Cl' },
  // { size: 18, package: 'Argon', grossWeight: 39.948, symbol: 'Ar' },
  // { size: 19, package: 'Potassium', grossWeight: 39.0983, symbol: 'K' },
  // { size: 20, package: 'Calcium', grossWeight: 40.078, symbol: 'Ca' },
];

@Component({
  selector: 'app-table-package',
  templateUrl: './table-package.component.html',
  styleUrls: ['./table-package.component.scss'],
})
export class TablePackageComponent implements OnInit {
  displayedColumns: string[] = [
    'size',
    'package',
    'NoOfitem',
    'relation',
    'grossWeight',
    'cost',
    'volume',
    'class',
    // ' view',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
