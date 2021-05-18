import s from './List.module.scss'
import { memo } from "react"
import { CurrencyType } from "../../types"
import { Field, Form, Formik } from 'formik'

type PropsType = {
    allCurrencies: Array<CurrencyType>
    first: string
    second: string
    getRate: (first: string) => void
}
type FormType = {
    first: string
}

export const ListForm: React.FC<PropsType> = memo(({ allCurrencies, getRate, first, second }) => {
    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        getRate(values.first)
        setSubmitting(false)
    }

    return <div className={s.form}>
        <Formik
            enableReinitialize
            initialValues={{ first: first ? first : allCurrencies[0].id, second: second }}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field as="select" name="first">
                        {allCurrencies.map(el => <option title={el.currencyName} key={el.id}>{el.id}</option>)}
                    </Field>
                    <button className={s.button} type="submit" disabled={isSubmitting}>to UAH</button>
                </Form>
            )}
        </Formik>
    </div>
})