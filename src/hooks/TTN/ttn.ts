import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { ITTN} from "../../model"




export function useTTN(){
    const [ttn,setTTN] = useState<ITTN[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchTTNs(){
        try {
            setLoading(true)
            const response = await axios.get<ITTN[]>(`http://localhost:3001/api/ttn`)
            setTTN(response.data)
            console.log(response)
            setLoading(false)
        } catch (e: unknown) {
            setError('')
            setLoading(false)
            const error = e as AxiosError
            setError(error.message)
        }
    }
    useEffect(() => {
        fetchTTNs()
    },[])
    return {ttn, loading, error}


}