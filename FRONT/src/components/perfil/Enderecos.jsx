import React, { useState, useEffect } from "react";
import Checkroxinho from "../../assets/Checkroxinho.svg";

function Enderecos() {
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [SuccessModal, setSuccessModal] = useState(false);

  // Carregar dados do localStorage quando o componente montar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("enderecoUsuario");
    if (dadosSalvos) {
      const endereco = JSON.parse(dadosSalvos);
      setCep(endereco.cep || "");
      setRua(endereco.rua || "");
      setNumero(endereco.numero || "");
      setComplemento(endereco.complemento || "");
    }
  }, []);

  const formatarCEP = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    return value.slice(0, 9);
  };

  const formatarNumero = (value) => {
    return value.replace(/\D/g, "").substring(0, 5);
  };

  const salvarEndereco = () => {
    const dadosEndereco = {
      cep: cep,
      rua: rua,
      numero: numero,
      complemento: complemento,
      dataSalvamento: new Date().toISOString()
    };

    localStorage.setItem("enderecoUsuario", JSON.stringify(dadosEndereco));
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
    <div className='bg-[#F4F4F4] h-160 w-60/100 flex flex-col items-center rounded-2xl'>
      <div className="w-84/100 h-10/100 flex mt-4 items-center text-purpledark"> 
        <h1 className="text-2xl font-medium">Endereço</h1>
      </div>
      
      <div className="flex flex-col w-84/100">
        <label htmlFor="" className="text-lg">CEP</label>
        <div className="w-full pt-2">
          <input 
            type="text" 
            placeholder="Ex: 88060-205" 
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5 focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200"
            value={cep}
            onChange={(e) => setCep(formatarCEP(e.target.value))}
          />
        </div>
        
        <label htmlFor="" className="text-lg pt-5">Rua/servidão</label>
        <div className="w-full pt-2">
          <input 
            type="text" 
            placeholder="Ex: Servidão rosalina" 
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5 focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
          />
        </div>
        
        <label htmlFor="" className="text-lg pt-5">Número</label>
        <div className="w-full pt-2">
          <input 
            type="text" 
            maxLength={5} 
            placeholder="Ex: 163" 
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5 focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200"
            value={numero}
            onChange={(e) => setNumero(formatarNumero(e.target.value))}
          />
        </div>
        
        <label htmlFor="" className="text-lg pt-5">Complemento</label>
        <div className="w-full pt-2">
          <input 
            type="text" 
            placeholder="Ex: Casa/apartamento" 
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5 focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </div>
       
        <div className="flex w-full justify-end items-center h-40">
          <button 
            onClick={salvarEndereco}
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
                Seu endereço foi salvo com sucesso.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Enderecos;