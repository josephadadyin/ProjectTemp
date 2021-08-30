import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent implements OnInit {
  // v dataarray;
  dataarray: [
    {
      size: 1;
      package: 'Hydrogen';
      NoOfitem: '1Bag';
      relation: '1bag/box';
      grossWeight: '1gm';
      cost: 25;
      volume: 0;
      class: 'NA';
      // view: 'View more',
    },
    {
      size: 2;
      package: 'Helium';
      NoOfitem: '1Bag';
      relation: '1bag/box';
      grossWeight: '2gm';
      cost: 25;
      volume: 0;
      class: 'NA';
      // view: 'View more',
    },
    {
      size: 3;
      package: 'Lithium';
      NoOfitem: '1Bag';
      relation: '1bag/box';
      grossWeight: '6.941gm';
      cost: 25;
      volume: 0;
      class: 'NA';
      // // view: 'View more',
    },
    {
      size: 4;
      package: 'Beryllium';
      NoOfitem: '1Bag';
      relation: '1bag/box';
      grossWeight: '922gm';
      cost: 25;
      volume: 0;
      class: 'NA';
      // view: 'View more',
    },
    {
      size: 5;
      package: 'Boron';
      NoOfitem: '1Bag';
      relation: '1bag/box';
      grossWeight: '922gm';
      cost: 25;
      volume: 0;
      class: 'NA';
      // view: 'View more',
    },
    {
      size: 6;
      package: 'Carbon';
      NoOfitem: '1Bag';
      relation: '1bag/box';
      grossWeight: '922gm';
      cost: 25;
      volume: 0;
      class: 'NA';
      // view: 'View more',
    }
  ];

  constructor() {}
  @Input() message: any[];
  ngOnInit(): void {}
}
