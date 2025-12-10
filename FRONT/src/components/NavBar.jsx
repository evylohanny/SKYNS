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
import CloseIcon from "@mui/icons-material/Close";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ky from "ky";

function NavBar({ search }) {
  const [isCategoriasOpen, setCategoriasOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { logoAnimation } = useContext(GlobalContext);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const id_usuario_logado = localStorage.getItem("id_usuario_logado");
  const [aberto, setAberto] = useState(false);
  const [dados_usuario, setDados_usuario] = useState({});
  const abrir = () => setAberto(true);
  const fechar = () => {
    setAberto(false);
    
  };
  
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
    if (
      searchInputRef.current &&
      (location.pathname === "/results" ||
        (location.pathname === "/" && !logoAnimation))
    ) {
      searchInputRef.current.focus();
    }
  }, [location]);

  const caminho = (index) => {
    if (index == 1) {
      navigate("/pedidos");
    };

    if (index == 3) {

      navigate(`/rastreio/:id`);
    };
  };
  const handleClick = () => {
    if (isLocked) {
      setCategoriasOpen(false);
      setIsLocked(false);
    } else {
      setCategoriasOpen(true);
      setIsLocked(true);
    }
  };

  const handleMouseEnter = () => {
    if (!isLocked) {
      setCategoriasOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isLocked) {
      setCategoriasOpen(false);
    }
  };

  const perfil = () => {
    const usuario = localStorage.getItem("id_usuario_logado");
    if(usuario == null){
     
       navigate('/cadastro')
    }else{

      navigate('/perfil')
    }
  };

  const onSearchChange = (event) => {
    if (location.pathname === "/results" && event.target.value.length === 0) {
      navigate("/");
      return;
    }

    navigate(`/results?search=${encodeURIComponent(event.target.value)}`);
  };

  
   
  const [itensCarrinho, setItensCarrinho] = useState([
    
  ]);

  const buscaCarrinho = async (id) => {

    try {

      const response = await ky.get(`http://localhost:3000/carrinho`, {
        searchParams: {
          fk_id_usuario: id
        }
      }).json();

      if (response) setItensCarrinho(response.data); else console.log('Erro');
    } catch (err) {

      console.error(err);
    };
  };

  const removerItem = async (id) => {

     try {

      const response = await ky.delete(`http://localhost:3000/carrinho`, {
        searchParams: {
          id_carrinho: id
        }
      }).json();

      if (response) setItensCarrinho(response.data); else console.log('Erro');
    } catch (err) {

      console.error(err);
    };
  };

  useEffect(() => {
  const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho"));
  const id_usuario = localStorage.getItem('id_usuario_logado');

    if (carrinhoSalvo) setItensCarrinho(carrinhoSalvo) else await buscaCarrinho(id_usuario);
}, []);


 
  const removerItemCarrinho = (id) => {
  const id_usuario = localStorage.getItem('id_usuario_logado');
    if (id_usuario) {
  const novoCarrinho = itensCarrinho.filter(item => item.id !== id);

  // Atualiza o state
  setItensCarrinho(novoCarrinho);

  // Atualiza o localStorage
  localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    } else {

      await removerItem();
    };
};


  const add_produtos = () => {

    navigate('/')
    setAberto(false);
  }

  
  useEffect(() => {
    const buscarPerfil = async () => {
      try {
        const response = await ky
          .post("http://localhost:3000/perfil", {
            json: { id_usuario_logado },
          })
          .json();

        const dados = response;
        setDados_usuario(dados);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    buscarPerfil();
  }, []);


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
              </Link>
            </div>
          </div>
          <Modal open={aberto} onClose={fechar}>
            <div className=" w-full h-full flex justify-end">
              <div className="bg-white w-26/100 h-full">
                <div className="flex items-center h-16/100">
                  <div className="w-85/100">
                    <h1 className="text-[1.5rem] pl-6 font-semibold">
                      Meu carrinho
                    </h1>
                  </div>
                  <div className="w-8">
                    <img
                      className="cursor-pointer"
                      onClick={fechar}
                      src="x_carrinho.svg"
                      alt=""
                    />
                  </div>
                </div>
                {itensCarrinho.length === 0 && (
                  <>
                    <div className=" border-b-1 border-[#d6d2d2] flex flex-col justify-center items-center w-full h-60/100 ">
                      <div className="w-50/100">
                        <img src="erro_carrinho.svg" alt="" />
                      </div>
                      <div className="pt-10 ">
                        <h1 className="text-2xl font-bold text-[#737272]">
                          Seu carrinho esta vazio.
                        </h1>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-center pt-5">
                      <div className="bg-blue w-90/100 flex items-center justify-center rounded-md h-10  font-primary">
                        <Swiper
                          modules={[Autoplay]}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
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
                       <div className=" w-90/100  border-b-1 border-[#d6d2d2]"></div>
                    </div>
                    <div className="w-full mt-5 h-12 flex justify-center rounded-lg items-center">
                      <button className="w-90/100  h-full font-bold rounded-lg cursor-pointer bg-purpledark text-white"
                      onClick={add_produtos}>
                        ADICIONAR PRODUTOS
                      </button>
                    </div>
                  </>
                )}
                {itensCarrinho.length > 0 && (
                  <div className="w-full h-full ">
                    <div className="w-full h-70  overflow-y-auto">
                      {itensCarrinho.map((item, index) => (
                        <div className="w-full pb-4 flex justify-center">
                          <div className="w-30/100">
                            <img className="w-65/100" src={item.img} alt="" />
                          </div>
                          <div className="w-60/100 flex flex-col  ">
                            <div className="flex h-12 w-full ">
                              <div className=" w-full">
                                <p>{item.nome}</p>
                              </div>
                              <div className="h-full ml-12 w-12/100 cursor-pointer"
                              onClick={() => removerItemCarrinho(item.id)}
                              >
                                <img src={"lixo.svg"} alt="" />
                              </div>
                            </div>
                            <div className="h-10 flex justify-cente items-center ">
                              <div className="flex border-1 gap-2 rounded-lg border-[#97989C] w-16 h-7 justify-center items-center">
                                <p className="text-[#97989C] text-2xl">-</p>
                                <p className="text-[#97989C] text-lg">
                                  {item.quantidade}
                                </p>
                                <p className="text-[#97989C] text-lg">+</p>
                              </div>
                              <div>
                                <h1 className="text-md ml-16 text-purpledark font-bold">
                                  R${item.valor}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className=" w-full  border-b-1 border-[#d6d2d2]"></div>
                    <div className="w-full flex items-center justify-center pt-5">
                      <div className="bg-blue w-90/100 flex items-center justify-center rounded-md h-10  font-primary">
                        <Swiper
                          modules={[Autoplay]}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
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
                       <div className=" w-90/100  border-b-1 border-[#d6d2d2]"></div>
                    </div>
                    
                    <div className="w-full flex gap-2 flex-col items-center">
                      <div className="w-90/100 mt-3 flex justify-between">
                        <p className="text-[#abaaaa]">SUBTOTAL</p>
                        <p className="font-semibold"> </p>
                      </div>
                      <div className="w-90/100 flex justify-between">
                        <p className="text-[#abaaaa]">FRETE</p>
                        <p className="font-semibold">A calcular</p>
                      </div>
                      <div className="w-90/100 pb-4 flex justify-between">
                        <p className="text-[#abaaaa]">TOTAL</p>
                        <p className="font-semibold">R$  </p>
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <div className=" w-90/100 border-b-1 border-[#d6d2d2]"></div>
                    </div>
                    <div className="w-full  pt-5 flex justify-center items-center ">
                      <button className=" w-90/100 p-2 rounded-lg bg-purpledark font-semibold text-white cursor-pointer">
                        FINALIZAR COMPRA
                      </button>
                    </div>
                    <div className="w-full  pt-5 flex justify-center items-center ">
                      <button className=" w-90/100 p-2 rounded-lg bg-white border-2 font-semibold border-purpledark text-purpledark cursor-pointer">
                        CONTINUAR COMPRANDO
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Modal>

          <div className="relative font-primary text-blackwhite/90 flex gap-12 justify-center items-start text-sm w-full">
            <div
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative flex gap-1"
            >
              <button
                onClick={handleClick}
                className="flex gap-1 items-center focus:outline-none"
              >
                <img src={iconMenu} alt="" />
                <p
                  className={`
                  relative text-sm transition-colors
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-purpledark after:transition-all after:duration-300
                  ${
                    isLocked
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
                    <Link className="hover:text-purpledark transition-colors">
                      Pele Acneica
                    </Link>
                    <Link className="hover:text-purpledark transition-colors">
                      Pele Seca
                    </Link>
                    <Link className="hover:text-purpledark transition-colors">
                      Pele Oleosa
                    </Link>
                    <Link className="hover:text-purpledark transition-colors">
                      Pele Madura
                    </Link>
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
                onClick={() => caminho(index)}
                key={index}
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
