import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ky from 'ky';
import clsx from 'clsx';
import CarrosselPQ from '../components/CarrosselPQ';

import logo from '../assets/logo.svg';
import pendentIcon from '../assets/pendent.svg';
import concluido from '../assets/concluído.svg'; // Ícone de check roxo (Concluído)
import processo from '../assets/processo.svg'; 
import montagem from '../assets/montagem.svg'; 
import expedicao from '../assets/expedicao.svg'; 
import completed from '../assets/completed.svg'; 

// Definição das fases para controle da barra de progresso
const phases = {
    'ESTOQUE': 1,
    'PROCESSO': 2,
    'MONTAGEM': 3,
    'EXPEDIÇÃO': 4,
    'COMPLETED': 5
};

function Rastreio() {
    const [currentPhase, setCurrentPhase] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // 1. CÁLCULO SEGURO DO ÍNDICE DA FASE
    const phaseIndex = phases[currentPhase.toUpperCase()] || 0;

    // 2. FUNÇÃO DE CÁLCULO DO PROGRESSO
    const calculateProgressValue = () => {
        if (phaseIndex === 1) return 25; 
        if (phaseIndex === 2) return 50; 
        if (phaseIndex === 3) return 75; 
        if (phaseIndex >= 4) return 100; 
        return 0;
    };

    // 3. FUNÇÕES HELPER PARA RENDERIZAÇÃO
    // Retorna true se a fase atual for a fase que estamos checando OU se for uma fase anterior (concluída)
    const isPhaseActiveOrDone = (phaseName) => phaseIndex >= phases[phaseName];
    // Retorna true se a fase que estamos checando for a fase exatamente atual (útil para mudar a cor do texto se precisar)
    const isPhaseCurrent = (phaseName) => phaseIndex === phases[phaseName];

    // Lógica para a frase de status
    const getStatusMessage = () => {
        switch (currentPhase) {
            case 'ESTOQUE':
                return 'Olá! Seu pedido está em estoque, pronto para ser processado.';
            case 'PROCESSO':
                return 'Olá! Seu pedido está em processamento.';
            case 'MONTAGEM':
                return 'Olá! Seu pedido está sendo montado.';
            case 'EXPEDIÇÃO':
                return 'Olá! Seu pedido está pronto para envio (expedição).';
            case 'COMPLETED':
                return 'Olá! Seu pedido foi concluído e entregue!';
            case 'NOT_FOUND':
            case 'UNKNOWN':
                return 'Olá! Não encontramos pedidos ativos, ou o status é desconhecido.';
            default:
                return 'Olá! Estamos preparando o seu pedido.';
        }
    };


    // 4. useEffect com PULLING de 30 SEGUNDOS
    useEffect(() => {
        const id_usuario = localStorage.getItem('id_usuario_logado');
        
        const getProductState = async () => {
            if (!id_usuario) {
                console.error("ID do usuário logado não encontrado.");
                return;
            }

            try {
                // Linha 80: A chamada ky.get original
                const response = await ky.get(`http://localhost:3000/rastreio/${id_usuario}`).json();

                if (response && response.status) {
                    const status = response.status.toUpperCase();
                    setCurrentPhase(status);
                    
                    console.log('Status Recebido no Frontend:', status); // Confirmação de que o React recebeu
                    
                    if (status === 'COMPLETED') {
                        return true; 
                    }
                } else {
                    console.warn('Status do pedido não encontrado ou resposta vazia.');
                }
            } catch (error) {
                // Trata o erro de conexão/servidor
                console.error('Erro ao buscar status (Servidor/Rede):', error);
            }
            return false;
        };

        getProductState();

        const intervalId = setInterval(async () => {
            const completedStatus = await getProductState();
            if (completedStatus) {
                clearInterval(intervalId); 
            }
        }, 30000); 

        return () => clearInterval(intervalId);

    }, [id]); 


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
                    <div className={clsx('font-semibold flex items-center justify-center gap-1 text-[1.3rem] text-end', phaseIndex >= 5 ? 'text-greendark' : 'text-purpledark')}>
                        <img className='w-7 h-7' src={phaseIndex >= 5 ? completed : pendentIcon} alt='Ícone de pendente' />
                        {phaseIndex >= 5 ? 'Concluído' : 'Pendente'}
                    </div>
                </div>
                
                {/* Visualização do Rastreamento */}
                <div className='relative'>
                    {/* Barra de Progresso */}
                    <div className='absolute z-0 top-35 left-0 right-0 transform -translate-y-1/2 flex items-center justify-center'>
                        <progress 
                            className='w-[80%] h-1.5 border-0 rounded-full 
                            [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-gray 
                            [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-purpledark 
                            [&::-moz-progress-bar]:bg-purpledark' 
                            value={calculateProgressValue()} 
                            max={100}>
                        </progress>
                    </div>

                    {/* Ícones de Etapas */}
                    <div className='relative z-10 flex gap-[14%] w-full h-30 items-center justify-center mt-25'>
                        
                        {/* ESTOQUE (Sempre Ativo se o rastreio existir) */}
                        <div className='w-30 h-30 flex flex-col justify-end items-center bg-lightwhite'>
                            {/* Usa concluido, pois é a fase inicial */}
                            <img className='w-[125px] h-[125px]' src={isPhaseActiveOrDone('ESTOQUE') ? concluido : processo} /> 
                            <p className={clsx('text-center font-semibold text-[1rem]', isPhaseActiveOrDone('ESTOQUE') ? 'text-purpledark' : 'text-gray2 opacity-66')}>Estoque</p>
                        </div>
                        
                        {/* PROCESSO */}
                        <div className='w-30 h-30 flex flex-col justify-end items-center bg-lightwhite'>
                            <img 
                                className='w-[125px] h-[125px]' 
                                src={isPhaseActiveOrDone('PROCESSO') ? concluido : processo} 
                            />
                            {/* A cor do texto muda quando a fase PROCESSO for atingida */}
                            <p className={clsx('text-center font-semibold text-[1rem]', isPhaseActiveOrDone('PROCESSO') ? 'text-purpledark' : 'text-gray2 opacity-66')}>Processo</p>
                        </div>

                        {/* MONTAGEM */}
                        <div className='w-30 h-30 flex flex-col justify-end items-center bg-lightwhite'>
                            <img 
                                className='w-[125px] h-[125px]' 
                                src={isPhaseActiveOrDone('MONTAGEM') ? concluido : montagem} 
                            />
                            <p className={clsx('text-center font-semibold text-[1rem]', isPhaseActiveOrDone('MONTAGEM') ? 'text-purpledark' : 'text-gray2 opacity-66')}>Montagem</p>
                        </div>

                        {/* EXPEDIÇÃO */}
                        <div className='w-30 h-30 flex flex-col justify-end items-center bg-lightwhite'>
                            <img 
                                className='w-[125px] h-[125px]' 
                                src={isPhaseActiveOrDone('EXPEDIÇÃO') ? concluido : expedicao} 
                            />
                            <p className={clsx('text-center font-semibold text-[1rem]', isPhaseActiveOrDone('EXPEDIÇÃO') ? 'text-purpledark' : 'text-gray2 opacity-66')}>Expedição</p>
                        </div>
                    </div>
                </div>
                
                {/* Mensagem de Status */}
                <div className='w-full flex flex-col items-center'>
                    <div className='bg-[#FEF5FF] flex items-center p-5 mt-10 w-[80%] h-14 font-medium rounded-2xl'>
                        <p className='pl-5 text-purpledark font-medium text-[20px]'>
                            {getStatusMessage()}
                        </p>
                    </div>
                </div>
                
                {/* Detalhes e Botão */}
                <div className='w-full h-30 flex items-end justify-center'>
                    <div className='flex flex-col text-xl font-semibold w-[40%] text-start'>
                        <div className='flex text-gray2 opacity-66 gap-3'>
                            Tempo de produção:
                            <h1 className='text-purpledark'>00:00:26</h1> 
                        </div>
                        <div className='flex text-gray2 opacity-66 gap-3'>
                            Ordem de produção:
                            <h1 className='text-purpledark'>5588</h1>
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
    );
};

export default Rastreio;