// front/src/pages/Pagamento.jsx
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
  const [cupom, setCupom] = useState("");
  const [cupomValido, setCupomValido] = useState(null);

  const navigate = useNavigate();

  // Funções de formatação
  const onlyDigits = (s = "") => (s ? s.replace(/\D/g, "") : "");

  const formatAsAmex = (digits) => {
    const p1 = digits.slice(0, 4);
    const p2 = digits.slice(4, 10);
    const p3 = digits.slice(10, 15);
    return [p1, p2, p3].filter(Boolean).join(" ");
  };

  const formatDefault = (digits) => {
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const formatCardDisplay = (digits) => {
    if (/^(34|37)/.test(digits)) return formatAsAmex(digits);
    return formatDefault(digits);
  };

  // Máscaras
  const cepMascara = (e) => {
    let value = onlyDigits(e.target.value);
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    setCep(value);
  };

  const numerocartaoMasck = (e) => {
    let digits = onlyDigits(e.target.value);
    if (digits.length > 19) digits = digits.slice(0, 19);
    setCardNumber(formatCardDisplay(digits));
  };

  const handleCardPaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    let digits = onlyDigits(pasted).slice(0, 19);
    setCardNumber(formatCardDisplay(digits));
  };

  const formatCardOnBlur = () => {
    const digits = onlyDigits(cardNumber).slice(0, 19);
    setCardNumber(formatCardDisplay(digits));
  };

  const dataMascara = (e) => {
    let value = onlyDigits(e.target.value);
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    setExpiry(value);
  };

  const CVCmascara = (e) => {
    let value = onlyDigits(e.target.value);
    if (value.length > 3) value = value.slice(0, 3);
    setCvc(value);
  };

  const nomeMascara = (e) => {
    setCardName(e.target.value);
  };

  // Validação dos campos
  const validate = () => {
    const newErrors = {};

    if (!/^\d{5}-\d{3}$/.test(cep)) {
      newErrors.cep = "CEP inválido. Ex: 88010-120";
    }

    const cleanNumber = onlyDigits(cardNumber);
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      newErrors.cardNumber = "Número do cartão inválido (13-19 dígitos)";
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Data inválida. Ex: 10/30";
    } else {
      const [month, year] = expiry.split("/").map((n) => parseInt(n, 10));
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear() % 100;
      if (month < 1 || month > 12) newErrors.expiry = "Mês inválido";
      if (year < currentYear || (year === currentYear && month < currentMonth))
        newErrors.expiry = "Cartão expirado";
    }

    if (!/^\d{3}$/.test(cvc)) {
      newErrors.cvc = "CVC deve ter 3 dígitos";
    }

    if (cardName.trim().split(" ").length < 2) {
      newErrors.cardName = "Digite o nome completo do titular";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (submitted) validate();
  }, [cep, cardNumber, expiry, cvc, cardName]);

  // Integração com backend
  const getProducts = async () => {
    try {
      const data = await ky.get("http://localhost:3000/produtos").json();
      setProdutos(data);
      console.log("Produtos carregados:", data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);



  const limparPagamento = async () => {
    try {
      const response = await ky
        .delete("http://localhost:3000/pagamento")
        .json();
      console.log(response.message);
      setProdutos([]);
    } catch (error) {
      console.error("Erro ao limpar pagamento:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
    }
  };

  useEffect(() => {
    if (success) {
      setRedirecting(true);
      const timer = setTimeout(() => {
        navigate("/produto/progresso");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const InputError = ({ msg }) => (
    <div className="h-5 mt-1 transition-all duration-300 ease-in-out">
      {msg ? (
        <p className="text-purpledark text-[14px] animate-fadeIn">{msg}</p>
      ) : (
        <p className="text-transparent text-xs">.</p>
      )}
    </div>
  );

  if (success) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-blackwhite/2">
        {redirecting && (
          <div className="flex flex-col justify-center items-center">
            <span className="w-10 h-10 border-4 border-purpledark border-t-transparent rounded-full animate-spin"></span>
            <p className="mt-4 text-purpledark font-medium">
              Pagamento Concluido! Redirecionando...
            </p>
          </div>
        )}
      </div>
    );
  }


  const aplicarCupom = () => {
    if (cupom.trim().toLowerCase() === "desconto10") {
      setCupomValido(true);
    } else {
      setCupomValido(false);
    }
  };

  const frete = 16.9;
const subtotalOriginal = produtos.reduce((acc, p) => acc + (p.preco || 0), 0);
const desconto = cupomValido ? subtotalOriginal * 0.5 : 0;
const subtotal = subtotalOriginal - desconto;
const total = subtotal + frete;



  return (
    <div>
      <CarrosselPQ />
      <div className="w-full border-b border-b-blackwhite/20 flex items-center justify-center p-4">
        <img className="w-30" src={Logo} alt="Logo" />
      </div>

      <form onSubmit={handleSubmit} className="flex">
        {/* Lado esquerdo */}
        <div className="w-[60%] p-5 mr-[40%]">
          {/* Entrega */}
          <div className="flex flex-col p-10 justify-center pl-[40%]">
            <p className="text-2xl text-blackwhite/80">Entrega</p>
            <label className="mt-3 text-blackwhite/80 font-semibold">CEP</label>
            <input
              className="text-sm p-2 mt-1 border px-2 w-85 rounded-[5px] focus:border-purpledark border-blackwhite/60"
              type="text"
              value={cep}
              onChange={cepMascara}
              placeholder="ex: 88010-120"
            />
            <InputError msg={errors.cep} />
            <div className="flex flex-col">
              <label className="mt-3 text-blackwhite/80 font-semibold">
                Cupom de Desconto
              </label>

              <div className="flex items-center gap-4 mt-1">
                <input
                  className="text-sm p-2 border px-2 w-60 rounded-[5px] focus:border-purpledark border-blackwhite/60"
                  type="text"
                  onChange={(e) => setCupom(e.target.value)}
                />
                <button
                  type="button"
                    onClick={aplicarCupom}
                  className="bg-purpledark text-white p-2 w-20 rounded-[5px]"
                >
                  Aplicar
                </button>
              </div>
                {cupomValido === true && (
    <p className="text-green-600 text-sm mt-2 text-purpledark">Cupom aplicado! </p>
  )}
  {cupomValido === false && (
    <p className="text-red-600 text-sm mt-2 text-purpledark">Cupom inválido </p>
  )}
            </div>
          </div>

          

          {/* Resumo */}
          <div className="flex flex-col p-5 justify-center pl-[40%]">
            <p className="text-1xl font-bold text-blackwhite/80">Resumo</p>
            <div className="flex justify-between w-79 items-center">
              <label className="mt-3 text-blackwhite/80 text-[13px]">
                ENTREGA
              </label>
              <p className="mt-3 font-medium">R${frete.toFixed(2)}</p>
            </div>
            <div className="flex justify-between w-79 items-center border-b pb-10 border-b-blackwhite/20">
              <label className="mt-3 text-blackwhite/80 font-bold text-[20px]">
                Subtotal
              </label>
              <p className="mt-3 font-medium text-2xl text-purpledark">
                R${subtotal.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Pagamento */}
          <div className="flex flex-col p-6 justify-center pl-[40%]">
            <p className="text-2xl text-blackwhite/80">Pagamento</p>
            <label className="mt-3 text-blackwhite/80 font-semibold">
              Número do Cartão
            </label>
            <input
              className="text-sm p-2 mt-1 border px-2 w-85 rounded-[5px] border-blackwhite/60"
              type="text"
              value={cardNumber}
              onChange={numerocartaoMasck}
              onPaste={handleCardPaste}
              onBlur={formatCardOnBlur}
              placeholder="ex: 1234 5678 9012 3456"
            />
            <InputError msg={errors.cardNumber} />
          </div>

          {/* Data e CVC */}
          <div className="flex justify-center gap-5 pl-[17%]">
            <div className="flex flex-col">
              <label className="text-blackwhite/80 font-semibold">
                Data de expiração
              </label>
              <input
                className="text-sm p-2 mt-1 border px-2 w-40 rounded-[5px] border-blackwhite/60"
                type="text"
                value={expiry}
                onChange={dataMascara}
                placeholder="ex: 10/30"
              />
              <InputError msg={errors.expiry} />
            </div>
            <div className="flex flex-col">
              <label className="text-blackwhite/80 font-semibold">
                Código de segurança
              </label>
              <input
                className="text-sm p-2 mt-1 border px-2 w-40 rounded-[5px] border-blackwhite/60"
                type="text"
                value={cvc}
                onChange={CVCmascara}
                placeholder="ex: 975"
              />
              <InputError msg={errors.cvc} />
            </div>
          </div>

          {/* Nome */}
          <div className="flex flex-col p-6 justify-center pl-[40%]">
            <label className="mt-3 text-blackwhite/80 font-semibold">
              Titular do Cartão
            </label>
            <input
              className="text-sm p-2 mt-1 border px-2 w-85 rounded-[5px] border-blackwhite/60"
              type="text"
              value={cardName}
              onChange={nomeMascara}
              placeholder="ex: Manassés Marcelino"
            />
            <InputError msg={errors.cardName} />
          </div>

          {/* Total */}
          <div className="flex flex-col p-10 justify-center pl-[40%]">
            <div className="flex justify-between w-83 items-center pb-10">
              <label className="mt-3 text-blackwhite/90 font-bold text-[22px]">
                Valor Total
              </label>
              <p className="mt-3 font-medium text-2xl text-purpledark">
                R${total.toFixed(2)}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-purpledark w-85 p-2 rounded-[5px] text-white font-medium hover:bg-blue hover:text-purpledark flex justify-center items-center"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Pagar"
              )}
            </button>
          </div>
        </div>

        {/* Lado direito */}
        <div className="absolute right-0 top-27 w-[40%] h-[170vh] bg-blackwhite/10 overflow-y-auto">
          <div className="fixed right-0 top-27 w-[40%] h-[90%] overflow-y-auto">
            <div className="flex flex-col p-10 gap-5">
              <p className="text-[20px] font-semibold">Resumo de Pedidos</p>

              {produtos.length > 0 ? (
                produtos.map((p) => (
                  <div key={p.id} className="flex gap-4 w-98">
                    <img className="w-23" src={foto1} alt="" />
                    <div className="flex flex-col">
                      <p className="text-blackwhite/80">{p.nome}</p>
                      <p className="mt-3 text-[19px] text-purpledark font-semibold">
                        R${p.preco}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-blackwhite/60 italic">
                  Nenhum produto adicionado
                </p>
              )}

              <div className="flex gap-5 mt-6">
                <button
                  type="button"
                  onClick={limparPagamento}
                  className="cursor-pointer border font-semibold border-purpledark p-1 px-5 text-purpledark rounded-[5px]"
                >
                  Limpar Pedido
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="bg-purpledark rounded-[5px] p-1 px-7 text-white"
                >
                  Escolher Mais Produtos
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
