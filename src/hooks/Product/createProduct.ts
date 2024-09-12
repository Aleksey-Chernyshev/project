import axios from "axios";

export const createProduct = async (name:string, weight:number, price:number, type_id:number,ed_izm_id:number ) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/product`, { name, weight, price, type_id,ed_izm_id });
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

  export const updatePrice = async (id: number, price:number) =>  {
    try {
        const response = await axios.put(`http://localhost:3001/api/product`, {id,price})
        console.log(response.data);
        console.log('data updated')
    } catch (error: any) {
        console.error('Error updating data:', error);
    }
  }
  export const deleteProduct = async(id:number) =>{
    try {
        const response = await axios.delete(`http://localhost:3001/api/product/${id}`)
        console.log(response.data)
        console.log('delete product')
    } catch (error) {
        console.error('Ошибка при удалении данных:', error);
    }
  }