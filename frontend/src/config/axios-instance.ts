import axios from 'axios'

export const getAxiosInstance = () => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        timeout: 10 * 3000, // 3 seconds
    })
}
