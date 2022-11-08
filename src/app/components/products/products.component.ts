import { AppDataState, DataStateEnum } from './../../state/product.state';
import { Observable } from 'rxjs/internal/Observable';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { catchError, map, of, startWith } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //on declare l'attribut 'products' de type observable qui represente un tableau de produit
  products$!:Observable<AppDataState<Product[]>>;
  /*lorqu'on met le $ dans la variable c'est pour signifier que qu'on doit faire
   subscribe pour pouvoir recuperer les données si elles arrivent.
  */
  readonly DataStateEnum=DataStateEnum;
  //injection de product.service.ts dans le constructor
  constructor(private ProductsService:ProductsService) { }

  ngOnInit(): void {
  }

  //la fonction onGetAllProducts() va permettre d'afficher la liste des produits
  onGetAllProducts(){
    this.products$= this.ProductsService.getAllproducts().pipe(
      map(data=>{
        console.log(data);
        return ({DataState:DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetSelectedProducts(){
    this.products$= this.ProductsService.getSelectedProducts().pipe(
      map(data=>{
        console.log(data);
        return ({DataState:DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetAvailableProducts(){
    this.products$= this.ProductsService.getAvailableProducts().pipe(
      map(data=>{
        console.log(data);
        return ({DataState:DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch(dataForm: any){
    this.products$= this.ProductsService.onSearchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data);
        return ({DataState:DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
}
