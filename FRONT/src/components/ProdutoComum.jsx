import { useState, useRef,useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

//components importados
import Filtro from "../components/Filtro.jsx";
import NavBar from "../components/NavBar.jsx";
import Sugestao from "../components/Sugestão.jsx";
import FooterCompleto from "../components/FooterCompleto.jsx";
import Feedback from "../components/Feedback.jsx";
import FeedbackDeitado from "../components/FeedbackDeitado.jsx"

// fotos
import noture1 from "../assets/SKYNSNature1.svg";
import noture2 from "../assets/SKYNSNature2.svg";
import noture3 from "../assets/SKYNSNature3.svg";
import estrelas from "../assets/estrelas.svg";
import iconcheck from "../assets/iconCheck.svg";

// setas
import setaEsquerda from "../assets/SetaEsquerdaCinza.svg";
import setaDireita from "../assets/SetaDireitaCinza.svg";

function ProdutoComum({ dados }) {

  const [activeIndex, setActiveIndex] = useState(0);
  const fotos = [noture3, noture1, noture2];
  const swiperRef = useRef(null);

  const handleMiniClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const [quantidade, setQuantidade] = useState(1);

  const aumentar = () => {
    setQuantidade((prev) => prev + 1);
  };

  const diminuir = () => {
    if (quantidade > 1) {
      setQuantidade((prev) => prev - 1);
    }
  };

  const [tab, setTab] = useState("composicao");

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <NavBar />

      {/* primeira parte(fotos e descrição) */}
      <div className="flex pt-18 p-10 gap-8">
        {/* 2 - Fotos */}
        <div className="flex gap-6 p-4 pl-25">
          {/* Coluna de miniaturas */}
          <div className="flex flex-col gap-4">
            {fotos.map((foto, index) => (
              <img
                key={index}
                className={`w-[100px] cursor-pointer border-2 ${
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
          <div className="w-[450px] h-[580px] relative">
            <button className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-10">
              <img src={setaEsquerda} alt="anterior" className="w-8 h-8 cursor-pointer" />
            </button>
            <button className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-10"> 
            
              <img src={setaDireita} alt="próximo" className="w-8 h-8 cursor-pointer" />
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
        <div className="p-7 flex flex-col pl-10">
          <div className="flex items-center gap-4">
            <p className="bg-lightgreen p-0.5 px-1 text-purpledark font-bold rounded-[7px]">
              10% OFF
            </p>
            <img src={estrelas} alt="estrelas" />
          </div>
          <p className="pt-6 font-medium text-[25px] text-gray2">
            {dados.titulo_}
          </p>
          <div className="flex justify-end w-[70%]">
            <p className="mt-4  bg-blackwhite/20 w-fit px-2 py-0.5 rounded-sm">
              300g
            </p>
          </div>

          <div className="pt-2 flex gap-3 items-center">
            <p className="line-through text-black/40 font-bold">R$89,90</p>{" "}
            <p className=" text-purpledark font-bold text-[25px]">R$59,90</p>
          </div>
          <div>
            <p className="w-150 text-[17px] mt-2 text-blackwhite/95">
             {dados.completa_descricao}
            </p>
            <p className="mt-3 font-semibold text-[18px] text-blackwhite/80">
              O que ele faz?
            </p>
            <ul className="mt-2 ">
              <li className="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Remove impurezas e células mortas{" "}
              </li>
              <li className="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Protege contra os radicais livres
              </li>
              <li className="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Uniformiza o tom da pele{" "}
              </li>
              <li className="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Hidrata profundamente{" "}
              </li>
              <li className="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Estimula a renovação celular{" "}
              </li>
            </ul>
          </div>
          {/* botao de quantidade */}
          <div className="flex items-center gap-4 mt-7">
            <div className="flex items-center border-2 border-purpledark rounded-lg w-30 p-6 py-1">
              <button
                onClick={diminuir}
                className="text-purpledark text-xl font-medium w-10 cursor-pointer"
              >
                −
              </button>
              <span className="mx-3 text-purpledark font-medium w-10 ">
                {quantidade}
              </span>
              <button
                onClick={aumentar}
                className="text-purpledark text-xl font-medium w-10 cursor-pointer"
              >
                +
              </button>
            </div>
            <button className="bg-blue text-purpledark font-semibold px-13 py-2 rounded-lg transition cursor-pointer hover:bg-purpledark hover:text-white">
              COMPRAR
            </button>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto  mt-10">
        <div className="flex items-start gap-10">
          {/* Feedback  */}
          <div className="w-1/3">
            <FeedbackDeitado />
          </div>

          {/* Abas + Conteúdo */}
          <div className="w-2/3">
            {/* Abas */}
            <div className="flex border-b-2 border-b-blackwhite/50 gap-6">

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
            <div className="mt-6">

              {tab === "composicao" && (
                <div class='font-secondary'>
                  <p className="mt-6 text-[16px]"> 
                  ativo hidratante que carrega até mais de mil vezes o seu peso em água, nutre e hidrata a pele, além de prevenir e 
                  suavizar os sinais do tempo. nossa fórmula conta com oitos formas e três pesos moleculares distintos desse ativo, 
                  o que proporciona sua penetração em diferentes camadas da pele. 
                  </p>
                  <p className="mt-12 text-[16px]"> 
                  também conhecido como Pro-Vitamina B5, o pantenol tem alto poder hidratante devido sua capacidade de atrair e reter 
                  umidade. além disso, promove ação calmante, suavizante e anti-inflamatória. 
                  </p>
                  <p className="mt-12 text-[16px]"> 
                  comum no hemisfério norte, esse ingrediente era usado desde a China Imperial para manter a pele limpa e luminosa e 
                  diminuir a aparência dos sinais do tempo. na nossa fórmula, ele age na recuperação da luminosidade da pele, 
                  estimula a firmeza e contribui para suavizar linhas finas. 
                  </p>
                </div>
              )}
            </div>
        {/* Sugestões */}
        <div className="mt-25">
          <Sugestao />
        </div>
          </div>
        </div>

      </div>

      <div className="mt-30">
        <FooterCompleto />
      </div>
    </div>
  );
}

export default ProdutoComum;
