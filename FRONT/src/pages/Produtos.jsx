import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import NavBar from "../components/NavBar";
import foto1 from "../assets/Produtoesfoliante.png";
import foto2 from "../assets/foto2.svg";
import foto3 from "../assets/ESfoliantesozinho.png";
import estrelas from "../assets/estrelas.svg";
import check from "../assets/iconCheck.svg";
import Filtro from "../components/Filtro.jsx";

const imagens = [foto1, foto2, foto3];

// nomes BATENDO com o Filtro
const componentes = {
  "Ácido Hialurônico": {
    descricao:
      "Ativo hidratante que carrega até mais de mil vezes o seu peso em água, nutre e hidrata a pele...",
  },
  Niacinamida: {
    descricao:
      "Ajuda a controlar a oleosidade, clarear manchas e fortalecer a barreira cutânea.",
  },
  Retinol: {
    descricao:
      "Estimula a renovação celular, reduz linhas finas e melhora a textura da pele.",
  },
  "Vitamina C": {
    descricao:
      "Poderoso antioxidante que ilumina, uniformiza o tom da pele e combate os radicais livres.",
  },
};

function Produtos() {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("composicao");
  const [quantidade, setQuantidade] = useState(1);

  // estados do filtro
  const [tiposSelecionados, setTiposSelecionados] = useState([]); // reservado se quiser usar depois
  const [compSelecionados, setCompSelecionados] = useState([]);

  const handleMiniaturaClick = (index) => {
    swiperRef.current?.swiper.slideTo(index);
    setActiveIndex(index);
  };

  const aumentar = () => setQuantidade((q) => q + 1);
  const diminuir = () => setQuantidade((q) => (q > 1 ? q - 1 : q));

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;

    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();

    swiper.on("slideChange", () => {
      setActiveIndex(swiper.realIndex);
    });
  }, []);

  return (
    <div>
      <NavBar />

      <div className="flex ml-10 gap-20 mt-10 px-1">
        <Filtro
          tiposSelecionados={tiposSelecionados}
          setTiposSelecionados={setTiposSelecionados}
          compSelecionados={compSelecionados}
          setCompSelecionados={setCompSelecionados}
        />

        <div className="flex">
          <div className="flex flex-col space-y-4 mr-6">
            {imagens.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Miniatura ${index}`}
                onClick={() => handleMiniaturaClick(index)}
                className={`w-28 h-28 object-cover cursor-pointer transition ${
                  activeIndex === index
                    ? "border-2 border-purpledark"
                    : "border border-transparent"
                }`}
              />
            ))}
          </div>

          <div className="w-[500px] relative">
            <Swiper
              modules={[Navigation]}
              ref={swiperRef}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              slidesPerView={1}
            >
              {imagens.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Slide ${index}`}
                    className="w-150 h-140 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              ref={prevRef}
              className="swiper-button-prev-custom absolute hover:border-purpledark top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white rounded-full cursor-pointer z-10 bg-white/20 backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>

            <div
              ref={nextRef}
              className="swiper-button-next-custom absolute hover:border-purpledark top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white rounded-full cursor-pointer z-10 bg-white/20 backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-2 pt-10">
          <div className="flex gap-4">
            <p className="font-bold text-purpledark bg-grennSemiDark p-0.5 px-2 rounded-lg">
              10% OFF
            </p>
            <img src={estrelas} alt="" />
          </div>
          <div>
            <p className="font-bold text-blackwhite/80 text-3xl pt-2">
              Esfoliante Solar ultra UV
            </p>
          </div>
          <div className="flex justify-end items-end w-90">
            <p className="bg-black/10 max-w-fit p-1 px-1 text-xs  ">300g</p>
          </div>
          <div className="pt-8 flex gap-5 items-center">
            <p className="line-through text-blackwhite/50">R$89,90</p>
            <p className="text-purpledark font-bold text-2xl">R$59,90</p>
          </div>
          <div className="w-120 pt-2 text-blackwhite/90">
            <p>
              Pele renovada e protegida, até nos dias mais ensolarados! Prepare
              sua pele para brilhar com segurança! O Esfoliante Solar Ultra UV
              Apripeiadi foi desenvolvido especialmente para quem quer cuidar
              das manchas e renovar a pele sem abrir mão da proteção solar.
            </p>
          </div>
          <div className="pt-7 ">
            <p>O que ele faz?</p>
            <ul>
              <li className="pt-1 flex gap-1 items-center text-sm text-blackwhite/90">
                <img src={check} alt="" />
                Remove impurezas e células mortas
              </li>
              <li className="pt-1 flex gap-1 items-center text-sm text-blackwhite/90">
                <img src={check} alt="" />
                Melhora a textura e maciez
              </li>
              <li className="pt-1 flex gap-1 items-center text-sm text-blackwhite/90">
                <img src={check} alt="" />
                Proporciona sensação de frescor e conforto
              </li>
              <li className="pt-1 flex gap-1 items-center text-sm text-blackwhite/90">
                <img src={check} alt="" />
                Protege contra agressões externas
              </li>
              <li className="pt-1 flex gap-1 items-center text-sm text-blackwhite/90">
                <img src={check} alt="" />
                Repõe e mantém a umidade natural da pele, prevenindo
                ressecamento
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4 pt-5">
            <div className="flex items-center border-2 border-purpledark rounded-md px-3 py-1">
              <button
                onClick={diminuir}
                className="text-purpledark text-lg px-2 hover:text-purpledark cursor-pointer "
              >
                −
              </button>
              <span className="px-3 text-purpledark font-medium">
                {quantidade}
              </span>
              <button
                onClick={aumentar}
                className="text-purpledark text-lg px-2 hover:text-purpledark cursor-pointer "
              >
                +
              </button>
            </div>

            <button className="bg-blue  text-purpledark font-bold px-7 py-2 rounded-md  hover:bg-grennSemiDark cursor-pointer transition">
              COMPRAR
            </button>
          </div>
        </div>
      </div>

      {/* Abas */}
      <div className="p-2 mt-10 flex flex-col items-center pl-75">
        <div className="flex gap-6 border-black/20 border-b-2 w-240">
          <button
            className={`pb-2 text-lg font-semibold transition-colors ${
              activeTab === "funciona"
                ? "text-purpledark border-b-2 border-purpledark"
                : "text-black/60"
            }`}
            onClick={() => setActiveTab("funciona")}
          >
            Como funciona
          </button>

          <button
            className={`pb-2 text-lg font-semibold transition-colors ${
              activeTab === "composicao"
                ? "text-purpledark border-b-2 border-purpledark"
                : "text-black/60"
            }`}
            onClick={() => setActiveTab("composicao")}
          >
            Composição especificada
          </button>
        </div>

        <div className="mt-4 text-black/90 flex flex-col justify-start items-start w-240">
          {activeTab === "funciona" && (
            <div>
              <p>
                O produto foi desenvolvido para oferecer renovação celular e
                proteção solar em um só passo. Ele age na limpeza da pele,
                removendo células mortas, enquanto hidrata e protege contra os
                efeitos nocivos do sol.
                
              </p>

            </div>
          )}

          {activeTab === "composicao" && (
            <div className="space-y-6">
              {compSelecionados.length === 0 ? (
                <p className="text-black/60">
                  Selecione componentes no filtro ao lado.
                </p>
              ) : (
                compSelecionados.map((item, index) => (
                  <div key={index}>
                    <p className="inline-block bg-gray-100 px-3 py-1 rounded-md text-sm font-semibold text-purpledark mb-2">
                      {item}
                    </p>
                    <p className="text-black/80">
                      {componentes[item]?.descricao || "Descrição não disponível."}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Produtos;
