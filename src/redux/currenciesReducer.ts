import { api } from "../api"
import { CurrencyType } from "../types"
import { BaseThunkType, InferActionsTypes } from "./store"

const initialState = {
    // Common
    isFetching: false,
    isSubFetching: false,
    // Main
    allCurrencies: [] as Array<CurrencyType>,
}

export const currenciesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        // Common
        case 'C/CURRENCIES/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'C/CURRENCIES/TOGGLE_IS_SUB_FETCHING':
            return {
                ...state,
                isSubFetching: action.isSubFetching
            }
        // Main
        case 'C/CURRENCIES/SET_ALL_CURRENCIES':
            return {
                ...state,
                allCurrencies: action.allCurrencies
            }
        default: return state
    }
}

export const actions = {
    // Common
    setIsFetching: (isFetching: boolean) => ({ type: 'C/CURRENCIES/TOGGLE_IS_FETCHING', isFetching } as const),
    setIsSubFetching: (isSubFetching: boolean) => ({ type: 'C/CURRENCIES/TOGGLE_IS_SUB_FETCHING', isSubFetching } as const),
    // Search
    setAllCurrencies: (allCurrencies: Array<CurrencyType>) => ({ type: 'C/CURRENCIES/SET_ALL_CURRENCIES', allCurrencies } as const),
}

// Search
export const onGetAllCurrencies = (): ThunkType => async dispatch => {
    dispatch(actions.setIsFetching(true))
    const currenciesData = await api.getAllCurrencies()
    dispatch(actions.setIsFetching(false))

    dispatch(actions.setAllCurrencies(currenciesData.results))
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>