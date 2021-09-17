import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  processSchema = {
    "productType": { "id": "", "name": "" },
    "productCode": "",
    "selectedAttributes": { "id": "", "description": "", "attributesGroupAttributes": [] },
    "process": { "id": "", "name": "" },
    "productWeightCalculator": { "id": "", "name": "" },
    "productPicture": {},
    "processNo": "",
    "processName": "",
    "totalCost": "",
    "productOfProcess": "",
    "products": [],
    /** prodts schema per product
     * {
        "id": "",
        "description": "",
        "businessAccount":null,
        "productTemplate":null,
        "process":null,
        "productAttributeValues":[]
      }
    */
    "processConversionTypes": []
    // {
    //   "conversionType": "",
    //   "processConversionAttributeValues": [{
    //     "attribute": {
    //       "description": 'Cost',
    //       "systemUom": {
    //         "id": 13,
    //         "description": 'USD',
    //       },
    //     },
    //     "attributeValue": "",
    //     "attributeValueExpression": null,
    //     "userConversionUom": 'USD',
    //   }]
    // }
  }
  getConversionCostAttribute(value) {
    return {
      attribute: {
        description: 'Cost',
        systemUom: {
          id: 13,
          description: 'USD',
        },
      },
      attributeValue: value,
      attributeValueExpression: null,
      userConversionUom: 'USD',
    };
  }


  xprocessNumber;
  processName;
  productOfProcess;
  productList;
  selectedProductFromDropDown;
  public createdProcessViewArray: Array<any> = [];
  public reverseCreatedProcessViewArray: Array<any> = [];

  public addedConversion: Array<any> = [];
  @Input() xattributesGroupAttributes = [];





  constructor(private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getProducts();
    this.Conversion();
    this.xprocessNumber = ProductTableComponent.processNumber;
    // this.onProcessNumberChange.emit(this.xprocessNumber);
  }
  onProcessNameChangeHandler(event: any) {
    this.processName = event.target.value;
    console.log(event.target.value);
    // this.onProcessNameChange.emit(this.processName);
  }
  onProductOfProcessChangeHandler(event: any) {
    this.productOfProcess = event.target.value;
    console.log(event.target.value);
  }
  onSelectProductNameChangeHandler(event: any, index: number) {
    console.log('index', index);

    const selectedProduct = this.productList.find(
      (d) => d.id.toString() === event.target.value
    );
    this.processSchema.products[index] = selectedProduct;
  }
  Conversion() {
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/conversion_types/'
      )
      .then((response) => {
        this.ConversionName = response.data.results;
        console.log(this.ConversionName);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () { });
  }
  addConversionCost() {
    this.addedConversion.push({...this.ConversionName[0],cost:''});
    // this.processSchema.processConversionTypes.push(this.getConversionSchema(this.ConversionName[0].id, null));
    // this.newAttribute1 = {};
    // this.selectedConversion.push(this.ConversionName[0]);
    // console.log('this.selectedConversion', this.selectedConversion);

  }

  getConversionSchema (id,value){
    return{
      "conversionType": id,
      "processConversionAttributeValues": [{
        "attribute": {
          "description": 'Cost',
          "systemUom": {
            "id": 13,
            "description": 'USD',
          },
        },
        "attributeValue": value,
        "attributeValueExpression": null,
        "userConversionUom": 'USD',
      }]
    }
  }

  getProducts() {
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/products/'
      )
      .then((response) => {
        this.productList = response.data.results;
        console.log('this.productList', this.productList);

        // console.log('productListproductList', this.productList);

        // this.xproductName = this.productList.map((d) => ({
        //   description: d.description,
        //   id: d.id,
        // }));
        // console.log(this.addNewProduct);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () { });
  }
  addANewProduct() {
    this.processSchema.products.push(this.productList[0]);
    console.log('this.processSchema.products', this.processSchema.products);

  }
  getAttributeValueByName(selectedProduct, attributeName) {
    const result = selectedProduct
      ? selectedProduct.productAttributeValues.find(
        (d) => d.attribute.description === attributeName
      )
      : null;
    return result ? result['attributeValue'] : '';
  }

  onProductPercentUsedChangeHandler(event: any, i: number) {
    console.log('hellll', event.target.value);
    const productPercetUsed = event.target.value;

    const selectedProduct = this.processSchema.products[i];

    if (this.isProductAttribute(selectedProduct, 'PercentUsed')) {
      this.setProductAttribute(i, 'PercentUsed', productPercetUsed);
    } else {
      this.processSchema.products[i].productAttributeValues.push(this.addPercentUsed(productPercetUsed))
    }

    const productWaste = this.getAttributeValueByName(selectedProduct, 'PercentWaste');
    const productdensity = this.getAttributeValueByName(selectedProduct, 'Density');
    const productAvgDesity = this.calculateAvgDenstiy(productPercetUsed, productWaste, productdensity);


    if (this.isProductAttribute(selectedProduct, 'AverageDensity')) {
      this.setProductAttribute(i, 'AverageDensity', productAvgDesity);
    } else {
      this.processSchema.products[i].productAttributeValues.push(this.addNewAverageDensity(productAvgDesity))
    }


    const productCost = this.getAttributeValueByName(selectedProduct, 'Cost');
    const costAddon = this.calculateAddOn(productPercetUsed, productWaste, productCost);
    if (this.isProductAttribute(selectedProduct, 'CostAddOn')) {
      this.setProductAttribute(i, 'CostAddOn', costAddon);
    } else {
      this.processSchema.products[i].productAttributeValues.push(this.addNewCostAddOn(costAddon))
    }
  }

  onProductWasteChangeHandler(event: any, i: any) {
    // this.productWaste = event.target.value;
    // console.log(event.target.value);
    // this.avgDesity = this.calculateAvgDenstiy(this.productWeight, this.productWaste, this.densityResult);

    // const price = this.getxPrice(this.selectedProducts[i])
    // this.xcostAddon = this.calculateAddOn(this.productWeight, this.productWaste, price);



    console.log('hellll', event.target.value);
    const productWaste = event.target.value;

    const selectedProduct = this.processSchema.products[i];

    if (this.isProductAttribute(selectedProduct, 'PercentWaste')) {
      this.setProductAttribute(i, 'PercentWaste', productWaste);
    } else {
      this.processSchema.products[i].productAttributeValues.push(this.addPercentWaste(productWaste))
    }

    const productPercetUsed = this.getAttributeValueByName(selectedProduct, 'PercentUsed');
    const productdensity = this.getAttributeValueByName(selectedProduct, 'Density');
    const productAvgDesity = this.calculateAvgDenstiy(productPercetUsed, productWaste, productdensity);


    if (this.isProductAttribute(selectedProduct, 'AverageDensity')) {
      this.setProductAttribute(i, 'AverageDensity', productAvgDesity);
    } else {
      this.processSchema.products[i].productAttributeValues.push(this.addNewAverageDensity(productAvgDesity))
    }


    const productCost = this.getAttributeValueByName(selectedProduct, 'Cost');
    const costAddon = this.calculateAddOn(productPercetUsed, productWaste, productCost);
    if (this.isProductAttribute(selectedProduct, 'CostAddOn')) {
      this.setProductAttribute(i, 'CostAddOn', costAddon);
    } else {
      this.processSchema.products[i].productAttributeValues.push(this.addNewCostAddOn(costAddon))
    }

  }

  setProductAttribute(i, attributeName, value) {
    const product = this.processSchema.products[i];
    for (let index = 0; index < this.processSchema.products[i].productAttributeValues.length; index++) {
      const element = this.processSchema.products[i].productAttributeValues[index];
      if (element.attribute.description === attributeName) {
        this.processSchema.products[i].productAttributeValues[index].attributeValue = value;
      }
    }
  }

  addNewAverageDensity(value) {
    return {
      "attribute": {
        // "id": 498,
        "description": "AverageDensity",
        "systemUom": {
          "id": 15,
          "description": "gm/m3"
        }
      },
      "attributeValue": value,
      "attributeValueExpression": null,
      "userConversionUom": "gm/m3"
    }
  }
  addNewCostAddOn(value) {
    return {
      "attribute": {
        "id": 498,
        "description": "CostAddOn",
        "systemUom": {
          "id": 13,
          "description": "USD"
        }
      },
      "attributeValue": value,
      "attributeValueExpression": null,
      "userConversionUom": "USD"
    }
  }

  addPercentUsed(value) {
    return {
      // "id": 145,
      "attribute": {
        // "id": 23,
        "description": "PercentUsed",
        "systemUom": {
          "id": 14,
          "description": "count"
        }
      },
      "attributeValue": value,
      "userConversionUom": null
    }
  }

  addPercentWaste(value) {
    return {
      // "id": 149,
      "attribute": {
        // "id": 26,
        "description": "PercentWaste",
        "systemUom": {
          "id": 14,
          "description": "count"
        }
      },
      "attributeValue": value,
      "userConversionUom": null
    }
  }

  isProductAttribute(selectedProduct, attributeName) {
    return selectedProduct.productAttributeValues.find(
      (d) => d.attribute.description === attributeName
    )
  }

  calculateAvgDenstiy(percetageUsed, waste, density) {
    const xpercetageUsed = percetageUsed ? parseFloat(percetageUsed) : 0;
    const xwaste = waste ? parseFloat(waste) : 0;
    const xdensity = density ? parseFloat(density) : 0;

    return (waste ? (Math.abs(xpercetageUsed - xwaste) * xdensity) / 100 : (xpercetageUsed * xdensity) / 100).toFixed(6);
  }

  calculateAddOn(percetageUsed, waste, price) {
    const xpercetageUsed = percetageUsed ? parseFloat(percetageUsed) : 0;
    console.log('xweight', xpercetageUsed);

    const xwaste = waste ? parseFloat(waste) : 0;
    console.log('xwaste', xwaste);
    const xprice = price ? parseFloat(price) : 0;
    console.log('xprice', xprice);
    return (((xpercetageUsed + xwaste) * xprice) / 100).toFixed(6);
  }

  selectConverionChangeHandler(event: any, i: number) {
    const conversionId = event.target.value;
    console.log('conversionId',conversionId);
    
    const selectedConversion =this.ConversionName.find(d=>(d.id.toString()===conversionId));
    // const cost = selectedConversion ? this.addedConversion[i].cost:''
    this.addedConversion[i] = {...selectedConversion}
    // console.log(event.target.value);
    // const selectedConversion = this.processSchema.processConversionTypes.find(d=>(d.conversionType.toString()===conversionId));

    // this.processSchema.processConversionTypes.push(this.getConversionSchema(conversionId, null));
    // this.processSchema.processConversionTypes[i] = this.ConversionName.find(
    //   (d) => d.id.toString() === event.target.value
    // );
    // this.onConversionChange.emit(this.conversionName);
  }
  EnterCostChangeHandler(event: any, i: number) {
  
    // this.enterCost = event.target.value;
    this.addedConversion[i].cost = event.target.value;
    // console.log(event.target.value);
    // this.selectedConversion[i].cost = event.target.value;
    // this.onCostChange.emit(this.enterCost);
  }

  getConversionCost(field){
    console.log('field',field);
    
    return field.cost;
  }
  

  saveProcess() {
    console.log('this.selectedProducts0000000', this.xattributesGroupAttributes);
    if (!this.xattributesGroupAttributes || this.xattributesGroupAttributes.length === 0 || !this.processName || !this.productOfProcess) {
      alert('Fill Required Field');
      return;
    }
    const payload = this.makeAddProductPayload();
    console.log('reqestpayload', JSON.stringify(payload));
    axios
      .post(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/products/',
        payload
      )
      .then((response) => {

        const view = {
          attributes: this.xattributesGroupAttributes,
          processName: this.processName,
          processNo: this.xprocessNumber,
          productOfProcess: this.productOfProcess,
          selectedProducts: this.processSchema.products,
          selectedConversion: this.addedConversion

        }
        this.createdProcessViewArray.push(view);

        this.reverseCreatedProcessViewArray = JSON.parse(JSON.stringify(this.createdProcessViewArray));
        this.reverseCreatedProcessViewArray.reverse();

        console.log(' this.createdProcessViewArray this.createdProcessViewArray', this.createdProcessViewArray);


        console.log('resssss', response.data);

        this.productList.push(response.data);
        this.previousCreatedProcess = response.data;
        this.createdProcessResponseArray.push(response.data);
        ProductTableComponent.processNumber += 1;
        this.xprocessNumber = ProductTableComponent.processNumber;
        this.processName = '';
        this.productOfProcess = '';
        // this.conversionName = '';
        // this.enterCost = '';
        // this.findSelected(this.previousCreatedProcess.description);
        this.afterSave.emit();
        this.processSchema.products=[];
        this.processSchema.products.push(response.data);
        this.addedConversion=[];
        // this.selectedProducts = [];
        // this.selectedConversion = [];
        // this.xselectedProduct = { id: response.data.id, description: '' };
        // this.fieldArray=[];
        // this.fieldArray1=[];
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () { });
  }
  makeAddProductPayload() {
    const processProducts = this.getProcessProducts();
    const processConversionTypes = this.getProcessConversionTypes();
    return {
      description: this.productOfProcess,
      businessAccount: null,
      productTemplate: null,
      process: {
        id: 1,
        description: this.processName,
        processProducts: processProducts,
        processConversionTypes: processConversionTypes,
      },
      productAttributeValues: this.xattributesGroupAttributes,
    };
  }
  getProcessProducts(){
    let processsArr = [];
    for (let index = 0; index < this.processSchema.products.length; index++) {
      const element = this.processSchema.products[index];
      processsArr.push({
        product: element.id,
        processProductAttributeValues: element.productAttributeValues,
      });
    }
    return processsArr;

  }

  xgetProcessProducts() {
    let processsArr = [];
    for (let index = 0; index < this.selectedProducts.length; index++) {
      const element = this.selectedProducts[index];
      let arr = [];
      const price = this.getxPrice(this.selectedProducts[index]);
      const weight = this.getxWeight(this.selectedProducts[index]);
      const density = this.getxDensity(this.selectedProducts[index]);
      // const avgDensdity = this.getxAvgDensity(this.selectedProducts[index]);
      // const costAddOn = this.getxCostAddOn(this.selectedProducts[index]);
      const waste = this.getxPercentWaste(this.selectedProducts[index]);


      if (price !== '') arr.push(this.getPriceAttribute(price));
      if (weight !== '') arr.push(this.getWeightAttribute(weight));
      if (density !== '') arr.push(this.getDensityAttribute(density));
      if (this.avgDesity !== '')
        arr.push(this.getAvgDensityAttribute(this.avgDesity));
      if (this.xcostAddon != '') arr.push(this.getCostAdOnAttribute(this.xcostAddon));
      if (this.productWaste !== '') arr.push(this.getAwasteAttribute(waste));

      processsArr.push({
        product: element.id,
        processProductAttributeValues: arr,
      });
    }

    return processsArr;
  }
  getProcessConversionTypes() {
    let processsArr = [];
    for (let index = 0; index < this.addedConversion.length; index++) {
      const element = this.addedConversion[index];
      let arr = [];
      const price = element.cost;

      if (price) arr.push(this.getConversionCostAttribute(price));

      processsArr.push({
        conversionType: element.id,
        processConversionAttributeValues: arr,
      });
    }

    return processsArr;
  }

  saveAllProcess() {
    console.log('dddd-------------');
    const payload = this.makeAllProcessAddProductPayload();
    console.log('dddd-------------', JSON.stringify(payload));
    axios
      .post(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/products/',
        payload
      )
      .then((response) => {
        console.log('resssss', response.data);

        // this.productList.push(response.data);
        // this.previousCreatedProcess = response.data;
        // this.createdProcessResponseArray.push(response.data);
        // ProductTableComponent.processNumber += 1;
        // this.xprocessNumber = ProductTableComponent.processNumber;
        // this.processName = '';
        // this.productOfProcess = '';
        // this.conversionName = '';
        // this.enterCost = '';
        // this.findSelected(this.previousCreatedProcess.description);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () { });
  }
  makeAllProcessAddProductPayload() {
    const processProducts = this.getProcessProducts();
    const processConversionTypes = this.getProcessConversionTypes();
    const modifiedAsSchema = this.updateSchemaProduct();
    return {
      description: this.productOfProcess,
      businessAccount: null,
      productTemplate: null,
      process: {
        id: 1,
        description: this.processName,
        processProducts: [...processProducts, ...modifiedAsSchema],
        processConversionTypes: processConversionTypes,
      },
      productAttributeValues: this.xattributesGroupAttributes,
    };
  }
  



























  getxPrice(selectedProduct) {
    const result = selectedProduct
      ? selectedProduct.productAttributeValues.find(
        (d) => d.attribute.description === 'Cost'
      )
      : null;
    return result ? result['attributeValue'] : '';
  }

  tables = [0];
  xproductName = [];
  selectProductName;
  xselectCost = '';
  xselectDensity = '';
  ConversionName;
  productWeight;
  productWaste = '';
  conversionName;
  enterCost;
  static processNumber = 1;

  selectedProductNameIndex = 0;
  previousCreatedProcess = { description: '' };
  densityResult;
  avgDesity = '';
  xcostAddon = '';

  createdProcess
  xselectedProduct = { id: 1, description: '' };



  @Output() onProcessNameChange: EventEmitter<number> = new EventEmitter();
  @Output() onProcessNumberChange: EventEmitter<number> = new EventEmitter();
  @Output() onConversionChange: EventEmitter<number> = new EventEmitter();
  @Output() onCostChange: EventEmitter<number> = new EventEmitter();
  @Output() afterSave: EventEmitter<number> = new EventEmitter();

  public fieldArray: Array<any> = [];
  public createdProcessResponseArray: Array<any> = [];
  public selectedProducts: Array<any> = [];
  public selectedConversion: Array<any> = [];
  public newAttribute: any = {};
  addFieldValue() {
    this.fieldArray.push(this.productList);
    this.newAttribute = {};
  }
  public newAttribute1: any = {};






  

  getPriceAttribute(value) {
    return {
      attribute: {
        description: 'Cost',
        systemUom: {
          id: 13,
          description: 'USD',
        },
      },
      attributeValue: value,
      attributeValueExpression: null,
      userConversionUom: 'USD',
    };
  }

  getWeightAttribute(weight) {
    return {
      attribute: {
        description: 'Weight',
        systemUom: {
          id: 7,
          description: 'gm',
        },
      },
      attributeValue: weight,
      attributeValueExpression: null,
      userConversionUom: 'mt',
    };
  }

  getDensityAttribute(value) {
    return {
      attribute: {
        description: 'Density',
        systemUom: {
          id: 15,
          description: 'gm/m3',
        },
      },
      attributeValue: value,
      attributeValueExpression: null,
      userConversionUom: 'gm/m3',
    };
  }

  getAvgDensityAttribute(value) {
    return {
      attribute: {
        description: 'AverageDensity',
        systemUom: {
          id: 15,
          description: 'gm/m3',
        },
      },
      attributeValue: value,
      attributeValueExpression: null,
      userConversionUom: 'gm/m3',
    };
  }

  getAwasteAttribute(value) {
    return {
      attribute: {
        description: 'PercentWaste',
        systemUom: {
          id: 14,
          description: 'count',
        },
      },
      attributeValue: value,
      attributeValueExpression: null,
      userConversionUom: 'count',
    };
  }

  getCostAdOnAttribute(value) {
    return {
      attribute: {
        description: 'CostAddOn',
        systemUom: {
          id: 13,
          description: 'USD',
        },
      },
      attributeValue: value,
      attributeValueExpression: null,
      userConversionUom: 'USD',
    };
  }

 

 

  

  

  updateSchemaProduct() {
    return this.createdProcessResponseArray.map(d => (
      { product: d.id, processProductAttributeValues: d.productAttributeValues }
    ))
  }

  // makeAddProcessPayload() {
  //   return {
  //     description: this.processName,
  //     processProducts: [
  //       {
  //         product: this.xprocessNumber,
  //         processProductAttributeValues: this.xattributesGroupAttributes,
  //       },
  //     ],
  //     processConversionTypes: [
  //       {
  //         conversionType: this.conversionName,
  //         processConversionAttributeValues: [
  //           {
  //             attribute: {
  //               id: 17,
  //               description: 'Cost',
  //             },
  //             attributeValue: this.enterCost,
  //           },
  //         ],
  //       },
  //     ],
  //     processCalculator: null,
  //   };
  // }

  findSelected(description) {
    for (let index = 0; index < this.productList.length; index++) {
      const element = this.productList[index];
      if (element.description === description) {
        this.selectedProducts[index] = element;
      }
    }
  }

  

  

  // ==========================  Event Handler ===================





  

  // ======================= Product Get API ======================================





  getxWeight(selectedProduct) {
    console.log('selectedProduct', selectedProduct);

    const result = selectedProduct
      ? selectedProduct.productAttributeValues.find(
        (d) => d.attribute.description === 'Weight'
      )
      : null;
    return result ? result['attributeValue'] : '';
  }

  getxDensity(selectedProduct) {
    const result = selectedProduct
      ? selectedProduct.productAttributeValues.find(
        (d) => d.attribute.description === 'Density'
      )
      : null;
    this.densityResult = result ? result['attributeValue'] : '';
    console.log('this is density result', this.densityResult);
    return result ? result['attributeValue'] : '';
  }

  getxAvgDensity(selectedProduct) {
    console.log('selectedProduct', selectedProduct);

    const result = selectedProduct
      ? selectedProduct.productAttributeValues.find(
        (d) => d.attribute.description === 'AverageDensity'
      )
      : null;
    return result ? result['attributeValue'] : '';
  }

  getxCostAddOn(selectedProduct) {
    const result = selectedProduct
      ? selectedProduct.productAttributeValues.find(
        (d) => d.attribute.description === 'CostAddOn'
      )
      : null;
    return result ? result['attributeValue'] : '';
  }

  getxPercentWaste(selectedProduct) {
    const result = selectedProduct
      ? selectedProduct.productAttributeValues.find(
        (d) => d.attribute.description === 'PercentWaste'
      )
      : null;
    return result ? result['attributeValue'] : '';
  }


  addData() {
    if (this.selectedProducts && this.productList) {
      this.selectedProducts.push(this.productList[0]);
      console.log('this.selectedProductsthis.selectedProducts----', this.productList[0]);
    }

    // const selectedProduct = this.xproductName[0];
    // this.getxPrice(selectedProduct.description);
    // this.getxDensity(selectedProduct.description);
  }

  // ========================== Conversion Cost API ===================

  

  // ============================= Process Post Api ========================

  ProcessPost(payload) {
    console.log('ProcessPostAPi Is called');
    axios
      .post(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/processes/',
        payload
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log('Process post API is successfully Called:');
  }
}
