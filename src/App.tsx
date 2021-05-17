import './App.css'
import { AppStateType, store } from './redux/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { onGetAllCurrencies } from './redux/currenciesReducer'
import { useEffect } from 'react'

export const App: React.FC = () => {
  const allCurrencies = useSelector((state: AppStateType) => state.currencies.allCurrencies)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onGetAllCurrencies())
  }, [dispatch])

  console.log(allCurrencies);

  return (
    <div className="App">

    </div>
  )
}

export const CurrenciesApp: React.FC = () => {
  return <Provider store={store}>
    <App />
  </Provider>
}