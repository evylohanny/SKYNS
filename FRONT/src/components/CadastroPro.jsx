import React, { useState } from "react";
import cameraRoxa from "../assets/cameraRoxa.svg";
import setaSelectCinza from '../assets/setaSelectCinza.svg';
import setaSelectPurple from '../assets/setaSelectPurple.svg';
import Checkroxinho from '../assets/Checkroxinho.svg';
import Failroxinho from '../assets/Failroxinho.svg';

function CadastroPro() {
  // imagens: cada item = { file, url } ou null
  const [images, setImages] = useState([null, null, null, null, null]);

  // formulário
  const [quantidade, setQuantidade] = useState(1);
  const [breveDescricao, setBreveDescricao] = useState("");
  const [completaDescricao, setCompletaDescricao] = useState("");
  const [personalizado, setPersonalizado] = useState(false);
  // const [componentes, setComponentes] = useState([]);

  // novos estados para inputs/ selects
  const [titulo_, setTitulo_] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState(""); // "Gel", "Sabonete", etc
  const [quantidadeEstrelas, setQuantidadeEstrelas] = useState(""); // 1 a 5 ou string
  const [preco, setPreco] = useState("");
  const [peso, setPeso] = useState("");
  const [quantidadeMinima, setQuantidadeMinima] = useState(1);

  const [sending, setSending] = useState(false);

  const [errors, setErrors] = useState({});

  const [SuccessModal, setSuccessModal] = useState(false);
  const [FailModal, setFailModal] = useState(false);

  // ====== Funções ======
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newImages = [...images];
    newImages[index] = { file, url };
    setImages(newImages);
  };

  // const handleCheckbox = (e) => {
  //   const value = e.target.value;
  //   setComponentes((prev) =>
  //     prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
  //   );
  // };

  // ====== Função de envio ======
  const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔥 nova validação dentro do handleSubmit
  const newErrors = {};

  if (!categoria) newErrors.categoria = "Selecione uma categoria.";
  if (!tipo) newErrors.tipo = "Selecione o tipo de produto.";
  if (!titulo_.trim()) newErrors.titulo_ = "O título é obrigatório.";

  if (!preco || Number(preco) <= 0)
    newErrors.preco = "Informe um preço válido.";

  if (!peso.trim())
    newErrors.peso = "Informe o peso.";

  if (!breveDescricao.trim())
    newErrors.breveDescricao = "Escreva a breve descrição.";

  if (!completaDescricao.trim())
    newErrors.completaDescricao = "Escreva a descrição completa.";

  if (!quantidadeEstrelas)
    newErrors.quantidadeEstrelas = "Selecione a quantidade de estrelas.";

  if (images.filter(img => img !== null).length < 3)
    newErrors.images = "Adicione no mínimo três fotos para a publicação";

  // aplica erros no estado
  setErrors(newErrors);

  // se der erro, para tudo
  if (Object.keys(newErrors).length > 0) {
    return;
  }

  // 🔁 evita envio duplo
  if (sending) return;
  setSending(true);

  try {
    const produtoData = {
      titulo_: titulo_,
      quantidade_estoque: Number(quantidade),
      preco: preco,
      breve_descricao: breveDescricao,
      completa_descricao: completaDescricao,
      quantidade_estrelas: quantidadeEstrelas ? Number(quantidadeEstrelas) : 0,
      categoria: categoria,
      peso: Number(peso),
      personalizado: personalizado,
      quantidade_minima: Number(quantidadeMinima),
      data_lancamento: new Date().toISOString(),
      tipo: tipo,
    };

    const res = await fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produtoData),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => null);
      throw new Error(`Erro ao cadastrar produto: ${res.status} ${txt || ''}`);
    }

    const data = await res.json();
    const idProduto = data.id_produto || data.id || data.insertId;

    if (!idProduto) {
      throw new Error("ID do produto não retornado pelo servidor.");
    }

    // envio das fotos
    const fotosValidas = images
      .map((item, index) => item ? { ...item, posicao: index } : null)
      .filter(Boolean);

    for (const foto of fotosValidas) {
      await fetch(`http://localhost:3000/produtos/${idProduto}/foto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: foto.url,
          posicao: foto.posicao,
          fk_id_produto: idProduto,
        }),
      });
    }

    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      window.location.reload()
    }, 3000);

  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    setFailModal(true);
    setTimeout(() => {
      setFailModal(false);
      window.location.reload()
    }, 3000);
  } finally {
    setSending(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="w-[80%] min-h-screen bg-white rounded-sm shadow p-10 flex flex-col">
      <div className="flex flex-row w-full gap-15">
        {/* ===================== COLUNA ESQUERDA - FOTOS ===================== */}
        <div className="flex flex-col gap-2 w-[40%]">
          <h2 className="font-semibold text-gray2/80 font-secondary">Fotos</h2>

          <div className="grid grid-cols-2 gap-x-0 gap-y-3 w-[70%]">
            {/* Foto grande */}
            <label className="relative col-span-2 w-59 h-59 border border-dashed border-gray2 rounded-lg flex items-center justify-center cursor-pointer hover:border-purpledark">
              {images[0] ? (
                <div className="relative w-full h-full">
                  <img src={images[0].url} alt="preview" className="w-full h-full object-cover rounded-lg" />
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
                <img src={cameraRoxa} alt="camera icon" className="w-8 h-8 opacity-80" />
              )}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 0)} />
            </label>

            {/* Fotos pequenas */}
            {images.slice(1).map((img, idx) => (
              <label
                key={idx}
                className="relative w-full max-w-[110px] aspect-square border border-dashed border-gray2 rounded-lg flex items-center justify-center cursor-pointer hover:border-purpledark"
              >
                {img ? (
                  <div className="relative w-full h-full">
                    <img src={img.url} alt={`preview-${idx}`} className="w-full h-full object-cover rounded-lg" />
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
                  <img src={cameraRoxa} alt="camera icon" className="w-5 h-5 opacity-80" />
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, idx + 1)} />
              </label>
            ))}
          </div>
          <div
            className={`text-purpledark w-4/6 h-4 text-sm transition-opacity duration-500 ${
              errors.images ? "opacity-100" : "opacity-0"
            }`}
          >
            <p>{errors.images || ""}</p>
          </div>
        </div>

        {/* ===================== COLUNA DIREITA - FORMULÁRIO ===================== */}
        <div className="flex flex-col gap-4 w-[60%] font-secondary">
          {/* Categoria (select) */}
          <div className="flex flex-col gap-2 relative">
            <label className="font-semibold text-gray2/80">Categoria de peles</label>
            <select
              value={categoria}
              onChange={(e) => {
                setCategoria(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  categoria: "",
                }));
              }}
              className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50 focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
            >
              <option value="">Selecione</option>
              <option value="Pele seca">Pele seca</option>
              <option value="Pele oleosa">Pele oleosa</option>
              <option value="Pele acneica">Pele acneica</option>
              <option value="Pele madura">Pele madura</option>
            </select>
            <img src={setaSelectCinza} alt="seta select" className="pointer-events-none absolute right-3 top-13 -translate-y-1/2 w-3 h-3 peer-focus:hidden" />
            <img src={setaSelectPurple} alt="seta select focus" className="hidden peer-focus:block pointer-events-none absolute right-3 top-13 -translate-y-1/2 w-3 h-3" />
          <div
            className={`text-purpledark w-4/6 h-4 text-sm transition-opacity duration-500 ${
              errors.categoria ? "opacity-100" : "opacity-0"
            }`}
          >
            <p>{errors.categoria || ""}</p>
          </div>
          </div>

          {/* Produto / Tipo (select) */}
          <div className="flex flex-col gap-2 relative">
            <label className="font-semibold text-gray2/80">Produto</label>
            <select
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  tipo: "",
                }));
              }}
              className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50 focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
            >
              <option value="">Selecione</option>
              <option value="Sérum">Sérum</option>
              <option value="Gel">Gel</option>
              <option value="Máscara">Máscara</option>
            </select>
            <img src={setaSelectCinza} alt="seta select" className="pointer-events-none absolute right-3 top-13 -translate-y-1/2 w-3 h-3 peer-focus:hidden" />
            <img src={setaSelectPurple} alt="seta select focus" className="hidden peer-focus:block pointer-events-none absolute right-3 top-13 -translate-y-1/2 w-3 h-3" />
          <div
            className={`text-purpledark w-4/6 h-4 text-sm transition-opacity duration-500 ${
              errors.tipo ? "opacity-100" : "opacity-0"
            }`}
          >
            <p>{errors.tipo || ""}</p>
          </div>
          </div>

          {/* Título */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray2/80">Título</label>
            <input
              type="text"
              value={titulo_}
              onChange={(e) => {
                setTitulo_(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  titulo_: "",
                }));
              }}
              placeholder="Ex: gel clear new ultra UV"
              className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
              focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
            />
            <div
              className={`text-purpledark w-4/6 h-4 text-sm transition-opacity duration-500 ${
                errors.titulo_ ? "opacity-100" : "opacity-0"
              }`}
            >
              <p>{errors.titulo_ || ""}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Estrelas (select) */}
            <div className="flex flex-col gap-2 relative">
              <label className="font-semibold text-gray2/80">Estrelas</label>
              <select
                value={quantidadeEstrelas}
                onChange={(e) => {
                  setQuantidadeEstrelas(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    quantidadeEstrelas: "",
                  }));
                }}
                className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50 focus:outline-none focus:ring-2 focus:ring-purpledark cursor-pointer appearance-none"
              >
                <option value="">Selecione</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
              </select>
              <img src={setaSelectCinza} alt="seta select" className="pointer-events-none absolute right-3 top-13 -translate-y-1/2 w-3 h-3 peer-focus:hidden" />
              <img src={setaSelectPurple} alt="seta select focus" className="hidden peer-focus:block pointer-events-none absolute right-3 top-13 -translate-y-1/2 w-3 h-3" />
            <div
              className={`text-purpledark min-w-1/5 h-4 text-sm transition-opacity duration-500 ${
                errors.quantidadeEstrelas ? "opacity-100" : "opacity-0"
              }`}
            >
              <p>{errors.quantidadeEstrelas || ""}</p>
            </div>
            </div>

            {/* Quantidade */}
            <div className="flex flex-col items-end gap-2">
              <label className="font-semibold text-gray2/80">Quantidade produto</label>
              <div className="flex w-38 justify-center items-center border border-purpledark rounded-md px-2 py-1.5">
                <button
                  type="button"
                  className="px-2 text-purpledark cursor-pointer"
                  onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                >
                  −
                </button>
                <span className="px-3 text-purpledark">{quantidade}</span>
                <button
                  type="button"
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
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray2/80">Preço</label>
              <div className="flex items-center peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
               focus-within:outline-none focus-within:ring-2 focus-within:ring-purpledark cursor-pointer">
                <span className="text-gray2/80 mr-1">R$</span>
                <input
                  type="number"
                  value={preco}
                  onChange={(e) => {
                    setPreco(e.target.value);

                    setErrors((prev) => ({
                      ...prev,
                      preco: "",
                    }));
                  }}
                  placeholder=""
                  className="w-full outline-none text-sm"
                />
              </div>
            <div
              className={`text-purpledark w-4/6 h-4 text-sm transition-opacity duration-500 ${
                errors.preco ? "opacity-100" : "opacity-0"
              }`}
            >
              <p>{errors.preco || ""}</p>
            </div>
            </div>

            {/* Peso */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray2/80">Peso/kg</label>
              <input
                type="text"
                value={peso}
                onChange={(e) => {
                  setPeso(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    peso: "",
                  }));
                }}
                placeholder="Ex: 300g"
                className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
                 focus-within:outline-none focus-within:ring-2 focus-within:ring-purpledark cursor-pointer"
              />
            <div
              className={`text-purpledark w-4/6 h-4 text-sm transition-opacity duration-500 ${
                errors.peso ? "opacity-100" : "opacity-0"
              }`}
            >
              <p>{errors.peso || ""}</p>
            </div>
            </div>
          </div>

          {/* Breve descrição */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-gray2/80">Breve descrição</label>
              <span className="font-semibold text-gray2/80">{breveDescricao.length} até 70</span>
            </div>
            <textarea
              maxLength={70}
              value={breveDescricao}
              onChange={(e) => {
                setBreveDescricao(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  breveDescricao: "",
                }));
              }}
              placeholder="Escreva uma breve descrição para um campo pequeno"
              className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
                focus-within:outline-none focus-within:ring-2 focus-within:ring-purpledark cursor-pointer resize-none"
            />
          <div
            className={`text-purpledark w-4/6 h-4 text-sm transition-opacity duration-500 ${
              errors.breveDescricao ? "opacity-100" : "opacity-0"
            }`}
          >
            <p>{errors.breveDescricao || ""}</p>
          </div>
          </div>

          {/* Descrição completa */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-gray2/80">Descrição completa</label>
              <span className="font-semibold text-gray2/80">{completaDescricao.length} até 350</span>
            </div>
            <textarea
              maxLength={350}
              value={completaDescricao}
              onChange={(e) => {
                setCompletaDescricao(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  completaDescricao: "",
                }));
              }}
              placeholder="Escreva uma descrição detalhada sobre o produto"
              className="peer w-full border rounded-md px-3 py-2 text-sm text-gray2/80 outline-none border-gray3/50
                focus-within:outline-none focus-within:ring-2 focus-within:ring-purpledark cursor-pointer resize-none"
              rows={4}
            />
          <div
            className={`text-purpledark w-4/6 h-4 text-sm transition-opacity duration-500 ${
              errors.completaDescricao ? "opacity-100" : "opacity-0"
            }`}
          >
            <p>{errors.completaDescricao || ""}</p>
          </div>
          </div>

          <hr className="border-gray2/50 mt-7 mb-7" />

          {/* Produto modificado */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="modificado"
              checked={personalizado}
              onChange={() => setPersonalizado(!personalizado)}
              className="w-5 h-5 rounded appearance-none border-2 border-purpledark checked:bg-purpledark checked:border-purpledark"
            />
            <label htmlFor="modificado" className="font-semibold text-gray2/80">Produto modificado</label>
          </div>

          {/* Opções de componentes */}
          {/* <div>
            <p className="font-semibold text-gray2/80 mb-4">Opções de componentes</p>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray1">
              {["retinol","ácido mandélico","vitamina c","ácido glicólico","ácido lático"].map((item, idx) => (
                <label key={idx} className={`flex items-center gap-2 ${!personalizado ? "opacity-50 cursor-not-allowed" : ""}`}>
                  <input
                    type="checkbox"
                    value={item}
                    checked={componentes.includes(item)}
                    onChange={handleCheckbox}
                    disabled={!personalizado}
                    className="appearance-none w-5 h-5 border-2 border-purpledark rounded-md checked:bg-purpledark transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:border-gray-300 disabled:checked:bg-gray-400"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div> */}

          {/* Botão Publicar */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={sending}
              className={`bg-purpledark hover:bg-blue hover:text-purpledark text-white px-6 py-2 rounded-md text-sm transition ${sending ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {sending ? "ENVIANDO..." : "PUBLICAR PRODUTO"}
            </button>
          </div>
        </div>
        {SuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white rounded-4xl shadow-lg p-9 w-[450px] text-center">
              <div className="flex justify-center mb-4 w-[100%]">
                <img src={Checkroxinho} alt="" className="w-[25%]"/>
              </div>

              <h2 className="text-2xl font-semibold text-gray1/90">Cadastro realizado!</h2>
              <p className="text-gray3 mt-2 text-lg">
                Tudo certo! Seu produto foi cadastrado com sucesso!
              </p>
            </div>
          </div>
        )}
        {FailModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white rounded-4xl shadow-lg p-9 w-[450px] text-center">
              <div className="flex justify-center mb-4 w-[100%]">
                <img src={Failroxinho} alt="" className="w-[25%]"/>
              </div>

              <h2 className="text-2xl font-semibold text-gray1/90">Cadastro não concluído!</h2>
              <p className="text-gray3 mt-2 text-lg">
                Atenção! Erro ao cadastrar produto.
              </p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default CadastroPro;
