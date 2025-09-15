import iconLupa from '../assets/iconLupa.svg';
import setaSelectCinza from '../assets/setaSelectCinza.svg';
import setaSelectPurple from '../assets/setaSelectPurple.svg';

function FolhaA() {
  return (
    <div className="w-[80%] flex flex-col gap-10">
      <div className="w-full flex flex-col">
        <h1 className="text-gray2 font-secondary text-xl">Início</h1>
        <div className="flex font-primary text-gray2/50 gap-2">
          <p>login</p>
          <p>/</p>
          <p>Folha de acompanhamento</p>
        </div>
      </div>

      {/* Barra de filtros */}
      <div className="w-full bg-white flex items-center gap-6 p-6 rounded-sm shadow-md">
        
        {/* Campo de busca */}
        <div className="relative w-[25%]">
          <input
            type="text"
            placeholder="Buscar"
            className="w-full border border-grayNaosei rounded-full pl-4 pr-10 py-2 text-gray2 text-sm font-semibold 
             focus:outline-none focus:ring-2 focus:ring-purpledark peer-focus:text-purpledark cursor-pointer"
          />
          <img
            src={iconLupa}
            alt="Buscar"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray2 cursor-pointer"
          />
        </div>

        {/* Select ID */}
        <div className="relative w-[23%]">
          <select
            defaultValue=""
            className="peer w-full border border-grayNaosei rounded-md px-3 py-2 text-gray2 text-sm 
            focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
          >
            <option value="" disabled hidden></option>
            <option>938595894</option>
          </select>

          <label
            className="absolute left-3 top-1.5 text-gray3 text-sm transition-all 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray
            peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-purpledark"
          >
            ID
          </label>

          {/* seta cinza (default) */}
          <img
            src={setaSelectCinza}
            alt="seta select"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 peer-focus:hidden"
          />

          {/* seta roxa (quando em foco) */}
          <img
            src={setaSelectPurple}
            alt="seta select focus"
            className="hidden peer-focus:block pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3"
          />
        </div>

        {/* Select Tipo de pele */}
        <div className="relative w-[23%]">
          <select
            defaultValue=""
            className="peer w-full border border-grayNaosei rounded-md px-3 py-2 text-gray2 text-sm 
            focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
          >
            <option value="" disabled hidden></option>
            <option>Acneica</option>
            <option>Oleosa</option>
            <option>Seca</option>
          </select>

          <label
            className="absolute left-3 top-1.5 text-gray3 text-sm transition-all 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray
            peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-purpledark"
          >
            Tipo de pele
          </label>

          {/* seta cinza (default) */}
          <img
            src={setaSelectCinza}
            alt="seta select"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 peer-focus:hidden"
          />

          {/* seta roxa (quando em foco) */}
          <img
            src={setaSelectPurple}
            alt="seta select focus"
            className="hidden peer-focus:block pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3"
          />
        </div>

        {/* Select Data */}
        <div className="relative w-[23%]">
          <select
            defaultValue=""
            id="data"
            className="peer w-full border border-grayNaosei rounded-md px-3 pt-5 p-2 text-sm text-gray1 
            focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
          >
            <option value="" disabled hidden></option>
            <option>2023/03/15</option>
            <option>2023/07/10</option>
          </select>

          <label
            htmlFor="data"
            className="absolute left-3 top-1.5 text-gray3 text-sm transition-all 
            peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray
            peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-purpledark"
          >
            Data
          </label>

          {/* seta cinza (default) */}
          <img
            src={setaSelectCinza}
            alt="seta select"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 peer-focus:hidden"
          />

          {/* seta roxa (quando em foco) */}
          <img
            src={setaSelectPurple}
            alt="seta select focus"
            className="hidden peer-focus:block pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3"
          />
        </div>

        {/* Botão Buscar */}
        <div className='w-[25%]'>
          <button className="bg-purpledark text-white font-medium px-5 py-2 rounded-md hover:bg-blue 
           hover:text-purpledark transition cursor-pointer">
            Buscar
          </button>
        </div>
      </div>

      <div className="bg-gren">
        aaa
      </div>
    </div>
  )
}

export default FolhaA;
