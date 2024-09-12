import { useEffect, useState } from "react";
import { IProduct } from "../../model";
import axios, { AxiosError } from "axios";

export function useProduct(){

    const [product, setProduct] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchProduct() {
        try {
            setLoading(true)
            const response = await axios.get<IProduct[]>(`http://localhost:3001/api/product`)
            setProduct(response.data)
            console.log(response)
            setLoading(false)
        } catch (e:unknown) {
            setError('')
            setLoading(false)
            const error = e as AxiosError
            setError(error.message)
        }
        
    }

    useEffect(() => {
        fetchProduct()
    }, [])
    return {product,loading,error}
}