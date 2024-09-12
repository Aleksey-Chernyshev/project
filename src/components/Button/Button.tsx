import classes from './Button.module.css'
interface ButtonProps {
    children: React.ReactNode; // Тип для свойства children, принимающего любой дочерний элемент React
    onClick?: () => void; // Тип для свойства onClick, принимающего функцию без аргументов и возвращающую void. Знак ? указывает на то, что это свойство необязательно.
    isActive?: boolean; // Тип для свойства isActive, принимающего логическое значение true или false. Знак ? указывает на то, что это свойство необязательно.
    // ...props: любые другие свойства, которые могут быть переданы в компонент Button
}
export default function Button({children, onClick, isActive, ...props}: ButtonProps){
    return(
        <button
            {...props}
             className={isActive ? `${classes.button} ${classes.active}` : classes.button} 
            onClick={onClick}>{children}
        </button>
        
    )
}