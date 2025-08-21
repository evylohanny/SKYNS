import React from "react";
import NavBar from "../components/NavBar";
import FooterTecnico from "../components/FooterTecnico";

function Pedidos() {

    const pedidos = [
    {
      nome: "Esfiliante solar ultra UV - 300G colectins verao",
      img: "img_pedidos.svg",
      quantidade: "4",
      preco: "89,90",
    },
    {
      nome: "Esfiliante solar ultra UV - 300G colectins verao",
      img: "img_pedidos.svg",
      quantidade: "4",
      preco: "89,90",
    },
    {
      nome: "Esfiliante solar ultra UV - 300G colectins verao",
      img: "img_pedidos.svg",
      quantidade: "4",
      preco: "89,90",
    },
  ];

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
          Pedidos em andamento 
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <div className="w-79/100 ml-12 flex flex-col  justify-start pr-9 items-center h-95 overflow-y-auto">
          {pedidos.length > 0 &&
            pedidos.map((items, index) => {
              return (
                <div
                  className="w-full flex items-center pt-8 justify-center "
                  key={index}
                >
                  <div className="bg-[#F4F4F4]  h-36 flex items-center   w-full rounded-2xl">
                    <div className="ml-4 w-9/100 mr-40 flex justify-center items-center ">
                      <img className="w-100/100" src={items.img} alt="" />
                    </div>
                    <div className="w-20/100 mr-20">
                      <h1 className="text-lg">{items.nome}</h1>
                    </div>
                    <div className="border-2 h-8 w-7/100 border-[#97989C] ml-15 mr-4 gap-3 flex justify-center items-center rounded-lg">
                      <h1 className="text-4xl pb-1 text-[#97989C]">-</h1>
                      <h1 className="text-[#97989C]  text-lg">
                        {items.quantidade}
                      </h1>
                      <h1 className="text-[#97989C] text-2xl">+</h1>
                    </div>
                    <div>
                      <h1 className="text-purpledark text-2xl font-bold ml-24 mr-10 ">
                        R$ {items.preco}
                      </h1>
                    </div>
                    <div className="h-full w-12/100 justify-end  items-end flex  pb-5">
                      <button className="border-2 w-full p-1.5 text-sm rounded-lg border-purpledark text-purpledark cursor-pointer">
                        VER DETALHES
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
     
       <div className=" w-full pt-6 flex justify-center items-center">
        <div className=" flex items-center text-2xl p-2 w-76/100  font-medium ">
          Pedidos finalizados
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <div className="w-79/100 ml-12 flex flex-col  justify-start pr-9 items-center h-95 overflow-y-auto">
          {pedidos.length > 0 &&
            pedidos.map((items, index) => {
              return (
                <div
                  className="w-full flex items-center pt-8 justify-center "
                  key={index}
                >
                  <div className="bg-[#F4F4F4]  h-36 flex items-center   w-full rounded-2xl">
                    <div className="ml-4 w-9/100 mr-40 flex justify-center items-center ">
                      <img className="w-100/100" src={items.img} alt="" />
                    </div>
                    <div className="w-20/100 mr-20">
                      <h1 className="text-lg">{items.nome}</h1>
                    </div>
                    <div className="border-2 h-8 w-7/100 border-[#97989C] ml-15 mr-4 gap-3 flex justify-center items-center rounded-lg">
                      <h1 className="text-4xl pb-1 text-[#97989C]">-</h1>
                      <h1 className="text-[#97989C]  text-lg">
                        {items.quantidade}
                      </h1>
                      <h1 className="text-[#97989C] text-2xl">+</h1>
                    </div>
                    <div>
                      <h1 className="text-purpledark text-2xl font-bold ml-24 mr-10 ">
                        R$ {items.preco}
                      </h1>
                    </div>
                    <div className="h-full w-12/100 justify-end  items-end flex  pb-5">
                      <button className="border-2 w-full p-1.5 text-sm rounded-lg border-purpledark text-purpledark cursor-pointer">
                        VER DETALHES
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="mt-28 w-full ">
        <FooterTecnico />
      </div>
      
    </div>
  );
}

export default Pedidos;
