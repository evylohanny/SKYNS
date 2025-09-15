import iconLupa from '../assets/iconLupa.svg';
import setaSelectCinza from '../assets/setaSelectCinza.svg';
import setaSelectPurple from '../assets/setaSelectPurple.svg';

function FolhaA() {
  return (
    <div className="w-[80%] h-[80vh] flex flex-col gap-10">
      <div className="w-full flex flex-col">
        <h1 className="text-gray2 font-secondary text-xl">Início</h1>
        <div className="flex font-primary text-gray2/50 gap-2">
          <p>login</p>
          <p>/</p>
          <p>Folha de acompanhamento</p>
        </div>
      </div>

      {/* Barra de filtros */}
      <div className="w-full bg-white flex font-secondary items-center gap-6 p-6 rounded-sm shadow-md">
        
        {/* Campo de busca */}
        <div className="relative w-[25%]">
          <input
            type="text"
            placeholder="Buscar"
            className="w-full border border-gray3/50 rounded-full pl-4 pr-10 py-2 text-gray2 text-sm font-semibold 
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
            id='id'
            className="peer w-full border border-gray3/50 rounded-md px-3 pt-5 p-2 text-gray1 text-sm 
            focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
          >
            <option value="" disabled hidden></option>
            <option>938595894</option>
          </select>

          <label
            className="absolute left-3 top-1.5 text-gray3 text-sm transition-all 
            peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray
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
            id='pele'
            className="peer w-full border border-gray3/50 rounded-md px-3 pt-5 p-2 text-gray1 text-sm 
            focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
          >
            <option value="" disabled hidden></option>
            <option>Acneica</option>
            <option>Oleosa</option>
            <option>Seca</option>
          </select>

          <label
            className="absolute left-3 top-1.5 text-gray3 text-sm transition-all 
            peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray
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
            className="peer w-full border border-gray3/50 rounded-md px-3 pt-5 p-2 text-sm text-gray1 
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
        <div className='w-[25%] font-tertiary'>
          <button className="bg-purpledark text-white font-medium px-5 py-2 rounded-md hover:bg-blue 
           hover:text-purpledark transition cursor-pointer">
            Buscar
          </button>
        </div>
      </div>

      <div className="w-full bg-white flex flex-col items-start gap-6 p-6 rounded-sm shadow-md">
        {/* Título */}
        <h2 className="text-purpledark font-semibold text-lg">
          Folha de acompanhamento
        </h2>

        {/* Tabela */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left text-gray3 border-separate border-spacing-y-1">
            {/* Cabeçalho */}
            <thead className="bg-grayNaosei/40 text-gray-500 text-xs text-gray2">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Tipo de pele</th>
                <th className="px-6 py-3">Nome do produto</th>
                <th className="px-6 py-3">Estoque</th>
                <th className="px-6 py-3">Per/Comu</th>
                <th className="px-6 py-3">Data lançamento</th>
              </tr>
            </thead>

            {/* Corpo */}
            <tbody>
              <tr className="">
                <td className="px-6 py-4">ID 2123123</td>
                <td className="px-6 py-4">Acneica</td>
                <td className="px-6 py-4">Sérum Rejuvenescedor Nocturne 45</td>
                <td className="px-6 py-4">5</td>
                <td className="px-6 py-4">Personalizável</td>
                <td className="px-6 py-4">06/08/2025</td>
              </tr>

              <tr className="">
                <td className="px-6 py-4">ID 2123123</td>
                <td className="px-6 py-4">Seca</td>
                <td className="px-6 py-4">Creme Firmador Diurno LiftingTime</td>
                <td className="px-6 py-4">5</td>
                <td className="px-6 py-4">Comum</td>
                <td className="px-6 py-4">06/08/2025</td>
              </tr>

              <tr className="">
                <td className="px-6 py-4">ID 2123123</td>
                <td className="px-6 py-4">Acneica</td>
                <td className="px-6 py-4">Sérum Rejuvenescedor Nocturne 45</td>
                <td className="px-6 py-4">20</td>
                <td className="px-6 py-4">Personalizável</td>
                <td className="px-6 py-4">06/08/2025</td>
              </tr>

              <tr className="">
                <td className="px-6 py-4">ID 2123123</td>
                <td className="px-6 py-4">Acneica</td>
                <td className="px-6 py-4">Sérum Rejuvenescedor Nocturne 45</td>
                <td className="px-6 py-4">5</td>
                <td className="px-6 py-4">Comum</td>
                <td className="px-6 py-4">06/08/2025</td>
              </tr>

              <tr className="">
                <td className="px-6 py-4">ID 2123123</td>
                <td className="px-6 py-4">Madura</td>
                <td className="px-6 py-4">Sérum Rejuvenescedor Nocturne 45</td>
                <td className="px-6 py-4">5</td>
                <td className="px-6 py-4">Comum</td>
                <td className="px-6 py-4">06/08/2025</td>
              </tr>

              <tr className="">
                <td className="px-6 py-4">ID 2123123</td>
                <td className="px-6 py-4">Acneica</td>
                <td className="px-6 py-4">Sérum Rejuvenescedor Nocturne 45</td>
                <td className="px-6 py-4">5</td>
                <td className="px-6 py-4">Personalizável</td>
                <td className="px-6 py-4">06/08/2025</td>
              </tr>

              <tr>
                <td className="px-6 py-4">ID 2123123</td>
                <td className="px-6 py-4">Oleosa</td>
                <td className="px-6 py-4">Sérum Rejuvenescedor Nocturne 45</td>
                <td className="px-6 py-4">15</td>
                <td className="px-6 py-4">Personalizável</td>
                <td className="px-6 py-4">06/08/2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FolhaA;
