import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { ProductTableComponent } from '../product-table/product-table.component';

@Component({
  selector: 'app-new-prod-temp',
  templateUrl: './new-prod-temp.component.html',
  styleUrls: ['./new-prod-temp.component.scss'],
})
export class NewProdTempComponent implements OnInit {

  processSchema = {
    "productType": { "id": "", "name": "" },
    "productCode": "",
    "selectedAttributes": {"id":"","description":"", "attributesGroupAttributes":[]},
    "process": { "id": "", "name": "" },
    "productWeightCalculator": { "id": "", "name": "" },
    "productPicture": {},
    "processNo": "",
    "processName": "",
    "totalCost": "",
    "productOfProcess": "",
    "products": [
      {
        "name": "",
        "id": "",
        "weight": "",
        "density": "",
        "avgDensity": "",
        "costAddOn": "",
        "waste": ""
      }
    ],
    "conversionCost": [
      {
        "name": "",
        "id": "",
        "cost": ""
      }
    ]
  }

  selectedAttributes={id:"",description:"",attributesGroupAttributes:[]};

  attributesGroupAttributes;
  productdata;
  attributeGroup;
  addNewAttribute;
  getProcesses;
  xproductName;
  selectProcesses;
  selectedProcess;
  @ViewChild(ProductTableComponent) child:ProductTableComponent;


  


  ngOnInit(): void {
    this.ProductType();
    this.AttributeGroups();
    this.AddAtribute();
    this.GetProcess();
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
      .then(function () { });
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
      .then(function () { });
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
      .then(function () { });
  }
  GetProcess() {
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/processes/'
      )
      .then((response) => {
        this.getProcesses = response.data.results;
        this.xproductName = this.getProcesses.map((d) => ({
          description: d.description,
          id: d.id,
        }));
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () { });
  }


  selectAttributeChangeHandler(event: any) {
    this.selectedDay = event.target.value;
    console.log(event.target.value);
    if (event.target.value === '-1') { this.attributesGroupAttributes = []; return };
    const attrbs = this.attributeGroup.find(
      (d) => d.id.toString() === event.target.value.toString()
    );
    this.processSchema.selectedAttributes = attrbs??{id:"",description:"",attributesGroupAttributes:[]};
   
    this.attributesGroupAttributes = attrbs.attributesGroupAttributes;
  }

  selectAddNewAttributeHandler(event: any) {
    this.AddAtributex = event.target.value;
    if (event.target.value === '-1') return;
    const selectedAtt = this.addNewAttribute.results.find(d => (d.id && d.id.toString() === event.target.value));
    if(selectedAtt){
      this.selectedAddAttribute = selectedAtt;
      delete selectedAtt['id'];
      this.processSchema.selectedAttributes.attributesGroupAttributes.push({ "attribute": selectedAtt });
    }
  }
  
  selectProcessChangeHandler(event: any) {
    this.selectProcesses = event.target.value;
    console.log('event.target.value',event.target.value);

    this.selectedProcess = this.getProcesses.find(d=>(d.id.toString()===event.target.value));
    this.child.onProcessSelectedFromParent(this.selectedProcess);
    
  }











  selectedDay;
  static templateCounter = 1;
  templateName;
  selectedProductType;
  AddAtributex;
  AddAtributevalue = false;
  processName;
  processNumber;
  conversionNo;
  cost;
  productCode;
  selectedAttribute = { id: -1, Name: 'Select One' };
  selectedAddAttribute = { id: -1, Name: 'Select One' };
  constructor() { }

  

  

  
  

  

  oProductCodeChangeHandler(event: any) {
    this.productCode = event.target.value;
  }

  selectProductTypeChangeHandler(event: any) {
    this.selectedProductType = event.target.value;
  }

  onProcessNameChangeHandler(name: any) {
    this.processName = name;
  }

  ononConversionChangeHandler(no: any) {
    this.conversionNo = no;
    console.log('this.ononConversionChangeHandler', this.conversionNo);
  }
  onCostChangeHandler(no: any) {
    this.cost = no;
    console.log('this.pncost', this.cost);
  }
  onProcessNumberChangeHandler(no: any) {
    this.processNumber = no;
    console.log('this.processNumber', this.processNumber);
  }
  onafterSave(no: any) {
    this.processSchema.selectedAttributes.attributesGroupAttributes = [];
    this.selectedAttribute = { id: -1, Name: 'Select One' };
    this.selectedAddAttribute = { id: -1, Name: 'Select One' };
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
      .then(function () { });
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
      .then(function () { });
  }
  makeAddProcessPayload() {
    return {
      description: this.processName,
      processProducts: [
        {
          product: this.processNumber,
          processProductAttributeValues: this.attributesGroupAttributes,
        },
      ],
      processConversionTypes: [
        {
          conversionType: this.conversionNo,
          processConversionAttributeValues: [
            {
              attribute: {
                id: 17,
                description: 'Cost',
              },
              attributeValue: this.cost,
            },
          ],
        },
      ],
      processCalculator: null,
    };
  }
}
