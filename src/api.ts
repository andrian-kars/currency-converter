import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://free.currconv.com/api/v7/'
})

export const api = {
    getAllCurrencies() {
        return instance.get('currencies?apiKey=do-not-use-this-key').then(res => res.data)
    }
}