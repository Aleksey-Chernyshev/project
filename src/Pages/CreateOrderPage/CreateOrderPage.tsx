import { ChangeEvent, useEffect, useState } from "react"
import { useCustomer } from "../../hooks/Customer/customer"
import { useEmployee } from "../../hooks/Employee/employee"
import { useDriver } from "../../hooks/Driver/driver"
import { createTTN } from "../../hooks/TTN/createTTN"
import { useProduct } from "../../hooks/Product/product"
import { createSpecTTN } from "../../hooks/SpecTTN/createSpecTTN"
import axios from "axios"
import './CreateOrderPage.css'

interface Field {
    product: number,
    count: number,
    total_price: number,
    sale: number
  }
export default function CreateOrderPage(){

    const {customer} = useCustomer()
    const {employee} = useEmployee()
    const {driver} = useDriver()
    const {product} = useProduct()

    const[cust, setCust] = useState(0)
    const[emp, setEmp] = useState(0)
    const[drive, setDrive] = useState(0)
    const[regDay, setRegDay] = useState('')
 

    const [items, setItems] = useState<Field[]>([])
    const [itemProd, setItemProd] = useState(0)
    const [itemCount, setItemCount] = useState(0)
    const [itemPrice, setItemPrice] = useState(0)
    const [itemTotalPrice, setItemTotalPrice] = useState(0)
    const [itemSale, setItemSale] = useState(0)


    useEffect(() => {
        setItemTotalPrice((itemPrice-(itemPrice * itemSale * 0.01)) * itemCount)
      }, [itemCount, itemPrice, itemSale])
      
    const handleProductChange = (e : ChangeEvent<HTMLSelectElement>) => {
        const productId =  parseInt(e.target.value,10)
        setItemProd(productId)
        
        const selectedProduct = product.find(prod => prod.id === productId)
        if (selectedProduct) {
          setItemPrice(selectedProduct.price)
        }
      };

    const handleAddItem = () => {
        setItems([...items, { product: itemProd, count: itemCount, total_price: itemTotalPrice, sale: itemSale }])

        setItemProd(0)
        setItemCount(0)
        setItemTotalPrice(0)
        setItemSale(0)
      };

      const handleSubmit = async (cust: number, drive: number, emp: number, regDay: string) => {
        try {
          const response = await createTTN(cust, drive, emp, String(regDay))
          console.log(response)
        } catch (error) {
          console.error('Error creating TTN: ', error)
        }
      }

      const [lastTTN, setLastTTN] = useState(0)
      useEffect(() => {
        const fetchLastTTN = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/api/ttn`)
            setLastTTN(response.data[response.data.length - 1].id)
          } catch (error) {
            console.error('Error fetching last TTN:', error)
          }
        };
    
        fetchLastTTN()
      }, [])

      const handleSubmitProduct = async (ttn: number, product: number, count: number, price: number,sale: number, index: number) => {
        try {
            if (!ttn || !product || !count || !price ) {
                console.error('Отсутствует одно или несколько полей')
                return
            }
            const response = await createSpecTTN(ttn, product, count, price, sale)
            console.log(response)
            const updatedItems = [...items]
            updatedItems.splice(index, 1)
            setItems(updatedItems)
        } catch (error) {
            console.error('Error creating SpecTTN:', error)
        }
      };
    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:'center'}}>
          <h1>Оформить заказ для транспортировки товаров</h1>
          <h2>Заполните форму</h2>
          <div>Для того чтобы создать заказ, перед выбором товаров необходимо нажать кнопку "Сформировать заказ"</div>
            <form style={{width:"600px"}}>
                <label className="labels">Заказчик</label>
                <select name="customer" value={cust} onChange={(e) => setCust(parseInt(e.target.value, 10))}>
                            {customer.map(cust => (
                                <option key={cust.id} value={cust.id}> {cust.zakazchik} </option>
                            ))}
                </select>
                <label className="labels">Сотрудник</label>
                <select name="employee" value={emp} onChange={(e) => setEmp(parseInt(e.target.value, 10))}>
                            {employee.map(emp => (
                                <option key={emp.id} value={emp.id}> {emp.fio} </option>
                            ))}
                </select>
                <label className="labels">Водитель</label>
                <select name="driver" value={drive} onChange={(e) => setDrive(parseInt(e.target.value, 10))}>
                            {driver.map(dr => (
                                <option key={dr.id} value={dr.id}> {dr.fio} </option>
                            ))}
                </select>
                <label className="labels">
                        Дата оформления: 
                        <input type="date" name="regDay" value={regDay} onChange={(e) => setRegDay(e.target.value)}/>
                </label>
                <button onClick={() => handleSubmit(cust, drive, emp, regDay)}>Сформировать заказ</button>
                
            </form>
            
                <div>
                  <label className="labels">Продукт</label>
                      <select name="product" value={itemProd} onChange={handleProductChange}>
                                  {product.map(prod => (
                                      <option key={prod.id} value={prod.id}> {prod.name} </option>
                                  ))}
                      </select>
                      <label className="labels">Количество:</label>
                      <input
                      type="text"
                      placeholder="Количество товара"
                      value={itemCount}
                      onChange={(e) => setItemCount(parseInt(e.target.value,10))}
                  />
                  <label className="labels">Скидка на перевозку товара:</label>
                  <input
                      type="text"
                      placeholder="Скидка"
                      value={itemSale}
                      onChange={(e) => setItemSale(parseInt(e.target.value,10))}
                  />
                  
                  <button style={{marginLeft:"12px"}} onClick={handleAddItem}>Добавить товар в список</button>
                  {items.length > 0 && 
                    <>
                      <h2 >Список товаров</h2>
                      <table style={{marginBottom:"50px"}}>
                        <thead>
                          <tr>
                            <th>Продукт</th>
                            <th>Количество</th>
                            <th>Скидка</th>
                            <th>Общая цена</th>
                            <th>Действие</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, index) => (
                          <tr key={`${item.product}-${index}`}>
                            <td>{product.find(prod => prod.id === item.product)?.name}</td>
                            <td>{item.count}</td>
                            <td>{item.sale}</td>
                            <td>{item.total_price}</td>
                            <td>
                              <button onClick={() => handleSubmitProduct(lastTTN, item.product, item.count, item.total_price,item.sale, index)}>Добавить продукт в спецификацию</button>
                            </td>
                          </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  }
                  
                </div>
            
                <div>
    </div>
        
    </div>)
}