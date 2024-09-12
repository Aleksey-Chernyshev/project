import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { ICustomer } from "../../model"

export function useCustomer(){

    const [customer, setCustomer] = useState<ICustomer[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchCustomers(){
        try {
            setLoading(true)
            const response = await axios.get<ICustomer[]>(`http://localhost:3001/api/customer`)
            setCustomer(response.data)
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
        fetchCustomers()
    },[])
    return{loading, error, customer}
}