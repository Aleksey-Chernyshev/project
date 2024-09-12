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
    // async function createType(category: string, description: string,image: string) {
    //     try {
    //         const response = await axios.post(`http://localhost:3001/api/typeProduct`, { category, description,image });
    //         if (response.status === 200) {
    //           return response.data; 
    //         } else {
    //           throw new Error(`Request failed with status code ${response.status}`);
    //         }
    //       } catch (error) {
    //         console.error('Error inserting data: ', error);
    //         throw error;
    //       }
    // }
    // async function updateDesc (id: number,description: string) {
    //     try {
    //         const response = await axios.put(`http://localhost:3001/api/typeProduct`, {type_id: id,description})
    //         console.log(response.data);
    //         console.log('data updated')
    //     } catch (error: any) {
    //         console.error('Error updating data:', error);
    //     }
    // }
    // async function deleteType(id:number) {
    //     try {
    //         const response = await axios.delete(`http://localhost:3001/api/typeProduct/${id}`)
    //         console.log(response.data)
    //         console.log('delete type')
    //     } catch (error) {
    //         console.error('Ошибка при удалении данных:', error);
    //     }
    // }
    useEffect(() => {
        fetchProducts()
    },[])
    return {typeProduct, loading, error}


}