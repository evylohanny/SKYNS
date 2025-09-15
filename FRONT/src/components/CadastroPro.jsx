import React, { useState } from "react";

function CadastroPro() {
  const [images, setImages] = useState([null, null, null, null, null]);
  const [quantidade, setQuantidade] = useState(1);
  const [descricao, setDescricao] = useState("");
  const [descricaoCompleta, setDescricaoCompleta] = useState("");
  const [produtoModificado, setProdutoModificado] = useState(false);
  const [componentes, setComponentes] = useState([]);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    const newImages = [...images];
    newImages[index] = url;
    setImages(newImages);
  };

  const handleCheckbox = (e) => {
    const value = e.target.value;
    setComponentes((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  return (
    <div className="w-[80%] h-[80vh] bg-white rounded-sm shadow p-10 flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Coluna Esquerda - Fotos */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-gray2">Fotos</h2>

          <div className="grid grid-cols-2 gap-3">
            {/* Foto Grande */}
            <label className="col-span-2 w-72 h-72 border border-dashed border-gray2 rounded-lg flex items-center justify-center cursor-pointer hover:border-purpledark">
              {images[0] ? (
                <img
                  src={images[0]}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <svg
                  className="w-6 h-6 text-purpledark"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, 0)}
              />
            </label>

            {/* Fotos Pequenas */}
            {images.slice(1).map((img, idx) => (
              <label
                key={idx}
                className="w-28 h-28 border border-dashed border-gray2 rounded-lg flex items-center justify-center cursor-pointer hover:border-purpledark"
              >
                {img ? (
                  <img
                    src={img}
                    alt={`preview-${idx}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <svg
                    className="w-6 h-6 text-purpledark"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, idx + 1)}
                />
              </label>
            ))}
          </div>

          <p className="text-xs text-gray2 mt-1">
            Adicione no mínimo três fotos para a publicação
          </p>
        </div>

        {/* Coluna Direita - Formulário */}
        <div className="flex flex-col gap-4">
          {/* Categoria */}
          <div>
            <label className="text-sm text-gray2">Categoria de peles</label>
            <select className="w-full border rounded-md px-3 py-2 text-sm outline-none border-gray2 focus:border-purpledark">
              <option value="">Selecione</option>
              <option>Pele seca</option>
              <option>Pele oleosa</option>
              <option>Pele mista</option>
            </select>
          </div>

          {/* Produto */}
          <div>
            <label className="text-sm text-gray2">Produto</label>
            <select className="w-full border rounded-md px-3 py-2 text-sm outline-none border-gray2 focus:border-purpledark">
              <option value="">Selecione</option>
              <option>Gel</option>
              <option>Sabonete</option>
              <option>Creme</option>
            </select>
          </div>

          {/* Título */}
          <div>
            <label className="text-sm text-gray2">Título</label>
            <input
              type="text"
              placeholder="Ex: gel clear new ultra UV"
              className="w-full border rounded-md px-3 py-2 text-sm outline-none border-gray2 focus:border-purpledark"
            />
          </div>

          {/* Estrelas */}
          <div>
            <label className="text-sm text-gray2">Estrelas</label>
            <select className="w-full border rounded-md px-3 py-2 text-sm outline-none border-gray2 focus:border-purpledark">
              <option value="">Selecione</option>
              <option>⭐</option>
              <option>⭐⭐</option>
              <option>⭐⭐⭐</option>
              <option>⭐⭐⭐⭐</option>
              <option>⭐⭐⭐⭐⭐</option>
            </select>
          </div>

          {/* Preço + Peso */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray2">Preço</label>
              <div className="flex items-center border rounded-md px-3 py-2 border-gray2 focus-within:border-purpledark">
                <span className="text-gray2 mr-1">R$</span>
                <input
                  type="number"
                  placeholder="0,00"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray2">Peso/kg</label>
              <input
                type="text"
                placeholder="ex: 300g"
                className="w-full border rounded-md px-3 py-2 text-sm outline-none border-gray2 focus:border-purpledark"
              />
            </div>
          </div>

          {/* Quantidade */}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray2">Quantidade produto</label>
            <div className="flex items-center border border-purpledark rounded-md px-2 py-1">
              <button
                className="px-2 text-purpledark"
                onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
              >
                −
              </button>
              <span className="px-3">{quantidade}</span>
              <button
                className="px-2 text-purpledark"
                onClick={() => setQuantidade(quantidade + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Breve descrição */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray2">Breve descrição</label>
              <span className="text-xs text-gray2">{descricao.length} até 70</span>
            </div>
            <textarea
              maxLength={70}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Escreva uma breve descrição para um campo pequeno"
              className="w-full border rounded-md px-3 py-2 text-sm outline-none border-gray2 focus:border-purpledark resize-none"
            />
          </div>
        </div>
      </div>

      {/* Descrição completa */}
      <div>
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray2">Descrição completa</label>
          <span className="text-xs text-gray2">{descricaoCompleta.length} até 350</span>
        </div>
        <textarea
          maxLength={350}
          value={descricaoCompleta}
          onChange={(e) => setDescricaoCompleta(e.target.value)}
          placeholder="Escreva uma descrição detalhada sobre o produto"
          className="w-full border rounded-md px-3 py-2 text-sm outline-none border-gray2 focus:border-purpledark resize-none"
          rows={4}
        />
      </div>

      {/* Linha divisória */}
      <hr className="border-gray2" />

      {/* Produto modificado */}
      <div className="flex items-center gap-2">
        <input
          type="radio"
          id="modificado"
          checked={produtoModificado}
          onChange={() => setProdutoModificado(!produtoModificado)}
          className="accent-purpledark w-4 h-4"
        />
        <label htmlFor="modificado" className="text-sm text-gray2">
          Produto modificado
        </label>
      </div>

      {/* Opções de componentes */}
      <div>
        <p className="text-sm text-gray2 mb-2">Opções de componentes</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray2">
          {[
            "retinol",
            "ácido mandélico",
            "vitamina c",
            "ácido glicólico",
            "ácido lático",
          ].map((item, idx) => (
            <label key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={item}
                checked={componentes.includes(item)}
                onChange={handleCheckbox}
                className="accent-purpledark w-4 h-4"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Botão Publicar */}
      <div className="flex justify-end">
        <button className="bg-purpledark hover:bg-blue hover:text-purpledark text-white px-6 py-2 rounded-md 
         text-sm font-medium transition">
          PUBLICAR PRODUTO
        </button>
      </div>
    </div>
  );
}

export default CadastroPro;
