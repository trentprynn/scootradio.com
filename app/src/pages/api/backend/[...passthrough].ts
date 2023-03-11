import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import axios, { AxiosError } from 'axios'

export default withApiAuthRequired(async function products(req, res) {
    if (!req.url) {
        res.status(400).json({ error: 'no url received in passthrough, cannot continue' })
        return
    }

    const { accessToken } = await getAccessToken(req, res)

    console.log(`INCOMING URL ${req.url as string}`)

    const toUrl = (req.url as string).replace('/api/backend', '')

    const instance = axios.create({
        baseURL: `${process.env.API_URL}`,
        headers: { Authorization: `Bearer ${accessToken}` },
    })

    console.log('RECEIVED REQUEST')
    console.log(`METHOD: ${req.method}`)
    console.log(`TO URL: ${toUrl}`)

    if (req.method === 'GET') {
        try {
            const result = await instance.get(toUrl)
            console.log('GET PASSTHROUGH RESULT')
            console.log(result.data)
            res.status(200).json(result.data)
        } catch (error) {
            const typedError = error as AxiosError
            console.log('GET PASSTHROUGH FAILURE')
            res.status(typedError.response?.status ? typedError.response?.status : 500).json(typedError.response?.data)
        }
        return
    } else if (req.method === 'POST') {
    } else if (req.method === 'PUT') {
    } else if (req.method === 'PATCH') {
    } else if (req.method === 'DELETE') {
    }

    res.status(405).json({ message: `Unsupported HTTP method ${req.method}` })
    return
})
