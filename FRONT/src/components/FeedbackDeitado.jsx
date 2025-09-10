import iconFeed from '../assets/iconFeed.svg';
import estrelas from '../assets/estrelas.svg';

function FeedbackDeitado() {
  return (
    <div className="w-80 font-secondary flex flex-col items-center ">
      {/* Texto */}
      <div className="flex flex-col items-start text-start gap-3 max-w-[400px] ">
        <h1 className="text-black/90 font-medium text-xl lg:text-1xl ">
          A realidade sobre nossas entregas
        </h1>
        <p className="text-black/70 flex flex-col items-start ">
          Felizmente, com todo o esforço da nossa trajetória, recebemos diversos feedbacks 
          dos clientes — e achamos importante compartilhá-los.
        </p>
        <img
          src={iconFeed}
          alt="Ícone de feedback"
          className="w-10 md:w-16 lg:w-20"
        />
      </div>

      {/* Cards em coluna */}
      <div className="flex flex-col w-85 max-w-[400px] mt-8 gap-6">
        {/* Card 1 */}
        <div className="flex flex-col p-4 gap-2 border-3 border-purpleborde/40 rounded-xl w-70">
          <img src={estrelas} alt="Estrelas" className="w-20 md:w-24" />
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-extradarkpurple">
              Sabonete incrível
            </h2>
            <p className="text-black/70 text-sm">
              “Gente, sério… esse sabonete facial é TUDO! Minha pele nunca ficou tão limpa e macia. 
              A sensação de frescor depois de usar é maravilhosa, e o cheirinho é super suave. 
              Uso todos os dias e já vi diferença nos poros e na oleosidade. Recomendo demais!”
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col p-4 gap-2 border-3 border-purpleborde/40 rounded-xl w-70">
          <img src={estrelas} alt="Estrelas" className="w-20 md:w-24" />
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-extradarkpurple">
              Sérum com Ácido Hialurônico
            </h2>
            <p className="text-black/70 text-sm">
              "Esse sérum virou meu vício! Deixa a pele com um glow lindo e super hidratada sem pesar. 
              Uso antes do hidratante e já sinto a diferença no toque da pele. Vale cada gota!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackDeitado;
