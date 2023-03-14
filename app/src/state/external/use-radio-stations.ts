import { RadioStation } from '@/types/radio/radio-station.type'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useRadioStations = (getAccessToken: () => Promise<string>) =>
    useQuery({
        queryKey: ['radioStations'],
        queryFn: async () => {
            const accessToken = await getAccessToken()

            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }

            return axios
                .get<RadioStation[]>(`${process.env.NEXT_PUBLIC_API_URL}/radioStations`, config)
                .then((res) => res.data)
        },
    })
