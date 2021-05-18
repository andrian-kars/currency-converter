import s from './Current.module.scss'
import { AppStateType } from './../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { actions, onGetAllCurrencies, onGetRate } from './../../redux/currenciesReducer'
import { memo, useEffect } from 'react'
import { Preloader } from './../Common/Preloader/Preloader'
import { CurrencyForm } from './CurrencyForm'

export const Current: React.FC = memo(() => {
    const isFetching = useSelector((state: AppStateType) => state.currencies.isFetching)
    const allCurrencies = useSelector((state: AppStateType) => state.currencies.allCurrencies)
    const rate = useSelector((state: AppStateType) => state.currencies.rate)
    const amount = useSelector((state: AppStateType) => state.currencies.amount)
    const firstCurrency = useSelector((state: AppStateType) => state.currencies.firstCurrency)
    const secondCurrency = useSelector((state: AppStateType) => state.currencies.secondCurrency)

    const dispatch = useDispatch()

    const setAmount = (amount: number) => {
        dispatch(actions.setAmount(amount))
        localStorage.setItem('currentAmount', `${amount}`)
    }

    useEffect(() => {
        if (allCurrencies.length === 0) {
            dispatch(onGetAllCurrencies())
        }
    }, [dispatch, allCurrencies])

    const getRate = (first: string, second: string) => { dispatch(onGetRate(first, second)) }

    const localCurrentCurrencies = localStorage.getItem('currentCurrencies')
    const localCurrentAmount = localStorage.getItem('currentAmount')

    // LocalStorage
    useEffect(() => {
        if (localCurrentCurrencies === null) {
            localStorage.setItem('currentCurrencies', `${allCurrencies[0].id}, ${allCurrencies[0].id}`)
        } else {
            dispatch(actions.setFirstCurrency(localCurrentCurrencies.split(', ')[0]))
            dispatch(actions.setSecondCurrency(localCurrentCurrencies.split(', ')[1]))
        }
        localCurrentAmount === null ? localStorage.setItem('currentAmount', `${amount}`)
            : dispatch(actions.setAmount(+localCurrentAmount))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className={s.current}>
        <div className={s.formWhrapper}>
            <input className={s.amount} type="number" min="1" max="999999" value={amount} onChange={(e) => { setAmount(+e.currentTarget.value) }} />
            <CurrencyForm allCurrencies={allCurrencies} getRate={getRate} first={firstCurrency} second={secondCurrency} />
        </div>
        {isFetching ? <Preloader /> : <div className={s.infoWhrapper}>
            {rate === null
                ? <p className={s.info}>Press get to see currency</p>
                : <p className={s.info}>{amount} {firstCurrency} = {Math.round(amount * rate * 100) / 100} {secondCurrency}</p>
            }
        </div>}
    </div>
})