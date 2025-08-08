import iconFeed from '../assets/iconFeed.svg';
import estrelas from '../assets/estrelas.svg';

function Feedback() {
  return (
    <div className='w-full font-secondary flex justify-center items-center'>
      <div className='flex flex-row w-[74%] gap-5'>
          <div className='flex flex-col w-[30%] items-start gap-4'>
            <div className='flex items-start w-[70%]'>
              <h1 className='text-black/90 font-medium text-2xl'>A realidade sobre nossas entregas</h1>
            </div>
            <div className='flex flex-col items-start w-[85%]'>
              <p className='text-black/70 text-lg'>Felizmente, com todo o esforço da nossa trajetória, recebemos diversos feedbacks 
              dos clientes — e achamos importante compartilhá-los.</p>
            </div>
            <img src={iconFeed} alt="" />
          </div>
          <div className='flex flex-col w-[33%] p-5 gap-3 border-4 border-purpleborde/40 rounded-xl'>
            <img src={estrelas} alt="" className='w-30'/>
            <div className='w-[100%] flex flex-col gap-3'>
              <h1 className='text-lg font-semibold text-extradarkpurple'>Sabonete incrível</h1>
              <p className='text-black/70 text-lg'>“Gente, sério… esse sabonete facial é TUDO! Minha pele nunca ficou tão limpa e macia. A sensação 
              de frescor depois de usar é maravilhosa, e o cheirinho é super suave. Uso todos os dias e já vi 
              diferença nos poros e na oleosidade. Recomendo demais!”</p>
            </div>
          </div>
          <div className='flex flex-col w-[33%] p-5 gap-3 border-4 border-purpleborde/40 rounded-xl'>
            <img src={estrelas} alt="" className='w-30'/>
            <div className='w-[100%] flex flex-col gap-3'>
              <h1 className='text-lg font-semibold text-extradarkpurple'>Sérum com Ácido Hialurônico</h1>
              <p className='text-black/70 text-lg'>"Esse sérum virou meu vício! Deixa a pele com um glow lindo e
              super hidratada sem pesar. Uso antes do hidratante e já sinto a diferença no toque da pele. 
              Vale cada gota!"</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Feedback
