import { useEffect, useState } from "react";
import iconLupa from "../assets/iconLupa.svg";
import setaSelectCinza from "../assets/setaSelectCinza.svg";
import setaSelectPurple from "../assets/setaSelectPurple.svg";
import lixo from "../assets/lixo.svg";
import pencil from "../assets/pencil.svg";
import exclamcao from "../assets/exclamcao.svg";

function FolhaA() {
  const [produtos, setProdutos] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [loading, setLoading] = useState(false);
  // Estados para as notificações
  const [notifications, setNotifications] = useState([]);

  // Estados para o modal de confirmação
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Estados para o modal de edição de estoque
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [newStock, setNewStock] = useState("");
  const [editing, setEditing] = useState(false);

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

  // Função para adicionar notificação
  const addNotification = (message, type = "success") => {
    const id = Date.now(); // ID único baseado no timestamp
    const newNotification = {
      id,
      message,
      type,
      visible: true,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Remove automaticamente após 5 segundos
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  // Função para remover notificação
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Função para carregar produtos
  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/produtos/listar");
      const data = await response.json();

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
      addNotification("Erro ao carregar produtos", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  // Fechar modal ao pressionar ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        if (showDeleteModal) {
          closeDeleteModal();
        }
        if (showEditModal) {
          closeEditModal();
        }
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showDeleteModal, showEditModal]);

  // Bloquear scroll do body quando modal estiver aberto
  useEffect(() => {
    if (showDeleteModal || showEditModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDeleteModal, showEditModal]);

  // Função para abrir modal de exclusão
  const openDeleteModal = (id, nome) => {
    setProductToDelete({ id, nome });
    setShowDeleteModal(true);
  };

  // Função para fechar modal de exclusão
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  // Função para abrir modal de edição de estoque
  const openEditModal = (id, nome, estoqueAtual) => {
    setProductToEdit({ id, nome, estoqueAtual });
    setNewStock(estoqueAtual.toString());
    setShowEditModal(true);
  };

  // Função para fechar modal de edição
  const closeEditModal = () => {
    setShowEditModal(false);
    setProductToEdit(null);
    setNewStock("");
    setEditing(false);
  };

  // Função para excluir produto (chamada após confirmação no modal)
  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/produtos/${productToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Remove o produto da lista localmente
        setProdutos((prevProdutos) =>
          prevProdutos.filter((p) => p.id !== productToDelete.id)
        );

        // Adiciona notificação de sucesso
        addNotification(
          `Produto "${productToDelete.nome}" excluído com sucesso!`,
          "success"
        );
      } else {
        addNotification(data.message || "Erro ao excluir produto", "error");
      }
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      addNotification("Erro de conexão com o servidor", "error");
    } finally {
      setLoading(false);
      closeDeleteModal();
    }
  };

  // Função para editar estoque
  const handleEditStock = async () => {
    if (!productToEdit || !newStock) return;

    // Validação básica no front-end
    const stockNumber = parseInt(newStock);
    if (isNaN(stockNumber) || stockNumber < 0) {
      addNotification("A quantidade de estoque deve ser um número não negativo", "error");
      return;
    }

    if (stockNumber === productToEdit.estoqueAtual) {
      addNotification("O estoque já está com esse valor", "info");
      closeEditModal();
      return;
    }

    try {
      setEditing(true);
      const response = await fetch(
        `http://localhost:3000/produtos/${productToEdit.id}/estoque`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantidade_estoque: stockNumber,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Atualiza o produto na lista localmente
        setProdutos((prevProdutos) =>
          prevProdutos.map((p) =>
            p.id === productToEdit.id
              ? { ...p, estoque: stockNumber }
              : p
          )
        );

        // Adiciona notificação de sucesso
        addNotification(
          `Estoque do produto "${productToEdit.nome}" atualizado para ${stockNumber} unidades!`,
          "success"
        );

        closeEditModal();
      } else {
        addNotification(data.message || "Erro ao atualizar estoque", "error");
      }
    // Na função handleEditStock(), ajuste o bloco catch:
} catch (error) {
  console.error("Erro ao atualizar estoque:", error);
  
  let errorMessage = "Erro de conexão com o servidor";
  
  if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
    errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão.";
  } else if (error.message.includes("404")) {
    errorMessage = "Produto não encontrado no servidor";
  } else if (error.message.includes("400")) {
    errorMessage = "Dados inválidos enviados para o servidor";
  } else if (error.message.includes("503")) {
    errorMessage = "Servidor de banco de dados indisponível";
  }
  
  addNotification(errorMessage, "error");
} finally {
  setEditing(false);
}
  };

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
    <>
      {/* Sistema de Notificações no canto superior direito */}
      <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`transform transition-all duration-300 ease-in-out ${
              notification.visible
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <div
              className={`rounded-lg shadow-lg p-4 flex items-start space-x-3 ${
                notification.type === "success"
                  ? "bg-green border-l-4 border-green"
                  : notification.type === "info"
                  ? "bg-blue border-l-4 border-blue"
                  : "bg-reddark border-l-4 border-reddark"
              }`}
            >
              {/* Ícone */}
              <div
                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                  notification.type === "success"
                    ? "bg-green text-greendark"
                    : notification.type === "info"
                    ? "bg-blue text-white"
                    : "bg-reddark text-white"
                }`}
              >
                {notification.type === "success" ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : notification.type === "info" ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              {/* Mensagem */}
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    notification.type === "success"
                      ? "text-greendark"
                      : notification.type === "info"
                      ? "text-white"
                      : "text-white"
                  }`}
                >
                  {notification.message}
                </p>
              </div>

              {/* Botão para fechar */}
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 text-gray2 hover:text-gray1 transition-colors cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeDeleteModal();
            }
          }}
        >
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <img src={exclamcao} alt="" className="w-15 h-15 mb-6" />
              <h3 className="text-2xl font-semibold text-gray1/80 mb-6">
                Excluir produto
              </h3>

              <div className="mb-6">
                <p className="text-gray1/80 text-base">
                  Atenção! Ao excluir o produto, todos os dados relacionados
                  serão permanentemente apagados.
                </p>
              </div>

              <div className="flex w-full justify-center gap-4 mt-5">
                <button
                  onClick={closeDeleteModal}
                  className="px-5 py-1 bg-purpledark text-white font-medium rounded-md 
            hover:bg-blue hover:text-purpledark transition-colors duration-200 cursor-pointer"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-5 py-1 bg-transparent text-purpledark font-medium rounded-md border-2 border-purpledark
            hover:border-transparent hover:bg-blue duration-200
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edição de estoque */}
      {showEditModal && productToEdit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeEditModal();
            }
          }}
        >
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-semibold text-gray1/80 mb-6">
                Editar Estoque
              </h3>

              <div className="mb-6 w-full text-left">
                <div className="mb-4">
                  <p className="text-gray1/70 text-sm mb-1">ID do Produto</p>
                  <p className="text-gray1 font-medium">{productToEdit.id}</p>
                </div>

                <div className="mb-4">
                  <p className="text-gray1/70 text-sm mb-1">Nome do Produto</p>
                  <p className="text-gray1 font-medium">{productToEdit.nome}</p>
                </div>

                <div className="mb-4">
                  <p className="text-gray1/70 text-sm mb-1">
                    Estoque Atual
                  </p>
                  <p className="text-gray1 font-medium">
                    {productToEdit.estoqueAtual} unidades
                  </p>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="newStock"
                    className="block text-gray1/70 text-sm mb-2"
                  >
                    Nova Quantidade de Estoque
                  </label>
                  <input
                    type="number"
                    id="newStock"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    min="0"
                    step="1"
                    className="w-full border border-gray3/50 rounded-md px-3 py-2 text-gray1 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer"
                    placeholder="Digite a nova quantidade"
                    disabled={editing}
                  />
                  <p className="text-gray3 text-xs mt-1">
                    Digite um número inteiro não negativo
                  </p>
                </div>
              </div>

              <div className="flex w-full justify-center gap-4 mt-5">
                <button
                  onClick={closeEditModal}
                  className="px-5 py-1 bg-purpledark text-white font-medium rounded-md 
            hover:bg-blue hover:text-purpledark transition-colors duration-200 cursor-pointer"
                  disabled={editing}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditStock}
                  className="px-5 py-1 bg-transparent text-purpledark font-medium rounded-md border-2 border-purpledark
            hover:border-transparent hover:bg-blue duration-200
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  disabled={editing || !newStock}
                >
                  {editing ? "Atualizando..." : "Atualizar Estoque"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

          {/* Botões */}
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

          {loading && produtosFiltrados.length === 0 ? (
            <div className="w-full text-center py-10">
              <p className="text-gray1/70">Carregando produtos...</p>
            </div>
          ) : produtosFiltrados.length === 0 ? (
            <div className="w-full text-center py-10">
              <p className="text-gray-500">Nenhum produto encontrado</p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left text-gray3 border-separate border-spacing-y-1">
                <thead className="bg-grayNaosei/40 text-xs text-gray2">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Tipo de pele</th>
                    <th className="px-6 py-3">Nome do produto</th>
                    <th className="px-6 py-3">Estoque</th>
                    <th className="px-6 py-3">Per/Comu</th>
                    <th className="px-6 py-3">Data lançamento</th>
                    <th className="px-8 py-3"></th>
                  </tr>
                </thead>

                <tbody>
                  {produtosFiltrados.map((item) => (
                    <tr
                      key={item.id}
                      className="relative hover:bg-gray-50 transition-colors duration-150"
                      onMouseEnter={() => setHoveredRow(item.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="px-6 py-4">ID {item.id}</td>
                      <td className="px-6 py-4">{item.tipo_pele}</td>
                      <td className="px-6 py-4">{item.nome_produto}</td>
                      <td className="px-6 py-4">{item.estoque}</td>
                      <td className="px-6 py-4">
                        {String(item.per_comu) === "true" ||
                        item.per_comu === true
                          ? "Personalizável"
                          : "Comum"}
                      </td>
                      <td className="px-6 py-4">{item.data_lancamento}</td>
                      <td className="">
                        {/* Ícones que aparecem apenas no hover */}
                        {hoveredRow === item.id && (
                          <div className="flex">
                            <button
                              onClick={() => openEditModal(item.id, item.nome_produto, item.estoque)}
                              className="p-2 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                              title="Editar Estoque"
                              disabled={loading || editing}
                            >
                              <img
                                src={pencil}
                                alt="Editar Estoque"
                                className="w-4 h-4"
                              />
                            </button>
                            <button
                              onClick={() =>
                                openDeleteModal(item.id, item.nome_produto)
                              }
                              className="p-2 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                              title="Excluir"
                              disabled={loading || editing}
                            >
                              <img
                                src={lixo}
                                alt="Excluir"
                                className="w-4 h-4"
                              />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FolhaA;