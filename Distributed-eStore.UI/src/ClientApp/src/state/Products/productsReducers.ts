﻿import { ReduxAction } from '../';
import { IProduct, IProductsListState, ProductsActionTypes } from './productsTypes';

const initialState: IProductsListState = {
    productIDsToProductsMap: {},
    selectedProduct: {} as IProduct
};

export const reducer = (state: IProductsListState = initialState, incomingAction: ReduxAction): IProductsListState => {
    const action = incomingAction as ReduxAction;

    switch (action.type) {
        case ProductsActionTypes.REQUEST_ALL_ARRIVAL:
            const { products } = action;

            return {
                ...state,
                productIDsToProductsMap: products.reduce((acc, product) => {
                    acc[product.id] = product;
                    return acc;
                }, {}),
            };
        case ProductsActionTypes.SELECT_PRODUCT_COLOR:
            {
                const { productId, colorIndex } = action;
                const product = state.productIDsToProductsMap[productId];

                if (product && product.selectedColorIndex !== colorIndex && typeof product.colors[colorIndex] !== "undefined") {

                    return {
                        ...state,
                        productIDsToProductsMap: {
                            ...state.productIDsToProductsMap,
                            [productId]: {
                                ...state.productIDsToProductsMap[productId],
                                selectedColorIndex: colorIndex
                            }
                        }
                    }
                }
            }
        case ProductsActionTypes.REQUEST_BY_ID_ARRIVAL:
            {
                const { product } = action;

                if (product) {
                    return {
                        ...state,
                        selectedProduct: product
                    }
                }
            }
        default:
            return state;
    }
};