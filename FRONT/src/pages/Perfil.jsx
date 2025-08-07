import NavBar from "../components/NavBar";

function Perfil() {
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
          Seus pedidos
        </div>
      </div>
      <div className=" w-full h-34/100 pt-4 flex justify-center">
        <div className="bg-[#F4F4F4] flex flex-col justify-center items-center w-76/100 h-86/100 rounded-2xl">
          <p className="text-2xl">Você ainda não fez nenhum pedido</p>
          <p className="text-lg pt-2">
            Que tal conferir nossas fómulas incríveis?
          </p>
          <div className="pt-6 w-full flex items-center justify-center">
            <button className="bg-purpledark w-18/100 text-white p-3 text-lg rounded-3xl font-medium">
              Ver Produtos
            </button>
          </div>
        </div>
      </div>
      <div className=" w-full  flex justify-center items-center">
        <div className=" flex items-center text-3xl p-2 w-76/100  font-medium ">
          Informação da conta
        </div>
      </div>
      <div className="w-full h-200 pt-6 flex justify-center ">
        <div className="flex w-76/100 gap-20 ">
          <div className=" bg-[#F4F4F4] w-36/100 h-65/100 rounded-2xl">
            <div className="flex w-full h-32/100 items-center justify-center gap-5">
                <img src="img_perfil.svg" alt="" />
                <p className="text-2xl h-10">Manassés Marcelino</p>
            </div>
            <div className=" pl-10 w-full flex flex-col justify-center items-center">
                <div className="w-45/100">
                  <button className="text-2xl cursor-pointer">Dados pessoais</button>
                </div> 
                <div className="w-45/100">
                  <button className="text-2xl pt-6 cursor-pointer">Endereços</button>
                </div> 
                <div className="w-45/100">
                  <button className="text-2xl pt-6 cursor-pointer">Cartoes</button>
                </div> 
                <div className="w-45/100">
                  <button className="text-2xl pt-6 cursor-pointer">Sair</button>
                </div> 
                <div className="w-45/100">
                  <button className="text-2xl pt-6 cursor-pointer">Excluir</button>
                </div> 
            </div>
          </div>
          <div className="bg-[#F4F4F4] w-60/100 h-full rounded-2xl">ola</div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
