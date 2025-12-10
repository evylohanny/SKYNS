import { useState, useRef, useEffect, useContext } from "react";
import CarrosselPQ from "../components/CarrosselPQ";
import logoNav from "../assets/logoNav.svg";
import iconUser from "../assets/iconUser.svg";
import { Link } from "react-router-dom";
import iconCarrinho from "../assets/iconCarrinho.svg";
import iconLupa from "../assets/iconLupa.svg";
import iconMenu from "../assets/iconMenu.svg";
import testFoto from "../assets/testFoto.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { Modal } from "@mui/material";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ky from "ky";
import { formatarPrecoParaNumero, formatarParaMoedaBrasileira } from "../pages/utils/formatters";

function NavBar({ search }) {
  const [isCategoriasOpen, setCategoriasOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { logoAnimation } = useContext(GlobalContext);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);
  const [dados_usuario, setDados_usuario] = useState({});
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [subtotal, setSubtotal] = useState("0.00");
  const [modalLogin, setModalLogin] = useState(false);

  const links = [
    "Promoções",
    "Pedidos",
    "Mais vendidos",
    "Rastreio",
    "SKYNS ideal para sua pele",
    "Feedback",
    "Lojas físicas",
  ];

  useEffect(() => {
    const id_usuario_logado = localStorage.getItem("id_usuario_logado");
    if (id_usuario_logado) {
      const buscarPerfil = async () => {
        try {
          const response = await ky.post("http://localhost:3000/perfil", {
            json: { id_usuario_logado },
          }).json();
          setDados_usuario(response);
        } catch (error) {
          console.error("Erro ao buscar perfil:", error);
        }
      };
      buscarPerfil();
    }
  }, []);

  const carregarCarrinho = () => {
    const id_usuario = localStorage.getItem('id_usuario_logado');

    if (id_usuario) {
      buscaCarrinhoAPI(id_usuario);
    } else {
      const carrinhoLocal = JSON.parse(localStorage.getItem('carrinhoLocal')) || [];
      console.log("Carrinho local encontrado:", carrinhoLocal);

      const itensFormatados = carrinhoLocal.map(item => {
        let precoUnitario;
        
        if (typeof item.preco_unitario === 'number') {
          precoUnitario = item.preco_unitario;
        } else if (typeof item.preco_unitario === 'string') {
          precoUnitario = formatarPrecoParaNumero(item.preco_unitario);
        } else {
          precoUnitario = formatarPrecoParaNumero(item.valor || 0);
        }

        const quantidade = parseInt(item.quantidade || 1);
        const totalItem = precoUnitario * quantidade;

        console.log(`Item: ${item.nome_produto || item.nome}, Preço: ${precoUnitario}, Qtd: ${quantidade}, Total: ${totalItem}`);

        return {
          id: item.timestamp || item.fk_id_produto || Date.now(),
          nome: item.nome_produto || item.nome || "Produto",
          valor: precoUnitario,
          quantidade: quantidade,
          img: item.imagem_produto || item.img || "default-image.svg",
          preco: totalItem,
          preco_unitario: precoUnitario
        };
      });

      console.log("Itens formatados para exibição:", itensFormatados);
      setItensCarrinho(itensFormatados);

      const subtotalCalc = itensFormatados.reduce((total, item) => {
        const itemTotal = item.preco || 0;
        console.log(`Adicionando ao subtotal: ${item.nome} - R$ ${itemTotal}`);
        return total + itemTotal;
      }, 0);

      console.log("Subtotal calculado (número):", subtotalCalc);
      console.log("Subtotal formatado:", subtotalCalc.toFixed(2));
      setSubtotal(subtotalCalc.toFixed(2));
    }
  };

  const buscaCarrinhoAPI = async (id) => {
    try {
      const response = await ky.get(`http://localhost:3000/carrinho`, {
        searchParams: { fk_id_usuario: id }
      }).json();

      if (response && response.data) {
        const itensFormatados = response.data.map(item => {
          const precoUnitario = formatarPrecoParaNumero(item.valor || 0);
          const quantidade = parseInt(item.quantidade || 1);
          const totalItem = precoUnitario * quantidade;

          return {
            id: item.id_carrinho || item.id,
            nome: item.nome || "Produto",
            valor: precoUnitario,
            quantidade: quantidade,
            img: item.imagem_produto || item.img || "default-image.svg",
            preco: totalItem,
            preco_unitario: precoUnitario
          };
        });

        setItensCarrinho(itensFormatados);

        const subtotalCalc = itensFormatados.reduce((total, item) => {
          return total + (item.preco || 0);
        }, 0);

        setSubtotal(subtotalCalc.toFixed(2));
      }
    } catch (err) {
      console.error("Erro ao buscar carrinho:", err);
    }
  };

  const removerItemCarrinho = (id) => {
    console.log("Tentando remover item ID:", id);

    const id_usuario = localStorage.getItem('id_usuario_logado');

    if (id_usuario) {
      removerItemAPI(id);
    } else {
      let carrinhoLocal = JSON.parse(localStorage.getItem('carrinhoLocal')) || [];

      const index = carrinhoLocal.findIndex(item => {
        if (item.id && item.id.toString() === id.toString()) return true;
        if (item.timestamp && item.timestamp.toString() === id.toString()) return true;
        if (item.fk_id_produto && item.fk_id_produto.toString() === id.toString()) return true;
        return false;
      });

      if (index !== -1) {
        console.log("Removendo item no índice:", index, "Item:", carrinhoLocal[index]);
        carrinhoLocal.splice(index, 1);
        localStorage.setItem('carrinhoLocal', JSON.stringify(carrinhoLocal));

        const subtotalCalc = carrinhoLocal.reduce((total, item) => {
          const precoUnitario = parseFloat(item.preco_unitario || item.valor || 0);
          const quantidade = parseInt(item.quantidade || 1);
          return total + (precoUnitario * quantidade);
        }, 0);

        console.log("Novo subtotal após remoção:", subtotalCalc.toFixed(2));
        setSubtotal(subtotalCalc.toFixed(2));

        carregarCarrinho();
        window.dispatchEvent(new Event('carrinhoLocalAtualizado'));
      } else {
        console.log("Item não encontrado no carrinho");
      }
    }
  };

  const removerItemAPI = async (id) => {
    try {
      const response = await ky.delete(`http://localhost:3000/carrinho`, {
        searchParams: { id_carrinho: id }
      }).json();

      if (response) {
        carregarCarrinho();
      }
    } catch (err) {
      console.error("Erro ao remover item:", err);
    }
  };

  useEffect(() => {
    carregarCarrinho();

    const handleCarrinhoAtualizado = () => {
      console.log("Evento de carrinho recebido, recarregando...");
      carregarCarrinho();
    };

    window.addEventListener('carrinhoAtualizado', handleCarrinhoAtualizado);
    window.addEventListener('carrinhoLocalAtualizado', handleCarrinhoAtualizado);

    return () => {
      window.removeEventListener('carrinhoAtualizado', handleCarrinhoAtualizado);
      window.removeEventListener('carrinhoLocalAtualizado', handleCarrinhoAtualizado);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoriasOpen(false);
        setIsLocked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchInputRef.current && location.pathname === "/results") {
      searchInputRef.current.focus();
    }
  }, [location]);

  const abrir = () => setAberto(true);
  const fechar = () => setAberto(false);
  const fecharModalLogin = () => setModalLogin(false);

  const perfil = () => {
    const usuario = localStorage.getItem("id_usuario_logado");
    if (!usuario) navigate('/cadastro');
    else navigate('/perfil');
  };

  const onSearchChange = (event) => {
    if (location.pathname === "/results" && event.target.value.length === 0) {
      navigate("/");
      return;
    }
    navigate(`/results?search=${encodeURIComponent(event.target.value)}`);
  };

  const add_produtos = () => {
    navigate('/');
    fechar();
  };

const handleFinalizarCompra = () => {
  const usuarioLogado = localStorage.getItem("id_usuario_logado");
  
  if (usuarioLogado) {
    navigate('/pagamento');
    fechar();
  } else {
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinhoLocal')) || [];
    
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
    localStorage.setItem('redirectAfterLogin', '/pagamento');
    
    fechar();
    setModalLogin(true);
  }
};

const irParaLogin = () => {
  setModalLogin(false);
  navigate('/login', { 
    state: { 
      from: 'carrinho',
      message: 'Faça login para finalizar sua compra. Seu carrinho será mantido.',
      activeTab: 'login' 
    } 
  });
};

  // Função para ir para o cadastro
  const irParaCadastro = () => {
    setModalLogin(false);
    navigate('/cadastro', { 
      state: { 
        from: 'carrinho',
        message: 'Crie uma conta para finalizar sua compra. Seu carrinho será mantido.'
      } 
    });
  };

  return (
    <div className="w-full h-30">
      <div className="w-full h-40 fixed top-0 left-0 bg-white z-[999]">
        <CarrosselPQ />

        <div className="h-28 flex flex-col justify-start items-center gap-3 shadow-xl">
          <div className="flex justify-center gap-65 items-center w-full p-3">
            <div className="relative w-[300px]">
              <input
                type="text"
                placeholder="Buscar"
                ref={searchInputRef}
                value={search}
                onChange={onSearchChange}
                className="w-full py-1 px-4 pr-10 border border-blackwhite/30 rounded-full focus:outline-none 
              focus:border-purpledark focus:border-1 placeholder-blackwhite/70 placeholder:font-medium"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                <img src={iconLupa} alt="" />
              </span>
            </div>

            <div className="pr-5" onClick={() => navigate("/")}>
              <img className="cursor-pointer" src={logoNav} alt="" />
            </div>

            <div className="flex justify-around w-40 items-center">
              <Link onClick={perfil}>
                <img src={iconUser} alt="" />
              </Link>
              <div className="flex flex-col text-sm text-blackwhite/80 font-primary">
                <p>Olá,</p>
                <p>{dados_usuario.nome_usuario ? dados_usuario.nome_usuario : "Visitante"}</p>
              </div>
              <Link onClick={abrir}>
                <img src={iconCarrinho} alt="" className="pl-3" />
                {itensCarrinho.length > 0 && (
                  <span className="absolute top-5 right-36 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itensCarrinho.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Modal do Carrinho */}
          <Modal open={aberto} onClose={fechar}>
            <div className="w-full h-full flex justify-end">
              <div className="bg-white w-26/100 h-full">
                <div className="flex items-center h-16/100">
                  <div className="w-85/100">
                    <h1 className="text-[1.5rem] pl-6 font-semibold">Meu carrinho</h1>
                  </div>
                  <div className="w-8">
                    <img
                      className="cursor-pointer"
                      onClick={fechar}
                      src="x_carrinho.svg"
                      alt="Fechar"
                    />
                  </div>
                </div>

                {itensCarrinho.length === 0 ? (
                  <>
                    <div className="border-b-1 border-[#d6d2d2] flex flex-col justify-center items-center w-full h-60/100">
                      <div className="w-50/100">
                        <img src="erro_carrinho.svg" alt="Carrinho vazio" />
                      </div>
                      <div className="pt-10">
                        <h1 className="text-2xl font-bold text-[#737272]">Seu carrinho está vazio.</h1>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-center pt-5">
                      <div className="bg-blue w-90/100 flex items-center justify-center rounded-md h-10 font-primary">
                        <Swiper
                          modules={[Autoplay]}
                          autoplay={{ delay: 3000, disableOnInteraction: false }}
                          loop={true}
                          speed={2000}
                          spaceBetween={20}
                          slidesPerView={1}
                        >
                          <SwiperSlide>
                            <div className="flex gap-1.5 items-center justify-center">
                              <h1 className="text-purpledark text-sm font-semibold">
                                Ganhe 10% de desconto no seu primeiro pedido.
                              </h1>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="flex gap-1.5 items-center justify-center">
                              <h1 className="text-purpledark text-sm font-semibold">
                                Utilize o cupom DESCONTO10
                              </h1>
                            </div>
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>
                    <div className="w-full pt-5 flex justify-center items-center">
                      <div className="w-90/100 border-b-1 border-[#d6d2d2]"></div>
                    </div>
                    <div className="w-full mt-5 h-12 flex justify-center rounded-lg items-center">
                      <button
                        className="w-90/100 h-full font-bold rounded-lg cursor-pointer bg-purpledark text-white"
                        onClick={add_produtos}
                      >
                        ADICIONAR PRODUTOS
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full">
                    <div className="w-full h-70 overflow-y-auto">
                      {itensCarrinho.map((item, index) => (
                        <div key={index} className="w-full pb-4 flex justify-center border-b border-gray-200">
                          <div className="w-30/100 p-2">
                            <img
                              className="w-full h-24 object-cover rounded-lg"
                              src={item.img || "default-image.svg"}
                              alt={item.nome}
                            />
                          </div>
                          <div className="w-60/100 flex flex-col p-2">
                            <div className="flex h-12 w-full">
                              <div className="w-full">
                                <p className="font-medium">{item.nome}</p>
                              </div>
                              <div
                                className="h-full ml-12 w-8 cursor-pointer"
                                onClick={() => removerItemCarrinho(item.id)}
                              >
                                <img src={"lixo.svg"} alt="Remover" />
                              </div>
                            </div>
                            <div className="h-10 flex items-center">
                              <div className="flex gap-2 items-center">
                                <span className="text-gray-600">Qtd:</span>
                                <span className="font-medium">{item.quantidade || 1}</span>
                              </div>
                              <div className="ml-auto">
                                <h1 className="text-md text-purpledark font-bold">
                                  R${item.valor || item.preco}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="w-full flex items-center justify-center pt-5">
                      <div className="bg-blue w-90/100 flex items-center justify-center rounded-md h-10 font-primary">
                        <Swiper
                          modules={[Autoplay]}
                          autoplay={{ delay: 3000, disableOnInteraction: false }}
                          loop={true}
                          speed={2000}
                          spaceBetween={20}
                          slidesPerView={1}
                        >
                          <SwiperSlide>
                            <div className="flex gap-1.5 items-center justify-center">
                              <h1 className="text-purpledark text-sm font-semibold">
                                Ganhe 10% de desconto no seu primeiro pedido.
                              </h1>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="flex gap-1.5 items-center justify-center">
                              <h1 className="text-purpledark text-sm font-semibold">
                                Utilize o cupom DESCONTO10
                              </h1>
                            </div>
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>

                    <div className="w-full flex gap-2 flex-col items-center mt-5">
                      <div className="w-90/100 flex justify-between">
                        <p className="text-[#abaaaa]">SUBTOTAL</p>
                        <p className="font-semibold">R$ {formatarParaMoedaBrasileira(subtotal)}</p>
                      </div>
                      <div className="w-90/100 flex justify-between">
                        <p className="text-[#abaaaa]">FRETE</p>
                        <p className="font-semibold">A calcular</p>
                      </div>
                      <div className="w-90/100 pb-4 flex justify-between">
                        <p className="text-[#abaaaa]">TOTAL</p>
                        <p className="font-semibold">R$ {formatarParaMoedaBrasileira(subtotal)}</p>
                      </div>
                    </div>

                    <div className="w-full pt-5 flex flex-col gap-3 items-center">
                      <button 
                        onClick={handleFinalizarCompra}
                        className="w-90/100 p-3 rounded-lg bg-purpledark font-semibold text-white cursor-pointer hover:bg-purpledark/90"
                      >
                        FINALIZAR COMPRA
                      </button>
                      <button
                        className="w-90/100 p-3 rounded-lg bg-white border-2 font-semibold border-purpledark text-purpledark cursor-pointer hover:bg-purpledark/10"
                        onClick={add_produtos}
                      >
                        CONTINUAR COMPRANDO
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Modal>

          {/* Modal de Login Necessário */}
          <Modal open={modalLogin} onClose={fecharModalLogin}>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
              <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Login Necessário</h2>
                  <button
                    onClick={fecharModalLogin}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-purpledark/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-purpledark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-center mb-4">
                    Para finalizar sua compra, é necessário estar logado na sua conta.
                  </p>
                  <p className="text-gray-600 text-center mb-2">
                    <span className="font-semibold">Seus {itensCarrinho.length} itens</span> no carrinho foram salvos automaticamente e estarão disponíveis após o login.
                  </p>
                  <div className="mt-4 p-3 bg-purpledark/5 rounded-lg">
                    <p className="text-sm text-purpledark font-medium text-center">
                      Valor total do carrinho: <span className="font-bold">R$ {formatarParaMoedaBrasileira(subtotal)}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <button
                    onClick={irParaLogin}
                    className="w-full py-3 bg-purpledark text-white font-semibold rounded-lg hover:bg-purpledark/90 transition-colors duration-300"
                  >
                    Fazer Login
                  </button>
                  
                  <button
                    onClick={irParaCadastro}
                    className="w-full py-3 bg-white border-2 border-purpledark text-purpledark font-semibold rounded-lg hover:bg-purpledark/5 transition-colors duration-300"
                  >
                    Criar Conta
                  </button>
                  
                  <button
                    onClick={fecharModalLogin}
                    className="w-full py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    Continuar como visitante
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Ao fazer login ou criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade.
                    Seus dados do carrinho serão mantidos em segurança.
                  </p>
                </div>
              </div>
            </div>
          </Modal>

          {/* Resto do código do NavBar... */}
          <div className="relative font-primary text-blackwhite/90 flex gap-12 justify-center items-start text-sm w-full">
            <div
              ref={dropdownRef}
              onMouseEnter={() => !isLocked && setCategoriasOpen(true)}
              onMouseLeave={() => !isLocked && setCategoriasOpen(false)}
              className="relative flex gap-1"
            >
              <button
                onClick={() => {
                  if (isLocked) {
                    setCategoriasOpen(false);
                    setIsLocked(false);
                  } else {
                    setCategoriasOpen(true);
                    setIsLocked(true);
                  }
                }}
                className="flex gap-1 items-center focus:outline-none"
              >
                <img src={iconMenu} alt="Menu" />
                <p
                  className={`
                  relative text-sm transition-colors
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-purpledark after:transition-all after:duration-300
                  ${isLocked
                      ? "text-purpledark after:w-full"
                      : "text-blackwhite/90 hover:text-purpledark after:w-0 hover:after:w-full"
                    }
                  `}
                >
                  Todas as Categorias de peles
                </p>
              </button>

              {isCategoriasOpen && (
                <div
                  className="absolute h-65 top-full left-0 mt-6 w-[1235px] bg-white shadow-xl p-3 flex justify-between z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-[30%] text-sm text-blackwhite/90 p-4 flex flex-col gap-2">
                    <Link className="hover:text-purpledark transition-colors">Pele Acneica</Link>
                    <Link className="hover:text-purpledark transition-colors">Pele Seca</Link>
                    <Link className="hover:text-purpledark transition-colors">Pele Oleosa</Link>
                    <Link className="hover:text-purpledark transition-colors">Pele Madura</Link>
                  </div>

                  <div className="w-[70%] flex flex-row justify-end gap-5">
                    <img src={testFoto} alt="" className="" />
                    <img src={testFoto} alt="" className="" />
                    <img src={testFoto} alt="" className="" />
                    <img src={testFoto} alt="" className="" />
                  </div>
                </div>
              )}
            </div>

            {links.map((text, index) => (
              <Link
                key={index}
                onClick={() => {
                  if (index === 1) navigate("/pedidos");
                  if (index === 3) navigate("/rastreio");
                }}
                className="relative text-sm text-blackwhite/90 hover:text-purpledark transition-colors
            after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full 
            after:bg-purpledark after:transition-all after:duration-300"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;