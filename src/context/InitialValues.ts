import { GenericContextValue } from "./type";

export const initialValue: GenericContextValue = {
    data: [],
    setData: () => {[]},
    columns:4,
    setColumns:() => {4},
    sortOrder: 'asc',
    setSortOrder: () => {'asc'},
    searchReference: '',
    setSearchReference: () => {''},
    products:[],
    setProducts: () => {[]},
    searchTerm: '',
    setSearchTerm: () => {''},
}