import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import NavBar from "../components/NavBar";
import Filtro from "../components/Filtro";
import foto1 from "../assets/Produtoesfoliante.png";
import foto2 from "../assets/foto2.svg";
import foto3 from "../assets/ESfoliantesozinho.png";
import estrelas from "../assets/estrelas.svg";
import check from "../assets/iconCheck.svg";

const imagens = [foto1, foto2, foto3];

function Produtos() {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMiniaturaClick = (index) => {
    swiperRef.current?.swiper.slideTo(index);
    setActiveIndex(index);
  };

  const [quantidade, setQuantidade] = useState(1);

  const aumentar = () => setQuantidade(quantidade + 1);
  const diminuir = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

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
      <div className="flex mt-10 px-4 lg:px-8 w-full max-w-[1800px] mx-auto">
        {/* Filtro - oculto em mobile, margem fixa em desktop */}
        <div className="hidden lg:block mr-8 flex-shrink-0">
          <Filtro />
        </div>

        {/* Container principal do produto */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row w-full">
            {/* Miniaturas laterais */}
            <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 mr-[-4%]">
              {imagens.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Miniatura ${index}`}
                  onClick={() => handleMiniaturaClick(index)}
                  className={`w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover cursor-pointer transition ${
                    activeIndex === index
                      ? "border-2 border-purpledark"
                      : "border border-transparent"
                  }`}
                />
              ))}
            </div>

            {/* Swiper principal */}
            <div className="w-full md:flex-1 relative order-1 md:order-2 max-w-[550px] lg:max-w-[600px]">
              <Swiper
                modules={[Navigation]}
                ref={swiperRef}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                slidesPerView={1}
                className="h-full"
              >
                {imagens.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={`Slide ${index}`}
                      className="w-full h-full max-h-[500px] object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Botões de navegação */}
              <div
                ref={prevRef}
                className="swiper-button-prev-custom absolute hover:border-purpledark top-1/2 left-2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-white rounded-full cursor-pointer z-10 bg-white/20 backdrop-blur-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  className="w-4 h-4 md:w-5 md:h-5"
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
                className="swiper-button-next-custom absolute hover:border-purpledark top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-white rounded-full cursor-pointer z-10 bg-white/20 backdrop-blur-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  className="w-4 h-4 md:w-5 md:h-5"
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

            {/* Informações do produto */}
            <div className="p-2 pt-0 md:pt-6 lg:pt-10 flex-1 max-w-[600px] order-3">
              <div className="flex items-center">
                <p className="font-bold text-purpledark bg-grennSemiDark p-0.5 px-2 rounded-lg text-sm md:text-base">
                  10% OFF
                </p>
                <img src={estrelas} alt="Avaliação" className="h-4 md:h-5" />
              </div>
              
              <h1 className="font-bold text-blackwhite/80 text-2xl md:text-3xl pt-2">
                Esfoliante Solar ultra UV
              </h1>
              
              <div className="flex justify-center pl-15">
                <p className="bg-black/10 max-w-fit p-1 px-2 text-xs mt-1">300g</p>
              </div>
              
              <div className="pt-6 md:pt-4 flex gap-4 md:gap-5 items-center">
                <p className="line-through text-blackwhite/50 text-sm md:text-base">R$89,90</p>
                <p className="text-purpledark font-bold text-xl md:text-2xl">R$59,90</p>
              </div>
              
              <div className="w-full pt-6 md:pt-8 text-blackwhite/90 text-sm md:text-base">
                <p>
                  Pele renovada e protegida, até nos dias mais ensolarados! Prepare
                  sua pele para brilhar com segurança! O Esfoliante Solar Ultra UV
                  Apripeiadi foi desenvolvido especialmente para quem quer cuidar
                  das manchas e renovar a pele sem abrir mão da proteção solar.
                </p>
              </div>
              
              <div className="pt-5 md:pt-7">
                <p className="font-medium text-sm md:text-base">O que ele faz?</p>
                <ul className="mt-2">
                  <li className="pt-1 flex gap-2 items-center text-sm text-blackwhite/90">
                    <img src={check} alt="Check" className="w-3 h-3 md:w-4 md:h-4" />
                    Remove impurezas e células mortas
                  </li>
                  <li className="pt-1 flex gap-2 items-center text-sm text-blackwhite/90">
                    <img src={check} alt="Check" className="w-3 h-3 md:w-4 md:h-4" />
                    Melhora a textura e maciez
                  </li>
                  <li className="pt-1 flex gap-2 items-center text-sm text-blackwhite/90">
                    <img src={check} alt="Check" className="w-3 h-3 md:w-4 md:h-4" />
                    Proporciona sensação de frescor e conforto
                  </li>
                  <li className="pt-1 flex gap-2 items-center text-sm text-blackwhite/90">
                    <img src={check} alt="Check" className="w-3 h-3 md:w-4 md:h-4" />
                    Protege contra agressões externas
                  </li>
                  <li className="pt-1 flex gap-2 items-center text-sm text-blackwhite/90">
                    <img src={check} alt="Check" className="w-3 h-3 md:w-4 md:h-4" />
                    Repõe e mantém a umidade natural da pele, prevenindo ressecamento
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-5">
                <div className="flex items-center border-2 border-purpledark rounded-md px-2 md:px-3 py-1">
                  <button
                    onClick={diminuir}
                    className="text-purpledark text-lg px-1 md:px-2 hover:text-purpledark cursor-pointer"
                  >
                    −
                  </button>
                  <span className="px-2 md:px-3 text-purpledark font-medium">
                    {quantidade}
                  </span>
                  <button
                    onClick={aumentar}
                    className="text-purpledark text-lg px-1 md:px-2 hover:text-purpledark cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button className="bg-blue text-purpledark font-bold px-5 md:px-7 py-2 rounded-md hover:bg-grennSemiDark cursor-pointer transition text-sm md:text-base">
                  COMPRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Produtos;