import s from './List.module.scss'
import { memo } from "react"
import { CurrencyType } from "../../types"
import { Field, Form, Formik } from 'formik'

type PropsType = {
    allCurrencies: Array<CurrencyType>
    getRate: (first: string, second: string) => void
}

type FormType = {
    first: string
    second: string
}

export const ListForm: React.FC<PropsType> = memo(({ allCurrencies, getRate }) => {
    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        getRate(values.first, values.second)
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
                    <button className={s.button} type="submit" disabled={isSubmitting}>Get</button>
                </Form>
            )}
        </Formik>
    </div>
})