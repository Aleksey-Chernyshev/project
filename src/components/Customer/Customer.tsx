import { ChangeEvent, useEffect, useState } from "react"
import { ICustomer } from "../../model"
import ModalTypeProduct from "../Modal/Modal"
import './Customer.css'
import { deleteCustomer, updateCustomer } from "../../hooks/Customer/createCustomer"

interface ICustomerProps{
    customer: ICustomer
}

export default function Customer({customer}: ICustomerProps){
    const [editModal, setEditModal] = useState(false)
    const closeEditModal = () => {
        setEditModal(false);
    }

    const [newCustomerData, setNewCustomerData] = useState({
      adress:'',
      phone: ''
    })
    useEffect(() => {
      setNewCustomerData({
          adress: customer.adress,
          phone: customer.phone
      });
  }, [customer]);
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewCustomerData(prevData => ({
          ...prevData,
          [name]: value
      }));
  };
  const handleSubmit = (id: number, adress: string, phone: string) => {
      updateCustomer(id, adress, phone)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error('Error inserting data: ', error);
        });
    };



    return(
        <div>
            <div className="cust-wrapper">
                <div style={{fontSize:"30px", fontWeight:"600"}}>
                    {customer.zakazchik}
                </div>
                <div style={{display:"flex", marginTop:"12px"}}>
                    <div>
                        <div>
                            Адрес: {customer.adress}
                        </div>
                        <div>
                            Телефон: {customer.phone}
                        </div>
                    </div>
                    <div style={{marginLeft:"12px"}}>
                        <div>
                            Индекс: {customer.index}
                        </div>
                        <div>
                            ИНН: {customer.inn}
                        </div>
                        <div>
                            Расчетный счет: {customer.rasch}
                        </div>
                    </div>
                </div>
                <div style={{marginTop:"10px"}}>
                    <button style={{marginRight:"10px"}} onClick={() => setEditModal(true)}>Изменить</button>
                    <button onClick={() => deleteCustomer(customer.id)}>Удалить</button>
                </div>
            </div>

            <ModalTypeProduct active= {editModal} onClose={closeEditModal} style={{width:"500px", height:"500px"}}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <h2 style={{marginTop:"25px"}}>Что бы вы хотели изменить?</h2>
                    <div>Старое данные: </div>
                    <div>Адрес: {customer.adress}</div>
                    <div>Телефон: {customer.phone}</div>
                        <form>
                            <h3>Напишите новые личные данные водителя</h3>
                            <label>Новый адрес</label>
                            <input className="input" type="text" name="adress" value={newCustomerData.adress} onChange={handleChange}  />
                            <label>Новый домашний телефон</label>
                            <input className="input" type="text" name="phone" value={newCustomerData.phone} onChange={handleChange} />
                            <button className="btn" type="button" onClick={() => handleSubmit(customer.id, newCustomerData.adress, newCustomerData.phone)}>Изменить</button>
                        </form>
                </div>
            </ModalTypeProduct>
     </div>
    )
}