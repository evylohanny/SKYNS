import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

function Results() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";

  // simulação de resultados (depois você pode trocar por uma API ou lista)
  const produtos = [
    "Creme para Pele Seca",
    "Gel Antiacne",
    "Hidratante Facial",
    "Protetor Solar",
    "Sérum Anti-idade",
  ];

  const filtrados = produtos.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-fit w-full flex flex-col items-center mt-10">
      <NavBar search={search} />

      <div className="mt-5 flex flex-col gap-3">
        {filtrados.length <= 0 || !search ? (
          <p className="text-gray-500 mt-3">Nenhum resultado encontrado.</p>
        ) : (
          <>
          <h2 className="text-xl font-semibold">
            Resultados para: <span className="text-purpledark">"{search}"</span>
          </h2>
          {

            filtrados.map((item, index) => (
              <div
              key={index}
              className="p-3 border rounded-lg shadow hover:bg-purple-50 transition-colors cursor-pointer"
              >
              {item}
            </div>
          ))
        }
          </>
        )}
      </div>
    </div>
  );
}

export default Results;