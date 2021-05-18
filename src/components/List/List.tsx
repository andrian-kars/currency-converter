import s from './List.module.scss'
import { AppStateType } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { actions, onGetRate } from '../../redux/listReducer'
import { onGetAllCurrencies } from '../../redux/currenciesReducer'
import { useEffect } from 'react'
import { Preloader } from '../Common/Preloader/Preloader'
import { ListForm } from './ListForm'

export const List: React.FC = () => {
    const isFetching = useSelector((state: AppStateType) => state.list.isFetching)
    const allCurrencies = useSelector((state: AppStateType) => state.currencies.allCurrencies)
    const rate = useSelector((state: AppStateType) => state.list.rate)
    const amount = useSelector((state: AppStateType) => state.list.amount)
    const firstCurrency = useSelector((state: AppStateType) => state.list.firstCurrency)
    const secondCurrency = useSelector((state: AppStateType) => state.list.secondCurrency)

    const dispatch = useDispatch()

    const setAmount = (amount: number) => { dispatch(actions.setAmount(amount)) }

    useEffect(() => {
        if (allCurrencies.length === 0) {
            dispatch(onGetAllCurrencies())
        }
    }, [dispatch, allCurrencies])

    const getRate = (first: string) => { dispatch(onGetRate(first)) }

    return <div className={s.current}>
        <div className={s.formWhrapper}>
            <input className={s.amount} type="number" min="1" max="999999" value={amount} onChange={(e) => { setAmount(+e.currentTarget.value) }} />
            <ListForm allCurrencies={allCurrencies} getRate={getRate} first={firstCurrency} second={secondCurrency} />
        </div>
        {isFetching ? <Preloader /> : <div className={s.infoWhrapper}>
            {rate === null
                ? <p className={s.info}>Press get to see currency</p>
                : <p className={s.info}>{amount} {firstCurrency} = {Math.round(amount * rate * 100) / 100} {secondCurrency}</p>
            }
        </div>}
    </div>
}