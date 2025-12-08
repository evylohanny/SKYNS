import React, { useEffect, useState } from "react";
import ProdutoCustomizavel from "../components/ProdutoCustomizavel";
import ProdutoComum from "../components/ProdutoComum";
import { useLocation } from "react-router-dom";
import ky from "ky";

function Produtos() {
  const location = useLocation();
  const { dados } = location.state || {};
  const [produto, setProduto] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const kyProdutos = async () => {
      try {
        console.log(dados.id_produto);
        const id = dados.id_produto;
        const res = await ky.get(`http://localhost:3000/produtos/${id}`).json();
        setProduto(res);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    kyProdutos();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;

  if (!produto) return <p>Nenhum produto encontrado.</p>;

  return (
    <div>
      {dados.personalizado &&
        <ProdutoCustomizavel dados={produto} />
      }

      {!dados.personalizado &&
        <ProdutoComum dados={produto} />
      }
    </div>
  );
}

export default Produtos;