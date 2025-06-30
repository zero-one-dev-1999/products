import { createSlice } from "@reduxjs/toolkit"

type OrNull<T> = T | null

interface IProduct {
    id: number
    description: string
    barcode: string
    name: string
    productName: string
    properties: Array<{name: string, value: string}>
    productProperties: Array<{name: string, value: string}>
    stocks: Array<{
        count: number
        sellPrice: {
            UZS: number
            USD: number
            first: string
        }
    }>
    unit: string
    supplier: string
    sku: string
    shortDescription: string
}

interface IState {
    data: IProduct[],
    loading: boolean,
    error: OrNull<string>,
    page: OrNull<number>
    total_count: OrNull<number>
}

const initialState: IState = {
    data: [],
    loading: false,
    error: null,
    page: null,
    total_count: null
}

const { actions, reducer } = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, {payload}) {
            state.data = payload
        },
        setPage(state, {payload}) {
            state.page = payload
        },
        setTotalCount(state, {payload}) {
            state.total_count = payload
        },
        setLoading(state, {payload}) {
            state.loading = payload
        },
        setError(state, {payload}) {
            state.error = payload
        }
    }
})

export { reducer as default, actions as productsActions }
export type {IProduct}