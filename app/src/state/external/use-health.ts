import { HealthCheckResponse } from '@/types/health/health-check-response.type'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useHealth = (getAccessToken: () => Promise<string>) =>
    useQuery({
        queryKey: ['health'],
        queryFn: async () => {
            const accessToken = await getAccessToken()

            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }

            return await axios
                .get<HealthCheckResponse>(`${process.env.NEXT_PUBLIC_API_URL}/health`, config)
                .then((res) => res.data)
        },
    })
