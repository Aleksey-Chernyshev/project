import { ChangeEvent, useEffect, useState } from "react";
import { ICustomer, IDriver } from "../../model"
import ModalTypeProduct from "../Modal/Modal";
import './Driver.css'
import { deleteDriver, updateDriver } from "../../hooks/Driver/createDriver";
interface IDriverProps{
    driver: IDriver
}

export default function Driver({driver}: IDriverProps){
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
      const age = calculateAge(driver.birthday)


      const [editModal, setEditModal] = useState(false)
      const closeEditModal = () => {
          setEditModal(false);
      }

      const [newDriverData, setNewDriverData] = useState({
        adress:'',
        home_phone:''
      })
      useEffect(() => {
        setNewDriverData({
            adress: driver.adress,
            home_phone: driver.home_phone
        });
    }, [driver])
      const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewDriverData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = (id: number, adress: string, home_phone: string) => {
        updateDriver(id, adress, home_phone)
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
                    <img src={driver.photo} width={200} height={300} style={{borderRadius:"10px"}}/>
                </div>
                <div style={{marginLeft:"20px"}}>
                    <div className="fio">
                        {driver.fio}
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{width:"450px"}}>
                            <h2>Личные данные</h2>
                            <div className="column"><a className="title">Возраст:</a> {age}</div>
                            <div className="column"><a className="title">В компании с</a> {new Date(driver.work_day).toLocaleDateString()}</div>
                            <div className="column"><a className="title">Личный телефон:</a> {driver.home_phone}</div>
                            <div className="column"><a className="title">Паспортные данные:</a> {driver.pasport}</div>
                            <div className="column"><a className="title">Домашний адрес:</a> {driver.adress}</div>
                        </div>
                        <div style={{marginLeft:"12px"}}>
                            <h2>Рабочие данные</h2>
                            <div className="column"><a className="title">Рабочий телефон:</a> {driver.work_phone}</div>
                            <div className="column"><a className="title">Водительское удостоверение:</a> {driver.dr_license}</div>
                        </div>
                    </div>
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <div style={{marginLeft:"100px"}}>
                        <img  src="https://cdn-icons-png.flaticon.com/128/1535/1535791.png" width={100} />
                    </div>
                    <div style={{marginTop:"150px"}}>
                        <button style={{marginRight:"5px"}} onClick={() => setEditModal(true)}>Изменить</button>
                        <button onClick={() => deleteDriver(driver.id)}>Удалить</button>
                    </div>
                </div>
                
            </div>
            <ModalTypeProduct active= {editModal} onClose={closeEditModal} style={{width:"500px", height:"500px"}}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <h2 style={{marginTop:"25px"}}>Что бы вы хотели изменить?</h2>
                    <div>Старое данные: </div>
                    <div>Адрес: {driver.adress}</div>
                    <div>Домашний телефон: {driver.home_phone}</div>
                        <form>
                            <h3>Напишите новые личные данные водителя</h3>
                            <label>Новый адрес</label>
                            <input className="input" type="text" name="adress" value={newDriverData.adress} onChange={handleChange}  />
                            <label>Новый домашний телефон</label>
                            <input className="input" type="text" name="home_phone" value={newDriverData.home_phone} onChange={handleChange} />
                            <button className="btn" type="button" onClick={() => handleSubmit(driver.id, newDriverData.adress, newDriverData.home_phone)}>Изменить</button>
                        </form>
                </div>
            </ModalTypeProduct>
        </div>
    )
}