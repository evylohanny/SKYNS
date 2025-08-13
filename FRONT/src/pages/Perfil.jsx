import NavBar from "../components/NavBar";
import FooterTecnico from "../components/FooterTecnico";

import Dados_pessoais from "../components/perfil/Dados_pessoais";
import Enderecos from "../components/perfil/Enderecos";
import Cartoes from "../components/perfil/Cartoes";

import { useState } from "react";

function Perfil() {
  const [infoAtiva, setInfoAtiva] = useState("dados");

  const ativa_aba_dados = () => {
    setInfoAtiva("dados");
  };

  const ativa_aba_end = () => {
    setInfoAtiva("endereco");
  };

  const ativa_aba_card = () => {
    setInfoAtiva("cartoes");
  };

  return (
    <div className="w-full h-full">
      <NavBar />
      <div className=" w-full  h-1/6 flex justify-center items-end">
        <div className="bg-[#FEF5FF] flex items-center text-lg p-4 w-76/100 h-48/100 font-medium  rounded-2xl">
          <p className=" pl-2 text-purpledark">Olá, Manassés!</p>
        </div>
      </div>
      <div className=" w-full pt-6 flex justify-center items-center">
        <div className=" flex items-center text-2xl p-2 w-76/100  font-medium ">
          Seus pedidos
        </div>
      </div>
      <div className=" w-full h-34/100 pt-4 flex justify-center">
        <div className="bg-[#F4F4F4] flex flex-col justify-center items-center w-76/100 h-86/100 rounded-2xl">
          <p className="text-2xl">Você ainda não fez nenhum pedido</p>
          <p className="text-lg pt-2">
            Que tal conferir nossas fómulas incríveis?
          </p>
          <div className="pt-6 w-full flex items-center justify-center">
            <button className="bg-purpledark w-16/100 text-white p-2 text-md rounded-3xl font-medium">
              Ver Produtos
            </button>
          </div>
        </div>
      </div>
      <div className=" w-full  flex justify-center items-center">
        <div className=" flex items-center text-3xl p-2 w-76/100  font-medium ">
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
                  onClick={ativa_aba_dados}
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
                  onClick={ativa_aba_end}
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
                  onClick={ativa_aba_card}
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
                <button className="text-2xl pt-6 cursor-pointer">Sair</button>
              </div>
              <div className="w-45/100">
                <button className="text-2xl pt-6 cursor-pointer">
                  Excluir
                </button>
              </div>
            </div>
          </div>
          {infoAtiva == "dados" && <Dados_pessoais />}
          {infoAtiva == "endereco" && <Enderecos />}
          {infoAtiva == "cartoes" && <Cartoes />}
        </div>
      </div>
      <div className="pt-30">
        <FooterTecnico />
      </div>
    </div>
  );
}

export default Perfil;
