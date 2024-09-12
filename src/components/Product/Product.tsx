import { useState } from "react"
import { IProduct } from "../../model"
import './Product.css'
import ModalTypeProduct from "../Modal/Modal"
import { deleteProduct, updatePrice } from "../../hooks/Product/createProduct"
interface IProductProps{
    product:IProduct
}

export default function Product({product}: IProductProps){
    const [editModal, setEditModal] = useState(false)
    const [price, setPrice] = useState(0)
    const closeEditModal = ()=> {
        setEditModal(false)
    }
    return(
        <>
            <div className="product">
                <div className="product-wrapper">
                    <div style={{fontWeight:"600", fontSize:"20px"}}>
                        {product.name}
                    </div>
                    <div >
                        {product.category}
                    </div>
                    <div>
                        Цена за перевозку в {product.ed_izm}: {product.price}р
                    </div>
                    <div>
                        Вес товара: {product.weight} 
                    </div>
                    
                    <div style={{display:"flex", position:"absolute", bottom:"10px"}}>
                        <button onClick={() => setEditModal(true)} style={{ marginRight:"5px"} }>Изменить</button>
                        <button onClick={() => deleteProduct(product.id)}>Удалить</button>
                    </div> 
                    
                </div>
                <ModalTypeProduct  active= {editModal} onClose={closeEditModal} style={{width:"500px", height:"400px"}}>
                    <div>
                        <h2>Что бы вы хотели изменить?</h2>
                        <div>Товар: {product.name}</div>
                        <div>Старая цена: {product.price}p</div>
                        <form>
                            <label>Введите новую цену</label>
                            <input className="input" name="price" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))}></input>
                            <button onClick={() => updatePrice(product.id, price)}>Изменить</button>
                        </form>
                    </div>
                </ModalTypeProduct>
            </div>
         </>
    )
}