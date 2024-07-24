import { Dispatch, SetStateAction } from "react";

  export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }

export interface GenericContextValue{
    data: Product[],
    setData: Dispatch<SetStateAction<Product[]>>
    columns:number ,
    setColumns: Dispatch<SetStateAction<number>>,
    sortOrder: string;
    setSortOrder: React.Dispatch<React.SetStateAction<string>>;
    searchReference: string;
    setSearchReference: React.Dispatch<React.SetStateAction<string>>;
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    searchTerm: string,
    setSearchTerm:React.Dispatch<React.SetStateAction<string>>;
    
}
