function Filtro() {
  return (
    <div className="flex flex-col w-50 font-secondary">
      <div className="flex flex-col text-blackwhite/80 gap-5 pb-5 sticky top-20">
        <div className="border-2 border-blue p-2 w-full rounded-full">
          <h1 className="font-semibold text-sm text-blackwhite/80 pl-2">Tipo de pele</h1>
        </div>
        
        <div className="flex flex-row pl-5">
          <p>Acneica</p>
        </div>
     
        <div className="flex flex-col text-blackwhite/80 gap-4 font-medium">
          <div className="border-2 border-blue p-2 w-full rounded-full">
            <h1 className="font-semibold text-sm text-blackwhite/80 pl-2">Componentes</h1>
          </div>
          
          {["Acneica", "Oleosa", "Seca", "Madura"].map((item, index) => (
            <label key={index} className="flex items-center pl-5 gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                id={`checkbox-${index}`}
              />
              <div className="w-4 h-4 rounded-sm border-2 border-black/30 peer-checked:bg-purpledark peer-checked:border-none relative flex items-center justify-center">
                <svg 
                  className="w-3 h-3 text-white hidden peer-checked:block" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>{item}</p>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filtro;