import axios from "axios";

export const createTTN = async (zakazchik: number, driver:number, employee:number, registr_day: string) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/ttn`, { zakazchik, driver, employee, registr_day })
      if (response.status === 200) {
        return response.data.id
      } else {
        throw new Error(`Request failed with status code ${response.status}`)
      }
    } catch (error) {
      console.error('Error inserting data: ', error)
      throw error
    }
  };

export const deleteTTN = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:3001/api/ttn/${id}`);
      if (response.status === 200) {
        return response.data.id; 
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
  } catch (error) {
    console.error("ERROR", error)
    throw error
  }
}