//les models sont utilisés pour gérer les produits

export interface Product{
  id:number;
  name:string;
  price:number;
  quantity:number;
  selected:boolean;
  available:boolean
}
