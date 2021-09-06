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
  attributesGroupAttributes;
  addNewAttribute;
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
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {});
  }
  AddAttribute() {
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/attributes/'
      )
      .then((response) => {
        this.addNewAttribute = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {});
  }

  selectChangeHandler(event: any) {
    this.selectedDay = event.target.value;
    const attrbs = this.attributeGroup.find(
      (d) => d.description === event.target.value
    );
    this.attributesGroupAttributes = attrbs.attributesGroupAttributes;
  }
}
