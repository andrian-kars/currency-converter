import s from './CurrencyForm.module.scss'
import { memo } from "react"
import { CurrencyType } from "../../types"
import { Field, Form, Formik } from 'formik'

type PropsType = {
    allCurrencies: Array<CurrencyType>
    first: (value: string) => void
    second: (value: string) => void
    getRate: (first: string, second: string) => void
}

type FormType = {
    first: string
    second: string
}

export const CurrencyForm: React.FC<PropsType> = memo(({ allCurrencies, first, second, getRate }) => {
    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        getRate(values.first, values.second)
        first(values.first)
        second(values.second)
        setSubmitting(false)
    }

    return <div className={s.form}>
        <Formik
            enableReinitialize
            initialValues={{ first: allCurrencies[0].id, second: allCurrencies[0].id }}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field as="select" name="first">
                        {allCurrencies.map(el => <option title={el.currencyName} key={el.id}>{el.id}</option>)}
                    </Field>
                    <Field as="select" name="second">
                        {allCurrencies.map(el => <option key={el.id}>{el.id}</option>)}
                    </Field>
                    <button type="submit" disabled={isSubmitting}>Get</button>
                </Form>
            )}
        </Formik>
    </div>
})