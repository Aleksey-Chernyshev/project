import { useTypeProduct } from "../../hooks/typeProduct/typeProduct";
import { Loader } from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { ChangeEvent, useEffect, useState } from "react";
import { createType } from "../../hooks/typeProduct/createTypeProduct";
import ModalTypeProduct from "../../components/Modal/Modal";
import { TypeProduct } from "../../components/TypeProduct/typeProduct";
import './TypeProductPage.css'


export default function TypeProductPage(){

    const {typeProduct, loading, error} = useTypeProduct()

    const [addModal, setAddModal] = useState(false)
    const closeAddModal = () => {
        setAddModal(false);
    }
    // const [editModal, setEditModal] = useState(false)
    // const closeEditModal = () => {
    //     setEditModal(false);
    // }
    const [formData, setFormData] = useState({
        category:'',
        description:'',
        image:''
    })

    // const [category, setCategory] = useState('');
    // const [description, setDescription] = useState('');
    // const [image, setImage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
      };
      const handleSubmit = () => {
        createType(formData.category, formData.description,formData.image)
          .then(response => {
            closeAddModal();
            console.log(response);
          })
          .catch(error => {
            console.error('Error inserting data: ', error);
          });
      };

    return(
        <div>
            {loading && <Loader/>}
            {error && <ErrorMessage error={error}/>}
            <h1 className="title">Типы товаров</h1>

            <div className="typeProduct">
                {typeProduct.map(type => <TypeProduct typeProduct = {type} key={type.type_id}/>)}
            </div>
            <button className="add" onClick={() => setAddModal(true)}>+</button>

            <ModalTypeProduct active = {addModal} onClose={closeAddModal}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1>Добавить тип</h1>
                    <form style={{ width: '350px', maxWidth: '100%', fontWeight:"600" }}>
                        <label>Категория</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} />
                        <label>Описание</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} />
                        <label>Изображение</label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange} />
                        <button type="button" onClick={handleSubmit}>Добавить</button>
                    </form>
                </div>
            </ModalTypeProduct>
        </div>
        
    )
}