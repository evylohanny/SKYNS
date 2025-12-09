import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ky from 'ky';

// components importados
import Filtro from "../components/Filtro.jsx";
import NavBar from "../components/NavBar.jsx";
import Sugestao from "../components/Sugestão.jsx";
import FooterCompleto from "../components/FooterCompleto.jsx";
import Feedback from "../components/Feedback.jsx";

// fotos
import estrelas from "../assets/estrelas.svg";
import iconcheck from "../assets/iconCheck.svg";

// setas
import setaEsquerda from "../assets/SetaEsquerdaCinza.svg";
import setaDireita from "../assets/SetaDireitaCinza.svg";

function ProdutoCustomizavel({ dados }) {
  const limiteRef = useRef(null);
  const [fotos, setFotos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleMiniClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const componentesConvertidos = dados.componente
    ? dados.componente
      .replace(/^\{|\}$/g, "")      // remove { }
      .split(",")                   // separa por vírgula
      .map((item) => item.replace(/"/g, "")) // remove aspas
    : [];

  useEffect(() => {
    if (!dados || !dados.id_produto) return;

    async function buscaFoto(id_produto) {
      try {
        const novasFotos = [];

        for (let posicao = 1; posicao < 4; posicao++) {
          let response;

          try {
            response = await ky
              .get(`http://localhost:3000/${id_produto}/${posicao}/foto`)
              .json();
          } catch (err) {
            if (err.response && err.response.status === 404) {
              console.log(`Foto ${posicao} não existe`);
              continue;
            }
            throw err;
          }

          if (response.data?.url) {
            novasFotos[posicao - 1] = response.data.url;
          }
        }

        setFotos(novasFotos);
      } catch (error) {
        console.error("Erro ao buscar fotos:", error);
      }
    }

    buscaFoto(dados.id_produto);
  }, [dados]);



  const [quantidade, setQuantidade] = useState(1);

  const aumentar = () => setQuantidade((prev) => prev + 1);
  const diminuir = () => {
    if (quantidade > 1) setQuantidade((prev) => prev - 1);
  };

  const [tab, setTab] = useState("funciona");


  const componentesDisponiveis = [
    {
      nome: "Niacinamida",
      descricao: "Forma de vitamina B3 que controla a oleosidade, reduz poros dilatados e melhora a barreira cutânea.",
      beneficios: "Reduz inflamações, minimiza manchas, uniformiza o tom da pele e controla a produção de sebo."
    },
    {
      nome: "Zinco PCA",
      descricao: "Regulador de oleosidade natural que absorve o excesso de sebo sem ressecar.",
      beneficios: "Controla brilho excessivo, reduz acne, tem ação adstringente leve e previne poros obstruídos."
    },
    {
      nome: "Ácido salicílico",
      descricao: "Esfoliante lipossolúvel que penetra profundamente nos poros.",
      beneficios: "Desobstrui poros, combate cravos e espinhas, reduz inflamações e previne novas acne."
    },
    {
      nome: "Aloe vera",
      descricao: "Extrato vegetal com propriedades calmantes e hidratantes.",
      beneficios: "Acaba com a vermelhidão, hidrata profundamente, acalma irritações e regenera a pele."
    },
    {
      nome: "Chá verde",
      descricao: "Potente antioxidante natural rico em polifenóis.",
      beneficios: "Protege contra poluição, reduz inflamações, combate radicais livres e minimiza poros."
    },
    {
      nome: "Centella asiática",
      descricao: "Ativo reparador e calmante de origem asiática.",
      beneficios: "Estimula a cicatrização, fortalece a barreira cutânea, reduz marcas e acalma irritações."
    },
    {
      nome: "Prebióticos",
      descricao: "Nutrientes que equilibram o microbioma da pele.",
      beneficios: "Fortalecimento da barreira cutânea, redução de sensibilidade, equilíbrio do pH e proteção contra agressores externos."
    },
    {
      nome: "Glicerina",
      descricao: "Umectante natural que atrai água para a pele.",
      beneficios: "Hidratação profunda, melhora da elasticidade, proteção da barreira hídrica e textura aveludada."
    },
    {
      nome: "Óleo de abacate",
      descricao: "Óleo nutritivo rico em vitaminas e ácidos graxos essenciais.",
      beneficios: "Nutrição intensa, melhora da elasticidade, proteção antioxidante e restauração da barreira lipídica."
    },
    {
      nome: "Pantenol",
      descricao: "Pró-vitamina B5 com propriedades hidratantes e reparadoras.",
      beneficios: "Hidratação profunda, aceleração da cicatrização, melhora da elasticidade e ação calmante."
    },
    {
      nome: "Ceramidas",
      descricao: "Lipídios naturais que formam a barreira protetora da pele.",
      beneficios: "Restauração da barreira cutânea, redução da perda de água, proteção contra agressores e melhora da textura."
    },
    {
      nome: "Ácido lático",
      descricao: "AHA suave derivado do leite, com ação esfoliante e hidratante.",
      beneficios: "Esfoliação suave, hidratação simultânea, uniformização do tom e melhora da textura."
    },
    {
      nome: "Vitamina E",
      descricao: "Poderoso antioxidante lipossolúvel.",
      beneficios: "Proteção contra danos oxidativos, hidratação intensa, redução de linhas finas e cicatrização."
    },
    {
      nome: "Ácido Hialurônico",
      descricao: "Hidratante natural capaz de reter até 1000x seu peso em água.",
      beneficios: "Hidratação profunda, preenchimento de linhas finas, melhora da elasticidade e viço imediato."
    },
    {
      nome: "Extrato de camomila",
      descricao: "Ativo calmante e anti-inflamatório natural.",
      beneficios: "Redução de vermelhidão, acalmar irritações, ação antioxidante leve e hidratação suave."
    },
    {
      nome: "Água marinha purificada",
      descricao: "Água do mar rica em minerais e oligoelementos.",
      beneficios: "Equilíbrio do pH, remineralização, hidratação e melhora da defesa natural da pele."
    },
    {
      nome: "Vitamina C estabilizada",
      descricao: "Antioxidante potente em forma estável.",
      beneficios: "Proteção antioxidante, clareamento de manchas, estímulo de colágeno e uniformização do tom."
    },
    {
      nome: "Algas vermelhas",
      descricao: "Fonte natural de minerais e antioxidantes marinhos.",
      beneficios: "Hidratação intensa, ação detoxificante, melhora da elasticidade e proteção antioxidante."
    },
    {
      nome: "Ácido mandélico",
      descricao: "AHA derivado da amêndoa, suave e eficaz.",
      beneficios: "Esfoliação sem irritação, clareamento de manchas, ação antibacteriana e ideal para peles sensíveis."
    },
    {
      nome: "Carvão ativado",
      descricao: "Agente purificante que adsorve impurezas.",
      beneficios: "Desintoxicação profunda, limpeza de poros, controle de oleosidade e pele mais respirável."
    },
    {
      nome: "Algas marrons",
      descricao: "Ricas em antioxidantes e minerais do oceano.",
      beneficios: "Hidratação prolongada, ação firmadora, proteção contra poluição e melhora da densidade cutânea."
    },
    {
      nome: "Glicerina vegetal",
      descricao: "Umectante natural derivado de vegetais.",
      beneficios: "Hidratação sustentada, melhora da barreira hídrica, textura não oleosa e compatível com todos os tipos de pele."
    },
    {
      nome: "Retinol vegetal",
      descricao: "Alternativa natural ao retinol tradicional.",
      beneficios: "Renovação celular suave, redução de linhas finas, uniformização da textura sem irritação."
    },
    {
      nome: "Extrato de pepino",
      descricao: "Ativo refrescante e hidratante natural.",
      beneficios: "Refrescância imediata, redução de inchaço, hidratação leve e ação calmante."
    },
    {
      nome: "Manteiga de Karité",
      descricao: "Emoliente natural rico em ácidos graxos e vitaminas.",
      beneficios: "Nutrição profunda, reparação da barreira lipídica, proteção contra ressecamento e melhora da elasticidade."
    },
    {
      nome: "Peptídeos biomiméticos",
      descricao: "Cadeias de aminoácidos que imitam os peptídeos naturais da pele.",
      beneficios: "Estímulo de colágeno, firmeza da pele, redução de rugas e melhora da densidade cutânea."
    },
    {
      nome: "Vitamina A",
      descricao: "Nutriente essencial para renovação celular.",
      beneficios: "Renovação acelerada, tratamento de acne, uniformização do tom e estímulo de colágeno."
    },
    {
      nome: "Resveratrol",
      descricao: "Antioxidante potente derivado de uvas.",
      beneficios: "Proteção contra estresse oxidativo, ação antienvelhecimento, revitalização e uniformização do tom."
    },
    {
      nome: "Extrato de chá-preto",
      descricao: "Rico em polifenóis e taninos.",
      beneficios: "Proteção antioxidante, firmeza da pele, redução de inchaço e ação adstringente suave."
    },
    {
      nome: "Retinol",
      descricao: "Derivado da vitamina A, um dos ativos mais estudados em dermatologia.",
      beneficios: "Renovação celular acelerada, redução de rugas, tratamento de acne e estímulo de colágeno."
    },
    {
      nome: "Ácido Glicólico",
      descricao: "AHA derivado da cana-de-açúcar com alto poder esfoliante.",
      beneficios: "Esfoliação profunda, clareamento de manchas, textura aveludada e aumento da penetração de ativos."
    },
    {
      nome: "Vitamina C",
      descricao: "Antioxidante potente que combate radicais livres.",
      beneficios: "Proteção antioxidante, clareamento uniforme, estímulo de colágeno e redução de danos solares."
    },
    {
      nome: "Óleo de Amêndoas",
      descricao: "Poderoso Hidrantante natural.",
      beneficios: "Proteção antioxidante, clareamento uniforme, estímulo de colágeno e redução de danos solares."
    }
  ];

  const combinacoesToxicas = {
    Retinol: ["Ácido Glicólico", "Ácido Mandélico", "Ácido Lático", "Vitamina C", "Ácido Salicílico"],
    "Retinol vegetal": ["Ácido Glicólico", "Ácido Mandélico", "Ácido Lático", "Vitamina C", "Ácido Salicílico"],
    "Ácido Glicólico": ["Retinol", "Retinol vegetal", "Vitamina C"],
    "Ácido Mandélico": ["Retinol", "Retinol vegetal", "Vitamina C"],
    "Ácido Lático": ["Retinol", "Retinol vegetal", "Vitamina C"],
    "Ácido Salicílico": ["Retinol", "Retinol vegetal"],
    "Vitamina C": ["Retinol", "Retinol vegetal", "Ácido Glicólico", "Ácido Mandélico", "Ácido Lático"],
    "Vitamina C estabilizada": ["Retinol", "Retinol vegetal", "Ácido Glicólico", "Ácido Mandélico", "Ácido Lático"]
  };

  const [selecionados, setSelecionados] = useState([]);

  // estado do toast
  const [mensagem, setMensagem] = useState(null);

  const mostrarMensagem = (texto) => {
    setMensagem(texto);
    setTimeout(() => setMensagem(null), 5000); // some em 5s
  };

  const toggleComponente = (nome) => {
    setSelecionados((prev) => {
      if (prev.includes(nome)) {
        return prev.filter((item) => item !== nome);
      }

      if (prev.length >= 3) {
        mostrarMensagem("⚠️ Você só pode selecionar até 3 componentes.");
        return prev;
      }

      const conflitos = combinacoesToxicas[nome] || [];
      const conflitoAtivo = prev.some((item) => conflitos.includes(item));

      if (conflitoAtivo) {
        mostrarMensagem(
          `⚠️ Você não pode combinar ${nome} com ${conflitos.join(", ")}.`
        );
        return prev;
      }

      return [...prev, nome];
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="min-h-screen">
      <NavBar />

      {/* primeira parte (filtro, fotos e descrição) */}
      <div className="pl-5">

        <Filtro
          limiteRef={limiteRef}
          selecionados={selecionados}
          toggleComponente={toggleComponente}
          componentes={componentesConvertidos}
          categoria={dados.categoria || "Acneica"}
        />


      </div>

      <div className="flex pt-18 gap-10 items-start justify-center pl-68">
        {/* 2 - Fotos */}
        <div className="flex gap-6">
          {/* Coluna de miniaturas */}
          <div className="flex flex-col gap-4">
            {fotos.map((foto, index) => (
              <img
                key={index}
                src={foto}
                alt={`Miniatura ${index}`}
                className={`w-20 h-20 rounded-lg cursor-pointer border 
        ${activeIndex === index ? "border-purpledark" : "border-transparent"}`}
                onClick={() => handleMiniClick(index)}
              />
            ))}
          </div>


          {/* Foto principal */}
          <div className="w-[450px] h-[550px] relative">
            <button className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-10">
              <img src={setaEsquerda} alt="anterior" className="w-8 h-8" />
            </button>
            <button className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-10">
              <img src={setaDireita} alt="próximo" className="w-8 h-8" />
            </button>

            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              initialSlide={activeIndex}
              className="swiper-principal"
            >
              {fotos.map((foto, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={foto}
                    alt={`Foto ${index}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
        </div>

        {/* descrição do produto */}
        <div className="p-4 flex flex-col ">
          <div className="flex items-center gap-4">
            <p className="bg-lightgreen p-0.5 px-1 text-purpledark font-bold rounded-[7px]">
              10% OFF
            </p>
            <img src={estrelas} alt="estrelas" />
          </div>
          <p className="pt-6 font-medium text-[25px] text-gray2">
            {dados.titulo_}
          </p>
          <div className="flex justify-end ">
            <p className="mt-4 bg-blackwhite/20 w-fit px-2 py-0.5 rounded">
              300g
            </p>
          </div>

          <div className="pt-6 flex gap-3 items-center">
            <p className="line-through text-black/40 font-bold">R$89,90</p>
            <p className=" text-purpledark font-bold text-[25px]">
              R${dados.preco}
            </p>

          </div>
          <div>
            <p className="w-120 text-[16px] mt-2 text-blackwhite/95">
              {dados.completa_descricao}
            </p>
            <p className="mt-3 font-semibold text-[18px] text-blackwhite/80">
              O que ele faz?
            </p>
            <ul className="mt-2 ">
              <li className="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Remove impurezas e células mortas
              </li>
              <li className="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Protege contra os radicais livres
              </li>
              <li className="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Uniformiza o tom da pele
              </li>
              <li className="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Hidrata profundamente
              </li>
              <li className="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Estimula a renovação celular
              </li>
            </ul>
          </div>

          {/* botao de quantidade */}
          <div className="flex items-center gap-4 mt-7">
            <div className="flex items-center border-2 border-purpledark rounded-lg w-30 p-6 py-1">
              <button
                onClick={diminuir}
                className="text-purpledark text-xl font-medium w-10"
              >
                −
              </button>
              <span className="mx-3 text-purpledark font-medium w-10">
                {quantidade}
              </span>
              <button
                onClick={aumentar}
                className="text-purpledark text-xl font-medium w-10"
              >
                +
              </button>
            </div>
            <button className="bg-blue text-purpledark font-semibold px-7 py-2 rounded-lg">
              COMPRAR
            </button>
          </div>
        </div>
      </div>

      {/* segunda parte (descrição) */}
      <div className="w-[80%] mx-auto pl-54">
        <div className="flex border-b-2 border-b-blackwhite/50 gap-6 ">
          <button
            className={`pb-2 ${tab === "funciona"
              ? "border-b-2 border-purpledark font-semibold"
              : "text-blackwhite/70"
              }`}
            onClick={() => setTab("funciona")}
          >
            Como funciona
          </button>
          <button
            className={`pb-2 ${tab === "composicao"
              ? "border-b-2 border-purpledark font-semibold"
              : "text-blackwhite/70"
              }`}
            onClick={() => setTab("composicao")}
          >
            Composição especificada
          </button>
        </div>

        <div className="mt-4">
          {tab === "funciona" && (
            <div className="font-secondary">
              <p className="mt-5 text-purpledark w-200 text-[18px]">
                Nosso sistema de filtros foi desenvolvido para facilitar sua
                experiência e ajudar você a encontrar o produto ideal para a sua
                pele.
              </p>
              <p className="mt-10">
                1- Escolha do produto: cada produto já é desenvolvido para um
                tipo específico de pele (acneica, madura, oleosa ou seca).
              </p>
              <p className="mt-10">
                2- Personalize com os componentes: dentro da linha escolhida,
                você pode selecionar até 3 componentes ativos. Esses ativos têm
                diferentes propriedades alinhadas com o seu desejo de
                tratamento. Confira no campo composição especificada.
              </p>
              <p className="mt-10">
                3- Resultado garantido: mesmo escolhendo combinações diferentes,
                todos os caminhos levam ao mesmo objetivo final - tratar o
                problema principal da sua pele.
              </p>
            </div>
          )}

          {tab === "composicao" && (
            <div className="font-secondary mt-6 space-y-5">
              {selecionados.length === 0 && (
                <p className="text-blackwhite/70">
                  Nenhum componente selecionado.
                </p>
              )}
              {selecionados.map((nome) => {
                const comp = componentesDisponiveis.find(
                  (c) => c.nome === nome
                );
                return (
                  <div key={nome} className="p-2 w-fit">
                    <p className="font-bold text-purpledark rounded-xl p-1 px-4 w-fit  border-1 border-purpledark ">
                      {comp.nome}
                    </p>
                    <p className="text-blackwhite/90 mt-2">{comp.descricao}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div ref={limiteRef} className="mt-30">
          <Sugestao />
          <Feedback />
        </div>

        <div className="mt-10"></div>
      </div>

      <div className="mt-30">
        <FooterCompleto />
      </div>

      {/* TOAST */}
      {mensagem && (
        <div
          className="fixed bottom-10 right-10 bg-purpledark text-white px-4 py-3 rounded-xl shadow-lg 
                     transition-all duration-500 ease-out animate-[fadeIn_0.5s_ease-out]"
          style={{
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          {mensagem}
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default ProdutoCustomizavel;
