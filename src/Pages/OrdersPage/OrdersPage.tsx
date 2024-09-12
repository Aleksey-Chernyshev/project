import { useEffect, useState } from "react"
import { useCustomer } from "../../hooks/Customer/customer"
import { useDriver } from "../../hooks/Driver/driver"
import { useEmployee } from "../../hooks/Employee/employee"
import { useProduct } from "../../hooks/Product/product"
import { useSpecTTN } from "../../hooks/SpecTTN/specTTN"
import { useTTN } from "../../hooks/TTN/ttn"
import './OrdersPage.css'
import Order from "../../components/Order/Order"
export default function OrdersPage(){
    const{ttn, loading, error} = useTTN()
    const{driver} = useDriver()
    const{employee} = useEmployee()
    const{specTTN} = useSpecTTN()
    const {product} = useProduct()
    const{customer} = useCustomer()

    return(
        <div style={{margin:"20px 40px 20px 40px"}}>
            {ttn.map(ttnItem => (
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
    )
}