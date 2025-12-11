import NavBar from "../components/NavBar";
import FooterTecnico from "../components/FooterTecnico";
import Dados_pessoais from "../components/perfil/Dados_pessoais";
import Enderecos from "../components/perfil/Enderecos";
import Cartoes from "../components/perfil/Cartoes";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ky from "ky";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const [infoAtiva, setInfoAtiva] = useState("dados");
  const navigate = useNavigate();
  const [tipoInput, setTipoInput] = useState("password");
  const [tipoIconSenha, setTipoIconSenha] = useState("icon_nao_ver.png");
  const id_usuario_logado = localStorage.getItem("id_usuario_logado");
  const [dados_usuario, setDados_usuario] = useState({});
  const [carrinho, setCarrinho] = useState([]);
  const [status, setStatus] = useState([]);
  const [fotosProdutos, setFotosProdutos] = useState({});
  const [fotoPreview, setFotoPreview] = useState("");

  const alternarTipo = () => {
    setTipoInput((prev) => (prev === "password" ? "text" : "password"));
    setTipoIconSenha((prev) =>
      prev === "icon_nao_ver.png" ? "icon_ver.png" : "icon_nao_ver.png"
    );
  };

  const ativaAbaDados = () => {
    setInfoAtiva("dados");
  };

  const ativaAbaEnd = () => {
    setInfoAtiva("endereco");
  };

  const ativaAbaCard = () => {
    setInfoAtiva("cartoes");
  };

  const [aberto, setAberto] = useState(false);
  const abrir = () => setAberto(true);
  const fechar = () => {
    setAberto(false);
    setErroExcluir(false);
  };

  const [mensagemErro, setMensagemErro] = useState("");
  const [erroExcluir, setErroExcluir] = useState(false);

  const [valorEmailExcluir, setValorEmailExcluir] = useState("");
  const [valorSenhaExcluir, setValorSenhaExcluir] = useState("");

  const excluir = async () => {};

  const inicio = () => {
    navigate("/");
  };

  useEffect(() => {
    if (valorSenhaExcluir.length > 0) {
      setErroExcluir(false);
    }
  }, [valorSenhaExcluir]);

  useEffect(() => {
    if (valorEmailExcluir.length > 0) {
      setErroExcluir(false);
    }
  }, [valorEmailExcluir]);

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
        if (dados.foto_perfil) {
          setFotoPreview(dados.foto_perfil);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    buscarPerfil();
  }, []);

  const sair_da_conta = async () => {
    localStorage.removeItem("id_usuario_logado");
    navigate("/");
  };

  const fileInputRef = useRef(null);

  const abrirExplorador = () => {
    fileInputRef.current.click();
  };

  const selecionarImagem = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione apenas arquivos de imagem.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 5MB.");
        return;
      }

      fazerUploadFoto(file);
    }
  };

  const fazerUploadFoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append("foto", file);
      formData.append("id_usuario", id_usuario_logado);

      const response = await ky
        .post("http://localhost:3000/upload-foto", {
          body: formData,
        })
        .json();

      if (response.success) {
        console.log("Foto atualizada com sucesso!");

        setDados_usuario((prev) => ({
          ...prev,
          foto: response.fotoUrl,
        }));
      } else {
        alert("Erro ao fazer upload da foto.");
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      alert("Erro ao fazer upload da foto.");
    }
  };

  // Buscar pedidos do usuário
  useEffect(() => {
    const buscarPedidos = async () => {
      try {
        const response = await ky
          .post("http://localhost:3000/pedidos/usuario", {
            json: {
              id_usuario: id_usuario_logado,
            },
          })
          .json();

        console.log("Resposta da API de pedidos:", response);

        if (response.data) {
          console.log("Pedidos encontrados:", response.data);
          setStatus(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    if (id_usuario_logado) {
      buscarPedidos();
    }
  }, [id_usuario_logado]);

  // Função para buscar foto do produto
  const buscarFotoProduto = async (id_produto) => {
    try {
      console.log(`Buscando foto para produto ${id_produto}`);
      
      const response = await ky.get(`http://localhost:3000/${id_produto}/foto`).json();
      
      if (response && response.data && response.data.url) {
        console.log(`Foto encontrada para produto ${id_produto}:`, response.data.url);
        return response.data.url;
      } else if (response && response.url) {
        console.log(`Foto encontrada (formato alternativo) para produto ${id_produto}:`, response.url);
        return response.url;
      } else {
        console.log(`Nenhuma foto encontrada para produto ${id_produto}, usando padrão`);
        return "foto_prduto.svg";
      }
    } catch (error) {
      console.log(`Erro ao buscar foto do produto ${id_produto}:`, error.message);
      return "foto_prduto.svg";
    }
  };

  // Função para buscar fotos para todos os itens do carrinho
  const buscarFotosParaItensCarrinho = async (itens) => {
    console.log(`Buscando fotos para ${itens.length} itens do carrinho...`);
    
    const fotosAtualizadas = { ...fotosProdutos };
    let atualizouAlguma = false;
    
    for (const item of itens) {
      if (item.fk_id_produto && !fotosAtualizadas[item.fk_id_produto]) {
        try {
          const fotoUrl = await buscarFotoProduto(item.fk_id_produto);
          fotosAtualizadas[item.fk_id_produto] = fotoUrl;
          atualizouAlguma = true;
          
          console.log(`Foto atualizada para produto ${item.fk_id_produto}:`, fotoUrl);
        } catch (error) {
          console.error(`Erro ao buscar foto para produto ${item.fk_id_produto}:`, error);
          fotosAtualizadas[item.fk_id_produto] = "foto_prduto.svg";
        }
      }
    }
    
    if (atualizouAlguma) {
      setFotosProdutos(fotosAtualizadas);
    }
    
    console.log("Fotos atualizadas:", fotosAtualizadas);
  };

  // Função para obter a imagem do produto
  const getProductImage = (item) => {
    if (item.fk_id_produto && fotosProdutos[item.fk_id_produto]) {
      return fotosProdutos[item.fk_id_produto];
    }
    return "foto_prduto.svg";
  };

  
  useEffect(() => {
    const buscarCarrinho = async () => {
      try {
        const response = await ky
          .get("http://localhost:3000/carrinho", {
            searchParams: {
              fk_id_usuario: id_usuario_logado
            }
          })
          .json();

        console.log("Resposta da API do carrinho:", response);
        
        if (response.data) {
          console.log("Carrinho encontrado:", response.data);
          setCarrinho(response.data);
          
          // Buscar fotos para os produtos
          buscarFotosParaItensCarrinho(response.data);
        }

      } catch (error) {
        console.error("Erro ao buscar carrinho:", error);
      }
    };

    // Verificar se algum pedido tem status "COMPLETED"
    if (id_usuario_logado ) {
        buscarCarrinho();
      
    }
  }, [id_usuario_logado]);

  return (
    <div className="w-full h-full">
      <NavBar />
      <div className=" w-full h-1/6 flex justify-center items-end">
        <div className="bg-[#FEF5FF] flex items-center text-lg p-4 w-76/100 h-48/100 font-medium rounded-2xl">
          <p className="pl-2 text-purpledark">
            Olá, {dados_usuario.nome_usuario}
          </p>
        </div>
      </div>
      
      {/* Seção de Pedidos COMPLETED */}
      {carrinho && carrinho.length > 0 ? (
        <>
          <div className="w-full pt-6 flex justify-center items-center">
            <div className="flex items-center text-2xl p-2 w-76/100 font-medium">
              Seus pedidos prontos
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-79/100 ml-12 flex flex-col justify-start pr-9 items-center overflow-y-auto">
              {carrinho.map((item, index) => {
                return (
                  <div
                    className="w-full flex items-center pt-8 justify-center"
                    key={index}
                  >
                    <div className="bg-[#F4F4F4] h-36 flex items-center w-full rounded-2xl">
                      <div className="ml-4 w-9/100 mr-40 flex justify-center items-center">
                        <img
                          className="w-100/100 h-24 object-cover rounded-lg"
                          src={getProductImage(item)}
                          alt={item.titulo_ || "Produto"}
                          onError={(e) => {
                            e.target.src = "foto_prduto.svg";
                          }}
                        />
                      </div>
                      <div className="w-20/100 mr-20">
                        <h1 className="text-lg">{item.titulo_ || "Produto"}</h1>
                      </div>
                      
                      <div className="border-2 h-8 w-7/100 border-[#97989C] ml-15 mr-4 gap-3 flex justify-center items-center rounded-lg">
                        <h1 className="text-4xl pb-1 text-[#97989C]">-</h1>
                        <h1 className="text-[#97989C] text-lg">
                          {item.quantidade || 1}
                        </h1>
                        <h1 className="text-[#97989C] text-2xl">+</h1>
                      </div>
                      <div>
                        <h1 className="text-purpledark text-2xl font-bold ml-24 mr-10">
                          R${item.preco || "0,00"}
                        </h1>
                      </div>
                      <div className="h-full w-12/100 justify-end items-end flex pb-5">
                        <button className="border-2 w-full p-1.5 text-sm rounded-lg border-purpledark text-purpledark cursor-pointer">
                          VER DETALHES
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-40/100 pt-4 flex flex-col items-center">
          <div className="w-full pt-6 pb-4 flex justify-center items-center">
            <div className="flex items-center text-2xl p-2 w-76/100 font-medium">
              Histórico de pedidos
            </div>
          </div>
          <div className="bg-[#F4F4F4] flex flex-col justify-center items-center w-76/100 h-86/100 rounded-2xl">
            <p className="text-2xl">Você ainda não fez nenhum pedido</p>
            <p className="text-lg pt-2">
              Que tal conferir nossas fórmulas incríveis?
            </p>
            <div className="pt-6 w-full flex items-center justify-center">
              <button
                className="bg-purpledark w-16/100 cursor-pointer text-white p-2 text-md rounded-3xl font-medium"
                onClick={inicio}
              >
                Ver Produtos
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-full flex justify-center items-center">
        <div className="flex items-center mt-6 text-3xl p-2 w-76/100 font-medium">
          Informação da conta
        </div>
      </div>
      <div className="w-full h-200 pt-6 flex justify-center">
        <div className="flex w-76/100 gap-20">
          <div className="bg-[#F4F4F4] w-36/100 h-65/100 rounded-2xl">
            <div className="flex w-full h-32/100 items-center justify-center gap-5">
              <div
                className="relative cursor-pointer"
                onClick={abrirExplorador}
                title="Clique para alterar a foto"
              >
                <img
                  src={dados_usuario.foto || "img_perfil.svg"}
                  alt="Foto de perfil"
                  className="w-24 h-24 rounded-full object-cover border-2 border-black"
                />
                <div className="absolute bottom-0 right-0 bg-purpledark text-white text-xs px-2 py-1 rounded-full">
                  Editar
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={selecionarImagem}
              />

              <p className="text-2xl h-10">{dados_usuario.nome_usuario}</p>
            </div>

            <div className="pl-10 w-full flex flex-col justify-center items-center">
              <div className="w-50/100">
                <button
                  onClick={ativaAbaDados}
                  className={`
                      transition-all cursor-pointer 
                  ${
                    infoAtiva === "dados"
                      ? "text-purpledark text-2xl border-l-3 pl-2 border-purpledark font-medium"
                      : "text-black border-l-3 text-lg border-[#FEF5FF] pl-2 font-medium"
                  }
                 `}
                >
                  Dados pessoais
                </button>
              </div>
              <div className="w-50/100">
                <button
                  onClick={ativaAbaEnd}
                  className={`
                     mt-6 transition-all cursor-pointer 
                  ${
                    infoAtiva === "endereco"
                      ? "text-purpledark text-2xl border-l-3 pl-2 border-purpledark font-medium"
                      : "text-black text-lg border-l-3 border-[#FEF5FF] pl-2 font-medium"
                  }
                 `}
                >
                  Endereços
                </button>
              </div>
              <div className="w-50/100">
                <button
                  onClick={ativaAbaCard}
                  className={`
                      mt-6 transition-all cursor-pointer 
                  ${
                    infoAtiva === "cartoes"
                      ? "text-purpledark text-2xl border-l-3 pl-2 border-purpledark font-medium"
                      : "text-black text-lg border-l-3 border-[#FEF5FF] pl-2 font-medium"
                  }
                 `}
                >
                  Cartões
                </button>
              </div>
              <div className="w-45/100">
                <button
                  onClick={sair_da_conta}
                  className="text-lg pt-6 cursor-pointer font-medium"
                >
                  Sair
                </button>
              </div>
              <div className="w-50/100">
                <button
                  onClick={abrir}
                  className={`
                      mt-6 transition-all cursor-pointer 
                  ${
                    infoAtiva === "excluir"
                      ? "text-purpledark text-2xl border-l-3 pl-2 border-purpledark font-medium"
                      : "text-black text-lg border-l-3 pl-2 border-[#FEF5FF] font-medium"
                  }
                 `}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
          {infoAtiva == "dados" && <Dados_pessoais />}
          {infoAtiva == "endereco" && <Enderecos />}
          {infoAtiva == "cartoes" && <Cartoes />}

          <Modal open={aberto} onClose={fechar}>
            <div className="flex w-100/100 h-full justify-center items-center">
              <div className="text-purpledark flex flex-col bg-[#F4F4F4] justify-center h-55/100 w-45/100 rounded-2xl">
                <div className="w-full h-12 mt-5 text-2xl font-medium flex justify-center">
                  <h1 className="text-black">
                    Digite seu Email e Senha para excluir sua conta!
                  </h1>
                </div>
                <div className="w-full flex flex-col items-center">
                  <div className="w-75/100 pt-2 text-lg font-medium">
                    <label htmlFor="" className="text-black">
                      Email
                    </label>
                  </div>
                  <div className="w-75/100 pt-2">
                    <input
                      className="bg-[#F4F4F4] border-[#D9D9D9] border-2 text-black p-2 rounded-lg w-100/100
                      focus:border-purpleborde outline-none"
                      placeholder="Ex: Manasses@gmail.com"
                      type="text"
                      value={valorEmailExcluir}
                      onChange={(e) => setValorEmailExcluir(e.target.value)}
                    />
                  </div>
                  <label className="w-75/100 text-black text-xl pt-5">
                    Senha
                  </label>
                  <div className="flex w-full pt-3 justify-center items-center">
                    <div className="flex w-75/100 border-2 border-[#D9D9D9] justify-center items-center rounded-lg focus-within:border-purpledark outline-none">
                      <input
                        className="w-full border-[#D9D9D9] text-black p-2 rounded-lg outline-none"
                        type={tipoInput}
                        placeholder="Ex: 1234"
                        maxLength={8}
                        onChange={(e) => setValorSenhaExcluir(e.target.value)}
                      />
                      <img
                        className="pr-3 w-9 h-6 cursor-pointer"
                        src={tipoIconSenha}
                        alt="Mostrar senha"
                        onClick={alternarTipo}
                      />
                    </div>
                  </div>
                  <div className="h-10 w-75/100 flex items-center">
                    {erroExcluir && (
                      <label className="text-purpledark">{mensagemErro}</label>
                    )}
                  </div>

                  <div className="w-75/100 gap-3 font-medium flex justify-end">
                    <button
                      className="w-35/100 rounded-lg h-10 bg-purpledark font-medium text-white cursor-pointer"
                      onClick={excluir}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
              <div className="pl-2 h-100">
                <button
                  className="w-full p-1 flex justify-center items-center rounded-2xl bg-purpledark text-white cursor-pointer"
                  onClick={fechar}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div className="pt-30">
        <FooterTecnico />
      </div>
    </div>
  );
}

export default Perfil;