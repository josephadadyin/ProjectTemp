import { Component, EventEmitter, Input, OnInit, Output,ChangeDetectorRef  } from '@angular/core';
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
    "selectedAttributes": {"id":"","description":"", "attributesGroupAttributes":[]},
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
    "conversionCost": [
      {
        "name": "",
        "id": "",
        "cost": ""
      }
    ]
  }
  
  xprocessNumber;
  processName;
  productOfProcess;
  productList;
  selectedProductFromDropDown;



  
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
    const selectedProduct = this.productList.find(
        (d) => d.id.toString() === event.target.value
      );      
      this.processSchema.products[index] = selectedProduct;
  }

  getProducts() {
    axios
      .get(
        'https://dadyin-product-server-7b6gj.ondigitalocean.app/api/products/'
      )
      .then((response) => {
        this.productList = response.data.results;
        console.log('this.productList',this.productList);
        
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
  addANewProduct(){
    this.processSchema.products.push(this.productList[0]);
    console.log('this.processSchema.products',this.processSchema.products);
    
  }
  getAttributeValueByName(selectedProduct,attributeName) {  
    const result = selectedProduct
      ? selectedProduct.productAttributeValues.find(
        (d) => d.attribute.description === attributeName
      )
      : null;
    return result ? result['attributeValue'] : '';
  }
  onProductWeightChangeHandler(event: any, i: number) {
    console.log('hellll', event.target.value);

    this.productWeight = event.target.value;
    // let data = this.fieldArray[i];
    // data['weight'] = this.productWeight;
    // data['avgDensity'] = (
    //   data.waste
    //     ? (Math.abs(this.productWeight - data.waste) * data.density) / 100
    //     : (this.productWeight * data.density) / 100
    // ).toFixed(6);
    // this.fieldArray[i] = data;

    // this.avgDesity = (
    //   this.productWaste
    //     ? (Math.abs(this.productWeight - this.productWaste) *
    //       this.densityResult) /
    //     100
    //     : (this.productWeight * this.densityResult) / 100
    // ).toFixed(6);

    this.avgDesity = this.calculateAvgDenstiy(this.productWeight,this.productWaste,this.densityResult);

    const price = this.getxPrice(this.selectedProducts[i])
    this.xcostAddon = this.calculateAddOn(this.productWeight,this.productWaste,price);

    if (this.selectedProducts[i]) {
      for (
        let index = 0;
        index < this.selectedProducts[i].productAttributeValues.length;
        index++
      ) {
        const element = this.selectedProducts[i].productAttributeValues[index];
        if (element.attribute.description === 'Weight') {
          this.selectedProducts[i].productAttributeValues[index].attributeValue =
            event.target.value;
        }
      }
    }
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
  productWaste='';
  conversionName;
  enterCost;
  static processNumber = 1;
  
  selectedProductNameIndex = 0;
  previousCreatedProcess = { description: '' };
  densityResult;
  avgDesity='';
  xcostAddon='';

  createdProcess
  xselectedProduct = { id: 1, description: '' };


  
  @Output() onProcessNameChange: EventEmitter<number> = new EventEmitter();
  @Output() onProcessNumberChange: EventEmitter<number> = new EventEmitter();
  @Output() onConversionChange: EventEmitter<number> = new EventEmitter();
  @Output() onCostChange: EventEmitter<number> = new EventEmitter();
  @Input() xattributesGroupAttributes = [];
  @Output() afterSave: EventEmitter<number> = new EventEmitter();

  public fieldArray: Array<any> = [];
  public createdProcessResponseArray: Array<any> = [];
  public createdProcessViewArray: Array<any> = [];
  public selectedProducts: Array<any> = [];
  public selectedConversion: Array<any> = [];
  public newAttribute: any = {};
  addFieldValue() {
    this.fieldArray.push(this.productList);
    this.newAttribute = {};
  }
  public fieldArray1: Array<any> = [];
  public newAttribute1: any = {};
  addFieldValue1() {
    this.fieldArray1.push(this.ConversionName);
    this.newAttribute1 = {};
    this.selectedConversion.push(this.ConversionName[0]);
    console.log('this.selectedConversion', this.selectedConversion);

  }

  calculateAvgDenstiy(weight,waste,density){
    const xweight = weight ? parseFloat(weight) : 0;
    const xwaste = waste ? parseFloat(waste) : 0;
    const xdensity = density ? parseFloat(density): 0;

    return (waste? (Math.abs(xweight- xwaste) * xdensity)/100: (xweight * xdensity)/100).toFixed(6);
  }

  calculateAddOn(weight,waste,price){
    const xweight = weight ? parseFloat(weight) : 0;
    console.log('xweight',xweight);
    
    const xwaste = waste ? parseFloat(waste) : 0;
    console.log('xwaste',xwaste);
    const xprice = price ? parseFloat(price): 0;
    console.log('xprice',xprice);
    return (((xweight + xwaste)*xprice)/100).toFixed(6);   
  }

  getProcessProducts() {
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

  getProcessConversionTypes() {
    let processsArr = [];
    for (let index = 0; index < this.selectedConversion.length; index++) {
      const element = this.selectedConversion[index];
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

  saveProcess() {
    console.log('this.selectedProducts0000000', this.selectedProducts);
    if (!this.xattributesGroupAttributes || this.xattributesGroupAttributes.length === 0 || !this.processName || !this.productOfProcess) {
      alert('Fill Required Field');
      return;
    }
    const payload = this.makeAddProductPayload();
    console.log('dddd', JSON.stringify(payload));
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
          selectedProducts: this.selectedProducts,
          selectedConversion: this.selectedConversion

        }
        this.createdProcessViewArray.push(view);

        console.log(' this.createdProcessViewArray this.createdProcessViewArray', this.createdProcessViewArray);


        console.log('resssss', response.data);

        this.productList.push(response.data);
        this.previousCreatedProcess = response.data;
        this.createdProcessResponseArray.push(response.data);
        ProductTableComponent.processNumber += 1;
        this.xprocessNumber = ProductTableComponent.processNumber;
        this.processName = '';
        this.productOfProcess = '';
        this.conversionName = '';
        this.enterCost = '';
        // this.findSelected(this.previousCreatedProcess.description);
        this.afterSave.emit();
        this.selectedProducts = [];
        this.selectedConversion = [];
        this.xselectedProduct = { id: response.data.id, description: '' };
        // this.fieldArray=[];
        // this.fieldArray1=[];
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () { });
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

  // ==========================  Event Handler ===================
  
  ProductWasteChangeHandler(event: any, i: any) {
    this.productWaste = event.target.value;
    console.log(event.target.value);
    this.avgDesity = this.calculateAvgDenstiy(this.productWeight,this.productWaste,this.densityResult);

    const price = this.getxPrice(this.selectedProducts[i])
    this.xcostAddon = this.calculateAddOn(this.productWeight,this.productWaste,price);
    // this.productWaste = event.target.value;
    // let data = this.fieldArray[i];
    // data['waste'] = this.productWaste;
    // data['avgDensity'] = (
    //   this.productWeight
    //     ? (Math.abs(this.productWaste - this.productWeight) *
    //         this.densityResult) /
    //       100
    //     : (this.productWaste * this.densityResult) / 100
    // ).toFixed(6);
    // this.fieldArray[i] = data;

    // this.avgDesity = (
    //   this.productWeight
    //     ? (Math.abs(this.productWaste - this.productWeight) *
    //         this.densityResult) /
    //       100
    //     : (this.productWaste * this.densityResult) / 100
    // ).toFixed(6);
  }

 
  
  selectConverionChangeHandler(event: any, i: number) {
    this.conversionName = event.target.value;
    console.log(event.target.value);
    this.selectedConversion[i] = this.conversionName.find(
      (d) => d.id.toString() === event.target.value
    );
    this.onConversionChange.emit(this.conversionName);
  }
  EnterCostChangeHandler(event: any, i: number) {
    this.enterCost = event.target.value;
    console.log(event.target.value);
    this.selectedConversion[i].cost = event.target.value;
    this.onCostChange.emit(this.enterCost);
  }

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

  // saveProcess() {
  //   console.log('SaveProcess function is called:');
  //   this.ProcessPost({
  //     description: this.processName,
  //     processProducts: [
  //       {
  //         product: this.productOfProcess,
  //         processProductAttributeValues: [
  //           {
  //             attribute: { description: this.selectProductName },
  //             attributeValue: null,
  //           },
  //         ],
  //         processConversionTypes: [
  //           {
  //             processConversionAttributeValues: [
  //               {
  //                 attribute: { description: this.conversionName },
  //                 attributeValue: this.enterCost,
  //               },
  //             ],
  //           },
  //         ],
  //         processCalculator: [null],
  //       },
  //     ],
  //   });
  // }
}
