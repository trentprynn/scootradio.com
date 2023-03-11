import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: `/api/backend`,
})

export const axiosFetcher = async (url: string) => {
    const response = await axiosInstance.get(url)
    return response.data
}
