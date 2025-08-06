import { useState, useRef, useEffect } from 'react';
import CarrosselPQ from '../components/CarrosselPQ';
import logoNav from '../assets/logoNav.svg';
import iconUser from '../assets/iconUser.svg';
import { Link } from 'react-router-dom';
import iconCarrinho from '../assets/iconCarrinho.svg';
import iconLupa from '../assets/iconLupa.svg';
import iconMenu from '../assets/iconMenu.svg';

function NavBar() {
  const [isCategoriasOpen, setCategoriasOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false); // Novo estado para controlar o "travamento"
  const dropdownRef = useRef(null);

  // Fechar o dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoriasOpen(false);
        setIsLocked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    if (isLocked) {
      // Se já está travado, fecha
      setCategoriasOpen(false);
      setIsLocked(false);
    } else {
      // Se não está travado, abre e trava
      setCategoriasOpen(true);
      setIsLocked(true);
    }
  };

  const handleMouseEnter = () => {
    if (!isLocked) {
      setCategoriasOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isLocked) {
      setCategoriasOpen(false);
    }
  };

  return (
    <div>
      <CarrosselPQ />

      <div className='h-30 flex flex-col justify-start items-center gap-3 shadow-xl'>

        {/* Primeira linha */}
        <div className='flex justify-around items-center w-full p-3'>

          {/* Input de busca */}
          <div className="relative w-[300px]">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full py-1 px-4 pr-10 border border-blackwhite/30 rounded-full focus:outline-none"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              <img src={iconLupa} alt="" />
            </span>
          </div>

          {/* Logo */}
          <div>
            <img src={logoNav} alt="" />
          </div>

          {/* Ícones de usuário */}
          <div className='flex justify-around w-45 items-center'>
            <Link><img src={iconUser} alt=""/></Link>
            <div className='flex flex-col text-sm text-blackwhite/80 font-primary'>
              <p>Olá,</p>
              <p>Nome Cliente</p>
            </div>
            <Link><img src={iconCarrinho} alt="" /></Link>
          </div>
        </div>

        {/* Menu de navegação */}
        <div className='relative font-primary text-blackwhite/90 flex gap-12 justify-center items-start text-sm w-full'>

          {/* Item com mega dropdown */}
          <div 
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='relative flex gap-1 hover:text-purpledark active:text-purpledark transition-colors'
          >
            <button 
              onClick={handleClick}
              className="flex gap-1 items-center focus:outline-none"
            >
              <img src={iconMenu} alt="" />
              <p>Todas as Categorias</p>
            </button>

            {isCategoriasOpen && (
              <div 
                className="absolute h-65 top-full left-0 mt-2 w-[1235px] bg-white shadow-xl rounded-b-1xl p-6 flex justify-between z-50"
                onClick={(e) => e.stopPropagation()} // Previne fechar ao clicar dentro do dropdown
              >
                <div>
                  <img
                    src="https://cdn.pixabay.com/photo/2021/06/10/08/39/massage-6323955_1280.jpg"
                    alt="Faciais"
                    className="w-24 mb-3 rounded-lg"
                  />
                  <h3 className="text-purpledark font-semibold text-sm mb-2">Faciais</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li><a href="#">Peel Of Mask</a></li>
                    <li><a href="#">Ice Globes</a></li>
                  </ul>
                </div>

                <div className="w-[220px]">
                  <img
                    src="https://cdn.pixabay.com/photo/2017/01/20/15/06/girl-1990347_1280.jpg"
                    alt="Make"
                    className="rounded-xl mb-3"
                  />
                  <h4 className="text-purpledark text-xs font-bold uppercase">MAKE</h4>
                  <p className="text-gray-700 text-sm">Clean Makeup: como fazer uma maquiagem natural</p>
                </div>
              </div>
            )}
          </div>

          {/* Demais links */}
          <Link className='hover:text-purpledark active:text-purpledark transition-colors '>Promoções</Link>
          <Link className='hover:text-purpledark active:text-purpledark transition-colors '>Pedidos</Link>
          <Link className='hover:text-purpledark active:text-purpledark transition-colors '>Mais vendidos</Link>
          <Link className='hover:text-purpledark active:text-purpledark transition-colors '>Rastreio</Link>
          <Link className='hover:text-purpledark active:text-purpledark transition-colors '>Queima de estoque</Link>
          <Link className='hover:text-purpledark active:text-purpledark transition-colors '>SKYNS ideal para sua pele</Link>
          <Link className='hover:text-purpledark active:text-purpledark transition-colors '>Feedback</Link>
          <Link className='hover:text-purpledark active:text-purpledark transition-colors '>Lojas físicas</Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;