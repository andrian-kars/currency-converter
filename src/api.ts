import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://free.currconv.com/api/v7/'
})

export const api = {
    getAllCurrencies() {
        return instance.get('currencies?apiKey=do-not-use-this-key').then(res => res.data)
    },
    getRate(first: string, second: string) {
        return instance.get(`convert?q=${first}_${second}&compact=ultra&apiKey=f15d10a60426e23649a0`).then(res => res.data)
    },
}