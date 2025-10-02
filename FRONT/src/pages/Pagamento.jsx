import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // redirecionamento
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
  const [submitted, setSubmitted] = useState(false); // <- novo estado

  const navigate = useNavigate();

  // formatação 
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

  // máscaras 
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

  // validações
  const validate = () => {
    const newErrors = {};

    if (!/^\d{5}-\d{3}$/.test(cep)) {
      newErrors.cep = "CEP inválido. Ex: 88010-120";
    }

    const cleanNumber = onlyDigits(cardNumber);
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      newErrors.cardNumber = "Número do cartão inválido (13-19 dígitos)";
    } else {
      if (/^(34|37)/.test(cleanNumber)) {
        const amexPattern = /^\d{1,4}( \d{1,6})?( \d{1,5})?$/;
        if (!amexPattern.test(cardNumber)) {
          newErrors.cardNumber = "Formato do Amex inválido (ex: 3782 822463 10005)";
        }
      } else {
        const defaultPattern = /^(\d{1,4})( \d{1,4}){0,4}?$/;
        if (!defaultPattern.test(cardNumber)) {
          newErrors.cardNumber = "Formato do cartão inválido (use espaços a cada 4 dígitos)";
        }
      }
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Data inválida. Ex: 10/30";
    } else {
      const [month, year] = expiry.split("/").map((n) => parseInt(n, 10));
      if (month < 1 || month > 12) {
        newErrors.expiry = "Mês inválido";
      } else {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear() % 100;
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors.expiry = "Cartão expirado";
        }
      }
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

  // validação em tempo real só depois do primeiro submit
  useEffect(() => {
    if (submitted) {
      validate();
    }
  }, [cep, cardNumber, expiry, cvc, cardName]);

  const handleSubmit = (e) => {
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
        navigate("/");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  // componente auxiliar
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
        {redirecting ? (
          <div className="flex flex-col justify-center items-center">
            <span className="w-10 h-10 border-4 border-purpledark border-t-transparent rounded-full animate-spin"></span>
            <p className="mt-4 text-purpledark font-medium">Redirecionando...</p>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <CarrosselPQ />
      <div className="w-[100%] border-b border-b-blackwhite/20 flex items-center justify-center p-4">
        <img className="w-30" src={Logo} alt="" />
      </div>

      <form onSubmit={handleSubmit} className="flex">
        {/* lado esquerdo */}
        <div className="w-[60%] p-5 mr-[40%]">
          {/* Entrega */}
          <div className="flex flex-col p-10 justify-center pl-[40%]">
            <p className="text-2xl font-secondary text-blackwhite/80">Entrega</p>
            <label className="mt-3 text-blackwhite/80 font-semibold">CEP</label>
            <input
              className="text-sm p-2 mt-1 border px-2 w-85 rounded-[5px] focus:border-purpledark border-blackwhite/60"
              type="text"
              value={cep}
              onChange={cepMascara}
              placeholder="ex: 88010-120"
            />
            <InputError msg={errors.cep} />
          </div>

          <div className="flex flex-col justify-center pl-[40%]">
            <label className="text-blackwhite/80 font-semibold">Cupom de desconto</label>
            <input
              className="text-sm p-2 mt-3 border px-2 border-blackwhite/100 w-85 rounded-[5px] outline-none focus:border-purpledark focus:outline-none"
              type="text"
              placeholder="ex: desconto10"
            />
          </div>

          {/* Resumo */}
          <div className="flex flex-col p-10 justify-center pl-[40%] ">
            <p className="text-1xl font-secondary text-blackwhite/80 font-bold">Resumo</p>
            <div className="flex justify-between w-79 items-center">
              <label className="mt-3 text-blackwhite/80 text-[13px]">ENTREGA</label>
              <p className="mt-3 font-medium"> R$16,90</p>
            </div>
            <div className="flex justify-between w-79 items-center border-b pb-10 border-b-blackwhite/20">
              <label className="mt-3 text-blackwhite/80 font-bold text-[20px]">Subtotal</label>
              <p className="mt-3 font-medium text-2xl text-purpledark">R$290,90</p>
            </div>
          </div>

          {/* Pagamento */}
          <div className="flex flex-col p-6 justify-center pl-[40%]">
            <p className="text-2xl font-secondary text-blackwhite/80">Pagamento</p>
            <label className="mt-3 text-blackwhite/80 font-semibold">Número do Cartão</label>
            <input
              className="text-sm p-2 mt-1 border px-2 w-85 rounded-[5px] focus:border-purpledark border-blackwhite/60"
              type="text"
              value={cardNumber}
              onChange={numerocartaoMasck}
              onPaste={handleCardPaste}
              onBlur={formatCardOnBlur}
              placeholder="ex: 1234 5678 9012 3456"
            />
            <InputError msg={errors.cardNumber} />
          </div>

          <div className="flex justify-center gap-5 pl-[17%]">
            <div className="flex flex-col">
              <label className="text-blackwhite/80 font-semibold">Data de expiração</label>
              <input
                className="text-sm p-2 mt-1 border px-2 w-40 rounded-[5px] focus:border-purpledark border-blackwhite/60"
                type="text"
                value={expiry}
                onChange={dataMascara}
                placeholder="ex: 10/30"
              />
              <InputError msg={errors.expiry} />
            </div>
            <div className="flex flex-col">
              <label className="text-blackwhite/80 font-semibold">Código de segurança</label>
              <input
                className="text-sm p-2 mt-1 border px-2 w-40 rounded-[5px] focus:border-purpledark border-blackwhite/60"
                type="text"
                value={cvc}
                onChange={CVCmascara}
                placeholder="ex: 975"
              />
              <InputError msg={errors.cvc} />
            </div>
          </div>

          <div className="flex flex-col p-6 justify-center pl-[40%]">
            <label className="mt-3 text-blackwhite/80 font-semibold">Titular do Cartão</label>
            <input
              className="text-sm p-2 mt-1 border px-2 w-85 rounded-[5px] focus:border-purpledark border-blackwhite/60"
              type="text"
              value={cardName}
              onChange={nomeMascara}
              placeholder="ex: Manassés Marcelino"
            />
            <InputError msg={errors.cardName} />
          </div>

          <div className="flex gap-2 justify-center items-center pl-[10%]">
            <input
              type="checkbox"
              className="appearance-none w-5 h-5 border-2 border-purpledark rounded-md checked:bg-purpledark transition-colors duration-200 cursor-pointer"
            />
            <label className="text-blackwhite/80 font-medium cursor-pointer">Salvar forma de pagamento 30 dias</label>
          </div>

          <div className="flex flex-col p-10 justify-center pl-[40%] ">
            <div className="flex justify-between w-83 items-center pb-10">
              <label className="mt-3 text-blackwhite/90 font-bold text-[22px]">Valor Total</label>
              <p className="mt-3 font-medium text-2xl text-purpledark">R$290,90</p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="bg-purpledark w-85 p-2 rounded-[5px] cursor-pointer text-white text-[17px] font-medium transition hover:bg-blue hover:text-purpledark flex justify-center items-center"
              >
                {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : "Pagar"}
              </button>
            </div>
          </div>
        </div>

        {/* lado Direito */}
        <div className="absolute right-0 top-27 w-[40%] h-[150vh] bg-blackwhite/10 overflow-y-auto">
          <div className="fixed right-0 top-27 w-[40%] h-[90%] overflow-y-auto">
            <div className="flex flex-col p-10 gap-5">
              <p className="text-[20px]">Resumo de Pedidos</p>
              <div className="flex  gap-4 w-98 ">
                <img className="w-23" src={foto1} alt="" />
                <div className="flex flex-col ">
                  <p className="text-blackwhite/80">Sérum Rejuvenescedor Nocturne 45+ - 300g pele madura</p>
                  <p className="mt-3 text-[19px] text-purpledark font-semibold">R$89,90</p>
                </div>
              </div>
              <div className="flex  gap-4 w-98 ">
                <img className="w-23" src={foto1} alt="" />
                <div className="flex flex-col ">
                  <p className="text-blackwhite/80">Sérum Rejuvenescedor Nocturne 45+ - 300g pele madura</p>
                  <p className="mt-3 text-[19px] text-purpledark font-semibold">R$89,90</p>
                </div>
              </div>
              <div className="flex  gap-4 w-98 ">
                <img className="w-23" src={foto1} alt="" />
                <div className="flex flex-col ">
                  <p className="text-blackwhite/80">Sérum Rejuvenescedor Nocturne 45+ - 300g pele madura</p>
                  <p className="mt-3 text-[19px] text-purpledark font-semibold">R$89,90</p>
                </div>
              </div>

              <div className="flex gap-5 mt-6">
                <button className="cursor-pointer border font-semibold border-purpledark p-1 px-5 text-purpledark rounded-[5px]">Limpar Pedido</button>
                <button className="bg-purpledark rounded-[5px] p-1 px-7 cursor-pointer text-white">Escolher Mais Produtos</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Pagamento;
