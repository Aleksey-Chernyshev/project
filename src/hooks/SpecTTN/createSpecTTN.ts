import axios, { AxiosError } from "axios";

export const createSpecTTN = async (ttn_id: number, product_id:number, count:number, total_price: number, sale: number) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/spec_ttn`, { ttn_id, product_id, count, total_price, sale });
      if (response.status === 200) {
        return response.data; 
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error('Error inserting data: ', error);
      throw error;
    }
  };
  export const updateSpecTTN = async (id: number, count: number, total_price: number, sale: number) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/spec_ttn`, { id, count, total_price, sale })
      console.log('Data updated:', response.data)
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        console.error('Error updating data:', axiosError.response.data)
      } else {
        console.error('Error updating data:', axiosError.message)
      }
    }
  };
  export const deleteSpecTTN = async(id:number) =>{
    try {
        const response = await axios.delete(`http://localhost:3001/api/spec_ttn/${id}`)
        console.log(response.data)
        console.log('delete spec')
    } catch (error) {
        console.error('Ошибка при удалении данных:', error);
    }
  }