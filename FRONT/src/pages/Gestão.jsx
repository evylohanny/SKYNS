import { useState } from 'react';
import iconLogoG from '../assets/iconLogoG.svg';
import iconSair from '../assets/iconSair.svg';
import iconDoc from '../assets/iconDoc.svg';
import iconDash from '../assets/iconDash.svg';
import iconPro from '../assets/iconPro.svg';
import Dashboard from '../components/Dashboard';
import FolhaA from '../components/FolhaA';
import CadastroPro from '../components/CadastroPro';
import Sugestão from '../components/Sugestão';

function Gestão() {
  const [componenteAtivo, setComponenteAtivo] = useState('dashboard'); 
  // valores possíveis: 'dashboard', 'folha', 'cadastro'

  const renderComponente = () => {
    switch (componenteAtivo) {
      case 'folha':
        return <FolhaA />;
      case 'cadastro':
        return <CadastroPro />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <div className='flex flex-row justify-between font-tertiary p-5 px-18 w-full shadow-md'>
        <img src={iconLogoG} alt="" />
        <div className='flex flex-row justify-center items-center gap-1.5'>
            <img src={iconSair} alt="" />
            <p className='text-purpledark font-semibold'>Sair</p>
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-col w-[18%] p-5 font-tertiary gap-3'>
        <div className='flex flex-col gap-3'>
          <p className='text-blueG text-sm'>Acompanhar</p>
          <div onClick={() => setComponenteAtivo('folha')}
              className={`flex flex-row gap-2 justify-center items-center p-2 rounded-md cursor-pointer ${
                componenteAtivo === 'folha' ? 'bg-graylight' : ''
              }`}>
            <img src={iconDoc} alt="" />
            <p className='text-purpledark font-semibold text-sm'>Folha de acompanhamento</p>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='text-blueG text-sm'>Análise</p>
          <div className='flex flex-col gap-2'>
            <div onClick={() => setComponenteAtivo('dashboard')}
                className={`flex flex-row gap-2 justify-start items-center p-2 rounded-md px-5 cursor-pointer ${
                  componenteAtivo === 'dashboard' ? 'bg-graylight' : ''
                }`}>
              <img src={iconDash} alt="" />
              <p className='text-purpledark font-semibold text-sm'>Dashboard</p>
            </div>
            <div onClick={() => setComponenteAtivo('cadastro')}
                className={`flex flex-row gap-2 justify-start items-center p-2 rounded-md px-5 cursor-pointer ${
                  componenteAtivo === 'cadastro' ? 'bg-graylight' : ''
                }`}>
              <img src={iconPro} alt="" />
              <p className='text-purpledark font-semibold text-sm'>Cadastro produto</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[82%]'>
        {/* {renderComponente()} */}
        <Sugestão />
      </div>
      </div>
    </div>
  )
}

export default Gestão
