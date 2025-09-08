import { useState } from 'react';
import clsx from 'clsx';
import CarrosselPQ from '../components/CarrosselPQ';

import logo from '../assets/logo.svg';
import pendentIcon from '../assets/pendent.svg';
import concluido from '../assets/concluído.svg';
import processo from '../assets/processo.svg';
import processoConcluido from '../assets/processo2.svg';
import montagem from '../assets/montagem.svg';
import montagemConcluido from '../assets/montagem2.svg';
import expedicao from '../assets/expedicao.svg';
import expedicaoConcluido from '../assets/expedicao2.svg';

function Rastreio() {

    const [currentPhase, setCurrentPhase] = useState('Estoque');
    const phases = ['Estoque', 'Processo', 'Montagem', 'Expedição'];

    const changePhase = (phase) => setCurrentPhase(phase);

  return (
    <div className='h-full w-full flex flex-col'>
        <div className='w-full h-fit flex flex-col'>
            <CarrosselPQ />
            <div className='w-full h-22 flex items-center justify-center shadow-xl'>
                <img src={logo} alt="" />
            </div>
        </div>
        <div className='w-fit ml-80 mr-80 mt-30 h-full flex flex-col'>
            <div className='w-full h-10 flex items-center justify-center'>
                <div className='font-secondary font-medium text-gray2 text-3xl text-start w-125'>Produção</div>
                <div className='font-semibold flex gap-1 text-purpledark text-[1.3rem] items-center justify-end text-end w-130'><img src={pendentIcon} alt='Ícone de pendente' />Pendente</div>
            </div>
            <div>
                <div className='flex gap-[10%] items-center justify-center mt-15'>
                    <div className='flex flex-col items-center justify-center'>
                        <img onClick={() => changePhase('Estoque')} src={concluido} />
                        <p className='text-center font-semibold text-[1rem] text-purpledark'>Estoque</p>
                    </div>
                    <div>
                        <img onClick={() => changePhase('Processo')} src={currentPhase === 'Processo' ? processoConcluido : currentPhase === 'Montagem' || currentPhase === 'Expedição' || currentPhase === 'Completed' ? concluido : processo} />
                        <p className={clsx('text-center font-semibold text-[1rem]', currentPhase !== 'Estoque' ? 'text-purpledark' : 'text-gray2')}>Processo</p>
                    </div>
                    <div>
                        <img onClick={() => changePhase('Montagem')} src={currentPhase === 'Montagem' ? montagemConcluido : currentPhase === 'Expedição' || currentPhase === 'Completed' ? concluido : montagem} />
                        <p className={clsx('text-center font-semibold text-[1rem]', currentPhase !== 'Estoque' && currentPhase !== 'Processo' ? 'text-purpledark' : 'text-gray2')}>Montagem</p>
                    </div>
                    <div>
                        <img onClick={() => changePhase('Expedição')} src={currentPhase === 'Expedição' ? expedicaoConcluido : currentPhase === 'Completed' ? concluido : expedicao} />
                        <p className={clsx('text-center font-semibold text-[1rem]', currentPhase === 'Expedição' || currentPhase === 'Completed' ? 'text-purpledark' : 'text-gray2')}>Expedição</p>
                    </div>
                </div>
                <div className='mt-10'>
                    <progress className='w-full h-1 border-0 rounded-full 
         [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-gray 
         [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-purpledark from-purple to-purpledark 
         [&::-moz-progress-bar]:bg-purpledark' value={50} max={100}></progress>
                </div>
            </div>
            <div>
                <p>Olá, Manassés!</p>
            </div>
            <div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Rastreio;