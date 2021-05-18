import { api } from "../api"
import { BaseThunkType, InferActionsTypes } from "./store"

const initialState = {
    // Common
    isFetching: false,
    // Main
    firstCurrency: '',
    secondCurrency: 'UAH',
    rate: null as null | number,
    amount: 1
}

export const listReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        // Common
        case 'C/LIST/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        // Main
        case 'C/LIST/SET_FIRST_CURRENCY':
            return {
                ...state,
                firstCurrency: action.firstCurrency
            }
        case 'C/LIST/SET_RATE':
            return {
                ...state,
                rate: action.rate
            }
        case 'C/LIST/SET_AMOUNT':
            return {
                ...state,
                amount: action.amount
            }
        default: return state
    }
}

export const actions = {
    // Common
    setIsFetching: (isFetching: boolean) => ({ type: 'C/LIST/TOGGLE_IS_FETCHING', isFetching } as const),
    // Main
    setFirstCurrency: (firstCurrency: string) => ({ type: 'C/LIST/SET_FIRST_CURRENCY', firstCurrency } as const),
    setRate: (rate: number) => ({ type: 'C/LIST/SET_RATE', rate } as const),
    setAmount: (amount: number) => ({ type: 'C/LIST/SET_AMOUNT', amount } as const),
}

export const onGetRate = (first: string): ThunkType => async (dispatch, getState) => {
    const second = getState().list.secondCurrency
    dispatch(actions.setIsFetching(true))
    dispatch(actions.setFirstCurrency(first))
    const rateData = await api.getRate(first, second)
    dispatch(actions.setRate(Object.values(rateData)[0] as number))

    dispatch(actions.setIsFetching(false))
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>