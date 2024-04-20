import { useTypeProduct } from "../../hooks/typeProduct/typeProduct";
import { Loader } from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useState } from "react";
import { createType } from "../../hooks/typeProduct/createTypeProduct";

export default function TypeProductPage(){

    const {typeProduct, loading, error} = useTypeProduct()
    // const [formData, setFormData] = useState({

    //     category:'hello',
    //     description:'',
    //     image:''
    // })
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    //   };
      const handleSubmit = () => {
        createType(category, description,image)
          .then(response => {
            console.log(response);
            // Обработка успешной отправки данных
          })
          .catch(error => {
            console.error('Error inserting data: ', error);
            // Обработка ошибки
          });
      };
    return(
        <div>
            {loading && <Loader/>}
            {error && <ErrorMessage error={error}/>}
            <h1>Type Products</h1>
            <ul>
                {typeProduct.map((typeProduct) => (
                    <li key={typeProduct.type_id}>
                        <div>Category: {typeProduct.category}</div>
                        <div>Description: {typeProduct.description}</div>
                        <div><img src={typeProduct.image} width={200} height={200}/></div>
                        <button>Edit</button>
                    </li>
                ))}
            </ul>
            <div>
                <form>
                    <label>Type</label>
                    <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <label>Description</label>
                    <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label>Image</label>
                    <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} />
                    <button type="button" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
        
    )
}