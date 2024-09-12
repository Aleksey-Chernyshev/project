import { ChangeEvent, useEffect, useState } from "react";
import { ICustomer, IEmployee } from "../../model"
import ModalTypeProduct from "../Modal/Modal";
import { deleteEmployee, updateEmployee } from "../../hooks/Employee/createEmployee";

interface IEmployeeProps{
    employee: IEmployee
}

export default function Employee({employee}: IEmployeeProps){
    function calculateAge(birthday: Date): number {
        const today = new Date();
        const birthDate = new Date(birthday);
      
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        // Уменьшаем возраст, если еще не прошел месяц с дня рождения
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
    //   <div>{new Date(driver.birthday).toLocaleDateString()}</div>
        return age;
      }
      const age = calculateAge(employee.birthday)

      const [editModal, setEditModal] = useState(false)
      const closeEditModal = () => {
          setEditModal(false);
      }

      const [newEmployeeData, setNewEmployeeData] = useState({
        adress:'',
        home_phone: ''
      })
      useEffect(() => {
        setNewEmployeeData({
            adress: employee.adress,
            home_phone: employee.home_phone
        });
    }, [employee]);
      const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEmployeeData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = (id: number, adress: string, home_phone: string) => {
        updateEmployee(id, adress, home_phone)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error('Error inserting data: ', error);
          });
      };
    return(
        <div className="driver-card">
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <div>
                    <img src={employee.photo} width={200} height={300} style={{borderRadius:"10px"}}/>
                </div>
                <div style={{marginLeft:"20px"}}>
                    <div className="fio">
                        {employee.fio}
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{width:"450px"}}>
                            <h2>Личные данные</h2>
                            <div className="column"><a className="title">Возраст:</a> {age}</div>
                            <div className="column"><a className="title">В компании с</a> {new Date(employee.work_day).toLocaleDateString()}</div>
                            <div className="column"><a className="title">Личный телефон:</a> {employee.home_phone}</div>
                            <div className="column"><a className="title">Паспортные данные:</a> {employee.pasport}</div>
                            <div className="column"><a className="title">Домашний адрес:</a> {employee.adress}</div>
                        </div>
                        <div style={{marginLeft:"12px"}}>
                            <h2>Рабочие данные</h2>
                            <div className="column"><a className="title">Рабочий телефон:</a> {employee.work_phone}</div>
                            
                        </div>
                    </div>
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <div style={{marginLeft:"100px"}}>
                        <img  src="https://cdn-icons-png.flaticon.com/512/2830/2830573.png" width={100} />
                    </div>
                    <div style={{marginTop:"150px"}}>
                        <button style={{marginRight:"7px"}} onClick={() => setEditModal(true)}>Изменить</button>
                        <button onClick={() => deleteEmployee(employee.id)}>Удалить</button>
                    </div>
                </div>
            </div>
            
            <ModalTypeProduct active= {editModal} onClose={closeEditModal} style={{width:"500px", height:"500px"}}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <h2 style={{marginTop:"25px"}}>Что бы вы хотели изменить?</h2>
                    <div>Старое данные: </div>
                    <div>Адрес: {employee.adress}</div>
                    <div>Домашний телефон: {employee.home_phone}</div>
                        <form>
                            <h3>Напишите новые личные данные водителя</h3>
                            <label>Новый адрес</label>
                            <input className="input" type="text" name="adress" value={newEmployeeData.adress} onChange={handleChange}  />
                            <label>Новый домашний телефон</label>
                            <input className="input" type="text" name="home_phone" value={newEmployeeData.home_phone} onChange={handleChange} />
                            <button className="btn" type="button" onClick={() => handleSubmit(employee.id, newEmployeeData.adress, newEmployeeData.home_phone)}>Изменить</button>
                        </form>
                </div>
            </ModalTypeProduct>
        </div>
    )
}