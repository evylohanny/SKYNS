import React, { useState } from "react";
import cameraRoxa from "../assets/cameraRoxa.svg";
import setaSelectCinza from '../assets/setaSelectCinza.svg';
import setaSelectPurple from '../assets/setaSelectPurple.svg';

function CadastroPro() {
  const [images, setImages] = useState([null, null, null, null, null]);
  const [quantidade, setQuantidade] = useState(1);
  const [descricao, setDescricao] = useState("");
  const [descricaoCompleta, setDescricaoCompleta] = useState("");
  const [produtoModificado, setProdutoModificado] = useState(false);
  const [componentes, setComponentes] = useState([]);

  // ====== Funções ======
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

  const handleSubmit = async () => {
  const formData = new FormData();
  
  // adiciona imagens
  images.forEach((img, i) => {
    if (img instanceof File) formData.append('imagens', img);
  });

  // adiciona os outros campos
  formData.append('categoria', categoria);
  formData.append('produto', produto);
  formData.append('titulo', titulo);
  formData.append('estrelas', estrelas);
  formData.append('quantidade', quantidade);
  formData.append('preco', preco);
  formData.append('peso', peso);
  formData.append('descricao', descricao);
  formData.append('descricaoCompleta', descricaoCompleta);
  formData.append('produtoModificado', produtoModificado);
  formData.append('componentes', JSON.stringify(componentes));

  const res = await fetch('http://localhost:5000/api/produtos/cadastro', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  console.log(data);
  };

  // ====== Render ======
  return (
    <div className="w-[80%] min-h-screen bg-white rounded-sm shadow p-10 flex flex-col">
      <div className="flex flex-row w-full gap-15">
        
        {/* ===================== COLUNA ESQUERDA - FOTOS ===================== */}
        <div className="flex flex-col gap-2 w-[40%]">
          <h2 className="font-semibold text-gray2/80 font-secondary">Fotos</h2>

          {/* Grid de Fotos */}
          <div className="grid grid-cols-2 gap-x-0 gap-y-3 w-[70%]">
            {/* Foto Grande */}
            <label className="relative col-span-2 w-59 h-59 border border-dashed border-gray2 rounded-lg flex items-center justify-center cursor-pointer hover:border-purpledark">
              {images[0] ? (
                <div className="relative w-full h-full">
                  <img
                    src={images[0]}
                    alt="preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* Botão remover */}
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = [...images];
                      newImages[0] = null;
                      setImages(newImages);
                    }}
                    className="absolute top-1 right-1 bg-purpledark text-white w-6 h-6 flex items-center justify-center rounded-full text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <img
                  src={cameraRoxa}
                  alt="camera icon"
                  className="w-8 h-8 opacity-80"
                />
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
              className="relative w-full max-w-[110px] aspect-square border border-dashed border-gray2 rounded-lg flex items-center justify-center cursor-pointer hover:border-purpledark"
            >
              {img ? (
                <div className="relative w-full h-full">
                  <img
                    src={img}
                    alt={`preview-${idx}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* Botão remover */}
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = [...images];
                      newImages[idx + 1] = null;
                      setImages(newImages);
                    }}
                    className="absolute top-1 right-1 bg-purpledark text-white w-5 h-5 flex items-center justify-center rounded-full text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <img
                  src={cameraRoxa}
                  alt="camera icon"
                  className="w-5 h-5 opacity-80"
                />
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

          {/* Texto informativo */}
          <p className="font-semibold text-sm text-gray3/60 mt-1">
            Adicione no mínimo três fotos para a publicação
          </p>
        </div>

        {/* ===================== COLUNA DIREITA - FORMULÁRIO ===================== */}
        <div className="flex flex-col gap-4 w-[60%] font-secondary">
          
          {/* Categoria */}
          <div className="flex flex-col gap-4 relative">
            <label className="font-semibold text-gray2/80 ">Categoria de peles</label>
            <select className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
             focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none">
              <option value="">Selecione</option>
              <option>Pele seca</option>
              <option>Pele oleosa</option>
              <option>Pele acneica</option>
              <option>Pele madura</option>
            </select>
               <img
                  src={setaSelectCinza}
                  alt="seta select"
                  className="pointer-events-none absolute right-3 top-15 -translate-y-1/2 w-3 h-3 peer-focus:hidden"
               />
               <img
                  src={setaSelectPurple}
                  alt="seta select focus"
                  className="hidden peer-focus:block pointer-events-none absolute right-3 top-15 -translate-y-1/2 w-3 h-3"
                />
          </div>

          {/* Produto */}
          <div className="flex flex-col gap-4 relative">
            <label className="font-semibold text-gray2/80">Produto</label>
            <select className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
             focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none">
              <option value="">Selecione</option>
              <option>Gel</option>
              <option>Sabonete</option>
              <option>Creme</option>
            </select>
               <img
                  src={setaSelectCinza}
                  alt="seta select"
                  className="pointer-events-none absolute right-3 top-15 -translate-y-1/2 w-3 h-3 peer-focus:hidden"
               />
               <img
                  src={setaSelectPurple}
                  alt="seta select focus"
                  className="hidden peer-focus:block pointer-events-none absolute right-3 top-15 -translate-y-1/2 w-3 h-3"
                />
          </div>

          {/* Título */}
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-gray2/80">Título</label>
            <input
              type="text"
              placeholder="Ex: gel clear new ultra UV"
              className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
             focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Estrelas */}
            <div className="flex flex-col gap-4 relative">
              <label className="font-semibold text-gray2/80">Estrelas</label>
              <select className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
              focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none">
                <option value="">Selecione</option>
                <option>⭐</option>
                <option>⭐⭐</option>
                <option>⭐⭐⭐</option>
                <option>⭐⭐⭐⭐</option>
                <option>⭐⭐⭐⭐⭐</option>
              </select>
                <img
                    src={setaSelectCinza}
                    alt="seta select"
                    className="pointer-events-none absolute right-3 top-15 -translate-y-1/2 w-3 h-3 peer-focus:hidden"
                />
                <img
                    src={setaSelectPurple}
                    alt="seta select focus"
                    className="hidden peer-focus:block pointer-events-none absolute right-3 top-15 -translate-y-1/2 w-3 h-3"
                  />
            </div>

            {/* Quantidade */}
            <div className="flex flex-col items-end gap-4">
              <label className="font-semibold text-gray2/80">Quantidade produto</label>
              <div className="flex w-38 justify-center items-center border border-purpledark rounded-md px-2 py-1">
                <button
                  className="px-2 text-purpledark cursor-pointer"
                  onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                >
                  −
                </button>
                <span className="px-3 text-purpledark">{quantidade}</span>
                <button
                  className="px-2 text-purpledark cursor-pointer"
                  onClick={() => setQuantidade(quantidade + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Preço + Peso */}
          <div className="grid grid-cols-2 gap-4">
            {/* Preço */}
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-gray2/80">Preço</label>
              <div className="flex items-center peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
               focus-within:outline-none focus-within:ring-2 focus-within:ring-purpledark cursor-pointer">
                <span className="text-gray2/80 mr-1">R$</span>
                <input
                  type="number"
                  placeholder=""
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Peso */}
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-gray2/80">Peso/kg</label>
              <input
                type="text"
                placeholder="Ex: 300g"
                className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
                 focus-within:outline-none focus-within:ring-2 focus-within:ring-purpledark cursor-pointer"
              />
            </div>
          </div>

          {/* Breve descrição */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-gray2/80">Breve descrição</label>
              <span className="font-semibold text-gray2/80">
                {descricao.length} até 70
              </span>
            </div>
            <textarea
              maxLength={70}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Escreva uma breve descrição para um campo pequeno"
              className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
                focus-within:outline-none focus-within:ring-2 focus-within:ring-purpledark cursor-pointer resize-none"
            />
          </div>

          {/* Descrição completa */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-gray2/80">Descrição completa</label>
              <span className="font-semibold text-gray2/80">
                {descricaoCompleta.length} até 350
              </span>
            </div>
            <textarea
              maxLength={350}
              value={descricaoCompleta}
              onChange={(e) => setDescricaoCompleta(e.target.value)}
              placeholder="Escreva uma descrição detalhada sobre o produto"
              className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
                focus-within:outline-none focus-within:ring-2 focus-within:ring-purpledark cursor-pointer resize-none"
              rows={4}
            />
          </div>

          {/* Linha divisória */}
          <hr className="border-gray2/50 mt-7 mb-7"/>

          {/* Produto modificado */}
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="modificado"
              checked={produtoModificado}
              onChange={() => setProdutoModificado(!produtoModificado)}
              className="w-6 h-6 rounded-full appearance-none border-2 border-purpledark
                        checked:bg-purpledark checked:border-purpledark"
            />
            <label htmlFor="modificado" className="font-semibold text-gray2/80">
              Produto modificado
            </label>
          </div>

          {/* Opções de componentes */}
          <div>
            <p className="font-semibold text-gray2/80 mb-4">Opções de componentes</p>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray1">
              {[
                "retinol",
                "ácido mandélico",
                "vitamina c",
                "ácido glicólico",
                "ácido lático",
              ].map((item, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-2 ${
                    !produtoModificado ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    value={item}
                    checked={componentes.includes(item)}
                    onChange={handleCheckbox}
                    disabled={!produtoModificado}
                    className="appearance-none w-5 h-5 border-2 border-purpledark rounded-md 
                      checked:bg-purpledark transition-colors duration-200 cursor-pointer
                      disabled:cursor-not-allowed disabled:border-gray-300 disabled:checked:bg-gray-400"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Botão Publicar */}
          <div className="flex justify-end">
            <button onClick={handleSubmit()} className="bg-purpledark cursor-pointer hover:bg-blue hover:text-purpledark text-white px-6 py-2 
             rounded-md text-sm transition">
              PUBLICAR PRODUTO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroPro;
