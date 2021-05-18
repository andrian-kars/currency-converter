import s from './App.module.scss'
import { AppStateType, store } from './redux/store'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { onGetAllCurrencies } from './redux/currenciesReducer'
import { useEffect } from 'react'
import { Preloader } from './components/Common/Preloader/Preloader'
import { Current } from './components/Current/Current'
import { List } from './components/List/List'
import { Header } from './components/Header/Header'

export const App: React.FC = () => {
  const allCurrencies = useSelector((state: AppStateType) => state.currencies.allCurrencies)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onGetAllCurrencies())
  }, [dispatch])

  return <div className={s.app}>
    {allCurrencies.length === 0 ? <Preloader /> : <>
      <Header />
      <main className={s.main}>
        <Switch>
          <Route path="/current" render={() => <Current />} />
          <Route path="/list" render={() => <List />} />
          <Route exact path="*" render={() => <Redirect to={'/current'} />} />
        </Switch>
      </main>
    </>}
  </div>
}

export const CurrenciesApp: React.FC = () => {
  return <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
}