import s from './CurrencyForm.module.scss'
import { memo, useEffect } from "react"
import { CurrencyType } from "../../types"

type PropsType = {
    allCurrencies: Array<CurrencyType>
    first: (value: string) => void
    second: (value: string) => void
    getRate: () => void
}

export const CurrencyForm: React.FC<PropsType> = memo(({ allCurrencies, first, second, getRate }) => {
    useEffect(() => {
        first(allCurrencies[0].id)
        second(allCurrencies[0].id)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className={s.form}>
        <select onChange={(e) => { first(e.currentTarget.value) }}>
            {allCurrencies.map(el => <option title={el.currencyName} key={el.id}>{el.id}</option>)}
        </select>
        <select onChange={(e) => { second(e.currentTarget.value) }}>
            {allCurrencies.map(el => <option key={el.id}>{el.id}</option>)}
        </select>
        <button onClick={() => { getRate() }}>Send</button>
    </div>
})