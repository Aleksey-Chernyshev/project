import axios from "axios";


export const createType = async (category: string, description: string,image: string) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/typeProduct`, { category, description,image });
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

export const updateDesc = async (id: number,description: string) =>  {
    try {
        const response = await axios.put(`http://localhost:3001/api/typeProduct`, {type_id: id,description})
        console.log(response.data);
        console.log('data updated')
    } catch (error: any) {
        console.error('Error updating data:', error);
    }
  }

export const deleteType = async(id:number) =>{
    try {
        const response = await axios.delete(`http://localhost:3001/api/typeProduct/${id}`)
        console.log(response.data)
        console.log('delete type')
    } catch (error) {
        console.error('Ошибка при удалении данных:', error);
    }
  }