import React, { useEffect, useState } from "react";
import ProdutoCustomizavel from "../components/ProdutoCustomizavel";
import ProdutoComum from "../components/ProdutoComum";
import { useLocation } from "react-router-dom";
import ky from "ky";

function Produtos() {
  const [produto, setProduto] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { tipo, id } = location.state;

  useEffect(() => {
    const kyProdutos = async () => {
      try {
        console.log(id);
        const res = await ky.get(`http://localhost:3000/produtos/${id}`).json();
        setProduto(res);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    kyProdutos();
  }, [tipo]);

  if (loading) return <p>Carregando produtos...</p>;

  if (!produto) return <p>Nenhum produto encontrado.</p>;

  return (
    <div>
      {tipo &&
        <ProdutoCustomizavel dados={produto} />
      }

      {!tipo &&
        <ProdutoComum dados={produto} />
      }
    </div>
  );
}

export default Produtos;
