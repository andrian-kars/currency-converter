import './App.css'
import { AppStateType, store } from './redux/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { onGetAllCurrencies } from './redux/currenciesReducer'
import { useEffect } from 'react'
import { Preloader } from './components/Common/Preloader/Preloader'

export const App: React.FC = () => {
  const isFetching = useSelector((state: AppStateType) => state.currencies.isFetching)
  const allCurrencies = useSelector((state: AppStateType) => state.currencies.allCurrencies)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onGetAllCurrencies())
  }, [dispatch])

  return isFetching ? <Preloader /> :
    <div className="App">
      {allCurrencies.map(el => <div key={el.id}>{el.currencyName}</div>)}
    </div>
}

export const CurrenciesApp: React.FC = () => {
  return <Provider store={store}>
    <App />
  </Provider>
}