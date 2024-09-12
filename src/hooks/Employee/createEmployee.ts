import axios from "axios";

export const createEmployee = async (fio:string, home_phone:string, work_day:string, birthday:string, pasport:string,work_phone:string, photo:string, adress:string ) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/employee`, { fio, home_phone, work_day, birthday, pasport,work_phone, photo, adress });
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
export const updateEmployee = async (id: number,adress: string, home_phone: string) =>  {
  try {
      const response = await axios.put(`http://localhost:3001/api/employee`, {id: id,adress, home_phone})
      console.log(response.data);
      console.log('data updated')
  } catch (error: any) {
      console.error('Error updating data:', error);
  }
}

export const deleteEmployee = async(id:number) =>{
  try {
      const response = await axios.delete(`http://localhost:3001/api/employee/${id}`)
      console.log(response.data)
      console.log('delete type')
  } catch (error) {
      console.error('Ошибка при удалении данных:', error);
  }
}