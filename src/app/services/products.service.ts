import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  //creation de methode getAllproducts() pour consulter la liste des produits produits
  //La methode getAllproducts() retourne un objet de type Observable(tableau de produit)
  getAllproducts():Observable<Product[]>{
    let host=(Math.random()>0.2)?environment.host:environment.unreachableHost;
    return this.http.get<Product[]>(host+"/products")
  }


  //creation de la methode qui permet de recuperer les produits selectionnés
  //La methode getSelectedProducts() selectionne un objet de type Observable
  getSelectedProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?selected=true");
  }


  getAvailableProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?available=true");
  }

  onSearchProducts(keyword:string):Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?name_like="+ keyword);
  }

  select(product:Product):Observable<Product>{
    let host=environment.host;
    product.selected=!product.selected;
    return this.http.put<Product>(host+"/products/"+product.id,product);
  }

  deleteProduct(product:Product):Observable<void>{
    let host=environment.host;
    product.selected=!product.selected;
    return this.http.delete<void>(host+"/products/"+product.id);
  }
}
