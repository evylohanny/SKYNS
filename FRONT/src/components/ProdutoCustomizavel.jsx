import { useState, useRef } from "react";
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

  const aumentar = () => {
    setQuantidade((prev) => prev + 1);
  };

  const diminuir = () => {
    if (quantidade > 1) {
      setQuantidade((prev) => prev - 1);
    }
  };

  const [tab, setTab] = useState("funciona");

  return (
    <div class="min-h-screen">
      <NavBar />

      {/* primeira parte(filtro,fotos e descrição) */}
      <Filtro limiteRef={limiteRef} />
      <div class="flex pt-18  gap-10 items-start justify-center pl-68">
        {/* 2 - Fotos */}
        <div class="flex gap-6">
          {/* Coluna de miniaturas */}
          <div class="flex flex-col gap-4">
            {fotos.map((foto, index) => (
              <img
                key={index}
                class={`w-[80px] cursor-pointer border-2 ${
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
          <div class="w-[450px] h-[550px] relative">
            <button class="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-10">
              <img src={setaEsquerda} alt="anterior" class="w-8 h-8" />
            </button>
            <button class="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-10">
              <img src={setaDireita} alt="próximo" class="w-8 h-8" />
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
                    class="h-[550px] w-[450px] object-cover"
                    src={foto}
                    alt={`foto-${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div class="p-4 flex flex-col ">
          <div class="flex items-center gap-4">
            <p class="bg-lightgreen p-0.5 px-1 text-purpledark font-bold rounded-[7px]">
              10% OFF
            </p>
            <img src={estrelas} alt="estrelas" />
          </div>
          <p class="pt-6 font-medium text-[25px] text-gray2">
            Sérum Rejuvenescedor Nocturne 45+
          </p>
          <div class="flex justify-end ">
            <p class="mt-4 bg-blackwhite/20 w-fit px-2 py-0.5 rounded">
              300g
            </p>
          </div>

          <div class="pt-6 flex gap-3 items-center">
            <p class="line-through text-black/40 font-bold">R$89,90</p>{" "}
            <p class=" text-purpledark font-bold text-[25px]">R$59,90</p>
          </div>
          <div>
            <p class="w-120 text-[16px] mt-2 text-blackwhite/95">
              Pele renovada e protegida, até nos dias mais ensolarados! Prepare
              sua pele para brilhar com segurança! O Esfoliante Solar Ultra UV
              Apripeiadi foi desenvolvido especialmente para quem quer cuidar
              das manchas e renovar a pele sem abrir mão da proteção solar.
            </p>
            <p class="mt-3 font-semibold text-[18px] text-blackwhite/80">
              O que ele faz?
            </p>
            <ul class="mt-2 ">
              <li class="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Remove impurezas e células mortas{" "}
              </li>
              <li class="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Protege contra os radicais livres
              </li>
              <li class="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Uniformiza o tom da pele{" "}
              </li>
              <li class="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Hidrata profundamente{" "}
              </li>
              <li class="flex gap-1 text-blackwhite/90">
                <img src={iconcheck} alt="" />
                Estimula a renovação celular{" "}
              </li>
            </ul>
          </div>
          {/* botao de quantidade */}
          <div class="flex items-center gap-4 mt-7">
            <div class="flex items-center border-2 border-purpledark rounded-lg w-30 p-6 py-1">
              <button
                onClick={diminuir}
                class="text-purpledark text-xl font-medium w-10"
              >
                −
              </button>
              <span class="mx-3 text-purpledark font-medium w-10">
                {quantidade}
              </span>
              <button
                onClick={aumentar}
                class="text-purpledark text-xl font-medium w-10"
              >
                +
              </button>
            </div>
            {/* Botão Comprar */}
            <button class="bg-blue text-purpledark font-semibold px-7 py-2 rounded-lg">
              COMPRAR
            </button>
          </div>
        </div>
      </div>

      {/* segunda parte(descrição) */}
      <div class="w-[80%] mx-auto pl-54">
        <div class="flex border-b-2 border-b-blackwhite/50 gap-6 ">
          <button
            class={`pb-2 ${
              tab === "funciona"
                ? "border-b-2 border-purpledark font-semibold"
                : "text-blackwhite/70"
            }`}
            onClick={() => setTab("funciona")}
          >
            Como funciona
          </button>
          <button
            class={`pb-2 ${
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
        <div class="mt-4">
          {tab === "funciona" && (
            <div class="font-secondary">
              <p class="mt-5 text-purpledark w-200 text-[18px]">
                Nosso sistema de filtros foi desenvolvido para facilitar sua
                experiência e ajudar você a encontrar o produto ideal para a sua
                pele.
              </p>
              <p class="mt-10">
                1- Escolha do produto: cada produto já é desenvolvido para um
                tipo específico de pele (acneica, madura, oleosa ou seca).
                Assim, você já parte de uma fórmula direcionada ao seu principal
                cuidado.
              </p>
              <p class="mt-10">
                2- Personalize com os componentes: dentro da linha escolhida,
                você pode selecionar até 3 componentes ativos (de um total de 6
                disponíveis). Esses ativos têm diferentes propriedades alinhadas
                com o seu desejo de tratamento. Confira no campo composição
                especificada.
              </p>
              <p class="mt-10">
                3- Resultado garantido: mesmo escolhendo combinações diferentes,
                todos os caminhos levam ao mesmo objetivo final - tratar o
                problema principal da sua pele. Assim, você tem liberdade para
                adaptar o produto ao que mais combina com suas preferências e
                necessidades, sem abrir mão da eficácia e segurança.
              </p>
            </div>
          )}

          {tab === "composicao" && (
            <div class="font-secondary">
              <p class="mt-15">
                ativo hidratante que carrega até mais de mil vezes o seu peso em
                água, nutre e hidrata a pele, além de prevenir e suavizar os
                sinais do tempo. nossa fórmula conta com oitos formas e três
                pesos moleculares distintos desse ativo, o que proporciona sua
                penetração em diferentes camadas da pele.
              </p>
              <p class="mt-15">
                também conhecido como Pro-Vitamina B5, o pantenol tem alto poder
                hidratante devido sua capacidade de atrair e reter umidade. além
                disso, promove ação calmante, suavizante e anti-inflamatória.
              </p>
              <p class="mt-15">
                comum no hemisfério norte, esse ingrediente era usado desde a
                China Imperial para manter a pele limpa e luminosa e diminuir a
                aparência dos sinais do tempo. na nossa fórmula, ele age na
                recuperação da luminosidade da pele, estimula a firmeza e
                contribui para suavizar linhas finas.
              </p>
            </div>
          )}
        </div>
        <div ref={limiteRef} class="mt-30">
          <Sugestao />
          <Feedback />
        </div>
        <div class="mt-10"></div>
      </div>

      <div class="mt-30">
        <FooterCompleto />
      </div>
    </div>
  );
}

export default ProdutoCustomizavel;
