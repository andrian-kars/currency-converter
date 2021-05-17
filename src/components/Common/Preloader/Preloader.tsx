import { memo } from 'react'
import s from './Preloader.module.scss'

export const Preloader: React.FC = memo(() => {
    return (
        <div className={s.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
})