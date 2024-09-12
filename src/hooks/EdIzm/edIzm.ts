import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IEdIzm } from "../../model"

export function useEdIzm(){
    const [ed, setEd] = useState<IEdIzm[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    async function fetchEdIzm() {
        try {
            setLoading(true)
            const response = await axios.get<IEdIzm[]>(`http://localhost:3001/api/edIzm`)
            setEd(response.data)
            console.log(response.data)
            setLoading(false)
        } catch (e:unknown) {
            setError('')
            setLoading(false)
            const error = e as AxiosError
        setError(error.message)
        }
    }
    useEffect(() => {
        fetchEdIzm()
    })
    return{ed}
}