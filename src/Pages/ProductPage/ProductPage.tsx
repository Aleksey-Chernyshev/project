import { useState } from "react";
import Header from "../../components/Header/Header";
import Product from "../../components/Product/Product";
import { useProduct } from "../../hooks/Product/product";
import { IProduct } from "../../model";
import './ProductPage.css'
import ModalTypeProduct from "../../components/Modal/Modal";
import { useEdIzm } from "../../hooks/EdIzm/edIzm";
import { useTypeProduct } from "../../hooks/typeProduct/typeProduct";
import { createProduct } from "../../hooks/Product/createProduct";
import { Loader } from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function ProductPage(){
    const {product, loading, error} = useProduct()
    const [AddModal, setAddModal] = useState(false)
    const{ ed } = useEdIzm()
    const { typeProduct } = useTypeProduct()
    const closeAddModal = () => {
        setAddModal(false)
    }

    const [name, setName] = useState('')
    const [category, setCategory] = useState(1)
    const [edIzm, setEdIzm] = useState(1)
    const [price, setPrice] = useState(1)
    const [weight, setWeight] = useState(1)


    const handleSubmit = () => {
        createProduct(name, weight, price,category,edIzm)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error('Error inserting data: ', error);
          });
      };

    return(
        <div className="container">
            {loading && <Loader/>}
            {error && <ErrorMessage error={error}/>}
            <h1 style={{textAlign:"center"}}>Товары</h1>
            <div className="prod-wrapper">
                {product.map(prod => <Product product={prod} key={prod.id}/>)}
            </div>
            <button className="add" onClick={() => setAddModal(true)}>+</button>


            <ModalTypeProduct active= {AddModal} onClose={closeAddModal}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{textAlign: "center"}}>Добавить продукт</h2>
                    <form style={{ width: '350px', maxWidth: '100%', fontWeight:"600" }}>
                        
                        <label>Наименование</label>
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <label>Категория</label>
                        <select name="category" value={category} onChange={(e) => setCategory(parseInt(e.target.value, 10))}>
                            {typeProduct.map(type => (
                                <option key={type.type_id} value={type.type_id}> {type.category} </option>
                            ))}
                        </select>
                        <label>Единица измерения</label>
                        <select name="ed" value={edIzm} onChange={(e) => setEdIzm(parseInt(e.target.value, 10))}>
                            {ed.map(ed => (
                                <option key={ed.id} value={ed.id}> {ed.ed_izm} </option>
                            ))}
                        </select>
                        <label>Цена за перевозку</label>
                        <input name="price" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))}></input>
                        <label >Вес товара</label>
                        <input name="weight" value={weight} onChange={(e) => setWeight(parseInt(e.target.value, 10))}></input>
                        <button style={{marginTop:"15px"}} type="button" onClick={handleSubmit}>Добавить</button>
                    </form>
                </div>
            </ModalTypeProduct>
        </div>
    )
}