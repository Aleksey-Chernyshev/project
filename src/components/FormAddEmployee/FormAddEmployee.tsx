import { ChangeEvent, useState } from "react"
import { IEmployee } from "../../model"
import './FormAddEmployee.css'
import { createEmployee } from "../../hooks/Employee/createEmployee";


export default function FormAddEmployee(){

    const [employeeData, setEmployeeData] = useState({
        fio: '',
        home_phone: '',
        work_day: '',
        birthday: '',
        pasport: '',
        photo: '',
        work_phone: '',
        adress: ''
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployeeData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        createEmployee(employeeData.fio, employeeData.home_phone, employeeData.work_day, employeeData.birthday, employeeData.pasport,employeeData.work_phone, employeeData.photo, employeeData.adress)
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
                        <input type="text" name="fio" value={employeeData.fio} onChange={handleChange}/>
                    </label>
                    <label>
                        Домашний телефон:
                        <input type="text" name="home_phone" value={employeeData.home_phone} onChange={handleChange}/>
                    </label>
                    <label>
                        Адрес:
                        <input type="text" name="adress" value={employeeData.adress} onChange={handleChange}/>
                    </label>
                    <label>
                        Дата рождения:
                        <input type="date" name="birthday" value={employeeData.birthday} onChange={handleChange}/>
                    </label>
                </div>
                <div className="form-column">
                    <label>
                        Паспортные данные:
                        <input type="text" name="pasport" value={employeeData.pasport} onChange={handleChange}/>
                    </label>
                    <label>
                        Фотография:
                        <input type="text" name="photo" value={employeeData.photo} onChange={handleChange} />
                    </label>
                    <label>
                        Рабочий телефон:
                        <input  type="text" name="work_phone" value={employeeData.work_phone} onChange={handleChange}/>
                    </label>
                    <label>
                        Дата оформления:
                        <input type="date" name="work_day" value={employeeData.work_day} onChange={handleChange}/>
                    </label>
                </div>
            </div>
            
            <button style={{marginTop:"15px"}} type="submit" onClick={handleSubmit}>Добавить сотрудника</button>
        </form>
    );
}