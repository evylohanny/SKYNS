import iconLogoG from '../assets/iconLogoG.svg';
import iconSair from '../assets/iconSair.svg';
import iconDoc from '../assets/iconDoc.svg';
import iconDash from '../assets/iconDash.svg';
import iconPro from '../assets/iconPro.svg';

function Gestão() {
  return (
    <div>
      <div className='flex flex-row justify-between font-tertiary p-5 px-20 w-full shadow-md'>
        <img src={iconLogoG} alt="" />
        <div className='flex flex-row justify-center items-center gap-1.5'>
            <img src={iconSair} alt="" />
            <p className='text-purpledark font-semibold'>Sair</p>
        </div>
      </div>
      <div className='flex flex-col w-[18%] p-5 font-tertiary gap-3'>
        <div className='flex flex-col gap-3'>
          <p className='text-blueG text-sm'>Acompanhar</p>
          <div className='flex flex-row gap-2 bg-graylight justify-center items-center p-2 rounded-md'>
            <img src={iconDoc} alt="" />
            <p className='text-purpledark font-semibold text-sm'>Folha de acompanhamento</p>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='text-blueG text-sm'>Análise</p>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 bg-graylight justify-start items-center p-2 rounded-md px-5'>
              <img src={iconDash} alt="" />
              <p className='text-purpledark font-semibold text-sm'>Dashboard</p>
            </div>
            <div className='flex flex-row gap-2 bg-graylight justify-start items-center p-2 rounded-md px-5'>
              <img src={iconPro} alt="" />
              <p className='text-purpledark font-semibold text-sm'>Cadastro produto</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gestão
