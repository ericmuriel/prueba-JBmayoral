import React, { createContext, useState } from 'react'
import { initialValue } from './InitialValues';
import { GenericContextValue, Product } from './type';

export const GenericContext = createContext<GenericContextValue>(initialValue)

export default function GenericContextProvider({ children }: any) {
    const [data, setData] = useState<Product[]>([]);
    const [columns, setColumns] = useState<number>(4);
    const [sortOrder, setSortOrder] = useState<string>('desc');
    const [searchReference, setSearchReference] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');


    const contextValue: GenericContextValue = {
        data,
        setData,
        columns,
        setColumns,
        sortOrder, 
        setSortOrder,
        searchReference, 
        setSearchReference,
        products,
        setProducts,
        searchTerm,
        setSearchTerm
    }

    return (
        <GenericContext.Provider value={contextValue}>
            {children}
        </GenericContext.Provider>)
}