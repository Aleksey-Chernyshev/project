import { Link, NavLink, Route, Routes } from "react-router-dom";
import MainPage from "../../Pages/MainPage/MainPage";
import ProductPage from "../../Pages/ProductPage/ProductPage";
import "./Header.css"
import TypeProductPage from "../../Pages/TypeProductPage/TypeProductPage";
import CustomerPage from "../../Pages/CustomerPage/CustomerPage";
import WorkStaffPage from "../../Pages/WorkStaffPage/WorkStaffPage";
import OrdersPage from "../../Pages/OrdersPage/OrdersPage";
import CreateOrderPage from "../../Pages/CreateOrderPage/CreateOrderPage";
export default function Header(){
    return(
        <>
        <header>
            
            <div style={{background:"rgb(200, 200, 233)"}}>
                <img style={{mixBlendMode:"multiply"}} src="https://img.freepik.com/premium-vector/trucking-company-logo-template_441059-262.jpg?w=740" width={150}/>
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? "page active" : "page")}>Главная</NavLink>
                    </li>
                    <li>
                        <NavLink to="/product" className={({ isActive }) => (isActive ? "page active" : "page")}>Товары</NavLink>
                    </li>
                    <li>
                        <NavLink to="/typeProduct" className={({ isActive }) => (isActive ? "page active" : "page")}>Tипы товаров</NavLink>
                    </li>
                    <li>
                        <NavLink to="/customer" className={({ isActive }) => (isActive ? "page active" : "page")}>Заказчики</NavLink>
                    </li>
                    <li>
                        <NavLink to="/workStaff" className={({ isActive }) => (isActive ? "page active" : "page")}>Рабочий персонал</NavLink>
                    </li>
                    <li>
                        <NavLink to="/orders" className={({ isActive }) => (isActive ? "page active" : "page")}>Заказы</NavLink>
                    </li>
                    <li>
                        <NavLink to="/create_order" className={({ isActive }) => (isActive ? "page active" : "page")}>Сформировать заказ</NavLink>
                    </li>
                </ul>
            </div>
            
        </header>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/typeProduct" element={<TypeProductPage />} />
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/workStaff" element={<WorkStaffPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/create_order" element={<CreateOrderPage />} />
            </Routes>
        </>
        
    )
}