import Button from "../Button/Button";


interface TabsSectionProps{
    active: string;
    onChange: (tab:string) => void
}
export default function TabsSection({active, onChange}: TabsSectionProps){
    return(
        <section style={{ marginBottom: '1rem' }}>
            <Button isActive={active === 'employee'} onClick={() => onChange('employee')}>Сотрудник</Button>
            <Button isActive={active === 'driver'} onClick={() => onChange('driver')}>Водитель</Button>
        </section>
    )
}