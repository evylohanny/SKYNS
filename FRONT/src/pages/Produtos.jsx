import React, { useEffect, useState } from "react";
import ProdutoCustomizavel from "../components/ProdutoCustomizavel";
import ProdutoComum from "../components/ProdutoComum";

function Produtos({ tipo }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await fetch(`http://localhost:3000/produtos?tipo=${tipo}`);
        const data = await res.json();
        setProdutos(data.data || []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProdutos();
  }, [tipo]);

  if (loading) return <p>Carregando produtos...</p>;

  if (produtos.length === 0) return <p>Nenhum produto encontrado.</p>;

  return (
    <div>
      {tipo === "customizavel" &&
        produtos.map((produto) => (
          <ProdutoCustomizavel key={produto.id} dados={produto} />
        ))}

      {tipo === "comum" &&
        produtos.map((produto) => (
          <ProdutoComum key={produto.id} dados={produto} />
        ))}
    </div>
  );
}

export default Produtos;
