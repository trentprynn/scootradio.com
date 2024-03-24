import axios from 'axios'

export const getAxiosInstance = () => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    })
}
