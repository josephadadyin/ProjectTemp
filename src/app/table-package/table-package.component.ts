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
  },
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
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
