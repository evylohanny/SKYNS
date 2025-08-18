import React from "react";
import { useState, useEffect } from "react";
function PLogin() {
  const [valor_email_login, setValor_email_login] = useState("");
  const [valor_senha_login, setValor_senha_login] = useState("");
  const [mensagem_email_login, setMensagem_email_login] = useState("");
  const [mensagem_senha_login, setMensagem_senha_login] = useState("");
  const [Erro_senha_login, setErro_senha_login] = useState(false);
  const [Erro_email_login, setErro_email_login] = useState(false);

  const [tipoInput, setTipoInput] = useState("password");
  const [tipoIconSenha, setTipoIconSenha] = useState("icon_nao_ver.png");

  const alternarTipo = () => {
    setTipoInput((prev) => (prev === "password" ? "text" : "password"));
    setTipoIconSenha((prev) =>
      prev === "icon_nao_ver.png" ? "icon_ver.png" : "icon_nao_ver.png"
    );
  };

  useEffect(() => {
    if (valor_senha_login.length > 0) {
      setMensagem_senha_login("");
      setErro_senha_login(false);
    }
  }, [valor_senha_login]);

  useEffect(() => {
    if (valor_email_login.length > 0) {
      setMensagem_email_login("");
      setErro_email_login(false);
    }
  }, [valor_email_login]);

  const logar = () => {
    if (valor_senha_login.length < 4) {
      setMensagem_senha_login("senha incorreta!");
      setErro_senha_login(true);
    } else {
      setErro_senha_login(false);
      setMensagem_senha_login("");
    }

    if (
      !valor_email_login.includes("@gmail.com") &&
      !valor_email_login.includes("@hotmail.com")
    ) {
      setMensagem_email_login("Email incorreto!");
      setErro_email_login(true);
    } else {
      setMensagem_email_login("");
      setErro_email_login(false);
    }
  };

  return (
    <div className="flex flex-col w-full  pt-12 ">
      <div className="flex flex-col w-full justify-center items-center ">
        <p className="w-4/6 text-[40px] ">Que bom ter você aqui!</p>
        <p className="w-4/6 text-2xl pt-2 ">
          Insira suas credenciais para acessar sua conta
        </p>
      </div>
      <div className="flex flex-col w-full justify-center items-center pt-8">
        <label className="w-4/6 text-xl " htmlFor="">
          Endereço de e-mail
        </label>
        <div className=" flex w-full pt-3 justify-center items-center ">
          <input
            className="w-4/6 border-2 border-[#D9D9D9]  p-2 rounded-lg focus:border-purpledark outline-none "
            type="text"
            placeholder="Ex: Ronaldo@gmail.com"
            onChange={(e) => setValor_email_login(e.target.value)}
          />
        </div>
        <div
          className={`text-purpledark w-66/100 h-2 transition-opacity duration-500 ${
            Erro_email_login ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="h4"> {mensagem_email_login} </p>
        </div>
        <label className=" w-4/6 text-xl pt-5" htmlFor="">
          Senha
        </label>
        <div className="flex w-full  pt-3 justify-center items-center">
          <div className="  flex w-4/6 border-2 border-[#D9D9D9] justify-center items-center rounded-lg focus-within:border-purpledark outline-none   ">
            <input
              className="w-full border-[#D9D9D9]  p-2 rounded-lg outline-none "
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
        <div
          className={`text-purpledark w-4/6 pl-1 h-4 transition-opacity duration-500 ${
            Erro_senha_login ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="h-3"> {mensagem_senha_login} </p>
        </div>
      </div>

      <div className="flex pt-5  w-full justify-center items-center ">
        <div className="flex text-white w-full justify-center items-center pt-3">
          <button
            onClick={logar}
            className=" bg-purpledark w-4/6 font-bold  rounded-2xl p-2.5 cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
      <div className=" w-full  flex items-center justify-center pt-5 ">
        <div className=" cursor-pointer w-4/6 flex justify-center items-center border-2 border-purpledark rounded-2xl p-1 space-x-4 text-purpledark">
          <img src="logo_gogle.svg" alt="" />
          <p className="font-bold">Entrar com o Google</p>
        </div>
      </div>
    </div>
  );
}

export default PLogin;
