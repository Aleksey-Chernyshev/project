import { useState } from "react"
import Driver from "../../components/Driver/Driver"
import Employee from "../../components/Employee/Employee"
import { useDriver } from "../../hooks/Driver/driver"
import { useEmployee } from "../../hooks/Employee/employee"
import ModalTypeProduct from "../../components/Modal/Modal"
import TabsSection from "../../components/TabsSection/TabsSection"
import FormAddEmployee from "../../components/FormAddEmployee/FormAddEmployee"
import FormAddDriver from "../../components/FormAddDriver/FormAddDriver"

export default function WorkStaffPage(){

    const{driver, loading, error} = useDriver()
    const {employee} = useEmployee()

    const [addModal, setAddModal] = useState(false)
    const closeAddModal = () => {
        setAddModal(false)
    }

    const [tab, setTab] = useState('employee')
    return(
        <>
            <div style={{margin:"20px 40px 0 40px"}}>
                <div>
                    <h1>Водители</h1>
                    <div>
                        {driver.map(driver => <Driver driver={driver} key={driver.id}/>)}
                    </div>
                    
                    <h1>Сотрудники</h1>
                    <div>
                        {employee.map(employee => <Employee employee={employee} key={employee.id}/>)}
                    </div>
                    
                </div>
                <button className="add" onClick={() => setAddModal(true)}>+</button>
            </div>
            <ModalTypeProduct active= {addModal} onClose={closeAddModal} style={{width:"700px", height:"550px"}}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems:"center" }}>
                    <h1 style={{margin:"0"}}>Добавить работника компании</h1>
                    <h2 style={{margin:"0"}}>Кого бы вы хотели добавить?</h2>
                    <TabsSection active={tab} onChange={(cur)=>setTab(cur)} />
                    {tab === 'employee' && <FormAddEmployee /> }
                    {tab === 'driver' && <FormAddDriver />}
                    
                </div>
            </ModalTypeProduct>
        </>
    )
}