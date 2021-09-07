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
  static templateCounter = 1;
  templateName;
  selectedProductType;
  constructor() {}

  ngOnInit(): void {
    this.ProductType();
    this.AttributeGroups();
    this.AddAtribute();
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

  AddAtribute() {
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
    console.log(event.target.value);
    const attrbs = this.attributeGroup.find(
      (d) => d.id.toString() === event.target.value.toString()
    );
    this.attributesGroupAttributes = attrbs.attributesGroupAttributes;
  }
  selectProductTypeChangeHandler(event: any) {
    this.selectedProductType = event.target.value;
  }

  postNewTemplate(payload) {
    axios
      .post(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/product_templates/',
        payload
      )
      .then((response) => {
        console.log('success', response);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {});
  }

  onSave(event: any) {
    const templateName =
      'New Tempalate hexode' + NewProdTempComponent.templateCounter;
    NewProdTempComponent.templateCounter++;

    this.postNewTemplate({
      description: this.templateName,
      product_type: this.selectedProductType,
      product_template_attributes: this.attributesGroupAttributes,
    });
  }
}
