import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IEmployee, ITypeProduct } from "../../model"




export function useEmployee(){
    const [employee,setEmployee] = useState<IEmployee[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchEmployees(){
        try {
            setLoading(true)
            const response = await axios.get<IEmployee[]>(`http://localhost:3001/api/employee`)
            setEmployee(response.data)
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
        fetchEmployees()
    },[])
    return {employee, loading, error}


}