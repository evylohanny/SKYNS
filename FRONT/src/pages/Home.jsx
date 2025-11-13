import { useEffect, useState } from "react";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { GlobalContext } from "../context/GlobalContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContext } from "react";
import clsx from 'clsx';
import "swiper/css";
import ky from 'ky';

import FooterCompleto from "../components/FooterCompleto";
import NavBar from "../components/NavBar";

import poster from "../assets/poster.svg";
import poster_2 from "../assets/poster_2.svg";
import poster_3 from "../assets/poster_3.svg";
import poster_4 from "../assets/poster_4.svg";
import banner from "../assets/banner.svg";
import banner2 from "../assets/banner2.svg";
import carrinho_roxo from "../assets/carrinho.svg";
import carrinho_branco from "../assets/carrinho branco.svg";
import seta from "../assets/seta direita.svg";
import product from "../assets/[PRODUCT] 1.svg";
import product_2 from "../assets/[PRODUCT] 2.svg";
import estrela from "../assets/estrela.svg";
import pessoas from "../assets/pessoas.svg";
import large_product from "../assets/large_product.svg";
import banner_slogan from "../assets/banner_slogan.svg";
import woman from "../assets/woman.svg";
import image1 from "../assets/image1.svg";
import image2 from "../assets/image2.svg";
import image3 from "../assets/image3.svg";
import image4 from "../assets/image4.svg";
import seta_comments from "../assets/seta-comments.svg";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productPhotos, setProductPhotos] = useState({});

  useEffect(() => {

    const getProducts = async() => {

      try {
        
        const response = await ky.get('http://localhost:3000/produtos').json();
        
        console.log(response);
        setProducts(response);
        
        if (response && response.length > 0) {
          fetchAllProductPhotos(response);
        }
      } catch (error) {
        
        if (error.response && error.response.status === 404) {

          console.log('Produto não encontrado.');
          return null;
        };

        console.log('Erro inesperado: ', error.message);
      };
    };

    const fetchAllProductPhotos = async (productsList) => {
      const photos = {};
      
      for (const product of productsList) {
        try {
          const photoUrl = await getProductPhoto(product.id_produto);
          if (photoUrl) {
            photos[product.id_produto] = photoUrl;
          }
        } catch (error) {
          console.log(`Erro ao buscar foto do produto ${product.id_produto}:`, error);
          photos[product.id_produto] = product;
        }
      }
      
      setProductPhotos(photos);
    };

    getProducts();
  }, []);

  const getProductPhoto = async (id) => {

    try {
      
      const response = await ky.get(`http://localhost:3000/${id}/foto`).json();

      if (response) {
        console.log(response.data);
        return response.data.url;
      }
      console.log('Erro');
    } catch (error) {

      console.log({
        message: `Erro ao buscar foto do produto ${id}`,
        error: error.message
      });
      return null;
    };
  };

  const getProductImage = (product) => {
    if (productPhotos[product.id_produto]) {
      return productPhotos[product.id_produto];
    }
    
    return product.tipo ? product_2 : product;
  };

  const handleProductClick = (tipo, id) => {

    if(tipo){
      navigate("/produtocustomizavel", { state: { tipo: tipo, id: id } });
    } else {
      navigate("/produtocomum", { state: { tipo: tipo, id: id } });
    };
  };

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
    const posters = [poster, poster_2, poster_3, poster_4];
    const {logoAnimation, setLogoAnimation} = useContext(GlobalContext);
    const [mostrarLogo, setMostrarLogo] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {

      setTimeout(() => {

        setMostrarLogo(false);
      }, 3000);
    }, []);

    useEffect(()=> {

      if (!mostrarLogo) {

        setTimeout(() => {
          
          setLogoAnimation(false);
        }, 2000);
      }
    }, [mostrarLogo]);

  const scrollToSection = () => {
    document.getElementById("banner").scrollIntoView({ behavior: "smooth" });
  };

  const renderStars = (count) => {

    return Array.from({ length: count }, (_, i) => <img key={i} src={estrela} alt="estrela" />);
  }
  
  return (
    mostrarLogo && logoAnimation
    ?
    <div className="flex flex-col m-0 p-0 justify-center items-center w-full h-full animate-fadeOutContainer">
      <img className="w-30 animate-fadeInUp" src={logo} alt="Logo SKYNS" />
    </div>
    :
    <div className={clsx("flex flex-col w-full h-[1050vh] mt-[-0.9%] items-center gap-10", logoAnimation && "animate-fadeInUp")}>
      <NavBar />
      <section className="relative w-full h-[75vh] flex items-start">
        <div className="flex items-center w-full">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            className="relative w-full h-[100%] object-contain flex"
          >
            {
              posters.map((src, index) => (

              <SwiperSlide key={index} className="relative h-full w-full">
                <img
                  src={src}
                  alt=""
                  className=""
                />

                {
                  (index === 0 || index === 2) &&
                   <div className={index === 0? "absolute z-100 left-[8%] top-[70%] flex flex-col gap-3 max-w-[600px]" : "absolute z-100 left-[55%] top-[70%] flex flex-col gap-3 max-w-[600px]"}>
                    <button onClick={scrollToSection} className="cursor-pointer text-[26px] bg-purpledark text-white hover:bg-white hover:text-purple px-6 py-3 rounded-full font-semibold w-50 transition-colors duration-500">
                        Vamos lá
                    </button>
                  </div>
                }
              </SwiperSlide>
            ))
          }
            </Swiper>
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
          if (index < 11) {
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
         <div className="w-[258px] h-[278px] transition-transform duration-300 group-hover:scale-110 group-hover:z-10 relative"
          onClick={() => handleProductClick(item.personalizado, item.id_produto)}
         >
          <img className="w-full h-full object-cover" src={getProductImage(item)} alt={item.titulo_} onError={(e) => { e.target.src = product; }} />
         </div>
         <h1 className="text-black opacity-70 text-[22px] h-[70px] font-secondary not-italic [font-optical-sizing:auto] font-bold w-full mt-3">{item.titulo_}</h1>
         <p className="w-full text-[13px] text-black h-[40px]">{item.breve_descricao}</p>
         <div className="w-full mt-5 flex gap-1">{renderStars(5)}</div>
         <div className="text-purpledark text-[20px] font-semibold">{`R$ ${item.preco}`}</div>
         <div className="flex flex-row w-full gap-1.5">
          <div className="flex w-45 bg-blue p-2 justify-center items-center text-purpledark rounded-xl font-semibold hover:bg-purpledark hover:text-white transition duration-300"
           onClick={() => handleProductClick(item.tipo)}
          >Adicionar</div>
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
      <div className="custom-prev absolute left-[-100px] top-[45%] w-15 -translate-y-1/2 z-10 cursor-pointer"><img className="transform scale-x-[-1]" src={seta} alt="" /></div>
      <div className="custom-next absolute right-[-100px] top-[45%] w-15 -translate-y-1/2 z-10 cursor-pointer"><img src={seta} /></div>
      </div>
      </section>
      <section id="products#2" className="flex flex-col items-center h-[120vh] mt-20">
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
          if (index < 11) {
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
         <div className="w-[258px] h-[278px] transition-transform duration-300 group-hover:scale-110 group-hover:z-10 relative"
          onClick={() => handleProductClick(item.tipo)}
         >
          <img className="w-full h-full object-cover" src={getProductImage(item)} alt={item.titulo_} onError={(e) => { e.target.src = product; }} />
         </div>
         <h1 className="text-black opacity-70 text-[22px] h-[70px] font-secondary not-italic [font-optical-sizing:auto] font-bold w-full mt-3">{item.titulo_}</h1>
         <p className="w-full text-[13px] text-black h-[40px]">{item.breve_descricao}</p>
         <div className="w-full mt-5 flex gap-1">
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
         </div>
         <div className="text-purpledark text-[20px] font-semibold">{`R$ ${item.preco}`}</div>
         <div className="flex flex-row w-full gap-1.5">
          <div className="flex w-45 bg-blue p-2 justify-center items-center text-purpledark rounded-xl font-semibold hover:bg-purpledark hover:text-white transition duration-300">Adicionar</div>
          <div className="flex justify-center items-center border-[1.5px] w-20 border-purpledark rounded-xl p-2 hover:bg-purpledark transition duration-300"
           onMouseEnter={() => setHoveredIndex(index)}
           onMouseLeave={() => setHoveredIndex(null)}
           onClick={() => handleProductClick(item.tipo)}
          >
            <img className="w-5" src={hoveredIndex === index ? carrinho_branco : carrinho_roxo} alt="" />
          </div>
         </div>
        </div>
        </SwiperSlide>
      ))}
    </Swiper>
      <div className="swiper-pagination-2 cursor-pointer"></div>
      <div className="custom-prev-2 absolute left-[-100px] top-[45%] w-15 -translate-y-1/2 z-10 cursor-pointer"><img className="transform scale-x-[-1]" src={seta} alt="" /></div>
      <div className="custom-next-2 absolute right-[-100px] top-[45%] w-15 -translate-y-1/2 z-10 cursor-pointer"><img src={seta} alt="" /></div>
      </div>
      </section>
      <section className="relative flex flex-row w-295 h-[45vh] ml-30 mr-30 mt-25 gap-5">
        <div className="flex flex-col w-80 gap-2 h-full">
          <h1 className="text-blackwhite text-[28px] font-medium leading-[35px] tracking-[1px] font-secondary">A realidade sobre nossas entregas</h1>
          <p className="text-blackwhite text-[15px] font-secondary">Felizmente, com todo o esforço da nossa trajetória, recebemos diversos feedbacks dos clientes — e achamos importante compartilhá-los.</p>
          <div className="mt-2">
            <img src={pessoas} alt="" />
          </div>
        </div>
        <Swiper
           modules={[Navigation, A11y]}
            spaceBetween={18}
            slidesPerView={"auto"}
            navigation={{
              nextEl: '.custom-next-comments'
              }}
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
        <div className="custom-next-comments absolute right-[-100px] top-[45%] w-15 -translate-y-1/2 z-10 cursor-pointer"><img src={seta_comments} /> </div> 
      </section>
      <section className="flex flex-col bg-black mt-10 h-[100vh]">
        <img src={large_product} alt="" />
        <img src={banner_slogan} alt="" />
      </section>
      <section id="banner" className="flex flex-col items-center h-[120vh] mt-30">
        <h2 className="mt-16 text-[22px] font-medium tracking-[2px] text-extradarkpurple">
          Personalizáveis
        </h2>
        <h1 className="mt-2 text-purpledark font-secondary tracking-[1px] text-[45px] font-medium">
          O produto ideal para você
        </h1>
        <div className="w-full mt-15 relative">
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={45}
      slidesPerView={4}
       navigation={{
         nextEl: '.custom-next-3',
         prevEl: '.custom-prev-3',
        }}
      loop={true}
      pagination={{
        el: ".swiper-pagination-3",
        clickable: true,
        renderBullet: (index, className) => {
          if (index < 11) {
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
         <div className="w-[258px] h-[278px] transition-transform duration-300 group-hover:scale-110 group-hover:z-10 relative"
         onClick={() => handleProductClick(item.tipo)}
         >
          <img className="w-full h-full object-cover" src={getProductImage(item)} alt={item.titulo_} onError={(e) => { e.target.src = product; }} />
         </div>
         <h1 className="text-black opacity-70 text-[22px] h-[70px] font-secondary not-italic [font-optical-sizing:auto] font-bold w-full mt-3">{item.titulo_}</h1>
         <p className="w-full text-[13px] text-black h-[40px]">{item.breve_descricao}</p>
         <div className="w-full mt-5 flex gap-1">
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
          <img src={estrela} alt="" />
         </div>
         <div className="text-purpledark text-[20px] font-semibold">{`R$ ${item.preco}`}</div>
         <div className="flex flex-row w-full gap-1.5">
          <div className="flex w-45 bg-blue p-2 justify-center items-center text-purpledark rounded-xl font-semibold hover:bg-purpledark hover:text-white transition duration-300">Adicionar</div>
          <div className="flex justify-center items-center border-[1.5px] w-20 border-purpledark rounded-xl p-2 hover:bg-purpledark transition duration-300"
           onMouseEnter={() => setHoveredIndex(index)}
           onMouseLeave={() => setHoveredIndex(null)}
           onClick={() => handleProductClick(item.tipo)}
          >
            <img className="w-5" src={hoveredIndex === index ? carrinho_branco : carrinho_roxo} alt="" />
          </div>
         </div>
        </div>
        </SwiperSlide>
      ))}
    </Swiper>
      <div className="swiper-pagination-3 cursor-pointer"></div>
      <div className="custom-prev-3 absolute left-[-100px] top-[45%] w-15 -translate-y-1/2 z-10 cursor-pointer"><img className="transform scale-x-[-1]" src={seta} alt="" /></div>
      <div className="custom-next-3 absolute right-[-100px] top-[45%] w-15 -translate-y-1/2 z-10 cursor-pointer"><img src={seta} alt="" /></div>
      </div>
        <img className="w-295 shadow-lg mt-30" src={banner2} alt="" />
      </section>
      <section className="relative w-full h-[100vh] flex items-start justify-center mt-70">
        <div className="h-full w-295 flex flex-col">
          <div className="w-full flex h-[70%]">
          <div className="w-[70%]">
            <h1 className="font-secondary text-extradarkpurple font-bold text-5xl p-4">Produtos Errados Podem Danificar Sua Pele</h1>
            <h2 className="p-4 font-primary text-salmon font-medium text-2xl">Personalize o seu com Segurança</h2>
            <p className="font-secondary text-[1.43rem] text-black opacity-70 ml-4 mt-9 w-[90%]">Na SKYNS, entendemos que cada pele é única, e que nem todo produto funciona da mesma forma para todos. Sabemos que algumas formulações industrializadas podem conter substâncias que irritam, sensibilizam ou até agravam condições como acne, dermatites ou rosácea.</p>
            <p className="font-secondary text-[1.43rem] text-black opacity-70 ml-4 mt-5 w-[95%]">Por isso, desenvolvemos uma funcionalidade exclusiva no nosso sistema: você pode personalizar a composição de determinados produtos, escolhendo ingredientes compatíveis com o seu tipo de pele e evitando substâncias que já causaram reações ou desconforto.</p>
          </div>
          <img src={woman} alt="" />
          </div>
            <p className="font-secondary text-[1.43rem] w-full text-black opacity-70 ml-4 mt-15">Essa personalização é feita com base em critérios dermatológicos e pensada para promover o equilíbrio da barreira cutânea, respeitando as necessidades específicas da sua pele. O resultado é um cuidado mais seguro, eficaz e consciente, feito sob medida para você.
Sua pele fala. Nós ouvimos. E damos a você o poder de escolher.</p>
        </div>
      </section>
      <section className="flex flex-col h-[100vh] w-full justify-center items-center gap-3">
        <p className="font-primary text-[25px] text-salmon">Acne não define você</p>
        <h1 className="font-secondary text-5xl mt-5 text-extradarkpurple w-200 font-medium text-center">Cuidado de verdade começa com conhecimento da sua pele.</h1>
        <div className="flex w-295 h-100 justify-center items-start gap-5 mt-15">
          <div className="flex flex-col font-normal bg-salmon opacity-78 h-100 w-90 mt-3 rounded-3xl p-5 gap-5">
            <img src={image1} alt="" /> 
          </div>
          <div className="h-100 w-fit">
            <img className="w-fit h-106" src={image2} alt="" />
          </div>
          <div className="flex flex-col h-100 w-fit gap-4">
            <img className="h-50 w-fit" src={image3} alt="" />
            <img className="h-50 w-fit" src={image4} alt="" />
          </div>
        </div>
      </section>
      <section className="h-[30vh] mt-15 mb-[-10%]">
        <img className="w-295 shadow-lg" src={banner} alt="" />
      </section>
      <section className="h-[150vh] w-full flex flex-col justify-end">
        <FooterCompleto />
      </section>
    </div>
  );
}

export default Home;