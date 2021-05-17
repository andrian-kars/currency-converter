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
  const amount = useSelector((state: AppStateType) => state.currencies.amount)
  const firstCurrency = useSelector((state: AppStateType) => state.currencies.firstCurrency)
  const secondCurrency = useSelector((state: AppStateType) => state.currencies.secondCurrency)

  const dispatch = useDispatch()

  const setFirstCurrency = (value: string) => { dispatch(actions.setFirstCurrency(value)) }
  const setSecondCurrency = (value: string) => { dispatch(actions.setSecondCurrency(value)) }
  const setAmount = (amount: number) => { dispatch(actions.setAmount(amount)) }

  useEffect(() => {
    dispatch(onGetAllCurrencies())
  }, [dispatch])

  const getRate = (first: string, second: string) => { dispatch(onGetRate(first, second)) }

  return allCurrencies.length === 0 ? <Preloader /> :
    <div className={s.app}>
      <div className={s.formWhrapper}>
        <input className={s.amount} type="number" min="1" max="999999" value={amount} onChange={(e) => { setAmount(+e.currentTarget.value) }} />
        <CurrencyForm allCurrencies={allCurrencies} first={setFirstCurrency} second={setSecondCurrency} getRate={getRate} />
      </div>
      {isFetching ? <Preloader /> : <div className={s.infoWhrapper}>
        {rate === null
          ? <p>Press get to see currency</p>
          : <p className={s.info}>{amount} {firstCurrency} = {Math.round(amount * rate * 100) / 100} {secondCurrency}</p>
        }
      </div>}
    </div>
}

export const CurrenciesApp: React.FC = () => {
  return <Provider store={store}>
    <App />
  </Provider>
}