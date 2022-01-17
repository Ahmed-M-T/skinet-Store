import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
@ViewChild('search',{static:false}) private  searchTerm!:ElementRef;
  products:IProduct[]=null!;
  brands:IBrand[]=null!;
  types:IType[]=null!;
  shopParams =new ShopParams();
  totalCount=0;
  sortOptions=[
    {name:'Alphabetical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: High to Low',value:'priceDesc'},
  ];
  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
    
  }
  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
    next:(response=>{
      if(response){
      this.products =response.data;
      this.shopParams.pageNubmer=response.pageIndex;
      this.shopParams.pageSize=response.pageSize;
      this.totalCount =response.count;
      
    }

    }),
    error:(err=>console.log(err))
  });
}

getBrands(){
  this.shopService.getBrands().subscribe({
  next:(response=>{
    this.brands =[{id:0,name:'All'},...response];
  }),
  error:(err=>console.log(err))
});
}

getTypes(){
  this.shopService.getTypes().subscribe({
  next:(response=>{
    this.types =[{id:0,name:'All'},...response];
  }),
  error:(err=>console.log(err))
});
}
onBrandSelected(brandId:number){
  this.shopParams.brandId=brandId;
  this.getProducts();

}
onTypeSelected(typeId:number){
  this.shopParams.typeId=typeId;
  this.shopParams.pageNubmer=1;
  this.getProducts();
}
onSortSelected(sort:string){
  this.shopParams.sort=sort;
  this.shopParams.pageNubmer=1;
  this.getProducts();
}
onPageChanged(event:any){
  if(this.shopParams.pageNubmer !== event){
  this.shopParams.pageNubmer=event;
  this.getProducts();    }
}
onSearch(){
  this.shopParams.search=this.searchTerm.nativeElement.value;
  this.shopParams.pageNubmer=1;
  this.getProducts();
}
onReset(){
  this.searchTerm.nativeElement.value='';
this.shopParams= new ShopParams();
this.getProducts();

}
}
