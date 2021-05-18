import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://free.currconv.com/api/v7/'
})

export const api = {
    getAllCurrencies() {
        return instance.get('currencies?apiKey=7caa1d0e46573ad874cf').then(res => res.data)
    },
    getRate(first: string, second: string) {
        return instance.get(`convert?q=${first}_${second}&compact=ultra&apiKey=7caa1d0e46573ad874cf`).then(res => res.data)
    },
}