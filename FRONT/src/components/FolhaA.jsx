import iconLupa from '../assets/iconLupa.svg';

function FolhaA() {
  return (
    <div className="w-[70%] flex flex-col gap-10">
      <div className="w-full flex flex-col">
        <h1 className="text-gray2 font-secondary text-xl">Início</h1>
        <div className="flex font-primary text-gray2/50 gap-2">
          <p>login</p>
          <p>/</p>
          <p>Folha de acompanhamento</p>
        </div>
      </div>
      {/* Barra de filtros */}
      <div className="bg-white flex items-center gap-6 p-6 rounded-sm shadow-md">
        
        {/* Campo de busca */}
        <div className="relative w-[23%]">
          <input
            type="text"
            placeholder="Buscar"
            className="w-full border border-grayNaosei rounded-full pl-4 pr-10 py-2 text-gray2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purpledark"
          />
          <img
            src={iconLupa}
            alt="Buscar"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray2"
          />
        </div>

        {/* Select ID */}
        <div className="w-[23%]">
          <select className="w-full border border-grayNaosei rounded-md px-3 py-2 text-gray2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purpledark">
            <option>ID</option>
            <option>938595894</option>
          </select>
        </div>

        {/* Select Tipo de pele */}
        <div className="w-[23%]">
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option>Tipo de pele</option>
            <option>Acneica</option>
            <option>Oleosa</option>
            <option>Seca</option>
          </select>
        </div>

        {/* Select Data */}
        <div className="w-[23%]">
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option>Data</option>
            <option>2023/03/15</option>
            <option>2023/07/10</option>
          </select>
        </div>

        {/* Botão Buscar */}
        <div className='w-[27%]'>
          <button className="bg-purpledark text-white font-medium px-5 py-2 rounded-md">
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

export default FolhaA
