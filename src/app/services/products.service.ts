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


  //creation de la methode qui permet de selectionner les produits selectionnés
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
}
