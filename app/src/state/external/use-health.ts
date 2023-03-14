import { HealthCheckResponse } from '@/types/health/health-check-response.type'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useHealth = () =>
    useQuery({
        queryKey: ['health'],
        queryFn: async () => {
            return await axios
                .get<HealthCheckResponse>(`${process.env.NEXT_PUBLIC_API_URL}/health`)
                .then((res) => res.data)
        },
    })
