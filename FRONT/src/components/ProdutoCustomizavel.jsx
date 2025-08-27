import Filtro from '../components/Filtro.jsx'
import NavBar from '../components/NavBar.jsx'

// fotos
import noture1 from '../assets/SKYNSNature1.svg'
import noture2 from '../assets/SKYNSNature2.svg'
import noture3 from '../assets/SKYNSNature3.svg'
import estrelas from '../assets/estrelas.svg'

function ProdutoCustomizavel() {
  return (
    <div>
      <NavBar />

      <div className="flex pt-5 pl-6 gap-8">
          <Filtro />

        {/* 2 - Fotos */}
        <div className="flex gap-6">
          {/* Coluna de miniaturas */}
          <div className="flex flex-col gap-4">
            <img className="w-[80px]" src={noture3} alt="" />
            <img className="w-[80px]" src={noture1} alt="" />
            <img className="w-[80px]" src={noture2} alt="" />
          </div>
          {/* Foto grande */}
          <div>
            <img
              className="h-[550px] w-[450px] object-cover"
              src={noture3}
              alt=""
            />
          </div>
        </div>

        {/* 3 - Detalhes do produto */}
        <div className="p-4 flex flex-col">
          <div className="flex items-center gap-4">
            <p className="bg-lightgreen p-0.5 px-1 text-purpledark font-bold rounded-[7px]">
              10% OFF
            </p>
            <img src={estrelas} alt="estrelas" />
          </div>
          <p className="pt-6 font-medium text-[25px] text-gray2">
            Sérum Rejuvenescedor Nocturne 45+
          </p>
          <div class='flex justify-end '>
          <p className="mt-4 bg-blackwhite/40 w-fit px-2 py-0.5 rounded">
            300g
          </p>
          </div>

          <div class='pt-10 flex gap-3 items-center'>
            <p class='line-through text-black/40 font-bold'>R$89,90</p> <p class=' text-purpledark font-bold text-[25px]'>R$59,90</p>
          </div>
          <div>
            <p class='w-100 text-[15px]'>Pele renovada e protegida, até nos dias mais ensolarados!Prepare sua pele para brilhar com segurança! O Esfoliante Solar Ultra UV Apripeiadi foi desenvolvido especialmente para quem quer cuidar das manchas e renovar a pele sem abrir mão da proteção solar.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProdutoCustomizavel
