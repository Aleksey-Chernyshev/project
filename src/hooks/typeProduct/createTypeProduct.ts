import axios from "axios";
import { ITypeProduct } from "../../model";

export const createType = async (category: string, description: string,image: string) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/typeProduct`, { category, description,image });
      if (response.status === 200) {
        return response.data; // Если успешный, возвращаем данные ответа
      } else {
        throw new Error(`Request failed with status code ${response.status}`); // Если неуспешный, выбрасываем ошибку
      }
    } catch (error) {
      console.error('Error inserting data: ', error);
      throw error;
    }
  };