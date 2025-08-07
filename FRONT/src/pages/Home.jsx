import NavBar from "../components/NavBar";
import poster from "../assets/poster.svg";
import banner from "../assets/Frame 23864.svg";

function Home() {
    
  return (
    <div>
      <div className="flex flex-col w-full">
        <NavBar />
        <div className="h-[90vh] w-full flex">
          <div className="h-[70vh] w-full relative">
            <img className="w-full" src={poster} alt="" />
          </div>
          <div className="flex flex-col absolute ml-40 mt-40 gap-2">
            <p className="text-white text-[17px] leading-[30px] tracking-[2px] font-secondary font-bold">CUIDAR DA PELE TAMBÉM É CUIDAR DE VOCÊ</p>
            <div className="text-extradarkpurple w-200 font-secondary font-semibold text-[60px] leading-[80px] tracking-[-0.5px] mt-1">Transforme sua rotina em um ritual de acolhimento.</div>
            <p className="text-white w-190 text-[17px] leading-[30px] tracking-[1.6px] font-secondary font-bold">
              SUA PELE É ÚNICA. DESCUBRA OS INGREDIENTES CERTOS PARA CUIDAR DELA COM CIÊNCIA E CARINHO.
            </p>
            <div className="group bg-purpledark text-center w-55 p-3 center rounded-full mt-5 hover:bg-white transition duration-300">
              <p className="text-white text-[23px] font-bold font-secondary hover:text-purpledark transition duration-300 cursor-pointer">Vamos lá</p>
            </div>
          </div>
        </div>
        <div className="h-[100vh] w-full flex flex-col">
          <div className="flex h-[20vh] w-full items-start justify-center">
            <img className="w-350 h-fit shadow-lg" src={banner} alt="" />
          </div>
          <div className="flex flex-col w-full h-[80vh]">
            <p className="flex w-full h-fit text-[30px] mt-20 font-secondary tracking-[2px] text-salmon items-center justify-center">Queridinhos da galera</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;