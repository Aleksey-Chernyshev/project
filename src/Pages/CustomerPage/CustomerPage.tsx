import { useState } from "react"
import Customer from "../../components/Customer/Customer"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import { Loader } from "../../components/Loader/Loader"
import { useCustomer } from "../../hooks/Customer/customer"
import ModalTypeProduct from "../../components/Modal/Modal"
import './CustomerPage.css'
import { createCustomer } from "../../hooks/Customer/createCustomer"



export default function CustomerPage(){

    const {loading, error, customer} = useCustomer()
    const [addModal, setAddModal] = useState(false)

    const closeAddModal = () =>{
        setAddModal(false)
    }
    // const FormCustomer = {
    //     zakazchik: '',
    //     adress: '', 
    //     phone: '', 
    //     index: '', 
    //     inn: '', 
    //     rasch: ''
    // }
    const [zakazchik,setZakazchik] = useState('')
    const [adress,setAdress] = useState('')
    const [phone,setPhone] = useState('')
    const [index,setIndex] = useState('')
    const [inn,setInn] = useState('')
    const [rasch,setRasch] = useState('')
    const handleSubmit = () => {
        createCustomer(zakazchik, adress, phone, index, inn, rasch)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            // console.error('Error inserting data: ', error);
          });
      };
    return(
        <div>
            {loading && <Loader/>}
            {error && <ErrorMessage error={error}/>}
            <div>
                <h1 className="title">Заказчики</h1>
                <div className="customer-wrapper">
                    {customer.map(customer => <Customer customer={customer} key={customer.id} />)}
                </div>
                <button className="add" onClick={() => setAddModal(true)}>+</button>
            </div>
    
            <ModalTypeProduct active= {addModal} onClose={closeAddModal}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1>Добавить заказчика</h1>
                    <form style={{ width: '470px', maxWidth: '100%', fontWeight:"600" }}>
                        <div style={{display:"flex"}}>
                            <div style={{marginRight:''}}>
                                <label>Наименование заказчика</label>
                                <input type="text" name="zakazchik" value={zakazchik} onChange={(e) => setZakazchik(e.target.value)}/>
                                <label>Адрес</label>
                                <input type="text" name="adress" value={adress} onChange={(e) => setAdress(e.target.value)} />
                                <label>Телефон</label>
                                <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div>
                                <label>Индекс</label>
                                <input type="text" name="index" value={index} onChange={(e) => setIndex(e.target.value)} />
                                <label>ИНН</label>
                                <input type="text" name="inn" value={inn} onChange={(e) => setInn(e.target.value)} />
                                <label>Расчетный счет</label>
                                <input type="text" name="rasch" value={rasch} onChange={(e) => setRasch(e.target.value)} />
                            </div>
                        </div>
                        
                        
                        <button type="button" onClick={handleSubmit} >Добавить</button>
                    </form>
                </div>
            </ModalTypeProduct>
        </div>
    )
}