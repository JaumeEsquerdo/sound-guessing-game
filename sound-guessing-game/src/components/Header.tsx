import '../css/header.css'
import { LiquidGlassCard } from './LiquidGlassCard';

const Header = () => {
    return (
        <LiquidGlassCard containerStyle={{display:"grid", gridTemplateColumns:"1fr", justifyItems:"center", gap: "16px"}}>
                <h1 className="Header-h1">Adivina el <span className='Header-span'>animal</span></h1>
                <h2 className='Header-h2'>Escucha y elige al animal correcto</h2>
        </LiquidGlassCard>
    );
}

export default Header;