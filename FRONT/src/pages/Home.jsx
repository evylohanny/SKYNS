import NavBar from "../components/NavBar";
import poster from "../assets/poster.svg";

function Home() {
    
  return (
    <div>
      <div className="flex flex-col w-full">
        <NavBar />
        <div className="h-screen w-full flex">
          <div className="h-full w-full relative">
            <img className="w-full" src={poster} alt="" />
          </div>
          <div className="absolute">
            <p>CUIDAR DA PELE TAMBÉM É CUIDAR DE VOCÊ</p>
            <h1>Transforme sua rotina em um ritual de acolhimento.</h1>
            <p>
              SUA PELE É ÚNICA. DESCUBRA OS INGREDIENTES CERTOS PARA CUIDAR DELA COM CIÊNCIA E CARINHO.
            </p>
            <div>
              <p>Vamos lá</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;