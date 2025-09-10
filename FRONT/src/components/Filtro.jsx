import { useState, useEffect, useRef } from "react";

function Filtro({ limiteRef }) {
  const filtroRef = useRef(null);
  const [top, setTop] = useState(50);

  useEffect(() => {
    const handleScroll = () => {
      if (!filtroRef.current || !limiteRef.current) return;

      const filtroHeight = filtroRef.current.offsetHeight;
      const limiteTop = limiteRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollY = window.scrollY;

      const maxTop = limiteTop - filtroHeight - 20; 
      setTop(Math.min(50, maxTop - scrollY));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, [limiteRef]);

  return (
    <div
      ref={filtroRef}
      className="flex flex-col items-center w-[20%] font-secondary fixed h-auto overflow-y-auto p-4 pt-36"
      style={{ top: `${top}px` }}
    >
      <div className="flex flex-col text-blackwhite/80 gap-5 pb-5 w-full">
        <div className="border-2 border-blue p-2 w-60 rounded-full">
          <h1 className="font-semibold text-sm text-blackwhite/80 pl-2">Tipo de pele</h1>
        </div>
        <div className="flex flex-row pl-5">
          <p>Acneica</p>
        </div>
      </div>

      <div className="flex flex-col text-blackwhite/80 gap-4 font-medium w-full">
        <div className="border-2 border-blue p-2 w-60 rounded-full">
          <h1 className="font-semibold text-sm text-blackwhite/80 pl-2">Componentes</h1>
        </div>
        {["Retinol", "Ácido Glicólico", "Vitamina C", "Ácido Mandélico", "Ácido Lático"].map(
          (item, index) => (
            <label key={index} className="flex items-center pl-5 gap-2 cursor-pointer">
              <input type="checkbox" className="peer hidden" id={`checkbox-${index}`} />
              <div className="w-4 h-4 rounded-sm border-2 border-black/30 peer-checked:bg-purpledark peer-checked:border-none flex items-center justify-center"></div>
              <p>{item}</p>
            </label>
          )
        )}
      </div>
    </div>
  );
}

export default Filtro;
