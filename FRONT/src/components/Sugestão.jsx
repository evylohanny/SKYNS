import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

import foto1Su from "../assets/foto1Su.svg";
import foto2Su from "../assets/foto2Su.svg";
import foto3Su from "../assets/foto3Su.svg";
import foto4Su from "../assets/foto4Su.svg";
import foto5Su from "../assets/foto5Su.svg";
import setaEsquerda from "../assets/SetaEsquerdaCinza.svg";
import setaDireita from "../assets/SetaDireitaCinza.svg";

function Sugestao() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const produtos = [
    {
      img: foto1Su,
      nome: "Protetor labial sabor cereja do amor",
      preco: "R$ 59,90",
    },
    { img: foto2Su, nome: "Ativo labial cereja do amor", preco: "R$ 59,90" },
    {
      img: foto3Su,
      nome: "Ativo labial laranja vern de verão",
      preco: "R$ 59,90",
    },
    {
      img: foto4Su,
      nome: "Protetor labial sabor cereja do amor",
      preco: "R$ 59,90",
    },
    { img: foto5Su, nome: "Ativo labial cereja do amor", preco: "R$ 59,90" },
    {
      img: foto1Su,
      nome: "Protetor labial sabor cereja do amor",
      preco: "R$ 59,90",
    },
    { img: foto2Su, nome: "Ativo labial cereja do amor", preco: "R$ 59,90" },
    {
      img: foto3Su,
      nome: "Ativo labial laranja vern de verão",
      preco: "R$ 59,90",
    },
    {
      img: foto4Su,
      nome: "Protetor labial sabor cereja do amor",
      preco: "R$ 59,90",
    },
    { img: foto5Su, nome: "Ativo labial cereja do amor", preco: "R$ 59,90" },
  ];

  // Função para dividir em grupos (chunks)
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const produtosPorSlide = 5;
  const slides = chunkArray(produtos, produtosPorSlide);

  return (
    <div className="relative bg-graymedium p-4 rounded-lg w-[100%] ml-auto mr-0 ">
      <div className="flex flex-col px-6">
        <h2 className="text-lg font-semibold text-gray2 pl-4">
          Aproveite as promoções e complete sua rotina
        </h2>
        <p className="text-gray2 text-sm mb-4 pl-4">
          Até 10% OFF na compra de 3 unidades
        </p>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="!pl-4"
      >
        {slides.map((grupo, index) => (
          <SwiperSlide
            key={index}
            className="!flex !flex-row px-6 text-center justify-end items-center !h-[350px]"
          >
            {grupo.map((item, i) => (
              <div
                key={i}
                className="flex flex-col w-[22%] h-[500px] justify-center items-start
             transform transition duration-300 hover:scale-105 cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.nome}
                  className="object-cover w-[90%]"
                />
                <div className="!flex flex-col w-[80%] !items-start gap-3 text-start pb-2">
                  <p className="text-sm font-medium mt-3 line-clamp-2 text-black/70">
                    {item.nome}
                  </p>
                  <p className="text-purpledark/75 font-semibold text-base">
                    {item.preco}
                  </p>
                </div>
                <button
                  className="bg-purpledark text-white px-10 py-2 mt-3 rounded-full font-semibold 
             hover:bg-blue hover:text-purpledark transition text-sm"
                >
                  LEVAR
                </button>
              </div>
            ))}
          </SwiperSlide>
        ))}

        <button
          ref={prevRef}
          className="absolute left-1 top-36 -translate-y-1/2 z-10 cursor-pointer"
        >
          <img src={setaEsquerda} alt="Anterior" className="w-7 h-7" />
        </button>

        <button
          ref={nextRef}
          className="absolute right-1 top-36 -translate-y-1/2 z-10 cursor-pointer"
        >
          <img src={setaDireita} alt="Próximo" className="w-7 h-7" />
        </button>
      </Swiper>
    </div>
  );
}

export default Sugestao;
