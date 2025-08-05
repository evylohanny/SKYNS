import CarrosselPQ from '../components/CarrosselPQ';
import logoNav from '../assets/logoNav.svg';
import iconUser from '../assets/iconUser.svg';
import { Link } from 'react-router-dom';
import iconCarrinho from '../assets/iconCarrinho.svg';
import iconMenu from '../assets/iconMenu.svg';

function NavBar() {
  return (
    <div>
      <CarrosselPQ />
      <div className='h-30 flex flex-col justify-center items-start '>

        <div className='flex justify-around items-center w-400 bg-pink'>
            <div>
                <input type="text" />
            </div>
            <div>
                <img src={logoNav} alt="" />
            </div>
            <div className='flex justify-around w-45 items-center'>
                <Link>
                  <img src={iconUser} alt=""/>
                </Link>
                <div className='flex flex-col text-sm text-blackwhite/80 font-primary'>
                  <p>Olá,</p>
                  <p>Nome Cliente</p>
                </div>
                <Link>
                  <img src={iconCarrinho} alt="" />
                </Link>
            </div>
        </div>

        {/* <div className='font-primary font-blackwhite/90 flex gap-10 items-start text-sm w-300'>
            <div className='flex gap-1 '>
                <img src={iconMenu} alt="" />
                <p>Todas as Categorias</p>
            </div>
            <Link>Departamento</Link>
            <Link>Departamento</Link>
            <Link>Departamento</Link>
            <Link>Departamento</Link>
            <Link>Departamento</Link>
            <Link>Departamento</Link>
            <Link>Departamento</Link>
            <Link>Departamento</Link>
        </div> */}
      </div>
    </div>
  )
}

export default NavBar
