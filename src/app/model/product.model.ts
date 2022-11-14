//les models sont utilisés pour gérer les produits(ou des objets)

export interface Product{
  id:number;
  name:string;
  price:number;
  quantity:number;
  selected:boolean;
  available:boolean
}
