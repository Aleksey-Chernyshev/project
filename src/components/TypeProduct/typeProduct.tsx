import { useState } from "react";
import { ITypeProduct } from "../../model"
import ModalTypeProduct from "../Modal/Modal";
import { deleteType, updateDesc } from "../../hooks/typeProduct/createTypeProduct";
import './typeProduct.css'

interface TypeProductProps{
    typeProduct: ITypeProduct
}
export function TypeProduct({typeProduct}: TypeProductProps){
    const [editModal, setEditModal] = useState(false)
    const closeEditModal = () => {
        setEditModal(false);
    }
    const [description, setDescription] = useState('');

    return(
        <div className="typeProduct">
            <div className="typeProduct-wrapper">
                <div className="content-type">
                    <div><img src={typeProduct.image} width={200} height={200}/></div>
                    <div className="content-desc">
                        <div className="category">Категория: {typeProduct.category}</div>
                        <div><a className="desc">Описание: </a>{typeProduct.description}</div>

                        <div className="buttons">
                            <button className="btn" onClick={() => setEditModal(true)}>Редактировать</button>
                            <button className="btn" onClick={() => deleteType(typeProduct.type_id)}>Удалить</button>
                        </div>

                    </div>
                </div>
                
                
 
            </div>
            
            <ModalTypeProduct active= {editModal} onClose={closeEditModal}>
                <div>
                    <h2>Что бы вы хотели изменить?</h2>
                    <div style={{width:"400px"}}>Старое описание: {typeProduct.description}</div>
                    <div style={{display: 'flex', marginTop:'20px'}}>
                        <div style={{marginRight: '20px'}}><img src={typeProduct.image} width={200} height={200}/></div>

                        <form>
                            <h3>Напишите новые значения типа продукта</h3>
                            <h4>Новое описание</h4>
                            <input className="input" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <button className="btn" type="button" onClick={() => updateDesc(typeProduct.type_id, description)}>Изменить</button>
                        </form>
                    </div>
                    
                </div>
            </ModalTypeProduct>
        </div>
    )
}