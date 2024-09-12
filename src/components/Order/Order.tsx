import { ChangeEvent, useEffect, useState } from "react";
import { ICustomer, IDriver, IEmployee, IProduct, ISpecTTN, ITTN } from "../../model";
import { deleteTTN } from "../../hooks/TTN/createTTN";
import './Order.css'
import ModalTypeProduct from "../Modal/Modal";
import { deleteSpecTTN, updateSpecTTN } from "../../hooks/SpecTTN/createSpecTTN";

import { MdDeleteForever } from "react-icons/md";
type OrderProps = {
    ttnItem: ITTN
    driver: IDriver[];
    employee: IEmployee[];
    customer: ICustomer[];
    specTTN: ISpecTTN[];
    product: IProduct[];
    
  };
export default function Order({ ttnItem, driver, employee, customer, specTTN, product }: OrderProps){

const [selectedProduct, setSelectedProduct] = useState<ISpecTTN>();
const [selectedPrice, setSelectedPrice] = useState(0)
const [selectedSpec, setSelectedSpec] = useState(0)

const openModalWithProduct = (productId: number, specId: number) => {
  const productItem = product.find(prod => prod.id === productId)
  // const productToDisplay = specTTN.find(prod => prod.product_id === productId);
  const specToDisplay = specTTN.find(spec => spec.product_id === productId && spec.id === specId)
  setSelectedProduct(specToDisplay);
  // setSelectedProduct(productToDisplay);
  setSelectedSpec(specId)
  if(productItem) setSelectedPrice(productItem.price)
  setEditModal(true);
};

  const [editModal, setEditModal] = useState(false)
  const closeEditModal = () => {
      setEditModal(false);
  }

  const [newCount, setNewCount] = useState(0)
  const [newSale, setNewSale] = useState(0)

    const [totalPrices, setTotalPrices] = useState<{ [key: string]: number }>({})

    useEffect(() => {
        const totalPriceMap: { [key: string]: number } = {}
            let totalPrice = 0
            specTTN.filter(t => t.ttn_id === ttnItem.id).forEach(specItem => {
              const price = Number(specItem.total_price);
              if (!isNaN(price)) {
                  totalPrice += parseFloat(price.toFixed(2));
              }
            })
            totalPriceMap[ttnItem.id] = totalPrice
        setTotalPrices(totalPriceMap)
    }, [ttnItem, specTTN])

    const calculateFinalPrice = (price: number, count: number, sale: number) => {
      return (price - (price * sale * 0.01)) * count;
    };
    
const handleUpdateSpec = async (id: number, count: number, sale: number) => {
    if (id) {
      console.log(id)
      console.log(sale)

      const newTotalPrice = calculateFinalPrice(selectedPrice, count, sale);
      console.log(newTotalPrice)
      await updateSpecTTN(id, count, newTotalPrice, sale);
    }
};
    return(
        <div className="order-card">
            <div key={ttnItem.id}>
                <h2>Товарно - транспортная накладная №{ttnItem.id}</h2>
                <div style={{display:"flex"}}>
                    <div style={{marginRight:"7px"}}>
                        <div><span style={{fontWeight:"700", fontSize:"18px"}}>Водитель: </span> {driver.find(dr => dr.id === ttnItem.driver)?.fio}</div>
                        
                    </div>
                    <div style={{marginRight:"7px"}}>
                        <div><span style={{fontWeight:"700", fontSize:"18px"}}>Сотрудник: </span>{employee.find(emp => emp.id === ttnItem.employee)?.fio}</div>
                    </div>
                    <div><span style={{fontWeight:"700", fontSize:"18px"}}>Дата:</span> {new Date (ttnItem.registr_day).toLocaleDateString()}</div>
                </div>
                <p><span style={{fontWeight:"700", fontSize:"18px"}}>Заказчик: </span>{ttnItem.zakazchik}</p>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <div><span style={{fontWeight:"700"}}>Адрес: </span>{customer.find(cus => cus.zakazchik === ttnItem.zakazchik)?.adress}</div>
                    <div><span style={{fontWeight:"700"}}>Телефон: </span>{customer.find(cus => cus.zakazchik === ttnItem.zakazchik)?.phone}</div>
                    <div><span style={{fontWeight:"700"}}>Индекс: </span>{customer.find(cus => cus.zakazchik === ttnItem.zakazchik)?.index}</div>
                    <div><span style={{fontWeight:"700"}}>ИНН: </span>{customer.find(cus => cus.zakazchik === ttnItem.zakazchik)?.inn}</div>
                    <div><span style={{fontWeight:"700"}}>Расчетный счет: </span>{customer.find(cus => cus.zakazchik === ttnItem.zakazchik)?.rasch}</div>
                </div>
                <table style={{marginBottom:"50px", marginTop:"20px"}}>
                <thead>
                  <tr>
                    <th>Товар</th>
                    <th>Стоимость перевозки, р</th>
                    <th>Скидка, %</th>
                    <th>Количество</th>
                    <th>Окончательная цена, р</th>
                    <th>Единица измерения</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {specTTN.filter(t => t.ttn_id === ttnItem.id).map(specItem => (
                  <tr key={specItem.id}>
                    <td>{product.find(prod => prod.id === specItem.product_id)?.name}</td>
                    <td>{product.find(prod => prod.id === specItem.product_id)?.price}</td>
                    <td>{specItem.sale}</td>
                    <td>{specItem.count}</td>
                    <td>{specItem.total_price}</td>
                    <td>{product.find(prod => prod.id === specItem.product_id)?.ed_izm}</td>
                    <td><button onClick={() => openModalWithProduct(specItem.product_id, specItem.id)}>Изменить</button></td>
                  </tr>
                  ))}
                </tbody>
              </table>
              <div><span style={{fontWeight:"700"}}>Итоговая сумма с учетом скидки: </span>{totalPrices[ttnItem.id]} р</div>
              <div style={{display:"flex", marginTop:"12px"}}>
                <button onClick={() => deleteTTN(ttnItem.id)}>Удалить</button>
              </div>
            </div>
            
            <ModalTypeProduct active= {editModal} onClose={closeEditModal} style={{width:"500px", height:"500px"}}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <h2 style={{marginTop:"25px"}}>Что бы вы хотели изменить?</h2>
                    {selectedProduct && (
                      <>
                      <div>Старые данные: </div>
                      <div>Количество: {selectedProduct.count}</div>
                      <div>Скидка: {selectedProduct.sale}</div>

                        <form>
                            <h3>Напишите новые данные в спецификации для {product.find(prod => prod.id === selectedProduct.product_id)?.name}</h3>
                            <label>Новое количество</label>
                            <input className="input" type="text" name="count" value={newCount} onChange={(e) => setNewCount(parseInt(e.target.value, 10))} />
                            <label>Новая скидка</label>
                            <input className="input" type="text" name="sale" value={newSale} onChange={(e) => setNewSale(parseInt(e.target.value, 10))} />
                            <div style={{display:"flex"}}>
                              <button className="btn" type="button" onClick={() => handleUpdateSpec(selectedProduct.id, newCount, newSale)}>Изменить</button>
                              <button className="btn" type="button" onClick={() => deleteSpecTTN(selectedSpec)}><MdDeleteForever /></button>
                            </div>
                            
                        </form>
                      </>
                    )}
                </div>
            </ModalTypeProduct>
        
    </div>
    )
}