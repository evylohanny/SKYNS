import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";

import NavBar from "../components/NavBar";
import poster from "../assets/poster.svg";
import banner from "../assets/Frame 23864.svg";
import carrinho_roxo from "../assets/carrinho.svg";
import carrinho_branco from "../assets/carrinho branco.svg";

import product from "../assets/[PRODUCT] 1.svg";

function Home() {

  const [products, setProcuts] = useState([
     {
    name: "Ácido hialurônico hidratante firmador",
    description:
      "Descubra o poder do ativo que preenche, suaviza e revitaliza sua pele de dentro pra fora.",
    price: "59,90",
    image: product,
  },
  {
    name: "Ácido hialurônico hidratante firmador Premium",
    description:
      "Versão premium com alta concentração para resultados mais rápidos e duradouros.",
    price: "89,90",
    image: product,
  },
  {
    name: "Sérum humificado três leites",
    description: "O mais puro esfoliante extraído do leite de cabra.",
    price: "37,99",
    image: product,
  },
  {
    name: "Protetor labial sabor cereja do amor",
    description:
      "Apaixone-se pelo toque suave e o sabor irresistível da cereja do amor.",
    price: "37,99",
    image: product,
  },
  {
    name: "Máscara facial detox de argila verde",
    description:
      "Remove impurezas e controla a oleosidade sem ressecar a pele.",
    price: "29,90",
    image: product,
  },
  {
    name: "Creme nutritivo com vitamina C",
    description: "Ilumina e uniformiza o tom da pele com ação antioxidante.",
    price: "49,90",
    image: product,
  }]);

  const [hoveredIndex, setHoveredIndex] = useState(null);

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

      <section id="products" className="flex flex-col items-center h-[100vh] mt-30">
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
      className="w-265 gap-3"
    >
      {products?.map((item, index) => (
        <SwiperSlide key={index} className="group flex flex-col items-center cursor-pointer relative-group">
        <div className="flex flex-col h-max-[100vh] w-[238px] gap-4">
         <div className="w-[238px] h-[268px] transition-transform duration-300 group-hover:scale-110 group-hover:z-10 relative">
          <img className="w-full h-full object-cover" src={item.image} alt="" />
         </div>
         <h1 className="text-black opacity-70 text-[20px] h-[80px] font-secondary not-italic [font-optical-sizing:auto] font-bold ml-3 w-full">{item.name}</h1>
         <p className="w-full ml-3 text-[13px] text-black h-[40px]">{item.description}</p>
         <div className="w-full mt-2 ml-3">⭐⭐⭐⭐⭐</div>
         <div className="text-purpledark text-[20px] font-semibold ml-3">{`R$ ${item.price}`}</div>
         <div className="flex flex-row w-full ml-3 gap-1.5">
          <div className="flex w-50 bg-blue p-2 justify-center items-center text-purpledark rounded-xl font-semibold hover:bg-purpledark hover:text-white transition duration-300">Adicionar</div>
          <div className="flex justify-center items-center border-[1.5px] w-15 border-purpledark rounded-xl p-2 hover:bg-purpledark transition duration-300"
           onMouseEnter={() => setHoveredIndex(index)}
           onMouseLeave={() => setHoveredIndex(null)}
          >
            <img className="w-5" src={hoveredIndex === index ? carrinho_branco : carrinho_roxo} alt="" />
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