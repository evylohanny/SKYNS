import { useEffect, useState } from "react";
import ky from "ky";
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

  const validarMaioridade = (dataNascimento) => {
    if (!dataNascimento) return false;
    
    // Converte a data do formato DD/MM/YYYY para Date object
    const [dia, mes, ano] = dataNascimento.split('/').map(Number);
    const dataNasc = new Date(ano, mes - 1, dia); // mês é 0-indexed no JavaScript
    
    // Data atual
    const hoje = new Date();
    
    // Calcula a idade
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    
    // Ajusta a idade se ainda não fez aniversário este ano
    if (mesAtual < dataNasc.getMonth() || 
        (mesAtual === dataNasc.getMonth() && diaAtual < dataNasc.getDate())) {
      idade--;
    }
    
    return idade >= 18;
  };

  const [nomeInvalido, setNomeInvalido] = useState(false);
  const mensagemNome = "Digite seu nome corretamente!";
  const [emailInvalido, setEmailInvalido] = useState(false);
  const mensagemEmail = "Email invalido!";
  const [cpfInvalido, setCpfInvalido] = useState(false);
  const mensagemCpf = "Cpf invalido!";
  const [nascimentoInvalido, setNascimentoInvalido] = useState(false);
  const mensagemNascimento = "Você deve ser maior de 18 anos!";

  const salvar_dados = async () => {
    // Resetar estados de erro
    setNomeInvalido(false);
    setEmailInvalido(false);
    setCpfInvalido(false);
    setNascimentoInvalido(false);

    let temErro = false;

    // Validação do nome
    if (
      !dados_usuario.nome_usuario ||
      dados_usuario.nome_usuario.trim().length < 3
    ) {
      setNomeInvalido(true);
      temErro = true;
    }

    // Validação do email
    if (
      !dados_usuario.email_usuario ||
      (!dados_usuario.email_usuario.trim().includes("@gmail.com") &&
        !dados_usuario.email_usuario.trim().includes("@hotmail.com"))
    ) {
      setEmailInvalido(true);
      temErro = true;
    }

    // Validação do CPF
    if (!dados_usuario.cpf || dados_usuario.cpf.trim().length < 14) {
      setCpfInvalido(true);
      temErro = true;
    }

    // Validação da data de nascimento
    if (!dados_usuario.data_nascimento || !validarMaioridade(dados_usuario.data_nascimento)) {
      setNascimentoInvalido(true);
      temErro = true;
    }

    // Se houver algum erro, não prossegue com o salvamento
    if (temErro) {
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
      window.location.reload(); 
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
    if (
      dados_usuario.cpf &&
      dados_usuario.cpf.trim().length > 0
    ) {
      setCpfInvalido(false);
    }
  }, [dados_usuario.cpf]);

  useEffect(() => {
    if (
      dados_usuario.data_nascimento &&
      validarMaioridade(dados_usuario.data_nascimento)
    ) {
      setNascimentoInvalido(false);
    }
  }, [dados_usuario.data_nascimento]);


  return (
    <div className="bg-[#F4F4F4] w-60/100 flex flex-col items-center  rounded-2xl">
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
            onChange={(e) =>
              setDados_usuario({
                ...dados_usuario,
                data_nascimento: e.target.value,
              })
            }
          />
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
        <div className="flex w-full justify-end items-center h-40">
          <button
            className="p-2 border-purpledark border-2 w-38/100 rounded-lg font-medium text-purpledark 
            hover:cursor-pointer hover:bg-purpledark hover:text-white hover:transition duration-400 ease-in-out"
            onClick={salvar_dados}
          >
            <h1>SALVAR</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dados_pessoais;
