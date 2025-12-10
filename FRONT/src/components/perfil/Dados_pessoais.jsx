import { useEffect, useState } from "react";
import ky from "ky";
import Checkroxinho from "../../assets/Checkroxinho.svg";

function Dados_pessoais() {
  const id_usuario_logado = localStorage.getItem("id_usuario_logado");
  const [dados_usuario, setDados_usuario] = useState({});
  const formatarNome = (value) => value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");

  const formatarCPF = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    return value.slice(0, 14);
  };

  const formatarData = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
    return value.slice(0, 10);
  };

  const formatarTele = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    return value.slice(0, 15);
  };

  const [SuccessModal, setSuccessModal] = useState(false);
  useEffect(() => {
    const buscarPerfil = async () => {
      try {
        const response = await ky
          .post("http://localhost:3000/perfil", {
            json: { id_usuario_logado },
          })
          .json();

        const dados = response;
        setDados_usuario(dados);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    buscarPerfil();
  }, []);

  const [nomeInvalido, setNomeInvalido] = useState(false);
  const mensagemNome = "Digite seu nome corretamente!";
  const [emailInvalido, setEmailInvalido] = useState(false);
  const mensagemEmail = "Email invalido!";
  const [cpfInvalido, setCpfInvalido] = useState(false);
  const mensagemCpf = "Cpf invalido!";
  const [nascimentoInvalido, setNascimentoInvalido] = useState(false);
  const mensagemNascimento = "Você deve ter 18 anos ou mais para se cadastrar!";
  const [telefoneInvalido, setTelefoneInvalido] = useState(false);
  const mensagemTelefone = "Telefone invalido!";

  const salvar_dados = async () => {
    setNomeInvalido(false);
    setEmailInvalido(false);
    setCpfInvalido(false);
    setNascimentoInvalido(false);

    let erroEditar = false;
    if (
      !dados_usuario.nome_usuario ||
      dados_usuario.nome_usuario.trim().length < 3
    ) {
      setNomeInvalido(true);
      erroEditar = true;
    }

    if (
      !dados_usuario.email_usuario ||
      (!dados_usuario.email_usuario.trim().includes("@gmail.com") &&
        !dados_usuario.email_usuario.trim().includes("@hotmail.com"))
    ) {
      setEmailInvalido(true);
      erroEditar = true;
    }

    if (!dados_usuario.cpf || dados_usuario.cpf.trim().length < 14) {
      setCpfInvalido(true);
      erroEditar = true;
    }

    // Função para converter qualquer data para objeto Date
    const parsearData = (dataString) => {
      if (!dataString) return null;

      // Formato DD/MM/YYYY
      if (dataString.includes("/")) {
        const partes = dataString.split("/");
        if (partes.length !== 3) return null;

        const dia = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1;
        const ano = parseInt(partes[2], 10);

        return new Date(ano, mes, dia);
      }

      // Formato YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss
      if (dataString.includes("-")) {
        const dataStr = dataString.split("T")[0];
        const partes = dataStr.split("-");
        if (partes.length !== 3) return null;

        const ano = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1;
        const dia = parseInt(partes[2], 10);

        return new Date(ano, mes, dia);
      }

      // Tentar criar Date diretamente
      return new Date(dataString);
    };

    // Na validação:
    if (
      !dados_usuario.data_nascimento ||
      dados_usuario.data_nascimento.trim() === ""
    ) {
      setNascimentoInvalido(true);
      erroEditar = true;
    } else {
      const dataNascimento = parsearData(dados_usuario.data_nascimento);

      if (!dataNascimento || isNaN(dataNascimento.getTime())) {
        setNascimentoInvalido(true);
        erroEditar = true;
      } else {
        // Calcular idade
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();

        const mesAtual = hoje.getMonth();
        const diaAtual = hoje.getDate();
        const mesNasc = dataNascimento.getMonth();
        const diaNasc = dataNascimento.getDate();

        if (
          mesAtual < mesNasc ||
          (mesAtual === mesNasc && diaAtual < diaNasc)
        ) {
          idade--;
        }

        if (idade < 18) {
          setNascimentoInvalido(true);
          erroEditar = true;
        }
      }
    }
    if (!dados_usuario.telefone || dados_usuario.telefone.length !== 11) {
      setTelefoneInvalido(true);
      erroEditar = true;
    }

    if (erroEditar == true) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/editando_dados", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados_usuario),
      });

      const data = await response.json();
      console.log(data);
      window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      window.location.reload();
    }, 3000);
    } catch (error) {
      console.error("Erro ao editar dados:", error);
    }
  };

  useEffect(() => {
    if (
      dados_usuario.nome_usuario &&
      dados_usuario.nome_usuario.trim().length > 0
    ) {
      setNomeInvalido(false);
    }
  }, [dados_usuario.nome_usuario]);

  useEffect(() => {
    if (
      dados_usuario.email_usuario &&
      dados_usuario.email_usuario.trim().length > 0
    ) {
      setEmailInvalido(false);
    }
  }, [dados_usuario.email_usuario]);

  useEffect(() => {
    if (dados_usuario.cpf && dados_usuario.cpf.trim().length > 0) {
      setCpfInvalido(false);
    }
  }, [dados_usuario.cpf]);

  useEffect(() => {
    if (dados_usuario.data_nascimento && dados_usuario.data_nascimento) {
      setNascimentoInvalido(false);
    }
  }, [dados_usuario.data_nascimento]);

  useEffect(() => {
    if (dados_usuario.telefone && dados_usuario.telefone.trim().length > 0) {
      setTelefoneInvalido(false);
    }
  }, [dados_usuario.telefone]);

  return (
    <div className="bg-[#F4F4F4] w-60/100 h-100/100 flex flex-col items-center  rounded-2xl">
      <div className="w-84/100 h-10/100 flex  mt-8 items-center">
        <h1 className="text-2xl font-medium text-purpledark ">
          Dados pessoais
        </h1>
      </div>
      <div className="flex flex-col mt-4 w-84/100">
        <label className="text-lg">Nome completo</label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: Manassés"
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5
             focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200 disabled:text-gray-500"
            value={
              dados_usuario.nome_usuario
                ? formatarNome(dados_usuario.nome_usuario)
                : ""
            }
            onChange={(e) =>
              setDados_usuario({
                ...dados_usuario,
                nome_usuario: e.target.value,
              })
            }
          />
        </div>
        <div className="h-6">
          {nomeInvalido && (
            <p className="text-red-500 text-sm  font-medium text-purpledark">
              {mensagemNome}
            </p>
          )}
        </div>
        <label className="text-lg ">Email</label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: Manassés@gmail.com"
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5
             focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200 disabled:text-gray-500"
            value={dados_usuario.email_usuario || ""}
            onChange={(e) =>
              setDados_usuario({
                ...dados_usuario,
                email_usuario: e.target.value,
              })
            }
          />
        </div>
        <div className="h-6">
          {emailInvalido && (
            <p className="text-red-500 text-sm  font-medium text-purpledark">
              {mensagemEmail}
            </p>
          )}
        </div>
        <label className="text-lg ">CPF</label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: 123.456.789.10"
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5
             focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200 disabled:text-gray-500"
            value={dados_usuario.cpf ? formatarCPF(dados_usuario.cpf) : ""}
            onChange={(e) =>
              setDados_usuario({
                ...dados_usuario,
                cpf: e.target.value,
              })
            }
          />
        </div>
        <div className="h-6">
          {cpfInvalido && (
            <p className="text-red-500 text-sm  font-medium text-purpledark">
              {mensagemCpf}
            </p>
          )}
        </div>
        <label className="text-lg">Data de nascimento</label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: 11/11/2000"
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5
             focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200 disabled:text-gray-500"
            value={
              dados_usuario.data_nascimento
                ? formatarData(
                    dados_usuario.data_nascimento
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")
                  )
                : ""
            }
            onChange={(e) => {
              const valorFormatado = formatarData(e.target.value);
              setDados_usuario({
                ...dados_usuario,
                data_nascimento: valorFormatado, // Salva o valor formatado
              });
            }}
          />
        </div>
        <div className="h-2">
          {nascimentoInvalido && (
            <p className="text-red-500 text-sm  font-medium text-purpledark">
              {mensagemNascimento}
            </p>
          )}
        </div>
        <label className="text-lg pt-5">Gênero</label>
        <div className="w-full pt-2">
          <select
            value={dados_usuario.genero || ""}
            onChange={(e) =>
              setDados_usuario({
                ...dados_usuario,
                genero: e.target.value,
              })
            }
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5
             focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200 disabled:text-gray-500"
          >
            <option value="P">Prefiro não informar</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
        <label className="text-lg pt-5">Telefone</label>
        <div className="w-full pt-2">
          <input
            type="text"
            placeholder="Ex: (48) 99999-9999"
            className="w-full border-[#D9D9D9] text-[#bdbbbb] border-2 rounded-lg p-1.5
             focus:border-purpleborde focus:text-black outline-none disabled:bg-gray-200 disabled:text-gray-500"
            value={
              dados_usuario.telefone ? formatarTele(dados_usuario.telefone) : ""
            }
            onChange={(e) =>
              setDados_usuario({
                ...dados_usuario,
                telefone: e.target.value.replace(/\D/g, ""),
              })
            }
          />
        </div>
        <div className="h-6">
          {telefoneInvalido && (
            <p className="text-red-500  text-sm  font-medium text-purpledark">
              {mensagemTelefone}
            </p>
          )}
        </div>
        <div className="flex w-full justify-end items-center h-20">
          <button
            className="p-2 border-purpledark border-2 w-38/100 rounded-lg font-medium text-purpledark 
            hover:cursor-pointer hover:bg-purpledark hover:text-white hover:transition duration-400 ease-in-out"
            onClick={salvar_dados}
          >
            <h1>SALVAR</h1>
          </button>
        </div>
      </div>
       <div>
              {SuccessModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                          <div className="bg-white rounded-4xl shadow-lg p-9 w-[450px] text-center">
                            <div className="flex justify-center mb-4 w-[100%]">
                              <img src={Checkroxinho} alt="" className="w-[25%]" />
                            </div>
              
                            <h2 className="text-2xl font-semibold text-gray1/90">
                                Tudo certo!
                            </h2>
                            <p className="text-gray3 mt-2 text-lg">
                               Seus dados foram armazenados com segurança.
                            </p>
                          </div>
                        </div>
                      )}
            </div>
    </div>
  );
}

export default Dados_pessoais;
