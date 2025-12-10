import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import PLogin from "../components/auth/PLogin";
import PCadastro from "../components/auth/PCadastro";
import ky from "ky"; // Importar ky

function Login() {
  const imagens = [
    "img_login.svg",
    "img_login_dois.svg",
    "img_login_tres.svg",
    "img_login_quatro.svg",
    "img_login_cinco.svg",
    "img_login_seis.svg",
    "img_login_sete.svg",
    "img_login.svg",
    "img_login_dois.svg",
    "img_login_tres.svg",
    "img_login_quatro.svg",
    "img_login_cinco.svg",
    "img_login_seis.svg",
    "img_login_sete.svg",
    "img_login.svg",
    "img_login_dois.svg",
    "img_login_tres.svg",
    "img_login_quatro.svg",
    "img_login_cinco.svg",
    "img_login_seis.svg",
    "img_login_sete.svg",
  ];

  const [abaAtiva, setAbaAtiva] = useState("cadastro");
  const navigate = useNavigate(); // Usar useNavigate

  // Função para recuperar carrinho temporário após login
  const recuperarCarrinhoTemporario = async (usuarioId) => {
    try {
      const carrinhoTemporario = JSON.parse(localStorage.getItem('carrinhoTemporario'));
      const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
      
      if (carrinhoTemporario && carrinhoTemporario.length > 0) {
        console.log("Recuperando carrinho temporário:", carrinhoTemporario);
        
        // Para cada item do carrinho temporário, adiciona ao carrinho do usuário
        for (const item of carrinhoTemporario) {
          await ky.post("http://localhost:3000/carrinho/adicionar", {
            json: {
              fk_id_usuario: parseInt(usuarioId),
              fk_id_produto: item.fk_id_produto,
              quantidade: item.quantidade,
              preco_unitario: item.preco_unitario,
              nome_produto: item.nome_produto,
              imagem_produto: item.imagem_produto,
              componentes_selecionados: item.componentes_selecionados || ""
            }
          });
        }
        
        // Limpa os dados temporários
        localStorage.removeItem('carrinhoTemporario');
        localStorage.removeItem('redirectAfterLogin');
        localStorage.removeItem('carrinhoLocal');
        
        // Dispara evento para atualizar o carrinho
        window.dispatchEvent(new Event('carrinhoAtualizado'));
        
        return redirectAfterLogin || '/carrinho';
      }
      
      return redirectAfterLogin || '/';
    } catch (error) {
      console.error("Erro ao recuperar carrinho temporário:", error);
      return '/';
    }
  };

  // Função chamada após login bem-sucedido
  const handleLoginSuccess = async (usuarioId) => {
    localStorage.setItem('id_usuario_logado', usuarioId);
    
    const redirectTo = await recuperarCarrinhoTemporario(usuarioId);
    navigate(redirectTo);
  };

  return (
    <div className="h-full">
      <div className="flex w-full h-full">
        <div className="w-1/2 h-full">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            rewind={true}
            slidesPerView={1}
            speed={800}
            className="h-full"
          >
            {imagens.map((src, i) => (
              <SwiperSlide className="h-full" key={i}>
                <img
                  src={src}
                  alt={`Slide ${i}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center">
          <div className="flex w-100/100 items-center justify-center">
            <div className="flex w-4/6 space-x-8 border-b border-gray">
              <button
                onClick={() => {
                  setAbaAtiva("cadastro");
                }}
                className={`pb-2 transition-all ${
                  abaAtiva === "cadastro"
                    ? "text-purpledark border-b-3 border-purpledark font-bold cursor-pointer"
                    : "text-gray border-b-3 border-transparent cursor-pointer"
                }`}
              >
                Cadastro
              </button>

              <button
                onClick={() => {
                  setAbaAtiva("login");
                }}
                className={`pb-2 transition-all ${
                  abaAtiva === "login"
                    ? "text-purpledark border-b-3 border-purpledark font-bold cursor-pointer"
                    : "text-gray border-b-3 border-transparent cursor-pointer"
                }`}
              >
                Login
              </button>
            </div>
          </div>
          
          {abaAtiva === "login" &&
            <PLogin onLoginSuccess={handleLoginSuccess} />
          }

          {abaAtiva === "cadastro" &&
            <PCadastro />
          }
        </div>
      </div>
    </div>
  );
}

export default Login;