import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ky from "ky";

import Logo from "../assets/logo.svg";
import foto1 from "../assets/SKYNSNature1.svg";
import CarrosselPQ from "../components/CarrosselPQ";

function Pagamento() {
  const [cep, setCep] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [produtos, setProdutos] = useState([]);

  const [idPedido, setIdPedido] = useState(null);

  const [cupom, setCupom] = useState("");
  const [cupomValido, setCupomValido] = useState(null);

  const navigate = useNavigate();

  const cuponsValidos = {
    DESCONTO10: { tipo: "percentual", valor: 10 },
    MENOS20: { tipo: "fixo", valor: 20 },
    TURBINADO: { tipo: "misto", percentual: 10, fixo: 15 },
  };

  const onlyDigits = (s = "") => (s ? s.replace(/\D/g, "") : "");

  const detectFlag = (digits) => {
    if (/^3[47]/.test(digits)) return "amex";
    if (/^3(?:0[0-5]|[68])/.test(digits)) return "diners";
    if (/^4/.test(digits)) return "visa";
    if (/^5[1-5]/.test(digits)) return "mastercard";
    return "outro";
  };

  const formatCardDisplay = (digits) => {
    const bandeira = detectFlag(digits);

    if (bandeira === "amex") {
      const p1 = digits.slice(0, 4);
      const p2 = digits.slice(4, 10);
      const p3 = digits.slice(10, 15);
      return [p1, p2, p3].filter(Boolean).join(" ");
    }

    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const numerocartaoMasck = (e) => {
    let digits = onlyDigits(e.target.value).slice(0, 19);
    setCardNumber(formatCardDisplay(digits));
  };

  const handleCardPaste = (e) => {
    e.preventDefault();
    let pasted = onlyDigits(e.clipboardData.getData("text")).slice(0, 19);
    setCardNumber(formatCardDisplay(pasted));
  };

  const formatCardOnBlur = () => {
    let digits = onlyDigits(cardNumber).slice(0, 19);
    setCardNumber(formatCardDisplay(digits));
  };

  const cepMascara = (e) => {
    let value = onlyDigits(e.target.value).slice(0, 8);
    if (value.length > 5) value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    setCep(value);
  };

  const dataMascara = (e) => {
    let v = onlyDigits(e.target.value).slice(0, 4);
    if (v.length >= 3) v = v.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    setExpiry(v);
  };

  const CVCmascara = (e) => {
    let digits = onlyDigits(e.target.value);
    const bandeira = detectFlag(onlyDigits(cardNumber));

    const max = bandeira === "amex" ? 4 : 3;
    setCvc(digits.slice(0, max));
  };

  const nomeMascara = (e) => {
    setCardName(e.target.value);
  };

  const validarLuhn = (num) => {
    let arr = (num + "")
      .split("")
      .reverse()
      .map((x) => parseInt(x));

    let soma = 0;

    arr.forEach((digit, i) => {
      if (i % 2 !== 0) {
        let d = digit * 2;
        if (d > 9) d -= 9;
        soma += d;
      } else {
        soma += digit;
      }
    });

    return soma % 10 === 0;
  };

  const validate = () => {
    const newErrors = {};

    if (!/^\d{5}-\d{3}$/.test(cep)) {
      newErrors.cep = "CEP inválido";
    }

    const digits = onlyDigits(cardNumber);
    const bandeira = detectFlag(digits);

    if (digits.length < 13 || digits.length > 19) {
      newErrors.cardNumber = "Número do cartão deve ter entre 13 e 19 dígitos";
    }    

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Data inválida";
    } else {
      const [m, y] = expiry.split("/").map(Number);
      const hoje = new Date();
      const anoAtual = hoje.getFullYear() % 100;
      const mesAtual = hoje.getMonth() + 1;

      if (m < 1 || m > 12) newErrors.expiry = "Mês inválido";
      if (y < anoAtual || (y === anoAtual && m < mesAtual))
        newErrors.expiry = "Cartão expirado";
    }

    const cvcMin = bandeira === "amex" ? 4 : 3;
    if (cvc.length !== cvcMin) {
      newErrors.cvc = `CVC deve ter ${cvcMin} dígitos`;
    }

    const palavras = cardName.trim().split(" ");
    if (palavras.length < 2) newErrors.cardName = "Digite nome completo";
    if (palavras.some((p) => p.length < 2))
      newErrors.cardName = "Cada parte do nome deve ter ao menos 2 letras";
    if (/[^a-zA-ZÀ-ÿ ]/.test(cardName))
      newErrors.cardName = "Nome só pode conter letras";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (submitted) validate();
  }, [cep, cardNumber, expiry, cvc, cardName]);

  const getProducts = async () => {

    const id = localStorage.getItem('id_usuario_logado')
    try {
      const response = await ky.get("http://localhost:3000/carrinho", {
        searchParams: {
          fk_id_usuario: id
        }
      }).json();

     if (response.data) {
  console.log(response);
  setProdutos(response.data);

  buscarFotosParaItens(response.data); // <-- Agora funciona!
}

    } catch (err) {
      console.log('aqui')
      console.log("Erro: ", err);
    }
  };

 const buscaFotoProduto = async (id) => {

try {
const response = await ky.get(`http://localhost:3000/${id}/1/foto`).json();

if (response.data) {
return response.data.url;
};

console.log('Erro 404');
} catch (err) {

console.error(err);
};
};


