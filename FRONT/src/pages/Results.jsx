import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import product from "../assets/[PRODUCT] 1.svg";
import product_2 from "../assets/[PRODUCT] 2.svg";
import banner from "../assets/banner.svg";
import estrela from "../assets/estrela.svg";
import carrinho_roxo from "../assets/carrinho.svg";
import carrinho_branco from "../assets/carrinho branco.svg";
import FooterCompleto from "../components/FooterCompleto";

function Results() {

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [skinSection, setSkinSection] = useState(false);
  const [section, setSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";

    const skinTypes = ['SECA', 'ACNEICA', 'OLEOSA', 'MADURA'];

    const [products, setProcuts] = useState([
       {
        name: "Ácido hialurônico hidratante firmador",
        description:
          "Descubra o poder do ativo que preenche, suaviza e revitaliza sua pele de dentro pra fora.",
        price: "59,90",
        skinType: skinTypes[0],
        image: product_2,
      },
      {
        name: "Ácido hialurônico hidratante firmador",
        description:
          "Descubra o poder do ativo que preenche, suaviza e revitaliza sua pele de dentro pra fora.",
        price: "59,90",
        skinType: skinTypes[0],
        image: product,
      },
      {
        name: "Ácido hialurônico Premium",
        description:
          "Versão premium com alta concentração para resultados mais rápidos e duradouros.",
        price: "89,90",
        skinType: skinTypes[1],
        image: product_2,
      },
      {
        name: "Sérum humificado três leites",
        description: "O mais puro esfoliante extraído do leite de cabra.",
        price: "37,99",
        skinType: skinTypes[0],
        image: product,
      },
      {
        name: "Protetor labial sabor cereja do amor",
        description:
          "Apaixone-se pelo toque suave e o sabor irresistível da cereja do amor.",
        price: "37,99",
        skinType: skinTypes[1],
        image: product_2,
      },
      {
        name: "Máscara facial detox de argila verde",
        description: "Remove impurezas e controla a oleosidade sem ressecar a pele.",
        price: "29,90",
        skinType: skinTypes[2],
        image: product,
      },
      {
        name: "Creme nutritivo com vitamina C",
        description: "Ilumina e uniformiza o tom da pele com ação antioxidante.",
        price: "49,90",
        skinType: skinTypes[3],
        image: product_2,
      },
      {
        name: "Ácido hialurônico hidratante firmador",
        description: "Descubra o poder do ativo que preenche, suaviza e revitaliza sua pele de dentro pra fora.",
        price: "59,90",
        image: product,
        skinType: skinTypes[2],
      },
      {
        name: "Ácido hialurônico Premium",
        description: "Versão premium com alta concentração para resultados mais rápidos e duradouros.",
        price: "89,90",
        skinType: skinTypes[1],
        image: product_2,
      },
      {
        name: "Sérum humificado três leites",
        description: "O mais puro esfoliante extraído do leite de cabra.",
        price: "37,99",
        skinType: skinTypes[3],
        image: product,
      },
      {
        name: "Protetor labial sabor cereja do amor",
        description:
          "Apaixone-se pelo toque suave e o sabor irresistível da cereja do amor.",
        price: "37,99",
        skinType: skinTypes[0],
        image: product_2,
      },
      {
        name: "Máscara facial detox de argila verde",
        description:
          "Remove impurezas e controla a oleosidade sem ressecar a pele.",
        price: "29,90",
        skinType: skinTypes[1],
        image: product,
      }]);

  useEffect(() => {
    const searchProducts = () => {
      const searchWords = search.toLowerCase().split(" ").filter(Boolean);

      const filteredAux = products.filter((item) =>
        searchWords.some((word) => item.name.toLowerCase().includes(word))
      );

      setFiltered(filteredAux);

      if (filteredAux.length === 0) {

        const filteredBySkin = products.filter((item) =>
          searchWords.some((word) => item.skinType.toLowerCase().includes(word))
        );
        setFiltered(filteredBySkin);
        setSkinSection(true);

        if (searchWords.some((word) => skinTypes[0].toUpperCase().includes(word.toUpperCase()))) setSection("Seca");
        else if (searchWords.some((word) => skinTypes[1].toUpperCase().includes(word.toUpperCase()))) setSection("Acneica");
        else if (searchWords.some((word) => skinTypes[2].toUpperCase().includes(word.toUpperCase()))) setSection("Oleosa");
        else if (searchWords.some((word) => skinTypes[3].toUpperCase().includes(word.toUpperCase()))) setSection("Madura");
        else setSection("");

        return;
      }

      setSkinSection(false);
    };

    searchProducts();
  }, [search]);

  return (
    <div className="h-fit w-full flex flex-col items-center mt-10">
      <NavBar search={search} />
      <section className="w-295 h-fit mt-10">
        <img src={banner} alt="Banner" />
      </section>
      <div className="mb-20">
        {
          filtered.length <= 0 || !search
          ?
          (
            <div className="cursor-pointer p-5 opacity-70 text-gray2 text-[20px] text-center">
              {`Não há resultados para "${search}"`}
            </div>
          )
          :
          (
            <div className="flex flex-col h-fit w-295">
            <div className="p-6 height-fit">
              <h1 onClick={() => navigate('/')} className="cursor-pointer opacity-70 text-gray2 text-[16px]">{`Início > Pesquisa > ${search}`}</h1>
            </div>
            {
              skinSection &&
               <div className="bg-[#FEF5FF] flex items-center p-2 mb-15 ml-6 w-285 h-12 font-medium  rounded-2xl">
                <p className="pl-2 text-purpledark font-medium text-[20px]">{`Produtos para pele ${section}`}</p>
              </div>
            }
            <div className="w-full h-fit grid grid-cols-4">
            {
              filtered.map((item, index) => (
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
      <FooterCompleto />
    </div>
  );
}

export default Results;