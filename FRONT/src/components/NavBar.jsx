import { useState, useRef, useEffect } from 'react';
import CarrosselPQ from '../components/CarrosselPQ';
import logoNav from '../assets/logoNav.svg';
import iconUser from '../assets/iconUser.svg';
import { Link } from 'react-router-dom';
import iconCarrinho from '../assets/iconCarrinho.svg';
import iconLupa from '../assets/iconLupa.svg';
import iconMenu from '../assets/iconMenu.svg';
import testFoto from '../assets/testFoto.svg'
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [isCategoriasOpen, setCategoriasOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate()
  
  const links =[
            "Promoções",
            "Pedidos",
            "Mais vendidos",
            "Rastreio",
            "SKYNS ideal para sua pele",
            "Feedback",
            "Lojas físicas",
          ]

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
  
  const caminho = (index) => {

    if(index == 1){

      navigate("/pedidos")
    }
  }
  const handleClick = () => {
    if (isLocked) {
      setCategoriasOpen(false);
      setIsLocked(false);
    } else {
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

  const perfil = () => {
    navigate("/perfil")
  }

  return (
    <div className='w-full h-40'>
      <div className='w-full h-40 fixed top-0 left-0 bg-white z-999'>

      <CarrosselPQ />

      <div className='h-28 flex flex-col justify-start items-center gap-3 shadow-xl'>

        <div className='flex justify-center gap-65 items-center w-full p-3'>

          <div className="relative w-[300px]">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full py-1 px-4 pr-10 border border-blackwhite/30 rounded-full focus:outline-none 
              focus:border-purpledark focus:border-1 placeholder-blackwhite/70 placeholder:font-medium"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              <img src={iconLupa} alt="" />
            </span>
          </div>

          <div className='pr-5'>
            <img src={logoNav} alt="" />
          </div>

          <div className='flex justify-around w-40 items-center'>
            <Link onClick={perfil}><img src={iconUser} alt=""/></Link>
            <div className='flex flex-col text-sm text-blackwhite/80 font-primary'>
              <p>Olá,</p>
              <p>Nome Cliente</p>
            </div>
            <Link><img src={iconCarrinho} alt="" className='pl-3'/></Link>
          </div>
        </div>

        <div className='relative font-primary text-blackwhite/90 flex gap-12 justify-center items-start text-sm w-full'>

          <div 
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='relative flex gap-1'
            >
            <button 
              onClick={handleClick}
              className="flex gap-1 items-center focus:outline-none"
              >
              <img src={iconMenu} alt="" />
              <p
                className={`
                  relative text-sm transition-colors
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-purpledark after:transition-all after:duration-300
                  ${isLocked ? 'text-purpledark after:w-full' : 'text-blackwhite/90 hover:text-purpledark after:w-0 hover:after:w-full'}
                  `}
                  >
                Todas as Categorias de peles
              </p>
            </button>

            {isCategoriasOpen && (
              <div 
              className="absolute h-65 top-full left-0 mt-6 w-[1235px] bg-white shadow-xl p-3 flex justify-between z-50"
              onClick={(e) => e.stopPropagation()}
              >
                <div className='w-[30%] text-sm text-blackwhite/90 p-4 flex flex-col gap-2'>
                  <Link className='hover:text-purpledark transition-colors'>Pele Acneica</Link>
                  <Link className='hover:text-purpledark transition-colors'>Pele Seca</Link>
                  <Link className='hover:text-purpledark transition-colors'>Pele Oleosa</Link>
                  <Link className='hover:text-purpledark transition-colors'>Pele Madura</Link>
                </div>

                <div className="w-[70%] flex flex-row justify-end gap-5">
                  <img
                    src={testFoto}
                    alt=""
                    className=""
                  />
                  <img
                    src={testFoto}
                    alt=""
                    className=""
                    />
                  <img
                    src={testFoto}
                    alt=""
                    className=""
                  />
                  <img
                    src={testFoto}
                    alt=""
                    className=""
                  />
                </div>
              </div>
            )}
          </div>

          {links.map((text, index) => (
            <Link
            onClick={() => caminho(index)}
            key={index}
            className="relative text-sm text-blackwhite/90 hover:text-purpledark transition-colors
            after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full 
            after:bg-purpledark after:transition-all after:duration-300"
            >
              {text}
            </Link>
          ))}

        </div>
      </div>
      </div>
    </div>
  );
}

export default NavBar;
