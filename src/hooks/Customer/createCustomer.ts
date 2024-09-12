import axios from "axios";

export const createCustomer = async (zakazchik: string, adress: string, phone: string, index: string, inn: string, rasch: string ) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/customer`, { zakazchik, adress, phone, index, inn, rasch });
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
  export const updateCustomer = async (id: number,adress: string, phone: string) =>  {
    try {
        const response = await axios.put(`http://localhost:3001/api/customer`, {id: id,adress, phone})
        console.log(response.data);
        console.log('data updated')
    } catch (error: any) {
        console.error('Error updating data:', error);
    }
  }

export const deleteCustomer = async(id:number) =>{
    try {
        const response = await axios.delete(`http://localhost:3001/api/customer/${id}`)
        console.log(response.data)
        console.log('delete type')
    } catch (error) {
        console.error('Ошибка при удалении данных:', error);
    }
  }