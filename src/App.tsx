import s from './App.module.scss'
import { AppStateType, store } from './redux/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { actions, onGetAllCurrencies, onGetRate } from './redux/currenciesReducer'
import { useEffect } from 'react'
import { Preloader } from './components/Common/Preloader/Preloader'
import { CurrencyForm } from './components/CurrencyForm/CurrencyForm'

export const App: React.FC = () => {
  const isFetching = useSelector((state: AppStateType) => state.currencies.isFetching)
  const allCurrencies = useSelector((state: AppStateType) => state.currencies.allCurrencies)
  const rate = useSelector((state: AppStateType) => state.currencies.rate)

  const dispatch = useDispatch()

  const setFirstCurrency = (value: string) => { dispatch(actions.setFirstCurrency(value)) }
  const setSecondCurrency = (value: string) => { dispatch(actions.setSecondCurrency(value)) }

  useEffect(() => {
    dispatch(onGetAllCurrencies())
  }, [dispatch])

  const getRate = () => { dispatch(onGetRate()) }

  return allCurrencies.length === 0 ? <Preloader /> :
    <div className={s.app}>
      <CurrencyForm allCurrencies={allCurrencies} first={setFirstCurrency} second={setSecondCurrency} getRate={getRate} />
      {rate !== null ? <p>{rate}</p> : ''}
    </div>
}

export const CurrenciesApp: React.FC = () => {
  return <Provider store={store}>
    <App />
  </Provider>
}