const buscarFotosParaItens = async (itens) => {
  const itensAtualizados = [];

  for (const item of itens) {
    let fotoUrl = "default-image.svg";

    if (item.fk_id_produto) {
      fotoUrl = await buscaFotoProduto(item.fk_id_produto);
    }

    itensAtualizados.push({
      ...item,
      img: fotoUrl,
      
    });
  }

  setProdutos(itensAtualizados); 
  console.log("PRODUTOS NO ESTADO: ", itensAtualizados);
  console.log("TIPOS:", itensAtualizados.map(p => ({ preco: p.preco, tipo: typeof p.preco })));
  console.log("VALORES DE PREÇO:", produtos.map(p => p.preco));
};


  useEffect(() => {
    getProducts();
  }, []);

  const limparPagamento = async () => {
    try {
      await ky.delete("http://localhost:3000/pagamento").json();
      setProdutos([]);
    } catch (error) {
      console.log(error);
    }
  };

  const aplicarCupom = () => {
    if (!cupom) {
      setCupomValido(null);
      return;
    }

    const up = cupom.trim().toUpperCase();

    if (!cuponsValidos[up]) {
      setCupomValido(false);
    } else {
      setCupomValido(cuponsValidos[up]);
    }
  };

  const frete = 16.9;
  const parsePreco = (valor) => {
  if (!valor) return 0;
  return Number(
    String(valor)
      .replace("R$", "")
      .replace("$", "")
      .replace(",", ".")
      .trim()
  );
};

  const subtotalOriginal = produtos.reduce((acc, p) => {
  const precoUnitario = parsePreco(p.preco);
  const qtd = Number(p.quantidade) || 1;
  return acc + precoUnitario * qtd;
}, 0);



  let desconto = 0;

  if (cupomValido && cupomValido !== false) {
    if (cupomValido.tipo === "percentual") {
      desconto = subtotalOriginal * (cupomValido.valor / 100);
    } else if (cupomValido.tipo === "fixo") {
      desconto = cupomValido.valor;
    } else if (cupomValido.tipo === "misto") {
      desconto =
        subtotalOriginal * (cupomValido.percentual / 100) + cupomValido.fixo;
    }
  }

  const subtotal = Math.max(0, subtotalOriginal - desconto);
  const total = subtotal + frete;


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

