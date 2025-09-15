import React from "react";
import ProdutoCustomizavel from "../components/ProdutoCustomizavel";
import ProdutoComum from "../components/ProdutoComum";

function Produtos({ tipo }) {
  return (
    <div>
      {tipo === "customizavel" && <ProdutoCustomizavel />}
      {tipo === "comum" && <ProdutoComum />}
    </div>
  );
}

export default Produtos;
