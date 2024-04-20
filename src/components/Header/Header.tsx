import { Link, Route, Routes } from "react-router-dom";
import MainPage from "../../Pages/MainPage/MainPage";
import ProductPage from "../../Pages/ProductPage/ProductPage";
import "./Header.css"
import TypeProductPage from "../../Pages/TypeProductPage/TypeProductPage";
export default function Header(){
    return(
        <>
        <header>
            <Link to="/">Main</Link>
            <Link to="/product">Product</Link>
            <Link to="/typeProduct">Type Product</Link>
        </header>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/typeProduct" element={<TypeProductPage />} />
            </Routes>
        </>
        
    )
}