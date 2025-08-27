import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import product from "../assets/[PRODUCT] 1.svg";
import product_2 from "../assets/[PRODUCT] 2.svg";
import banner from "../assets/banner.svg";
import estrela from "../assets/estrela.svg";
import carrinho_roxo from "../assets/carrinho.svg";
import carrinho_branco from "../assets/carrinho branco.svg";

function Results() {

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";

    const [products, setProcuts] = useState([
       {
        name: "Ácido hialurônico hidratante firmador",
        description:
          "Descubra o poder do ativo que preenche, suaviza e revitaliza sua pele de dentro pra fora.",
        price: "59,90",
        image: product,
      },
      {
        name: "Ácido hialurônico Premium",
        description:
          "Versão premium com alta concentração para resultados mais rápidos e duradouros.",
        price: "89,90",
        image: product_2,
      },
      {
        name: "Sérum humificado três leites",
        description: "O mais puro esfoliante extraído do leite de cabra.",
        price: "37,99",
        image: product,
      },
      {
        name: "Protetor labial sabor cereja do amor",
        description:
          "Apaixone-se pelo toque suave e o sabor irresistível da cereja do amor.",
        price: "37,99",
        image: product_2,
      },
      {
        name: "Máscara facial detox de argila verde",
        description:
          "Remove impurezas e controla a oleosidade sem ressecar a pele.",
        price: "29,90",
        image: product,
      },
      {
        name: "Creme nutritivo com vitamina C",
        description: "Ilumina e uniformiza o tom da pele com ação antioxidante.",
        price: "49,90",
        image: product_2,
      },
      {
        name: "Ácido hialurônico hidratante firmador",
        description: "Descubra o poder do ativo que preenche, suaviza e revitaliza sua pele de dentro pra fora.",
        price: "59,90",
        image: product,
      },
      {
        name: "Ácido hialurônico Premium",
        description:
          "Versão premium com alta concentração para resultados mais rápidos e duradouros.",
        price: "89,90",
        image: product_2,
      },
      {
        name: "Sérum humificado três leites",
        description: "O mais puro esfoliante extraído do leite de cabra.",
        price: "37,99",
        image: product,
      },
      {
        name: "Protetor labial sabor cereja do amor",
        description:
          "Apaixone-se pelo toque suave e o sabor irresistível da cereja do amor.",
        price: "37,99",
        image: product_2,
      },
      {
        name: "Máscara facial detox de argila verde",
        description:
          "Remove impurezas e controla a oleosidade sem ressecar a pele.",
        price: "29,90",
        image: product,
      }]);

  const filtrados = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-fit w-full flex flex-col items-center mt-10">
      <NavBar search={search} />
      <section className="w-295 h-fit mt-10">
        <img src={banner} alt="Banner" />
      </section>
      <div>
        {
          filtrados.length <= 0 || !search
          ?
          (
            <div className="cursor-pointer p-5 opacity-70 text-gray2 text-[16px]">
              Não há resultados para esta busca.
            </div>
          )
          :
          (
            <div className="flex flex-col h-fit w-295">
            <div className="p-5">
              <h1 onClick={() => navigate('/')} className="cursor-pointer opacity-70 text-gray2 text-[14px]">{`Início > Pesquisa > ${search}`}</h1>
            </div>
            <div className="w-full h-fit grid grid-cols-4">
            {
              filtrados.map((item, index) => (
                 <div key={index} className="group flex flex-col items-center cursor-pointer mb-10">
                  <div className="flex flex-col h-max-[100vh] w-[258px] gap-1">
                    <div className="w-[258px] h-[278px] transition-transform duration-300 group-hover:scale-110 group-hover:z-10 relative">
                      <img className="w-full h-full object-cover" src={item.image} alt="" />
                    </div>
                    <h1 className="text-black opacity-70 text-[22px] h-[70px] font-secondary not-italic [font-optical-sizing:auto] font-bold w-full mt-3">{item.name}</h1>
                    <p className="w-full text-[13px] text-black h-[40px]">{item.description}</p>
                    <div className="w-full mt-5 flex gap-1">
                      <img src={estrela} alt="" />
                      <img src={estrela} alt="" />
                      <img src={estrela} alt="" />
                      <img src={estrela} alt="" />
                      <img src={estrela} alt="" />
                    </div>
                    <div className="text-purpledark text-[20px] font-semibold">{`R$ ${item.price}`}</div>
                    <div className="flex flex-row w-full gap-1.5">
                      <div className="flex w-45 bg-blue p-2 justify-center items-center text-purpledark rounded-xl font-semibold hover:bg-purpledark hover:text-white transition duration-300">Adicionar</div>
                      <div className="flex justify-center items-center border-[1.5px] w-20 border-purpledark rounded-xl p-2 hover:bg-purpledark transition duration-300"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      >
                      <img className="w-5" src={hoveredIndex === index ? carrinho_branco : carrinho_roxo} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              ))
            }
            </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Results;