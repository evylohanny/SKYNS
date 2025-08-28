import iconFeed from '../assets/iconFeed.svg';
import estrelas from '../assets/estrelas.svg';

function Feedback() {
  return (
    <div className='w-full font-secondary flex justify-center items-center px-4 md:px-0 py-10'>
      <div className='flex flex-col lg:flex-row w-full max-w-[1200px] gap-6'>
        {/* Texto introdutório */}
        <div className='flex flex-col lg:w-1/3 gap-3'>
          <h1 className='text-black/90 font-medium text-xl lg:text-2xl'>A realidade sobre nossas entregas</h1>
          <p className='text-black/70 text-sm lg:text-base'>
            Felizmente, com todo o esforço da nossa trajetória, recebemos diversos feedbacks 
            dos clientes — e achamos importante compartilhá-los.
          </p>
          <img src={iconFeed} alt="Ícone de feedback" className='w-12 md:w-16 lg:w-20'/>
        </div>

        {/* Cards de feedback */}
        <div className='flex flex-col sm:flex-row lg:w-2/3 gap-4 flex-wrap justify-center'>
          {/* Card 1 */}
          <div className='flex flex-col w-full sm:w-[48%] lg:w-[45%] p-3 gap-1 border-4 border-purpleborde/40 rounded-xl max-h-[180px]'>
            <img src={estrelas} alt="Estrelas" className='w-20 md:w-24'/>
            <div className='flex flex-col gap-1 overflow-hidden'>
              <h2 className='text-base font-semibold text-extradarkpurple truncate'>Sabonete incrível</h2>
              <p className='text-black/70 text-xs md:text-sm line-clamp-4'>
                “Gente, sério… esse sabonete facial é TUDO! Minha pele nunca ficou tão limpa e macia. 
                A sensação de frescor depois de usar é maravilhosa, e o cheirinho é super suave. 
                Uso todos os dias e já vi diferença nos poros e na oleosidade. Recomendo demais!”
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className='flex flex-col w-full sm:w-[48%] lg:w-[45%] p-3 gap-1 border-4 border-purpleborde/40 rounded-xl max-h-[180px]'>
            <img src={estrelas} alt="Estrelas" className='w-20 md:w-24'/>
            <div className='flex flex-col gap-1 overflow-hidden'>
              <h2 className='text-base font-semibold text-extradarkpurple truncate'>Sérum com Ácido Hialurônico</h2>
              <p className='text-black/70 text-xs md:text-sm line-clamp-4'>
                "Esse sérum virou meu vício! Deixa a pele com um glow lindo e super hidratada sem pesar. 
                Uso antes do hidratante e já sinto a diferença no toque da pele. Vale cada gota!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Feedback;
