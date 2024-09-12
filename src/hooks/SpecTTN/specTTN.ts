import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { ISpecTTN, ITTN, ITypeProduct } from "../../model"




export function useSpecTTN(){
    const [specTTN,setSpecTTN] = useState<ISpecTTN[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchSpecTTNs(){
        try {
            setLoading(true)
            const response = await axios.get<ISpecTTN[]>(`http://localhost:3001/api/spec_ttn`)
            setSpecTTN(response.data)
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
        fetchSpecTTNs()
    },[])
    return {specTTN, loading, error}

}