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
  AddAtributex;
  AddAtributevalue = false;
  processName;
  processNumber;
  conversionNo;
  cost;
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
  selectAddNewAttributeHandler(event: any) {
    this.AddAtributex = event.target.value;
    console.log(this.AddAtributex);
    const selectedAtt = this.addNewAttribute.results.find(d=>(d.id.toString() === event.target.value));
    this.attributesGroupAttributes.push({"attribute":selectedAtt});    
    this.AddAtributevalue = true;
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

  onProcessNameChangeHandler(name: any){
    this.processName = name;
  }

  ononConversionChangeHandler(no: any){
    this.conversionNo = no;
    console.log('this.ononConversionChangeHandler', this.conversionNo);
    
  }
  onCostChangeHandler(no: any){
    this.cost = no;
    console.log('this.pncost', this.cost);
    
  }
  onProcessNumberChangeHandler(no: any){
    this.processNumber = no;
    console.log('this.processNumber', this.processNumber);
    
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
    const payload = this.makeAddProcessPayload();
    console.log('dddd', JSON.stringify(payload));
    axios
      .post(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/processes/',
        payload
      )
      .then((response) => {
       console.log('resssss', response.data);
       
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {});
  }
  makeAddProcessPayload(){
    return {
      "description": this.processName,
      "processProducts":[{
        "product": this.processNumber,
        "processProductAttributeValues": this.attributesGroupAttributes
      }],
      "processConversionTypes": [{
        "conversionType": this.conversionNo,
        "processConversionAttributeValues": [{
          "attribute": {
            "id": 17,
            "description": "Cost"
          },
          "attributeValue": this.cost
        }]
      }],
      "processCalculator": null
    }
  }
}
