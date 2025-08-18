import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";

import NavBar from "../components/NavBar";
import FooterCompleto from "../components/FooterCompleto";

import poster from "../assets/poster.svg";
import banner from "../assets/banner.svg";
import carrinho_roxo from "../assets/carrinho.svg";
import carrinho_branco from "../assets/carrinho branco.svg";
import seta_direita from "../assets/seta direita.svg";
import seta_esquerda from "../assets/seta esquerda.svg";
import product from "../assets/[PRODUCT] 1.svg";
import estrela from "../assets/estrela.svg";
import pessoas from "../assets/pessoas.svg";
import large_product from "../assets/large_product.svg";
import banner_slogan from "../assets/banner_slogan.svg";

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
      name: "Ácido hialurônico Premium",
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
    },
    {
      name: "Ácido hialurônico hidratante firmador",
      description: "Descubra o poder do ativo que preenche, suaviza e revitaliza sua pele de dentro pra fora.",
      price: "59,90",
      image: product,
    },
    {
      name: "Ácido hialurônico Premium",
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
    }]);

    const comments = [
      {
        product_title: 'Creme Noturno Regenerador',
        description: 'Acordo com a pele super macia e renovada! Esse creme noturno é maravilhoso, tem uma textura leve e um cheirinho calmante. Parece que minha pele descansa junto comigo.',
        stars: 5
      },
      {
        product_title: 'Creme Noturno Regenerador',
        description: 'Acordo com a pele super macia e renovada! Esse creme noturno é maravilhoso, tem uma textura leve e um cheirinho calmante. Parece que minha pele descansa junto comigo.',
        stars: 5
      },
      {
        product_title: 'Creme Noturno Regenerador',
        description: 'Acordo com a pele super macia e renovada! Esse creme noturno é maravilhoso, tem uma textura leve e um cheirinho calmante. Parece que minha pele descansa junto comigo.',
        stars: 5
      },
      {
        product_title: 'Creme Noturno Regenerador',
        description: 'Acordo com a pele super macia e renovada! Esse creme noturno é maravilhoso, tem uma textura leve e um cheirinho calmante. Parece que minha pele descansa junto comigo.',
        stars: 5
      }
    ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const scrollToSection = () => {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full h-[1000vh] items-center">
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

      <section id="products" className="flex flex-col items-center h-[120vh] mt-30">
        <img className="w-295 shadow-lg" src={banner} alt="" />
        <h2 className="mt-16 text-[22px] font-primary font-medium tracking-[2px] text-salmon">
          Queridinhos da galera
        </h2>
        <h1 className="mt-2 text-extradarkpurple font-secondary tracking-[1px] text-[45px] font-medium">
          Produtos mais vendidos
        </h1>
        <div className="w-full mt-15 relative">
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={45}
      slidesPerView={4}
       navigation={{
         nextEl: '.custom-next',
         prevEl: '.custom-prev',
        }}
      loop={true}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: (index, className) => {
          // Mostra apenas os 5 primeiros bullets
          if (index < 5) {
            return `<span class="${className}"></span>`;
          }
          return "";
        },
      }}
      speed={600}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      className="w-295 flex relative z-0"
    >
      {products?.map((item, index) => (
        <SwiperSlide key={index} className="group flex flex-col items-center cursor-pointer mb-10">
        <div className="flex flex-col h-max-[100vh] w-[258px] gap-1">
         <div className="w-[258px] h-[278px] transition-transform duration-300 group-hover:scale-110 group-hover:z-10 relative">
          <img className="w-full h-full object-cover" src={item.image} alt="" />
         </div>
         <h1 className="text-black opacity-70 text-[22px] h-[70px] font-secondary not-italic [font-optical-sizing:auto] font-bold w-full mt-3">{item.name}</h1>
         <p className="w-full text-[13px] text-black h-[40px]">{item.description}</p>
         <div className="w-full mt-5 flex gap-1">
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
         </div>
         <div className="text-purpledark text-[20px] font-semibold">{`R$ ${item.price}`}</div>
         <div className="flex flex-row w-full gap-1.5">
          <div className="flex w-45 bg-blue p-2 justify-center items-center text-purpledark rounded-xl font-semibold hover:bg-purpledark hover:text-white transition duration-300">Adicionar</div>
          <div className="flex justify-center items-center border-[1.5px] w-20 border-purpledark rounded-xl p-2 hover:bg-purpledark transition duration-300"
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
      <div className="swiper-pagination cursor-pointer"></div>
      <div className="custom-prev absolute left-[-60px] top-[45%] w-15 -translate-y-1/2 z-10 cursor-pointer"><img src={seta_esquerda} alt="" /></div>
      <div className="custom-next absolute right-[-60px] top-[45%] w-15 -translate-y-1/2 z-10 cursor-pointer"><img src={seta_direita} alt="" /></div>
      </div>
      </section>
      <section id="products#2" className="flex flex-col items-center h-[120vh] mt-10">
        <h2 className="mt-16 text-[22px] font-medium tracking-[2px] text-salmon">
          Coleção de verão
        </h2>
        <h1 className="mt-2 text-extradarkpurple font-secondary tracking-[1px] text-[45px] font-medium">
          Refrescantes e arejados
        </h1>
        <div className="w-full mt-15 relative">
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={45}
      slidesPerView={4}
       navigation={{
         nextEl: '.custom-next-2',
         prevEl: '.custom-prev-2',
        }}
      loop={true}
      pagination={{
        el: ".swiper-pagination-2",
        clickable: true,
        renderBullet: (index, className) => {
          // Mostra apenas os 5 primeiros bullets
          if (index < 5) {
            return `<span class="${className}"></span>`;
          }
          return "";
        },
      }}
      speed={600}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      className="w-295 flex relative z-0"
    >
      {products?.map((item, index) => (
        <SwiperSlide key={index} className="group flex flex-col items-center cursor-pointer mb-10">
        <div className="flex flex-col h-max-[100vh] w-[258px] gap-1">
         <div className="w-[258px] h-[278px] transition-transform duration-300 group-hover:scale-110 group-hover:z-10 relative">
          <img className="w-full h-full object-cover" src={item.image} alt="" />
         </div>
         <h1 className="text-black opacity-70 text-[22px] h-[70px] font-secondary not-italic [font-optical-sizing:auto] font-bold w-full mt-3">{item.name}</h1>
         <p className="w-full text-[13px] text-black h-[40px]">{item.description}</p>
         <div className="w-full mt-5 flex gap-1">
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
         </div>
         <div className="text-purpledark text-[20px] font-semibold">{`R$ ${item.price}`}</div>
         <div className="flex flex-row w-full gap-1.5">
          <div className="flex w-45 bg-blue p-2 justify-center items-center text-purpledark rounded-xl font-semibold hover:bg-purpledark hover:text-white transition duration-300">Adicionar</div>
          <div className="flex justify-center items-center border-[1.5px] w-20 border-purpledark rounded-xl p-2 hover:bg-purpledark transition duration-300"
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
      <div className="swiper-pagination-2 cursor-pointer"></div>
      <div className="custom-prev-2 absolute left-[-60px] top-[45%] w-15 -translate-y-1/2 z-10 cursor-pointer"><img src={seta_esquerda} alt="" /></div>
      <div className="custom-next-2 absolute right-[-60px] top-[45%] w-15 -translate-y-1/2 z-10 cursor-pointer"><img src={seta_direita} alt="" /></div>
      </div>
      </section>
      <section className="flex flex-row w-295 h-[45vh] ml-30 mr-30 mt-5 gap-5">
        <div className="flex flex-col w-80 gap-2 h-full">
          <h1 className="text-blackwhite text-[28px] font-medium leading-[35px] tracking-[1px] font-secondary">A realidade sobre nossas entregas</h1>
          <p className="text-blackwhite text-[15px] font-secondary">Felizmente, com todo o esforço da nossa trajetória, recebemos diversos feedbacks dos clientes — e achamos importante compartilhá-los.</p>
          <div className="mt-2">
            <img src={pessoas} alt="" />
          </div>
        </div>
        <Swiper
           modules={[Navigation, A11y]}
            spaceBetween={15}
            slidesPerView={"auto"}
            // navigation={{
            //   nextEl: '.custom-next',
            //   prevEl: '.custom-prev',
            //   }}
            loop={true}
            speed={600}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }} 
          className="flex flex-row w-295 h-[28vh] items-center"
          >
          {
            comments?.map((item, index) => (
              <SwiperSlide
                className="flex flex-col !w-73 gap-3 border-3 border-purple rounded-2xl justify-start p-5"
                key={index}
              >
                <div className="flex flex-row gap-2 w-10">
                  {
                    item.stars === 1
                    ?
                    <img src={estrela} alt="estrela" />
                    :
                    item.stars === 2
                    ?
                    <>
                    <img src={estrela} alt="estrela" />
                    <img src={estrela} alt="estrela" />
                    </>
                    :
                    item.stars === 3
                    ?
                    <>
                    <img src={estrela} alt="estrela" />
                    <img src={estrela} alt="estrela" />
                    <img src={estrela} alt="estrela" />
                    </>
                    :
                    item.stars === 4
                    ?
                    <>
                    <img src={estrela} alt="estrela" />
                    <img src={estrela} alt="estrela" />
                    <img src={estrela} alt="estrela" />
                    <img src={estrela} alt="estrela" />
                    </>
                    :
                    item.stars === 5
                    ?
                    <>
                    <img src={estrela} alt="estrela" />
                    <img src={estrela} alt="estrela" />
                    <img src={estrela} alt="estrela" />
                    <img src={estrela} alt="estrela" />
                    <img src={estrela} alt="estrela" />
                    </>
                    :
                    <div>Sem estrelas</div>
                  }
                </div>
                <h1 className="w-70 text-[16px] font-secondary font-bold text-extradarkpurple">{item.product_title}</h1>
                <p className="w-65 text-[14px] font-secondary text-black opacity-70">{`"${item.description}"`}</p>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </section>
      <section className="flex flex-col bg-black mt-10 h-[100vh]">
        <img src={large_product} alt="" />
        <img src={banner_slogan} alt="" />
      </section>
      <section className="h-[100vh] w-full mt-30">
        <FooterCompleto />
      </section>
    </div>
  );
}

export default Home;