const enviarPedido = async () => {
    try {
      const idUsuario = localStorage.getItem("id_usuario_logado");
      console.log("ID DO USUÁRIO ENVIADO:", idUsuario);

      // Usamos 'ky' para enviar o pedido
      const res = await ky.post("http://localhost:3000/pedido", {
        json: {
          id_usuario: idUsuario,
          // Agora, enviamos APENAS o total,
          // pois a lógica de produtos/estoque/carrinho foi movida para o backend.
          total: total, 
        }
      }).json();
  
      console.log("Pedido salvo com sucesso! ID:", res.id_pedido);
      
      // O backend agora deve ter limpado o carrinho e atualizado o estoque
      setProdutos([]); // Limpa o estado local do carrinho
      
      return res.id_pedido;
  
    } catch (err) {
      console.error("Erro ao salvar pedido:", err);
      // Se houver erro, podemos lançar novamente para o useEffect capturar, ou retornar null/undefined
      return null; 
    }
};

  useEffect(() => {
  const finalizar = async () => {
    if (success) {
      const id = await enviarPedido();  // 🤩 espera o retorno!
      setIdPedido(id);

      setTimeout(() => navigate(`/rastreio/${id}`), 1500);
    }
  };

  finalizar();
}, [success]);


  const InputError = ({ msg }) => (
    <p className="h-5 text-purpledark text-sm">{msg || ""}</p>
  );

  if (success) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <span className="w-10 h-10 border-4 border-purpledark border-t-transparent rounded-full animate-spin"></span>
        <p className="mt-3 text-purpledark">Pagamento aprovado...</p>
      </div>
    );
  }


  return (
    <div>
      <CarrosselPQ />

      <div className="w-full border-b border-blackwhite/20 flex justify-center p-4">
        <img src={Logo} alt="" className="w-30" />
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <div className="w-[60%] p-5 mr-[40%]">
          <div className="p-10 pl-[40%]">
            <p className="text-2xl">Entrega</p>
            <label className="font-semibold block mt-4">CEP</label>
            <input
              type="text"
              value={cep}
              onChange={cepMascara}
              placeholder="88010-120"
              className="border p-2 w-85 rounded"
            />
            <InputError msg={errors.cep} />

            <label className="font-semibold block mt-4">
              Cupom de Desconto
            </label>

            <div className="flex gap-3 mt-1">
              <input
                type="text"
                onChange={(e) => setCupom(e.target.value)}
                className="border p-2 w-60 rounded"
              />
              <button
                type="button"
                onClick={aplicarCupom}
                className="bg-purpledark text-white px-6 rounded"
              >
                Aplicar
              </button>
            </div>

            {cupomValido === false && (
              <p className="text-red-600 mt-2">Cupom inválido</p>
            )}
            {cupomValido && cupomValido !== false && (
              <p className="text-green-600 mt-2">Cupom aplicado!</p>
            )}
          </div>

          <div className="p-5 pl-[40%]">
            <p className="text-xl font-bold">Resumo</p>

            <div className="flex justify-between mt-3 w-79">
              <span>Entrega</span>
              <span>R${frete.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mt-5 w-79 border-b pb-6">
              <span className="font-bold text-lg">Subtotal</span>
              <span className="text-purpledark text-xl">
                R${subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="p-6 pl-[40%]">
            <p className="text-2xl">Pagamento</p>

            <label className="font-semibold block mt-4">
              Número do Cartão
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={numerocartaoMasck}
              onPaste={handleCardPaste}
              onBlur={formatCardOnBlur}
              placeholder="1234 5678 9012 3456"
              className="border p-2 w-85 rounded"
            />
            <InputError msg={errors.cardNumber} />

            <div className="flex gap-5 mt-5">
              <div className="flex flex-col w-40">
                <label className="font-semibold ">Data de expiração</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={dataMascara}
                  placeholder="10/30"
                  className="border p-2 rounded"
                />
                <InputError msg={errors.expiry} />
              </div>

              <div className="flex flex-col w-32">
                <label className="font-semibold">CVC</label>
                <input
                  type="text"
                  value={cvc}
                  onChange={CVCmascara}
                  placeholder="975"
                  className="border p-2 rounded"
                />
                <InputError msg={errors.cvc} />
              </div>
            </div>

            <label className="font-semibold block mt-5">
              Titular do Cartão
            </label>
            <input
              type="text"
              value={cardName}
              onChange={nomeMascara}
              placeholder="ex: Maria Silva"
              className="border p-2 w-85 rounded"
            />
            <InputError msg={errors.cardName} />
          </div>

          <div className="p-10 pl-[40%]">
            <div className="flex justify-between w-83 pb-10">
              <span className="font-bold text-xl">Valor Total</span>
              <span className="text-purpledark text-2xl">
                R${total.toFixed(2)}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-purpledark text-white px-4 py-2 w-85 rounded flex justify-center"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Pagar"
              )}
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-27 w-[40%] h-[170vh] bg-blackwhite/10 overflow-y-auto">
          <div className="fixed right-0 top-27 w-[40%] h-[90%] overflow-y-auto">
            <div className="p-10 flex flex-col gap-5">
              <p className="text-lg font-semibold">Resumo de Pedidos</p>

              {produtos.length > 0 ? (
                produtos.map((p) => (
                  <div key={p.id_carrinho} className="flex gap-4 w-98">
                    <img className="w-23" src={p.img} />
                    <div>
                      <p>{p.titulo_}</p>
                      <p className="text-sm text-gray-600">Quantidade: {p.quantidade}</p>
                      <p className="mt-2 text-purpledark text-xl">
                        R{p.preco}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="italic">Nenhum produto adicionado</p>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={limparPagamento}
                  className="border border-purpledark text-purpledark px-5 py-1 rounded"
                >
                  Limpar Pedido
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="bg-purpledark text-white px-6 py-1 rounded"
                >
                  Escolher mais produtos
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Pagamento;