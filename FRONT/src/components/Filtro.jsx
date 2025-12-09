import { useState, useEffect, useRef } from "react";

function Filtro({ limiteRef, selecionados, toggleComponente, componentes = [], categoria = "Acneica" }) {
  const filtroRef = useRef(null);
  const [top, setTop] = useState(50);

  useEffect(() => {
    const handleScroll = () => {
      if (!filtroRef.current || !limiteRef.current) return;

      const filtroHeight = filtroRef.current.offsetHeight;
      const limiteTop =
        limiteRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollY = window.scrollY;

      const maxTop = limiteTop - filtroHeight - 20;
      setTop(Math.min(50, maxTop - scrollY));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [limiteRef]);

  const combinacoesToxicas = {
    Retinol: ["Ácido Glicólico", "Ácido Mandélico", "Ácido Lático", "Vitamina C"],
    "Ácido Glicólico": ["Retinol", "Vitamina C"],
    "Ácido Mandélico": ["Retinol", "Vitamina C"],
    "Ácido Lático": ["Retinol", "Vitamina C"],
    "Vitamina C": ["Retinol", "Ácido Glicólico", "Ácido Mandélico", "Ácido Lático"],
  };

  return (
    <div
      ref={filtroRef}
      className="flex flex-col items-center w-[20%] font-secondary fixed h-auto overflow-y-auto p-4 pt-36"
      style={{ top: `${top}px` }}
    >
      <div className="flex flex-col text-blackwhite/80 gap-5 pb-5 w-full">
        <div className="border-2 border-blue p-2 w-60 rounded-full">
          <h1 className="font-semibold text-sm text-blackwhite/80 pl-2">
            Tipo de pele
          </h1>
        </div>
        <div className="flex flex-row pl-5">
          <p>{categoria}</p>
        </div>
      </div>

      <div className="flex flex-col text-blackwhite/80 gap-4 font-medium w-full">
        <div className="border-2 border-blue p-2 w-60 rounded-full">
          <h1 className="font-semibold text-sm text-blackwhite/80 pl-2">
            Componentes
          </h1>
        </div>

        {componentes.map((item, index) => {
          const conflitos = combinacoesToxicas[item] || [];
          const conflitoAtivo = selecionados.some((sel) => conflitos.includes(sel));

          return (
            <label
              key={index}
              className={`flex items-center pl-5 gap-2 cursor-pointer ${conflitoAtivo ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <input
                type="checkbox"
                className="peer hidden"
                checked={selecionados.includes(item)}
                onChange={() => !conflitoAtivo && toggleComponente(item)}
                disabled={conflitoAtivo}
              />
              <div className="w-4 h-4 rounded-sm border-2 border-black/30 peer-checked:bg-purpledark peer-checked:border-none flex items-center justify-center"></div>
              <p>{item}</p>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default Filtro;
