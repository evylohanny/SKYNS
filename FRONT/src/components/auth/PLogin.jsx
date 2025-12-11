import { useState, useEffect } from "react";
import ky from "ky";
import { useNavigate } from "react-router-dom";
import Checkroxinho from "../../assets/Checkroxinho.svg";

// 🚨 CREDENCIAIS DE ADMINISTRADOR FIXAS (APENAS PARA TESTES LOCAIS!)
const ADMIN_EMAIL = "admin@gestao.com";
const ADMIN_SENHA = "12345678";
const ADMIN_ID_FIXO = "99999"; // Um ID fixo para o localStorage

function PLogin() {
    const navigate = useNavigate();

    const [valor_email_login, setValor_email_login] = useState("");
    const [valor_senha_login, setValor_senha_login] = useState("");
    const [mensagem_erro_login, setMensagem_erro_login] = useState("");
    const [erro_login, setErro_login] = useState(false);

    const [tipoInput, setTipoInput] = useState("password");
    const [tipoIconSenha, setTipoIconSenha] = useState("icon_nao_ver.png");
    
    const [SuccessModal, setSuccessModal] = useState(false);

    const alternarTipo = () => {
        setTipoInput((prev) => (prev === "password" ? "text" : "password"));
        setTipoIconSenha((prev) =>
            prev === "icon_nao_ver.png" ? "icon_ver.png" : "icon_nao_ver.png"
        );
    };

    useEffect(() => {
        if (valor_senha_login.length > 0) {
            setMensagem_erro_login("");
            setErro_login(false);
        }
    }, [valor_senha_login]);

    useEffect(() => {
        if (valor_email_login.length > 0) {
            setMensagem_erro_login("");
            setErro_login(false);
        }
    }, [valor_email_login]);

    const logar = async () => {
        
        // ===============================================================
        // 🔑 LÓGICA DE VALIDAÇÃO DO ADMIN FIXO (NO FRONTEND)
        // ===============================================================
        if (valor_email_login === ADMIN_EMAIL && valor_senha_login === ADMIN_SENHA) {
            console.log("Login de Admin Fixo reconhecido. Redirecionando para /gestao");
            // Define um ID fixo para simular o usuário logado (necessário para outras partes do app)
            localStorage.setItem("id_usuario_logado", ADMIN_ID_FIXO);
            localStorage.setItem("e_admin", "true"); 
            navigate("/gestao");
            return; // Interrompe a função para não chamar o backend
        }
        // ===============================================================
        
        // --- VALIDAÇÃO DE EMAIL E SENHA INICIAL (NORMAL) ---
        if (
            (!valor_email_login.includes("@gmail.com") &&
                !valor_email_login.includes("@hotmail.com")) ||
            valor_senha_login.length < 4
        ) {
            setMensagem_erro_login("Email ou senha incorreto!");
            setErro_login(true);
            return;
        }

        // Pegar o carrinho da chave 'carrinho' (que foi salva no NavBar)
        let carrinhoTemporario = JSON.parse(localStorage.getItem("carrinho")) || [];
        console.log("Carrinho temporário encontrado:", carrinhoTemporario);

        try {
            const response = await ky
                .post("http://localhost:3000/login", {
                    json: { email: valor_email_login, senha: valor_senha_login },
                })
                .json();

            const usuarioId = response.decode.id;
            const e_admin = response.e_admin; // Status de admin vindo do DB
            
            localStorage.setItem("id_usuario_logado", usuarioId);
            console.log("Usuário logado com ID:", usuarioId);

            if (response) {
                // Se houver carrinho temporário, migrar para o usuário
                if (carrinhoTemporario.length > 0) {
                    console.log("Migrando carrinho temporário para usuário...");
                    await migrarCarrinhoParaUsuario(usuarioId, carrinhoTemporario);
                }

                // Verificar se há redirecionamento pendente
                const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");
                
                // Limpar dados temporários
                localStorage.removeItem("carrinho");
                localStorage.removeItem("carrinhoLocal");
                localStorage.removeItem("carrinhoTemporario");
                localStorage.removeItem("redirectAfterLogin");
                
                // Disparar evento para atualizar o NavBar
                window.dispatchEvent(new Event('carrinhoAtualizado'));
                
                // Redirecionamento baseado na resposta do DB (Lógica de segurança)
                if (e_admin === true) {
                     console.log("Usuário ADMIN do DB. Redirecionando para /gestao");
                     navigate("/gestao");
                     return;
                }
                
                // Redirecionar
                if (redirectAfterLogin) {
                    console.log("Redirecionando para:", redirectAfterLogin);
                    navigate(redirectAfterLogin);
                } else {
                    setSuccessModal(true);
                    setTimeout(() => {
                        setSuccessModal(false);
                        navigate('/')
                    }, 3000);
                    
                }
            }
        } catch (error) {
            console.error("Erro ao logar:", error);
            setMensagem_erro_login("Email ou senha incorreto!");
            setErro_login(true);
        }
    };

    // Função para migrar carrinho temporário para usuário logado
    const migrarCarrinhoParaUsuario = async (usuarioId, itens) => {
        // ... (Sua lógica de migração de carrinho)
        console.log(`Migrando ${itens.length} itens para usuário ${usuarioId}`);
        
        for (let i = 0; i < itens.length; i++) {
            const item = itens[i];
            try {
                // Usar a mesma estrutura que o NavBar usa
                const itemParaEnviar = {
                    fk_id_usuario: parseInt(usuarioId),
                    fk_id_produto: item.fk_id_produto || item.id,
                    quantidade: item.quantidade || 1,
                    preco_unitario: item.preco_unitario || item.valor || 0,
                    nome_produto: item.nome_produto || item.nome || "Produto",
                    imagem_produto: item.imagem_produto || item.img || "",
                    componentes_selecionados: item.componentes_selecionados || ""
                };
                
                console.log("Enviando item:", itemParaEnviar);
                
                await ky.post("http://localhost:3000/carrinho", {
                    json: itemParaEnviar
                }).json();
                
                console.log(`Item ${i + 1} migrado com sucesso`);
            } catch (error) {
                console.error(`Erro ao migrar item ${i + 1}:`, error);
            }
        }
        console.log("Migração de carrinho concluída");
    };

    return (
        // ... (Seu JSX de renderização permanece inalterado)
        <div className="flex flex-col w-full pt-12">
            <div className="flex flex-col w-full justify-center items-center">
                <p className="w-4/6 text-[40px]">Que bom ter você aqui!</p>
                <p className="w-4/6 text-2xl pt-2">
                    Insira suas credenciais para acessar sua conta
                </p>
            </div>
            <div className="flex flex-col w-full justify-center items-center pt-8">
                <label className="w-4/6 text-xl" htmlFor="">
                    Endereço de e-mail
                </label>
                <div className="flex w-full pt-3 justify-center items-center">
                    <input
                        className="w-4/6 border-2 border-[#D9D9D9] p-2 rounded-lg focus:border-purpledark outline-none"
                        type="text"
                        placeholder="Ex: Ronaldo@gmail.com"
                        onChange={(e) => setValor_email_login(e.target.value)}
                    />
                </div>

                <label className="w-4/6 text-xl pt-7" htmlFor="">
                    Senha
                </label>
                <div className="flex w-full pt-3 justify-center items-center">
                    <div className="flex w-4/6 border-2 border-[#D9D9D9] justify-center items-center rounded-lg focus-within:border-purpledark outline-none">
                        <input
                            className="w-full border-[#D9D9D9] p-2 rounded-lg outline-none"
                            type={tipoInput}
                            placeholder="Ex: 1234"
                            maxLength={8}
                            onChange={(e) => setValor_senha_login(e.target.value)}
                        />
                        <img
                            className="pr-3 w-9 h-6 cursor-pointer"
                            src={tipoIconSenha}
                            alt="Mostrar senha"
                            onClick={alternarTipo}
                        />
                    </div>
                </div>

                <div
                    className={`text-purpledark w-4/6 pl-1 h-4 flex items-center transition-opacity duration-500 ${
                        erro_login ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <p className="h-3">{mensagem_erro_login}</p>
                </div>
            </div>

            <div className="flex pt-5 w-full justify-center items-center">
                <div className="flex text-white w-full justify-center items-center pt-3">
                    <button
                        onClick={logar}
                        className="bg-purpledark w-4/6 font-bold rounded-2xl p-2.5 cursor-pointer"
                    >
                        Login
                    </button>
                </div>
            </div>

            <div className="w-full flex items-center justify-center pt-5">
                <div className="cursor-pointer w-4/6 flex justify-center items-center border-2 border-purpledark rounded-2xl p-1 space-x-4 text-purpledark">
                    <img src="logo_gogle.svg" alt="" />
                    <p className="font-bold">Entrar com o Google</p>
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
                                Login realizado!
                            </h2>
                            <p className="text-gray3 mt-2 text-lg">
                                Seja bem-vindo(a) de volta!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PLogin;