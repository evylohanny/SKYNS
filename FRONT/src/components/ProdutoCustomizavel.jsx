import { useState, useRef,useEffect } from "react";
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
  const fotos = [dados.foto];
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleMiniClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  useEffect(() => {

    async function buscaFoto(id_produto) {
      try {
        for (let posicao = 1; posicao < 4; posicao++) {
          const response = await ky
          .get(`http://localhost:3000/${id_produto}/${posicao}/foto`)
          .json();
          
          if (response.data) {
            console.log(response.data);
          } else {
            break;
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    buscaFoto(dados.id_produto);
  }, []);
    
  const [quantidade, setQuantidade] = useState(1);

  const aumentar = () => setQuantidade((prev) => prev + 1);
  const diminuir = () => {
    if (quantidade > 1) setQuantidade((prev) => prev - 1);
  };

  const [tab, setTab] = useState("funciona");

  const combinacoesToxicas = {
    Retinol: [
      "Ácido Glicólico",
      "Ácido Mandélico",
      "Ácido Lático",
      "Vitamina C",
    ],
    "Ácido Glicólico": ["Retinol", "Vitamina C"],
    "Ácido Mandélico": ["Retinol", "Vitamina C"],
    "Ácido Lático": ["Retinol", "Vitamina C"],
    "Vitamina C": [
      "Retinol",
      "Ácido Glicólico",
      "Ácido Mandélico",
      "Ácido Lático",
    ],
  };

  const componentesDisponiveis = [
    {
      nome: "Retinol",
      descricao:
        "É um dos ativos mais estudados em dermatologia. Estimula a renovação celular, aumenta a produção de colágeno e melhora linhas finas, manchas e textura da pele. Pode causar irritação inicial, por isso costuma ser introduzido aos poucos.",
    },
    {
      nome: "Ácido Glicólico",
      descricao:
        "Faz uma esfoliação química suave, removendo células mortas, clareando manchas e ajudando na luminosidade. Também prepara a pele para absorver melhor outros ativos.",
    },
    {
      nome: "Vitamina C",
      descricao:
        "Potente antioxidante que combate os radicais livres, previne envelhecimento precoce e auxilia na produção de colágeno. Também uniformiza o tom da pele, reduzindo manchas e dando mais viço.",
    },
    {
      nome: "Ácido Mandélico",
      descricao:
        "AHA derivado das amêndoas amargas, é mais suave que o glicólico. Tem ação esfoliante, antimicrobiana e clareadora, sendo indicado até para peles sensíveis e com acne.",
    },
    {
      nome: "Ácido Lático",
      descricao:
        "Hidrata ao mesmo tempo em que esfolia, ajudando a uniformizar o tom e a textura da pele sem agredir tanto..",
    },
  ];

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
                className={`w-[80px] cursor-pointer border-2 ${
                  activeIndex === index
                    ? "border-purpledark"
                    : "border-transparent"
                }`}
                src={foto}
                alt={`miniatura-${index}`}
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
            >
              {fotos.map((foto, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="h-[550px] w-[450px] object-cover"
                    src={foto}
                    alt={`foto-${index}`}
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
            <p className=" text-purpledark font-bold text-[25px]">R{dados.preco}</p>
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
            className={`pb-2 ${
              tab === "funciona"
                ? "border-b-2 border-purpledark font-semibold"
                : "text-blackwhite/70"
            }`}
            onClick={() => setTab("funciona")}
          >
            Como funciona
          </button>
          <button
            className={`pb-2 ${
              tab === "composicao"
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
