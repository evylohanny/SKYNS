import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ky from 'ky';

//components importados
import Filtro from "../components/Filtro.jsx";
import NavBar from "../components/NavBar.jsx";
import Sugestao from "../components/Sugestão.jsx";
import FooterCompleto from "../components/FooterCompleto.jsx";
import Feedback from "../components/Feedback.jsx";
import FeedbackDeitado from "../components/FeedbackDeitado.jsx"

// fotos
import estrelas from "../assets/estrelas.svg";
import iconcheck from "../assets/iconCheck.svg";

// setas
import setaEsquerda from "../assets/SetaEsquerdaCinza.svg";
import setaDireita from "../assets/SetaDireitaCinza.svg";

function ProdutoComum({ dados }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fotos, setFotos] = useState([]);
  const swiperRef = useRef(null);

  // Estados para estoque
  const [quantidade, setQuantidade] = useState(1);
  const [estoqueDisponivel, setEstoqueDisponivel] = useState(dados.quantidade_estoque || 0);
  const [carregando, setCarregando] = useState(false);
  const [tab, setTab] = useState("composicao");

  const handleMiniClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  // Controle de quantidade
  const aumentar = () => {
    if (quantidade < estoqueDisponivel) {
      setQuantidade(prev => prev + 1);
    } else {
      mostrarMensagem(`⚠️ Não há mais unidades disponíveis em estoque.`);
    }
  };

  const diminuir = () => {
    if (quantidade > 1) setQuantidade(prev => prev - 1);
  };

  // estado do toast
  const [mensagem, setMensagem] = useState(null);

  const mostrarMensagem = (texto) => {
    setMensagem(texto);
    setTimeout(() => setMensagem(null), 5000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function buscaFoto(id_produto) {
      try {
        const novasFotos = [];

        for (let posicao = 1; posicao < 4; posicao++) {
          let response;

          try {
            response = await ky.get(`http://localhost:3000/${id_produto}/${posicao}/foto`).json();
          } catch (err) {
            if (err.response && err.response.status === 404) {
              console.log(`Foto na posição ${posicao} não existe`);
              continue;
            }
            throw err;
          }

          if (!response.data) continue;

          novasFotos[posicao - 1] = response.data.url;
        }

        setFotos(novasFotos);

      } catch (err) {
        console.error("Erro geral:", err);
      }
    }
    buscaFoto(dados.id_produto);
  }, []);

  // Função para buscar estoque atualizado do banco
  const buscarEstoqueAtualizado = async () => {
    if (!dados || !dados.id_produto) return;
    
    try {
      const response = await ky.get(`http://localhost:3000/produtos/${dados.id_produto}`).json();
      if (response.quantidade_estoque !== undefined) {
        setEstoqueDisponivel(response.quantidade_estoque);
      }
    } catch (error) {
      console.error("Erro ao buscar estoque atualizado:", error);
    }
  };

  // Busca estoque atualizado quando o componente é montado
  useEffect(() => {
    buscarEstoqueAtualizado();
  }, [dados.id_produto]);



  const handleAdicionarAoCarrinho = async () => {
  const produtoParaCarrinho = {
    id_produto: dados.id_produto,
    nome: dados.titulo,
    preco: dados.valor,
    imagem: dados.imagens?.[0],
    quantidade: 1
  };

  if (window.adicionarProdutoAoCarrinho) {
    const resultado = await window.adicionarProdutoAoCarrinho(produtoParaCarrinho);
    if (resultado.success) {
      alert(resultado.message);
    } else {
      alert(resultado.message);
    }
  }
};

  return (
    <div className="min-h-screen">
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
          
          {/* Mostra mensagem APENAS se estoque ≤ 10 e > 0 */}
          {estoqueDisponivel <= 10 && estoqueDisponivel > 0 && (
            <div className="mt-2">
              <p className="text-orange-600 font-semibold text-sm">
                ⚠️ Últimas unidades em estoque
              </p>
            </div>
          )}
          
          <div className="flex justify-end w-[70%]">
            <p className="mt-4  bg-blackwhite/20 w-fit px-2 py-0.5 rounded-sm">
              300g
            </p>
          </div>

          <div className="pt-2 flex gap-3 items-center">
            <p className="line-through text-black/40 font-bold">R$89,90</p>{" "}
            <p className=" text-purpledark font-bold text-[25px]">{dados.preco}</p>
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
                disabled={estoqueDisponivel === 0 || carregando}
                className={`text-purpledark text-xl font-medium w-10 ${
                  estoqueDisponivel === 0 || carregando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purpledark/10'
                }`}
              >
                −
              </button>
              <span className={`mx-3 font-medium w-10 text-center ${
                estoqueDisponivel === 0 ? 'text-gray-400' : 'text-purpledark'
              }`}>
                {quantidade}
              </span>
              <button
                onClick={aumentar}
                disabled={estoqueDisponivel === 0 || quantidade >= estoqueDisponivel || carregando}
                className={`text-purpledark text-xl font-medium w-10 ${
                  (estoqueDisponivel === 0 || quantidade >= estoqueDisponivel || carregando) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-purpledark/10'
                }`}
              >
                +
              </button>
            </div>
            
            <button 
              className={`font-semibold px-13 py-2 rounded-lg transition-all duration-200 flex items-center justify-center min-w-[140px] ${
                estoqueDisponivel === 0 || carregando
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-blue text-purpledark hover:bg-blue/90 hover:scale-105 active:scale-95'
              }`}
              disabled={estoqueDisponivel === 0 || carregando}
              onClick={handleAdicionarAoCarrinho}
            >
              {carregando ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-purpledark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  ADICIONANDO...
                </>
              ) : estoqueDisponivel === 0 ? 'ESGOTADO' : 'COMPRAR'}
            </button>
          </div>
          
          {/* Informação do estoque */}
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                estoqueDisponivel > 10 ? 'bg-green-500' : 
                estoqueDisponivel > 0 ? 'bg-orange-500' : 'bg-red-500'
              }`}></span>
              <p className="text-xs">
                Estoque disponível: <span className={`font-semibold ${
                  estoqueDisponivel > 10 ? 'text-green-600' : 
                  estoqueDisponivel > 0 ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {estoqueDisponivel} unidade(s)
                </span>
              </p>
            </div>
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
                <div className='font-secondary'>
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

      {/* TOAST */}
      {mensagem && (
        <div
          className="fixed bottom-10 right-10 bg-purpledark text-white px-4 py-3 rounded-xl shadow-lg 
                     transition-all duration-500 ease-out animate-[fadeIn_0.5s_ease-out] z-50 max-w-md"
          style={{
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          <div className="flex items-center gap-2">
            {mensagem.includes('✅') && <span className="text-xl">✅</span>}
            {mensagem.includes('⚠️') && <span className="text-xl">⚠️</span>}
            {mensagem.includes('❌') && <span className="text-xl">❌</span>}
            <span>{mensagem}</span>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default ProdutoComum;