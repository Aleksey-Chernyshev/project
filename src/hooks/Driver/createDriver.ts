import axios from "axios";

export const createDriver = async (fio:string, birthday:string, work_phone:string, work_day:string, home_phone:string, pasport:string, adress:string, dr_license:string, photo:string ) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/driver`, { fio, birthday, work_phone, work_day, home_phone, pasport, adress, dr_license, photo });
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
  export const updateDriver = async (id: number,adress: string, home_phone: string) =>  {
    try {
        const response = await axios.put(`http://localhost:3001/api/driver`, {id: id,adress, home_phone})
        console.log(response.data);
        console.log('data updated')
    } catch (error: any) {
        console.error('Error updating data:', error);
    }
  }

export const deleteDriver = async(id:number) =>{
    try {
        const response = await axios.delete(`http://localhost:3001/api/driver/${id}`)
        console.log(response.data)
        console.log('delete type')
    } catch (error) {
        console.error('Ошибка при удалении данных:', error);
    }
  }