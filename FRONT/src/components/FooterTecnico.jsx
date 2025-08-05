import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex flex-col ">
      <div className="h-50 bg-footer flex flex-col justify-center items-center gap-3 ">
        <p class=" text-white font-medium">© 2025 SKYNS. Todos os direitos reservados.</p>
        <p class=" text-white font-medium">Rua Congego Eugenio Leite, 767 - floripa/SC - CEP.05414-012. CNPJ J:32.124.385/0001-95</p>
        <Link class=" text-white font-medium">Termos de uso</Link>
        <Link class=" text-white font-medium">Políticas de Privacidade</Link>
      </div>
    </div>
  );
}

export default Footer;
