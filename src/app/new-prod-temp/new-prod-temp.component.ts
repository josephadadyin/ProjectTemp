import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-new-prod-temp',
  templateUrl: './new-prod-temp.component.html',
  styleUrls: ['./new-prod-temp.component.scss'],
})
export class NewProdTempComponent implements OnInit {
  productdata;
  attributeGroup;
  selectedDay;
  constructor() {}

  ngOnInit(): void {
    this.ProductType();
    this.AttributeGroups();
    // this.productdata = {};
  }

  ProductType() {
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/product_types/'
      )
      .then((response) => {
        this.productdata = response.data;
        // console.log(this.productdata);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {});
  }
  AttributeGroups() {
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/attribute_groups/'
      )
      .then((response) => {
        this.attributeGroup = response.data.results;
        console.log(this.attributeGroup);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {});
  }
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;
    console.log(this.selectedDay);
  }
}
