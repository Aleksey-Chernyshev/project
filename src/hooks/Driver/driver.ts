import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IDriver, IEmployee, ITypeProduct } from "../../model"




export function useDriver(){
    const [driver,setDriver] = useState<IDriver[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchDrivers(){
        try {
            setLoading(true)
            const response = await axios.get<IDriver[]>(`http://localhost:3001/api/driver`)
            setDriver(response.data)
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
        fetchDrivers()
    },[])
    return {driver, loading, error}


}