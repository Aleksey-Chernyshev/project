export interface ITypeProduct{
    type_id: number,
    category:string,
    description: string,
    image: string
}
export interface IProduct{
    id:number,
    name: string,
    type_id: number,
    weight: number,
    price: number,
    category?:string,
    ed_izm?:string

}
export interface IEdIzm{
    id:number,
    ed_izm: string
}

export interface ICustomer{
    id: number,
    zakazchik: string,
    adress: string,
    phone: string,
    index: string,
    inn: string,
    rasch: string
}
export interface IDriver{
    id:number,
    fio: string,
    birthday: Date,
    work_phone:string,
    work_day: Date,
    home_phone: string,
    pasport: string,
    adress:string,
    dr_license: string,
    photo: string
}
export interface IEmployee{
    id:number,
    fio: string,
    home_phone: string,
    work_day: Date,
    birthday: Date,
    pasport: string,
    photo: string,
    work_phone: string, 
    adress: string
}
export interface ITTN{
    id: number,
    zakazchik: string,
    driver: number,
    employee: number,
    registr_day: Date
    
}
export interface ISpecTTN{
    id: number,
    ttn_id: number,
    product_id: number,
    count: number,
    total_price: number,
    sale:number,
    name?: string
}