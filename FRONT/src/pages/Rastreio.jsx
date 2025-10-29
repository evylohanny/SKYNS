import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ky from 'ky';
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
import completed from '../assets/completed.svg';
import { useEffect } from 'react';

function Rastreio() {

    const [currentPhase, setCurrentPhase] = useState('');
    const navigate = useNavigate();

    const changePhase = (phase) => setCurrentPhase(phase);
    const { id } = useParams();

    useEffect(() => {

        const getProductState = () => {

            try {

                const response = ky.get(`http://localhost:3000/rastreio/${id}`).json();

                if (!response) {

                  return console.log('Erro na busca do status do pedido!');
                };

                console.log(response.status)
                setCurrentPhase(response.status);
            } catch (error) {
                
                console.log('Erro interno do servidor', error);
            }
        };
        getProductState();
    }, []);

  return (
    <div className='h-full w-full flex flex-col items-center'>
        <div className='w-full h-fit flex flex-col'>
            <CarrosselPQ />
            <div className='w-full h-22 flex items-center justify-center border-b-[0.5px] border-b-gray'>
                <img className='cursor-pointer' onClick={() => navigate('/')} src={logo} alt="" />
            </div>
        </div>
        <div className='w-295 mt-20 h-full flex flex-col'>
            <div className='w-full h-10 flex items-center justify-center gap-[60%]'>
                <div className='font-secondary font-medium text-gray2 text-3xl opacity-66 text-start'>Processo</div>
                <div className={clsx('font-semibold flex items-center justify-center gap-1 text-[1.3rem] text-end', currentPhase !== 'Completed' ? 'text-purpledark' : 'text-greendark')}>
                    <img className='w-7 h-7' src={currentPhase === 'Completed' ? completed : pendentIcon} alt='Ícone de pendente' />
                    {
                        currentPhase === 'Completed'
                        ?
                        <>
                        Concluído
                        </>
                        :
                        <>
                        Pendente
                        </>
                    }
                </div>
            </div>
            <div>
                <div className='flex gap-[7%] w-full h-30 items-center justify-center mt-25'>
                    <div className='w-30 h-30 flex flex-col justify-end items-center'>
                        <img className='w-[125px] h-[125px]' onClick={() => changePhase('Estoque')} src={concluido} />
                        <p className='text-center font-semibold text-[1rem] text-purpledark'>Estoque</p>
                    </div>
                    <div className='w-30 h-30 flex flex-col justify-end items-center'>
                        <img className='w-[125px] h-[125px]' onClick={() => changePhase('Processo')} src={currentPhase === 'Processo' ? processoConcluido : currentPhase === 'Montagem' || currentPhase === 'Expedição' || currentPhase === 'Completed' ? concluido : processo} />
                        <p className={clsx('text-center font-semibold text-[1rem]', currentPhase !== 'Estoque' ? 'text-purpledark' : 'text-gray2 opacity-66')}>Processo</p>
                    </div>
                    <div className='w-30 h-30 flex flex-col justify-end items-center'>
                        <img className='w-[125px] h-[125px]' onClick={() => changePhase('Montagem')} src={currentPhase === 'Montagem' ? montagemConcluido : currentPhase === 'Expedição' || currentPhase === 'Completed' ? concluido : montagem} />
                        <p className={clsx('text-center font-semibold text-[1rem]', currentPhase !== 'Estoque' && currentPhase !== 'Processo' ? 'text-purpledark' : 'text-gray2 opacity-66')}>Montagem</p>
                    </div>
                    <div className='w-30 h-30 flex flex-col justify-end items-center'>
                        <img className='w-[125px] h-[125px]' onClick={() => changePhase('Completed')} src={currentPhase === 'Expedição' ? expedicaoConcluido : currentPhase === 'Completed' ? concluido : expedicao} />
                        <p className={clsx('text-center font-semibold text-[1rem]', currentPhase === 'Expedição' || currentPhase === 'COMPLETED' ? 'text-purpledark' : 'text-gray2 opacity-66')}>Expedição</p>
                    </div>
                </div>
                <div className='mt-10 flex items-center justify-center'>
                    <progress className='w-[80%] h-1.5 border-0 rounded-full 
         [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-gray 
         [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-purpledark from-purple to-purpledark 
         [&::-moz-progress-bar]:bg-purpledark' value={currentPhase === 'Estoque' ? 25 : currentPhase === 'Processo' ? 50 : currentPhase === 'Montagem' ? 75 : 100} max={100}></progress>
                </div>
            </div>
            <div className='w-full flex flex-col items-center'>
                <div className='bg-[#FEF5FF] flex items-center p-5 mt-10 w-[80%] h-14 font-medium  rounded-2xl'>
                    <p className='pl-5 text-purpledark font-medium text-[20px]'>
                        Olá, Manassés! Estamos preparando o seu pedido.
                    </p>
                </div>
            </div>
            <div className='w-full h-30 flex items-end justify-center'>
                <div className='flex flex-col text-xl font-semibold w-[40%] text-start'>
                    <div className='flex text-gray2 opacity-66 gap-3'>
                        Tempo de produção:
                        <h1 className='text-purpledark'>
                            00:00:26
                        </h1>
                    </div>
                    <div className='flex text-gray2 opacity-66 gap-3'>
                        Ordem de produção:
                        <h1 className='text-purpledark'>
                            5588
                        </h1>
                    </div>
                </div>
                <div className='flex w-[40%] items-end justify-end cursor-pointer'>
                    <div onClick={() => navigate(-1)} className='text-purpledark text-[1.1rem] font-semibold border-2 border-purpledark rounded-xl pt-2 pb-2 pl-10 pr-10 hover:text-white hover:bg-purpledark transition 5s'>
                        FECHAR
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Rastreio;