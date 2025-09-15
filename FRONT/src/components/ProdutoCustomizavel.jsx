import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// components importados
import Filtro from "../components/Filtro.jsx";
import NavBar from "../components/NavBar.jsx";
import Sugestao from "../components/Sugestão.jsx";
import FooterCompleto from "../components/FooterCompleto.jsx";
import Feedback from "../components/Feedback.jsx";

// fotos
import noture1 from "../assets/SKYNSNature1.svg";
import noture2 from "../assets/SKYNSNature2.svg";
import noture3 from "../assets/SKYNSNature3.svg";
import estrelas from "../assets/estrelas.svg";
import iconcheck from "../assets/iconCheck.svg";

// setas
import setaEsquerda from "../assets/SetaEsquerdaCinza.svg";
import setaDireita from "../assets/SetaDireitaCinza.svg";


function ProdutoCustomizavel() {
  const limiteRef = useRef(null);
  const fotos = [noture3, noture1, noture2];
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  

  const handleMiniClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const [quantidade, setQuantidade] = useState(1);

  const aumentar = () => setQuantidade((prev) => prev + 1);
  const diminuir = () => {
    if (quantidade > 1) setQuantidade((prev) => prev - 1);
  };

  const [tab, setTab] = useState("funciona");

  //  lista de componentes disponíveis e selecionados ---
  const componentesDisponiveis = [
    {
      nome: "Retinol",
      descricao: "Estimula a renovação celular e reduz linhas finas.",
    },
    {
      nome: "Ácido Glicólico",
      descricao: "Faz esfoliação química suave e melhora a textura da pele.",
    },
    {
      nome: "Vitamina C",
      descricao: "Ajuda na produção de colágeno e dá luminosidade.",
    },
    {
      nome: "Ácido Mandélico",
      descricao: "Clareia manchas e combate a acne sem irritar.",
    },
    {
      nome: "Ácido Lático",
      descricao: "Hidrata e melhora a elasticidade da pele.",
    },
  ];

  const [selecionados, setSelecionados] = useState([]);

const toggleComponente = (nome) => {
  setSelecionados((prev) => {
    if (prev.includes(nome)) {
      // se já estava selecionado, remove
      return prev.filter((item) => item !== nome);
    } else {
      // se ainda não está e já tem 3, não adiciona
      if (prev.length >= 3) return prev;
      return [...prev, nome];
    }
  });
};


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
            Sérum Rejuvenescedor Nocturne 45+
          </p>
          <div className="flex justify-end ">
            <p className="mt-4 bg-blackwhite/20 w-fit px-2 py-0.5 rounded">
              300g
            </p>
          </div>

          <div className="pt-6 flex gap-3 items-center">
            <p className="line-through text-black/40 font-bold">R$89,90</p>
            <p className=" text-purpledark font-bold text-[25px]">R$59,90</p>
          </div>
          <div>
            <p className="w-120 text-[16px] mt-2 text-blackwhite/95">
              Pele renovada e protegida, até nos dias mais ensolarados! Prepare
              sua pele para brilhar com segurança! O Esfoliante Solar Ultra UV
              Apripeiadi foi desenvolvido especialmente para quem quer cuidar
              das manchas e renovar a pele sem abrir mão da proteção solar.
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

        {/* Conteúdo das abas */}
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
                  <div
                    key={nome}
                    className="border border-purpledark rounded-xl p-4 w-fit"
                  >
                    <p className="font-semibold text-purpledark">{comp.nome}</p>
                    <p className="text-blackwhite/80 mt-1">{comp.descricao}</p>
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
    </div>
  );
}

export default ProdutoCustomizavel;
