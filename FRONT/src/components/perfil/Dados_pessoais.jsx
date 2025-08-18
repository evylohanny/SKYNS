import { useState } from "react";

function Dados_pessoais() {
  7;

  const [valor_cpf_editar, setValor_cpf_editar] = useState();
  const [valor_data_editar, setValor_data_editar] = useState();
  const [valor_tele_editar, setValor_tele_editar] = useState();
  const [genero, setGenero] = useState("");
  const [valor_nome_editar, setvalor_nome_editar] = useState();

  const formatarNome = (value) => value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");

  const formatarCPF = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    return value.slice(0, 14);
  };

  const formatarData = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
    return value.slice(0, 10);
  };

  const formatarTele = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    return value.slice(0, 15);
  };

  
  return (
    <div className="bg-[#F4F4F4] w-60/100 flex flex-col items-center  rounded-2xl">
      <div className="w-84/100 h-10/100 flex  mt-8 items-center">
        <h1 className="text-2xl font-medium text-purpledark ">Dados pessoais</h1>
      </div>
      <div className="flex flex-col mt-4 w-84/100">
        <label htmlFor="" className="text-lg">
          Nome
        </label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: Manassés"
            className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none "
             value={valor_nome_editar}
            onChange={(e) => setvalor_nome_editar(formatarNome(e.target.value))}
          />
        </div>
        <label htmlFor="" className="text-lg pt-5">
          Email
        </label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: Manassés@gmail.com"
            className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none "
          />
        </div>
        <label htmlFor="" className="text-lg pt-5">
          CPF
        </label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: 123.456.789.10"
            className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none "
            value={valor_cpf_editar}
            onChange={(e) => setValor_cpf_editar(formatarCPF(e.target.value))}
          />
        </div>
        <label htmlFor="" className="text-lg pt-5">
          Data de nascimento
        </label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: 11/11/2000"
            className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none "
            value={valor_data_editar}
            onChange={(e) => setValor_data_editar(formatarData(e.target.value))}
          />
        </div>
        <label htmlFor="" className="text-lg pt-5">
          Gênero
        </label>
        <div className="w-full pt-2">
          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="w-full flex border-2 border-[#D9D9D9] rounded-lg p-1.5 focus:outline-none  focus:border-purpledark"
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="prefiro nao informar">Prefiro não informar</option>
          </select>
        </div>
        <label htmlFor="" className="text-lg pt-5">
          Telefone
        </label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: (48) 99999-9999"
            className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none "
            value={valor_tele_editar}
            onChange={(e) => setValor_tele_editar(formatarTele(e.target.value))}
          />
        </div>
        <div className="flex w-full justify-end items-center h-40">
          <button
            className="p-2 border-purpledark border-2 w-38/100 rounded-lg font-medium text-purpledark 
            hover:cursor-pointer hover:bg-purpledark hover:text-white hover:transition duration-400 ease-in-out"
          >
            EDITAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dados_pessoais;
