import Order from "../../components/Order/Order";
import { useCustomer } from "../../hooks/Customer/customer";
import { useDriver } from "../../hooks/Driver/driver";
import { useEmployee } from "../../hooks/Employee/employee";
import { useProduct } from "../../hooks/Product/product";
import { useSpecTTN } from "../../hooks/SpecTTN/specTTN";
import { useTTN } from "../../hooks/TTN/ttn";
import './MainPage.css'

export default function MainPage(){
    const { ttn, loading, error } = useTTN();
    const { driver } = useDriver();
    const { employee } = useEmployee();
    const { specTTN } = useSpecTTN();
    const { product } = useProduct();
    const { customer } = useCustomer();

    const firstFiveTtn = ttn.slice(-2);

    return(
        <>

            <div className="img-fon">
                <div className="info">Мы - лидер на рынке в своей области!</div>
            </div>
            <h1 style={{textAlign:"center"}}>Наши последние заказы</h1>
            <div style={{margin:"20px 40px 20px 40px"}}>
                {firstFiveTtn.map(ttnItem => (
                    <Order
                        key={ttnItem.id}
                        ttnItem={ttnItem}
                        driver={driver}
                        employee={employee}
                        customer={customer}
                        specTTN={specTTN}
                        product={product}
                    />
                ))}
            </div>
        </>
    );
}