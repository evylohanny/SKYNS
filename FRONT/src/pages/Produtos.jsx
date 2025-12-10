import React, { useEffect, useState } from "react";
import ProdutoCustomizavel from "../components/ProdutoCustomizavel";
import ProdutoComum from "../components/ProdutoComum";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ky from "ky";

function Produtos() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  
  // Tenta obter dados do state ou localStorage
  const [initialData, setInitialData] = useState(() => {
    const savedData = localStorage.getItem('currentProduct');
    return savedData ? JSON.parse(savedData) : (location.state?.dados || {});
  });
  
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        let idProduto;
        
        // Salva os dados iniciais no localStorage para recuperar após refresh
        if (initialData && initialData.id_produto) {
          localStorage.setItem('currentProduct', JSON.stringify(initialData));
          idProduto = initialData.id_produto;
        } 
        // Se não tem dados iniciais, tenta buscar da URL
        else if (params.id) {
          idProduto = params.id;
        } 
        else {
          throw new Error("ID do produto não encontrado");
        }

        console.log("Buscando produto com ID:", idProduto);
        const res = await ky.get(`http://localhost:3000/produtos/${idProduto}`).json();
        console.log("Produto encontrado:", res);
        
        // Se não tem dados iniciais mas encontrou produto, salva no localStorage
        if (!initialData && res) {
          localStorage.setItem('currentProduct', JSON.stringify({
            ...res,
            id_produto: idProduto
          }));
        }
        
        setProduto(res);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        // Limpa localStorage em caso de erro
        localStorage.removeItem('currentProduct');
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [initialData, params.id]);

  // Limpa localStorage ao sair da página
  useEffect(() => {
    return () => {
      localStorage.removeItem('currentProduct');
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purpledark"></div>
        <p className="ml-3 text-gray-600">Carregando produto...</p>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Produto não encontrado.</p>
        <button 
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-purpledark text-white rounded hover:bg-purpledark/90"
        >
          Ir para a página inicial
        </button>
      </div>
    );
  }

  // Função para determinar se o produto é personalizado
const isProdutoPersonalizado = (produtoData) => {
  // Verifica se há flag explícita
  if (produtoData?.personalizado === true) return true;
  
  // Verifica se tem componente não vazio
  if (produtoData?.componente && Array.isArray(produtoData.componente) && produtoData.componente.length > 0) {
    return true;
  }
  
  // Verifica se tem opções de customização
  if (produtoData?.opcoes_personalizacao && Object.keys(produtoData.opcoes_personalizacao).length > 0) {
    return true;
  }
  
  return false;
};

// No JSX
const isPersonalizado = isProdutoPersonalizado(produto);

  return (
    <div>
      {isPersonalizado ? (
        <ProdutoCustomizavel dados={produto} />
      ) : (
        <ProdutoComum dados={produto} />
      )}
    </div>
  );
}

export default Produtos;