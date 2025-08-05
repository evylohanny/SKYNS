import React from 'react'
import logoFooter from "../assets/logoFooter.svg"
import social from "../assets/social.svg"
import FooterTecnico from "../components/FooterTecnico.jsx"

function FooterCompleto() {
  return (
    <div class="w-full">

      <div class="w-full border-t border-gray1/20" />

      <div class="max-w-6xl mx-auto px-6 py-10 grid grid-cols-4 gap-10 text-sm text-black border-b border-gray1/20">
        <div class="flex flex-col items-start">
          <img class="w-70 mb-2" src={logoFooter} alt="Logo" />
        </div>

        <div class="flex flex-col">
          <p class="font-medium mb-3">Menu</p>
          <ul class="space-y-1">
            <li class="font-light">Início</li>
            <li class="font-light">Produtos</li>
            <li class="font-light">Fórmulas</li>
            <li class="font-light">Contato</li>
          </ul>
        </div>

        <div class="flex flex-col">
          <p class="font-medium mb-3">Contato</p>
          <ul class="space-y-1">
            <li class="font-light">Skynscarebr@gmail.com</li>
            <li class="font-light">123.456.7891</li>
            <li class="font-light">8998 Lorem ipsum, Maecenas et, CA, 54321</li>
          </ul>
        </div>

        <div class="flex flex-col">
          <p class="font-medium mb-3">Social</p>
          <img src={social} alt="Redes sociais" class="w-30" />
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-6 py-10 grid grid-cols-4 gap-10 text-sm text-black">
        <div class="flex flex-col">
          <p class="font-medium mb-3">Equipe</p>
          <ul class="space-y-1">
            <li class="font-light">Manassés da rosa Marcelino</li>
            <li class="font-light">Mateus da Silva</li>
            <li class="font-light">Vitor de Mattos Azevedo</li>
            <li class="font-light">Brenda Maganeli Casimiro</li>
            <li class="font-light">Evelyn Lohanny Santos da Silva</li>
          </ul>
        </div>

        <div class="flex flex-col">
          <p class="font-medium mb-3">Professores</p>
          <ul class="space-y-1">
            <li class="font-light">Santiago Lima Coimbra</li>
            <li class="font-light">Davide Clode da Silva</li>
            <li class="font-light">Rafael Lindemann Duarte</li>
          </ul>
        </div>

        <div class="flex flex-col">
          <p class="font-medium mb-3">Suporte Capitais</p>
          <ul class="space-y-1">
            <li class="font-light">(11) 4002-8922 – São Paulo</li>
            <li class="font-light">(21) 3003-5566 – Rio de Janeiro</li>
            <li class="font-light">(51) 4040-9090 – Porto Alegre</li>
          </ul>
        </div>

        <div class="flex flex-col">
          <p class="font-medium mb-3">Formas de Pagamento</p>
          <ul class="space-y-1">
            <li class="font-light">Visa</li>
            <li class="font-light">Master</li>
            <li class="font-light">Boleto</li>
            <li class="font-light">Pix</li>
          </ul>
        </div>
      </div>

      <FooterTecnico />
    </div>
  )
}

export default FooterCompleto
