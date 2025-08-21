import NavBar from "../components/NavBar";
import FooterTecnico from "../components/FooterTecnico";

import Dados_pessoais from "../components/perfil/Dados_pessoais";
import Enderecos from "../components/perfil/Enderecos";
import Cartoes from "../components/perfil/Cartoes";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const [infoAtiva, setInfoAtiva] = useState("dados");
  const navigate = useNavigate();
  const [tipoInput, setTipoInput] = useState("password");
  const [tipoIconSenha, setTipoIconSenha] = useState("icon_nao_ver.png");

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

  const [mensagemErro] = useState("Email ou Senha incorreto!");
  const [erroExcluir, setErroExcluir] = useState(false);

  const [valorEmailExcluir, setValorEmailExcluir] = useState("");
  const [valorSenhaExcluir, setValorSenhaExcluir] = useState("");

  const excluir = () => {
    if (
      valorEmailExcluir.includes("@gmail.com") ||
      (valorEmailExcluir.includes("@hotmail.com") &&
        valorSenhaExcluir.length > 4)
    ) {
      setErroExcluir(false);
    } else {
      setErroExcluir(true);
    }

    if (
      valorEmailExcluir.includes("@gmail.com") ||
      valorEmailExcluir.includes("@hotmail.com" && valorSenhaExcluir.length > 4)
    ) {
      navigate("/cadastro");
    }
  };

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

  const pedidos = [
   
  ];

  return (
    <div className="w-full h-full">
      <NavBar />
      <div className=" w-full  h-1/6 flex justify-center items-end">
        <div className="bg-[#FEF5FF] flex items-center text-lg p-4 w-76/100 h-48/100 font-medium  rounded-2xl">
          <p className=" pl-2 text-purpledark">Olá, Manassés!</p>
        </div>
      </div>
      {pedidos.length > 0 ? (
        <>
          <div className=" w-full pt-6 flex justify-center items-center">
            <div className=" flex items-center text-2xl p-2 w-76/100  font-medium ">
              Historico de pedidos
            </div>
          </div>

          <div className="w-full flex justify-center ">
            <div className="w-79/100 ml-12 flex flex-col  justify-start pr-9 items-center h-95 overflow-y-auto">
              {pedidos.map((items, index) => {
                return (
                  <div
                    className="w-full flex items-center pt-8 justify-center "
                    key={index}
                  >
                    <div className="bg-[#F4F4F4]  h-36 flex items-center   w-full rounded-2xl">
                      <div className="ml-4 w-9/100 mr-40 flex justify-center items-center ">
                        <img className="w-100/100" src={items.img} alt="" />
                      </div>
                      <div className="w-20/100 mr-20">
                        <h1 className="text-lg">{items.nome}</h1>
                      </div>
                      <div className="border-2 h-8 w-7/100 border-[#97989C] ml-15 mr-4 gap-3 flex justify-center items-center rounded-lg">
                        <h1 className="text-4xl pb-1 text-[#97989C]">-</h1>
                        <h1 className="text-[#97989C]  text-lg">
                          {items.quantidade}
                        </h1>
                        <h1 className="text-[#97989C] text-2xl">+</h1>
                      </div>
                      <div>
                        <h1 className="text-purpledark text-2xl font-bold ml-24 mr-10 ">
                          R$ {items.preco}
                        </h1>
                      </div>
                      <div className="h-full w-12/100 justify-end  items-end flex  pb-5">
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
        <div className=" w-full h-40/100 pt-4 flex flex-col  items-center">
          <div className=" w-full pt-6 pb-4 flex justify-center items-center">
            <div className=" flex items-center text-2xl p-2 w-76/100  font-medium ">
              Historico de pedidos
            </div>
          </div>
          <div className="bg-[#F4F4F4] flex flex-col justify-center items-center w-76/100 h-86/100 rounded-2xl">
            <p className="text-2xl">Você ainda não fez nenhum pedido</p>
            <p className="text-lg pt-2">
              Que tal conferir nossas fómulas incríveis?
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
      <div className=" w-full  flex justify-center items-center">
        <div className=" flex items-center mt-6 text-3xl p-2 w-76/100  font-medium ">
          Informação da conta
        </div>
      </div>
      <div className="w-full h-200 pt-6 flex justify-center ">
        <div className="flex w-76/100 gap-20 ">
          <div className=" bg-[#F4F4F4] w-36/100 h-65/100 rounded-2xl">
            <div className="flex w-full h-32/100 items-center justify-center gap-5">
              <img src="img_perfil.svg" alt="" />
              <p className="text-2xl h-10">Manassés Marcelino</p>
            </div>
            <div className=" pl-10 w-full flex flex-col justify-center items-center">
              <div className="w-50/100">
                <button
                  onClick={ativaAbaDados}
                  className={`
                      transition-all cursor-pointer 
                  ${
                    infoAtiva === "dados"
                      ? "text-purpledark text-2xl border-l-3 pl-2  border-purpledark font-medium"
                      : "text-black  border-l-3 text-lg border-[#FEF5FF] pl-2 font-medium"
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
                      ? "text-purpledark text-2xl border-l-3 pl-2  border-purpledark font-medium"
                      : "text-black text-lg  border-l-3 border-[#FEF5FF] pl-2 font-medium"
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
                      ? "text-purpledark text-2xl border-l-3 pl-2  border-purpledark font-medium"
                      : "text-black text-lg  border-l-3 border-[#FEF5FF] pl-2 font-medium"
                  }
                 `}
                >
                  Cartoes
                </button>
              </div>
              <div className="w-45/100">
                <button className="text-lg pt-6 cursor-pointer font-medium">
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
                      ? "text-purpledark text-2xl border-l-3 pl-2  border-purpledark font-medium"
                      : "text-black text-lg  border-l-3 pl-2 border-[#FEF5FF] font-medium"
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
            <div className="flex  w-100/100 h-full justify-center items-center">
              <div className=" text-purpledark flex flex-col bg-[#F4F4F4] justify-center  h-55/100 w-45/100 rounded-2xl">
                <div className="w-full h-12 mt-5  text-2xl font-medium flex justify-center">
                  <h1 className="text-black">
                    Digite seu Email e Senha para excluir sua conta!
                  </h1>
                </div>
                <div className="w-full flex flex-col items-center ">
                  <div className="w-75/100 pt-2 text-lg font-medium ">
                    <label htmlFor="" className="text-black">
                      Email
                    </label>
                  </div>
                  <div className="w-75/100 pt-2 ">
                    <input
                      className="bg-[#F4F4F4]] border-[#D9D9D9] border-2 text-black p-2 rounded-lg w-100/100
                      focus:border-purpleborde outline-none"
                      placeholder="Ex: Manasses@gmail.com"
                      type="text"
                      onChange={(e) => setValorEmailExcluir(e.target.value)}
                    />
                  </div>
                  <label className=" w-75/100 text-black text-xl pt-5">
                    Senha
                  </label>
                  <div className="flex w-full  pt-3 justify-center items-center">
                    <div className="  flex w-75/100 border-2 border-[#D9D9D9] justify-center items-center rounded-lg focus-within:border-purpledark outline-none   ">
                      <input
                        className="w-full border-[#D9D9D9] text-black p-2 rounded-lg outline-none "
                        type={tipoInput}
                        placeholder="Ex: 1234"
                        maxLength={8}
                        onChange={(e) => setValor_senha_login(e.target.value)}
                      />
                      <img
                        className=" pr-3 w-9 h-6 cursor-pointer"
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

                  <div className="w-75/100 gap-3 font-medium  flex justify-end">
                    <button
                      className="w-35/100 rounded-lg h-10 bg-purpledark font-medium text-white cursor-pointer"
                      onClick={excluir}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
              <div className=" pl-2 h-100">
                <button
                  className="w-full p-1 flex justify-center items-center rounded-2xl bg-purpledark text-white cursor-pointer "
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
