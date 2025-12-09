import { useEffect, useState } from "react";
import iconLupa from "../assets/iconLupa.svg";
import setaSelectCinza from "../assets/setaSelectCinza.svg";
import setaSelectPurple from "../assets/setaSelectPurple.svg";

function FolhaA() {
  const [produtos, setProdutos] = useState([]);

  // estados dos filtros
  const [busca, setBusca] = useState("");
  const [filtroId, setFiltroId] = useState("");
  const [filtroPele, setFiltroPele] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const [filtrosAplicados, setFiltrosAplicados] = useState({
    busca: "",
    id: "",
    pele: "",
    data: "",
  });

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await fetch("http://localhost:3000/produtos/listar");
        const data = await response.json();
        // Só para garantir, normaliza nomes das props caso a API retorne com claves diferentes
        const normalize = data.map((p) => ({
          id: p.id ?? p.id_produto ?? p.ID ?? null,
          tipo_pele: p.tipo_pele ?? p.categoria ?? p.tipo ?? "",
          nome_produto: p.nome_produto ?? p.titulo_ ?? p.title ?? "",
          estoque: p.estoque ?? p.quantidade_estoque ?? p.qtd ?? 0,
          per_comu: p.per_comu ?? p.per_comu ?? p.personalizado ?? false,
          data_lancamento: p.data_lancamento ?? p.data ?? "",
        }));
        setProdutos(normalize);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }

    carregarProdutos();
  }, []);

  // --- helpers para gerar listas únicas de opções
  const uniqueIds = Array.from(new Set(produtos.map((p) => p.id))).filter(
    Boolean
  );
  const uniquePeles = Array.from(
    new Set(produtos.map((p) => p.tipo_pele))
  ).filter(Boolean);
  const uniqueDatas = Array.from(
    new Set(produtos.map((p) => p.data_lancamento))
  ).filter(Boolean);

  // --- normalização para busca
  const normalizeStr = (s = "") =>
    String(s)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  // Filtragem combinada
  const produtosFiltrados = produtos.filter((item) => {
    const buscaTexto = normalizeStr(filtrosAplicados.busca);
    const nome = normalizeStr(item.nome_produto);
    const idStr = item.id ? String(item.id) : "";
    const tipoPele = normalizeStr(item.tipo_pele);
    const data = String(item.data_lancamento ?? "");

    const correspondeBusca =
      filtrosAplicados.busca === "" ||
      nome.includes(buscaTexto) ||
      idStr.includes(buscaTexto);

    const correspondeId =
      filtrosAplicados.id === "" || idStr === filtrosAplicados.id;

    const correspondePele =
      filtrosAplicados.pele === "" ||
      normalizeStr(filtrosAplicados.pele) === tipoPele;

    const correspondeData =
      filtrosAplicados.data === "" || data === filtrosAplicados.data;

    return (
      correspondeBusca && correspondeId && correspondePele && correspondeData
    );
  });

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
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
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
            value={filtroId}
            onChange={(e) => setFiltroId(e.target.value)}
            className="peer w-full border border-gray3/50 rounded-md px-3 pt-5 text-gray1 text-sm 
            focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
          >
            <option value="" hidden></option>
            {uniqueIds.map((id) => (
              <option key={id} value={String(id)}>
                {id}
              </option>
            ))}
          </select>

          <label
            className="absolute left-3 top-1.5 text-gray3 text-sm transition-all 
            peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray
            peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-purpledark"
          >
            ID
          </label>

          <img
            src={setaSelectCinza}
            alt="seta select"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 peer-focus:hidden"
          />
          <img
            src={setaSelectPurple}
            alt="seta select focus"
            className="hidden peer-focus:block pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3"
          />
        </div>

        {/* Select Tipo de pele */}
        <div className="relative w-[23%]">
          <select
            value={filtroPele}
            onChange={(e) => setFiltroPele(e.target.value)}
            className="peer w-full border border-gray3/50 rounded-md px-3 pt-5 text-gray1 text-sm 
            focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
          >
            <option value="" hidden></option>
            {uniquePeles.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <label
            className="absolute left-3 top-1.5 text-gray3 text-sm transition-all 
            peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray
            peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-purpledark"
          >
            Tipo de pele
          </label>

          <img
            src={setaSelectCinza}
            alt="seta select"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 peer-focus:hidden"
          />
          <img
            src={setaSelectPurple}
            alt="seta select focus"
            className="hidden peer-focus:block pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3"
          />
        </div>

        {/* Select Data */}
        <div className="relative w-[23%]">
          <select
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
            className="peer w-full border border-gray3/50 rounded-md px-3 pt-5 text-sm text-gray1 
            focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
          >
            <option value="" hidden></option>
            {uniqueDatas.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <label
            htmlFor="data"
            className="absolute left-3 top-1.5 text-gray3 text-sm transition-all 
            peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray
            peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-purpledark"
          >
            Data
          </label>

          <img
            src={setaSelectCinza}
            alt="seta select"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 peer-focus:hidden"
          />
          <img
            src={setaSelectPurple}
            alt="seta select focus"
            className="hidden peer-focus:block pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3"
          />
        </div>

        {/* Botão Buscar */}
        <div className="flex w-[25%] h-[80%] gap-1.5 font-tertiary">
          <button
            onClick={() => {
              setFiltrosAplicados({
                busca,
                id: filtroId,
                pele: filtroPele,
                data: filtroData,
              });
            }}
            className="bg-purpledark flex items-center text-white text-sm font-medium px-4 py-4 rounded-md hover:bg-blue 
            hover:text-purpledark transition cursor-pointer"
          >
            Buscar
          </button>
          <button
            onClick={() => {
              setBusca("");
              setFiltroId("");
              setFiltroPele("");
              setFiltroData("");

              // Limpa os filtros aplicados → mostra todos os produtos
              setFiltrosAplicados({
                busca: "",
                id: "",
                pele: "",
                data: "",
              });
            }}
            className="bg-purpledark flex items-center text-white text-sm font-medium px-4 py-4 rounded-md hover:bg-blue 
            hover:text-purpledark transition cursor-pointer"
          >
            Limpar
          </button>
        </div>
      </div>

      <div className="w-full bg-white flex flex-col items-start gap-6 p-6 rounded-sm shadow-md">
        <h2 className="text-purpledark font-semibold text-lg">
          Folha de acompanhamento
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left text-gray3 border-separate border-spacing-y-1">
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

            <tbody>
              {produtosFiltrados.map((item) => (
                <tr key={item.id} className="">
                  <td className="px-6 py-4">ID {item.id}</td>
                  <td className="px-6 py-4">{item.tipo_pele}</td>
                  <td className="px-6 py-4">{item.nome_produto}</td>
                  <td className="px-6 py-4">{item.estoque}</td>
                  <td className="px-6 py-4">
                    {String(item.per_comu) === "true" || item.per_comu === true
                      ? "Personalizável"
                      : "Comum"}
                  </td>
                  <td className="px-6 py-4">{item.data_lancamento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FolhaA;