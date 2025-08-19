import React from "react";

function Excluir() {
  
  return (
    <div className="bg-[#F4F4F4] h-120 w-60/100 flex flex-col items-center  rounded-2xl">
      <div className="w-84/100 h-10/100 flex text-purpledark mt-8 items-center">
        <h1 className="text-2xl font-medium ">Excluir conta</h1>
      </div>
      <div className="w-84/100 h-10/100 flex  mt-4 items-center font-medium">
        <h2>Digite o seu email e senha para excluir sua conta!</h2>
      </div>
      <div className="flex flex-col mt-4 w-84/100">
        <label htmlFor="" className="text-lg">
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
          Senha
        </label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: 1234"
            className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none "
          />
        </div>
        <div className="flex w-full justify-end items-center mb-4 h-40">
            <button className="p-2 border-purpledark border-2 w-38/100 rounded-lg font-medium text-purpledark 
            hover:cursor-pointer hover:bg-purpledark hover:text-white hover:transition duration-400 ease-in-out"
            >
                Excluir
            </button>
         </div>
      </div>
    </div>
  );
}

export default Excluir;
