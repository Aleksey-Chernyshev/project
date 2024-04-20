import './ErrorMessage.css'
interface IError{
    error: string
}
export default function Error({error}: IError){
    return <div className="error">{error}</div>
}