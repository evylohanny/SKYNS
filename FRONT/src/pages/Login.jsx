import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useState } from "react";

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

  const [abaAtiva, setAbaAtiva] = useState("cadastro");
  return (
    <div className="h-screen">
      <div className="flex w-full h-full">
        <div className="w-1/2 h-full">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            rewind={true}
            slidesPerView={1}
            speed={800}
          >
            {imagens.map((src, i) => (
              <SwiperSlide key={i}>
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
          <div className="flex w-full  items-center justify-center">
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
                <p className="w-4/6 text-5xl ">Que bom ter você aqui!</p>
                <p className="w-4/6 text-2xl pt-2 ">
                  Insira suas credenciais para acessar sua conta
                </p>
              </div>
              <div className="flex flex-col w-full justify-center items-center pt-12">
                <label className="w-4/6 text-2xl" htmlFor="">
                  Endereço de e-mail
                </label>
                <div className="flex w-full pt-5 justify-center items-center ">
                  <input
                    className="w-4/6 border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
                    type="text"
                    placeholder="ex: ronaldo@gmail.com"
                  />
                </div>
                <label className="w-4/6 text-2xl pt-5" htmlFor="">
                  Senha
                </label>
                <div className="flex w-full pt-5 justify-center items-center ">
                  <input
                    className="w-4/6 border-2 border-gray p-2 rounded-lg focus:border-purpledark outline-none "
                    type="text"
                    placeholder="ex: ronaldo@gmail.com"
                  />
                </div>
              </div>
              <div className="flex w-57/100 space-x-2 pt-10 justify-center items-center">
                <input type="checkbox" />
                <p>Relembrar por 30 dias</p>
              </div>
              <div className="flex  w-full justify-center items-center ">
                <div className="flex text-white w-full justify-center items-center pt-3">
                  <button className=" bg-purpledark w-4/6 font-bold  rounded-2xl p-2.5">Login</button>
                </div>
              </div>
              <div className="w-full flex items-center justify-center pt-5 ">
                <div onClick={""} className="w-4/6 flex justify-center items-center border-2 border-purpledark rounded-2xl p-1 space-x-4 text-purpledark">
                  <img src="logo_gogle.svg" alt="" />
                  <p className="font-bold">Entrar com o Google</p>
                </div>
              </div>
            </div>
          )}
          {abaAtiva === "cadastro" && <div>cadastro</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;
