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
   
  const [valor_email_cadastro, setValor_email_cadastro] = useState("")
  const [Erro_email_cadastro, setErro_email_cadastro] = useState("")
  const [mensagem_email_cadastro, setMensagem_email_cadastro] = useState("")

  const [valor_senha_cadastro, setValor_senha_cadastro] = useState("")
  const [Erro_senha_cadastro ,setErro_senha_cadastro] = useState("") 
  const [mensagem_senha_cadastro, setMensagem_senha_cadastro] = useState("")

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
    
  }
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
          <div className="pr-7 flex w-96/100  items-center justify-center">
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
              <div className="flex flex-col w-full justify-center items-center pt-11">
                <label className="pl-16 w-5/6 text-xl " htmlFor="">
                  Endereço de e-mail
                </label>
                <div className=" pl-32 pr-39 flex w-full pt-3 justify-center items-center ">
                  <input
                    className="w-full border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
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
                  {mensagem_email_login}
                </div>
                <label className="pl-16 w-5/6 text-xl pt-5" htmlFor="">
                  Senha
                </label>
                <div className=" pl-32 pr-39 flex w-full pt-3 justify-center items-center ">
                  <input
                    className="w-full border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
                    type="text"
                    placeholder="Ex: 1234"
                    onChange={(e) => setValor_senha_login(e.target.value)}
                  />
                </div>
                <div
                  className={`text-purpledark w-66/100 h-2 transition-opacity duration-500 ${
                    Erro_senha_login ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {mensagem_senha_login}
                </div>
              </div>

              <div className="pl-32  flex pt-4  w-80/100 justify-center items-center ">
                <div className="flex text-white w-full justify-center items-center pt-4.5">
                  <button
                    onClick={logar}
                    className=" bg-purpledark w-full font-bold  rounded-2xl p-2.5 cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="pl-32 w-80/100  flex items-center justify-center pt-5 ">
                <div className=" cursor-pointer w-full flex justify-center items-center border-2 border-purpledark rounded-2xl p-1 space-x-4 text-purpledark">
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
              <div className="flex flex-col w-88/100 max-h-60 justify-center items-center pt-12 overflow-y-auto">
                <label className="pl-18 pt-72 w-5/6 text-xl" htmlFor="">
                  Nome completo
                </label>
                <div className=" pl-20 flex w-full pt-3 justify-center items-center ">
                  <input
                    className="w-5/6 border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
                    type="text"
                    placeholder="Ex: Ronaldo fernandes"
                  />
                </div>
                <label className="pl-18 w-5/6 text-xl pt-5" htmlFor="">
                  Data Nascimento
                </label>
                <div className="pl-20 flex w-full pt-3 justify-center items-center ">
                  <input
                    className="w-5/6 border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
                    type="text"
                    placeholder="Ex: 14/02/2000"
                  />
                </div>
                <label className="pl-18 w-5/6 text-xl pt-5" htmlFor="">
                  CPF
                </label>
                <div className=" pl-20 flex w-full pt-3 justify-center items-center ">
                  <input
                    className="w-5/6 border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
                    type="text"
                    placeholder="Ex: 123.456.789-10"
                  />
                </div>
                <label className="pl-18 w-5/6 text-xl pt-5" htmlFor="">
                  Endereço de e-mail
                </label>
                <div className=" pl-20 flex w-full pt-3 justify-center items-center ">
                  <input
                    className="w-5/6 border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
                    type="text"
                    placeholder="Ex: Ronaldo@gmail.com"
                    onChange={(e) => setValor_email_cadastro(e.target.value)}
                  />
                </div>
                <div
                  className={`text-purpledark w-60/100 h-2 transition-opacity duration-500 ${
                    Erro_email_cadastro ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {mensagem_email_cadastro}
                </div>
 
                <label className="pl-18 w-5/6 text-xl pt-5" htmlFor="">
                  Senha
                </label>
                <div className=" pl-20 flex w-full pt-3 justify-center items-center ">
                  <input
                    className="w-5/6 border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
                    type="text"
                    placeholder="Ex: 1234"
                    onChange={(e) => setValor_senha_cadastro(e.target.value)}
                  />
                </div>
                <div
                  className={`text-purpledark w-60/100 h-2 transition-opacity duration-500 ${
                    Erro_senha_cadastro ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {mensagem_senha_cadastro}
                </div>

              </div>
              <div className="pl-32  flex pt-4  w-80/100 justify-center items-center ">
                <div className="flex text-white w-full justify-center items-center pt-1.5">
                  <button onClick={cadastrar} className=" bg-purpledark w-full font-bold  rounded-2xl p-2.5 cursor-pointer">
                    Cadastrar-se
                  </button>
                </div>
              </div>
              <div className="pl-32 w-80/100  flex items-center justify-center pt-5 ">
                <div className=" cursor-pointer w-full flex justify-center items-center border-2 border-purpledark rounded-2xl p-1 space-x-4 text-purpledark">
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
