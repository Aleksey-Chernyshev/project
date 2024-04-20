import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { ITypeProduct } from "../../model"




export function useTypeProduct(){
    const [typeProduct,setTypeProduct] = useState<ITypeProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchProducts(){
        try {
            setLoading(true)
            const response = await axios.get<ITypeProduct[]>(`http://localhost:3001/api/typeProduct`)
            setTypeProduct(response.data)
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
        fetchProducts()
    },[])
    return {typeProduct, loading, error}


}