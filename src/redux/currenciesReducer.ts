import { api } from "../api"
import { CurrencyType } from "../types"
import { BaseThunkType, InferActionsTypes } from "./store"

const initialState = {
    // Common
    isFetching: false,
    // Main
    allCurrencies: [] as Array<CurrencyType>,
    firstCurrency: '',
    secondCurrency: '',
    rate: null as null | number,
    amount: 1
}

export const currenciesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        // Common
        case 'C/CURRENCIES/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        // Main
        case 'C/CURRENCIES/SET_ALL_CURRENCIES':
            return {
                ...state,
                allCurrencies: action.allCurrencies
            }
        case 'C/CURRENCIES/SET_FIRST_CURRENCY':
            return {
                ...state,
                firstCurrency: action.firstCurrency
            }
        case 'C/CURRENCIES/SET_SECOND_CURRENCY':
            return {
                ...state,
                secondCurrency: action.secondCurrency
            }
        case 'C/CURRENCIES/SET_RATE':
            return {
                ...state,
                rate: action.rate
            }
        case 'C/CURRENCIES/SET_AMOUNT':
            return {
                ...state,
                amount: action.amount
            }
        default: return state
    }
}

export const actions = {
    // Common
    setIsFetching: (isFetching: boolean) => ({ type: 'C/CURRENCIES/TOGGLE_IS_FETCHING', isFetching } as const),
    // Main
    setAllCurrencies: (allCurrencies: Array<CurrencyType>) => ({ type: 'C/CURRENCIES/SET_ALL_CURRENCIES', allCurrencies } as const),
    setFirstCurrency: (firstCurrency: string) => ({ type: 'C/CURRENCIES/SET_FIRST_CURRENCY', firstCurrency } as const),
    setSecondCurrency: (secondCurrency: string) => ({ type: 'C/CURRENCIES/SET_SECOND_CURRENCY', secondCurrency } as const),
    setRate: (rate: number) => ({ type: 'C/CURRENCIES/SET_RATE', rate } as const),
    setAmount: (amount: number) => ({ type: 'C/CURRENCIES/SET_AMOUNT', amount } as const),
}

export const onGetAllCurrencies = (): ThunkType => async dispatch => {
    dispatch(actions.setIsFetching(true))
    const currenciesData = await api.getAllCurrencies()
    dispatch(actions.setAllCurrencies(Object.values(currenciesData.results)))
    dispatch(actions.setIsFetching(false))
}

export const onGetRate = (first: string, second: string): ThunkType => async dispatch => {
    dispatch(actions.setIsFetching(true))
    dispatch(actions.setFirstCurrency(first))
    dispatch(actions.setSecondCurrency(second))
    const rateData = await api.getRate(first, second)
    dispatch(actions.setRate(Object.values(rateData)[0] as number))

    dispatch(actions.setIsFetching(false))
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>