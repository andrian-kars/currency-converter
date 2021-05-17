import { Action, applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { currenciesReducer } from './currenciesReducer'

const rootReducer = combineReducers({
    currencies: currenciesReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
// @ts-ignore
window.__store__ = store

type RootReducerType = typeof rootReducer // (globalstate: GLOBALSTATE) => GLOBALSTATE
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>