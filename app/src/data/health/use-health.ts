import { HealthCheckResponse } from '@/types/health/health-check-response.type'
import useImmutableSWR from 'swr'

export default function useHealth() {
    const { data, mutate, error } = useImmutableSWR<HealthCheckResponse>(`/health`)

    const loading = !!(!data && !error)

    return {
        healthDataLoading: loading,
        healthData: data,
        healthDataFetchError: error,
        mutateHealthData: mutate,
    }
}
