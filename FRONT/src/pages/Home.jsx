import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";

import NavBar from "../components/NavBar";
import poster from "../assets/poster.svg";
import banner from "../assets/Frame 23864.svg";

import fototeste from "../assets/logoNav.svg";

import { FaStar } from "react-icons/fa";

function Home() {

  const [products, setProcuts] = useState([
     {
    name: "Ácido hialurônico hidratante firmador",
    description:
      "Descubra o poder do ativo que preenche, suaviza e revitaliza sua pele de dentro pra fora.",
    price: "59,90",
    image: fototeste,
  },
  {
    name: "Ácido hialurônico hidratante firmador Premium",
    description:
      "Versão premium com alta concentração para resultados mais rápidos e duradouros.",
    price: "89,90",
    image: fototeste,
  },
  {
    name: "Sérum humificado três leites",
    description: "O mais puro esfoliante extraído do leite de cabra.",
    price: "37,99",
    image: fototeste,
  },
  {
    name: "Protetor labial sabor cereja do amor",
    description:
      "Apaixone-se pelo toque suave e o sabor irresistível da cereja do amor.",
    price: "37,99",
    image: fototeste,
  },
  {
    name: "Máscara facial detox de argila verde",
    description:
      "Remove impurezas e controla a oleosidade sem ressecar a pele.",
    price: "29,90",
    image: fototeste,
  },
  {
    name: "Creme nutritivo com vitamina C",
    description: "Ilumina e uniformiza o tom da pele com ação antioxidante.",
    price: "49,90",
    image: fototeste,
  }]);

  const scrollToSection = () => {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full">
      <NavBar />

      <section className="relative w-full h-[75vh] flex items-start">
        <div className="absolute left-[8%] top-[25%] flex flex-col gap-3 max-w-[600px]">
          <p className="text-white text-[15px] tracking-[1.5px] uppercase font-semibold">
            Cuidar da pele também é cuidar de você
          </p>
          <h1 className="text-extradarkpurple w-160 font-bold text-[50px] leading-[65px]">
            Transforme sua rotina em um ritual de acolhimento.
          </h1>
          <p className="text-white w-150 text-[15px] tracking-[1.5px] uppercase font-semibold">
            Sua pele é única. Descubra os ingredientes certos para cuidar dela com ciência e carinho.
          </p>
          <button onClick={scrollToSection} className="cursor-pointer text-[23px] bg-purpledark text-white hover:bg-white hover:text-purple px-6 py-3 rounded-full font-semibold w-40 transition-colors duration-500">
              Vamos lá
          </button>
        </div>

        <div className="flex items-center">
          <img
            src={poster}
            alt="Mulher segurando produto"
            className="h-[100%] object-contain"
          />
        </div>
      </section>

      <section id="products" className="flex flex-col items-center h-[100vh]">
        <img className="max-w-[1200px] w-full shadow-lg" src={banner} alt="" />
        <h2 className="mt-16 text-[22px] font-medium tracking-[2px] text-salmon">
          Queridinhos da galera
        </h2>
        <h1 className="mt-2 text-extradarkpurple font-secondary tracking-[1px] text-[45px] font-medium">
          Produtos mais vendidos
        </h1>
        <div className="w-full mt-15">
<Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={20}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      className="px-8"
    >
      {products?.map((item, index) => (
        <SwiperSlide key={index} className="flex flex-col items-center">
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-[260px] mr-15 ml-15">
            <div className="w-full h-[240px] bg-gray-100 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>

              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="text-lg font-bold text-purple-600">
                R${item.price}
              </p>

              <div className="flex items-center gap-3">
                <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded-full transition">
                  Adicionar
                </button>
                <button className="p-2 border-2 border-purple-500 rounded-full hover:bg-purple-100 transition">
                  🛒
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
        </div>
      </section>
    </div>
  );
}

export default Home;