import { ChangeEvent, useState } from "react"
import { createDriver } from "../../hooks/Driver/createDriver";


export default function FormAddDriver(){

    const [driverData, setDriverData] = useState({
        fio: '',
        home_phone: '',
        work_day: '',
        birthday: '',
        pasport: '',
        photo: '',
        work_phone: '',
        adress: '',
        dr_license:''
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDriverData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        createDriver(driverData.fio, driverData.birthday, driverData.work_phone, driverData.work_day, driverData.home_phone, driverData.pasport, driverData.adress, driverData.dr_license, driverData.photo)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error('Error inserting data: ', error);
          });
      };
    return (
        <form style={{ margin:"auto", width:"424px",maxWidth: '100%'}}>
            <div style={{display:"flex"}}>
                <div style={{marginRight:"7px"}}>
                    <label>
                        ФИО:
                        <input type="text" name="fio" value={driverData.fio} onChange={handleChange}/>
                    </label>
                    <label>
                        Домашний телефон:
                        <input type="text" name="home_phone" value={driverData.home_phone} onChange={handleChange}/>
                    </label>
                    <label>
                        Адрес:
                        <input type="text" name="adress" value={driverData.adress} onChange={handleChange}/>
                    </label>
                    <label>
                        Дата рождения:
                        <input style={{width:"210px"}} type="date" name="birthday" value={driverData.birthday} onChange={handleChange} />
                    </label>
                    <label>
                        Дата оформления:
                        <input style={{width:"210px"}} type="date" name="work_day" value={driverData.work_day} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-column">
                    <label>
                        Паспортные данные:
                        <input type="text" name="pasport" value={driverData.pasport} onChange={handleChange}/>
                    </label>
                    <label>
                        Фотография:
                        <input type="text" name="photo" value={driverData.photo} onChange={handleChange}/>
                    </label>
                    <label>
                        Рабочий телефон:
                        <input type="text" placeholder="+7(XXX)-XXX-XX-XX" name="work_phone" value={driverData.work_phone}onChange={handleChange} />
                    </label>
                    <label>
                        Водительское удостоверение:
                        <input type="text" name="dr_license" value={driverData.dr_license} onChange={handleChange}/>
                    </label>
                </div>
            </div>
            
            <button style={{marginTop:"15px"}} type="submit" onClick={handleSubmit}>Добавить водителя</button>
        </form>
    );
}