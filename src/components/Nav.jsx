import './Nav.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {House, Wallet,Crown, Store} from 'lucide-react';

const Nav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Memoiza para evitar recálculos desnecessários
    const currentPath = useMemo(() => {
        return location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');
    }, [location.pathname]);

    const isActive = (path) => {
        const checkPath = path === '/' ? '/' : path.replace(/\/$/, '');
        return currentPath === checkPath;
    };

    const handleNavClick = (e, path) => {
        e.preventDefault();
        
        // Só navega se não estiver na página atual
        if (!isActive(path)) {
            navigate(path);
        }
    };

    return (
        <div className="nav">
            <a
                href="/home" 
                className={'home-nav nav3'}
                onClick={(e) => handleNavClick(e, '/home')}
            >
                <div className='nav-icons'><House />Inicio</div>
            </a>
            <a
                href="/carteira" 
                className={'nav3'}
                onClick={(e) => handleNavClick(e, '/carteira')}
            >
                <div className='nav-icons'><Wallet />Carteira</div>
            </a>
            <a href=""
            className={'nav3'}
            onClick={(e) => handleNavClick(e, '/mercado')}
            >
                <div className='nav-icons'><Store />Mercado</div>
            </a>
            <a
                href="/ranking" 
                className={'nav3'}
                onClick={(e) => handleNavClick(e, '/ranking')}
            >
                <div className='nav-icons'><Crown />Ranking</div>
            </a>
        </div>
    )
}

export default Nav;