import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useState, useEffect } from "react";

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

  const [valor_email_login, setValor_email_login] = useState("");
  const [valor_senha_login, setValor_senha_login] = useState("");
  const [mensagem_email_login, setMensagem_email_login] = useState("");
  const [mensagem_senha_login, setMensagem_senha_login] = useState("");
  const [Erro_senha_login, setErro_senha_login] = useState(false);
  const [Erro_email_login, setErro_email_login] = useState(false);

  const [abaAtiva, setAbaAtiva] = useState("cadastro");

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

  const [valor_email_cadastro, setValor_email_cadastro] = useState("");
  const [Erro_email_cadastro, setErro_email_cadastro] = useState("");
  const [mensagem_email_cadastro, setMensagem_email_cadastro] = useState("");

  const [valor_senha_cadastro, setValor_senha_cadastro] = useState("");
  const [Erro_senha_cadastro, setErro_senha_cadastro] = useState("");
  const [mensagem_senha_cadastro, setMensagem_senha_cadastro] = useState("");

  const [valor_nome_cadastro, setValor_nome_cadastro] = useState("");
  const [Erro_nome_cadastro, setErro_nome_cadastro] = useState("");
  const [mensagem_nome_cadastro, setMensagem_nome_cadastro] = useState("");

  const [valor_cpf_cadastro, setValor_cpf_cadastro] = useState("");
  const [Erro_cpf_cadastro, setErro_cpf_cadastro] = useState("");
  const [mensagem_cpf_cadastro, setMensagem_cpf_cadastro] = useState("");

  const [valor_data_cadastro, setValor_data_cadastro] = useState("");
  const [Erro_data_cadastro, setErro_data_cadastro] = useState("");
  const [mensagem_data_cadastro, setMensagem_data_cadastro] = useState("");

  const formatarCPF = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    return value.slice(0, 14);
  };

  const formatarNome = (value) => value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");

  const formatarData = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
    return value.slice(0, 10);
  };

  const [tipoInput, setTipoInput] = useState("password");
  const [tipoIconSenha, setTipoIconSenha] = useState("icon_nao_ver.png");

  const alternarTipo = () => {
    setTipoInput((prev) => (prev === "password" ? "text" : "password"));
    setTipoIconSenha((prev) =>
      prev === "icon_nao_ver.png" ? "icon_ver.png" : "icon_nao_ver.png"
    );
  };

  useEffect(() => {

    if (valor_senha_cadastro.length > 0) {
      setMensagem_senha_cadastro("");
      setErro_senha_cadastro(false);
    }
  }, [valor_senha_cadastro]);

  useEffect(() => {
    if (valor_email_cadastro.length > 0) {
      setMensagem_email_cadastro("");
      setErro_email_cadastro(false);
    }
  }, [valor_email_cadastro]);

  useEffect(() => {
    if (valor_nome_cadastro.length > 0) {
      setMensagem_nome_cadastro("");
      setErro_nome_cadastro(false);
    }
  }, [valor_nome_cadastro]);

  useEffect(() => {
    if (valor_cpf_cadastro.length > 0) {
      setMensagem_cpf_cadastro("");
      setErro_cpf_cadastro(false);
    }
  }, [valor_cpf_cadastro]);
  
  useEffect(() => {

     if(valor_data_cadastro.length > 0){
      setMensagem_data_cadastro("")
      setErro_data_cadastro(false)
     }
  },[valor_data_cadastro])

  const cadastrar = () => {
    if (valor_senha_cadastro.length < 4) {
      setMensagem_senha_cadastro("senha incorreta!");
      setErro_senha_cadastro(true);
    } else {
      setErro_senha_cadastro(false);
      setMensagem_senha_cadastro("");
    }

    if (
      !valor_email_cadastro.includes("@gmail.com") &&
      !valor_email_cadastro.includes("@hotmail.com")
    ) {
      setMensagem_email_cadastro("Email incorreto!");
      setErro_email_cadastro(true);
    } else {
      setMensagem_email_cadastro("");
      setErro_email_cadastro(false);
    }

    if (valor_nome_cadastro.length < 1) {
      setMensagem_nome_cadastro("Nome incorreto!");
      setErro_nome_cadastro(true);
    } else {
      setMensagem_nome_cadastro("");
      setErro_nome_cadastro(false);
    }

    if (valor_cpf_cadastro.length < 14) {
      setMensagem_cpf_cadastro("CPF Invalido!");
      setErro_cpf_cadastro(true);
    } else {
      setMensagem_cpf_cadastro("");
      setErro_cpf_cadastro(false);
    }

    if (valor_data_cadastro.length == 10) {
      
      const [dia, mes, ano] = valor_data_cadastro.split("/").map(Number);
      const nascimento = new Date(ano, mes - 1, dia);
      const hoje = new Date();
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const naoFezAniversario = hoje.getMonth() < nascimento.getMonth() ||
        (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());

      if (naoFezAniversario) idade--;

      if (idade < 18 || isNaN(nascimento.getTime())) {
        setMensagem_data_cadastro('Você deve ser maior de 18 anos!')
        setErro_data_cadastro(true);
        
      } else{
         setErro_data_cadastro(false);
      }
         
    } else {
      setErro_data_cadastro(true);
      setMensagem_data_cadastro('Você deve ser maior de 18 anos!')
     
    }
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
          <div className=" flex w-100/100  items-center justify-center">
            <div className="flex w-4/6 space-x-8 border-b border-gray ">
              <button
                onClick={() => {
                  setAbaAtiva("cadastro");
                }}
                className={`pb-2 transition-all ${
                  abaAtiva === "cadastro"
                    ? "text-purpledark border-b-3 border-purpledark font-bold"
                    : "text-gray border-b-3 border-transparent"
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
                    ? "text-purpledark border-b-3 border-purpledark font-bold"
                    : "text-gray border-b-3 border-transparent"
                }`}
              >
                Login
              </button>
            </div>
          </div>
          {abaAtiva === "login" && (
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
                    className="w-4/6 border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
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
                  <div className="  flex w-4/6 border-2 border-gray justify-center items-center rounded-lg focus-within:border-purpledark outline-none   ">
                    <input
                      className="w-full border-gray p-2 rounded-lg outline-none "
                      type={tipoInput}
                      placeholder="Ex: 1234"
                      maxLength={8}
                      onChange={(e) => setValor_senha_cadastro(e.target.value)}
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
                  className={`text-purpledark w-4/6 pl-2 h-4 transition-opacity duration-500 ${
                    Erro_senha_cadastro ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="h-3"> {mensagem_senha_cadastro} </p>
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
          )}
          {abaAtiva === "cadastro" && (
            <div className="flex flex-col w-full pt-12  ">
              <div className="flex flex-col w-full justify-center items-center ">
                <p className="w-4/6 text-[40px] ">É um prazer te receber!</p>
                <p className="w-4/6 text-2xl pt-2 ">
                  Preencha os dados abaixo para criar sua conta
                </p>
              </div>
              <div className="flex flex-col w-92/100 max-h-60 justify-center items-center pl-2  overflow-y-auto">
                <label className="pl-18 pt-94 w-5/6 text-xl" htmlFor="">
                  Nome completo
                </label>
                <div className=" pl-19 flex w-full pt-3 justify-center items-center ">
                  <input
                    className="w-5/6 border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
                    type="text"
                    placeholder="Ex: Ronaldo fernandes"
                    value={valor_nome_cadastro}
                    onChange={(e) =>
                      setValor_nome_cadastro(formatarNome(e.target.value))
                    }
                  />
                </div>
                <div
                  className={`text-purpledark w-4/6 pl-2 h-4 transition-opacity duration-500 ${
                    Erro_nome_cadastro ? "opacity-100" : "opacity-0 "
                  }`}
                >
                  <p className="h-3"> {mensagem_nome_cadastro} </p>
                </div>

                <label className="pl-18 w-5/6 text-xl pt-5" htmlFor="">
                  Data Nascimento
                </label>
                <div className="pl-19 flex w-full pt-3 justify-center items-center ">
                  <input
                    className="w-5/6 border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
                    type="text"
                    placeholder="Ex: 14/02/2000"
                    value={valor_data_cadastro}
                    onChange={(e) =>
                      setValor_data_cadastro(formatarData(e.target.value))
                    }
                  />
                </div>
                <div
                  className={`text-purpledark w-4/6 pl-2 h-4 transition-opacity duration-500 ${
                    Erro_data_cadastro ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="h-3"> {mensagem_data_cadastro} </p>
                </div>
                <label className="pl-18 w-5/6 text-xl pt-5" htmlFor="">
                  CPF
                </label>
                <div className=" pl-19 flex w-full pt-3 justify-center items-center ">
                  <input
                    className="w-5/6 border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
                    type="text"
                    placeholder="Ex: 123.456.789-10"
                    value={valor_cpf_cadastro}
                    onChange={(e) =>
                      setValor_cpf_cadastro(formatarCPF(e.target.value))
                    }
                  />
                </div>
                <div
                  className={`text-purpledark w-4/6 pl-2 h-4 transition-opacity duration-500 ${
                    Erro_cpf_cadastro ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="h-3"> {mensagem_cpf_cadastro} </p>
                </div>

                <label className="pl-18 w-5/6 text-xl pt-5" htmlFor="">
                  Endereço de e-mail
                </label>
                <div className=" pl-19 flex w-full pt-3 justify-center items-center ">
                  <input
                    className="w-5/6 border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
                    type="text"
                    placeholder="Ex: Ronaldo@gmail.com"
                    onChange={(e) => setValor_email_cadastro(e.target.value)}
                  />
                </div>
                <div
                  className={`text-purpledark w-4/6 pl-2 h-4 transition-opacity duration-500 ${
                    Erro_email_cadastro ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="h-3"> {mensagem_email_cadastro} </p>
                </div>

                <label className="pl-18 w-5/6 text-xl pt-5" htmlFor="">
                  Senha
                </label>
                <div className="flex w-full pl-19 pt-3 justify-center items-center">
                  <div className="  flex w-5/6 border-2 border-gray justify-center items-center rounded-lg focus-within:border-purpledark outline-none   ">
                    <input
                      className="w-full border-gray p-2 rounded-lg outline-none "
                      type={tipoInput}
                      placeholder="Ex: 1234"
                      maxLength={8}
                      onChange={(e) => setValor_senha_cadastro(e.target.value)}
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
                  className={`text-purpledark w-4/6 pl-2 h-4 transition-opacity duration-500 ${
                    Erro_senha_cadastro ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="h-3"> {mensagem_senha_cadastro} </p>
                </div>
              </div>
              <div className="flex pt-4  w-full justify-center items-center ">
                <div className="flex text-white w-full justify-center items-center pt-4.5">
                  <button
                    onClick={cadastrar}
                    className=" bg-purpledark w-4/6 font-bold  rounded-2xl p-2.5 cursor-pointer"
                  >
                    Cadastrar-se
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
