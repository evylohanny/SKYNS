import React, { useState, useEffect } from "react";
import Checkroxinho from "../../assets/Checkroxinho.svg";

function Cartoes() {
  const [valorCartao, setValorCartao] = useState("");
  const [valorNomeTitular, setValorNomeTitular] = useState("");
  const [validadeCartao, setValidadeCartao] = useState("");
  const [cvc, setCvc] = useState("");
  const [SuccessModal, setSuccessModal] = useState(false);

  // Carregar dados do localStorage quando o componente montar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("cartaoUsuario");
    if (dadosSalvos) {
      const cartao = JSON.parse(dadosSalvos);
      setValorNomeTitular(cartao.nomeTitular || "");
      setValorCartao(cartao.numero || "");
      setValidadeCartao(cartao.validade || "");
      setCvc(cartao.cvc || "");
    }
  }, []);

  const formatarCartao = (value) => {
    const apenasNumeros = value.replace(/\D/g, "");
    const limitado = apenasNumeros.substring(0, 16);
    const formatado = limitado.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatado;
  };

  const formatarNome = (value) => value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
  
  const formatarValidade = (value) => {
    const numeros = value.replace(/\D/g, "");
    return numeros.length > 2
      ? `${numeros.substring(0, 2)}/${numeros.substring(2, 4)}`
      : numeros;
  };

  const formatarCvc = (value) => {
    return value.replace(/\D/g, "").substring(0, 3);
  };

  const salvarCartao = () => {
    const dadosCartao = {
      nomeTitular: valorNomeTitular,
      numero: valorCartao.replace(/\s/g, ""),
      cvc: cvc,
      validade: validadeCartao,
      dataSalvamento: new Date().toISOString()
    };

    localStorage.setItem("cartaoUsuario", JSON.stringify(dadosCartao));
      window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="bg-[#F4F4F4] h-160 w-60/100 flex flex-col items-center rounded-2xl">
      <div className="w-84/100 h-10/100 mt-4 flex items-center text-purpledark">
        <h1 className="text-2xl font-medium">Seu cartão</h1>
      </div>
      
      <div className="flex flex-col w-84/100">
        <label htmlFor="" className="text-lg">
          Nome do titular
        </label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: Manassés Marcelino"
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5 focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200"
            value={valorNomeTitular}
            onChange={(e) => setValorNomeTitular(formatarNome(e.target.value))}
          />
        </div>
        
        <label htmlFor="" className="text-lg pt-5">
          Número
        </label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: 1111 1111 1111 1111"
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5 focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200"
            value={valorCartao}
            onChange={(e) => setValorCartao(formatarCartao(e.target.value))}
          />
        </div>
        
        <label htmlFor="" className="text-lg pt-5">
          CVC
        </label>
        <div className="w-full pt-2">
          <input
            type="text"
            maxLength={3}
            placeholder="Ex: 011"
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5 focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200"
            value={cvc}
            onChange={(e) => setCvc(formatarCvc(e.target.value))}
          />
        </div>
        
        <label htmlFor="" className="text-lg pt-5">
          Validade
        </label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: 06/40"
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5 focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200"
            value={validadeCartao}
            onChange={(e) => setValidadeCartao(formatarValidade(e.target.value))}
          />
        </div>

        <div className="flex w-full justify-end items-center h-40">
          <button
            onClick={salvarCartao}
            className="p-2 border-purpledark border-2 w-38/100 rounded-lg font-medium text-purpledark 
            hover:cursor-pointer hover:bg-purpledark hover:text-white hover:transition duration-400 ease-in-out"
          >
            SALVAR
          </button>
        </div>
      </div>
      
      <div>
        {SuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white rounded-4xl shadow-lg p-9 w-[450px] text-center">
              <div className="flex justify-center mb-4 w-[100%]">
                <img src={Checkroxinho} alt="" className="w-[25%]" />
              </div>
              
              <h2 className="text-2xl font-semibold text-gray1/90">
                Tudo certo!
              </h2>
              <p className="text-gray3 mt-2 text-lg">
                Seus dados foram armazenados com segurança.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cartoes;