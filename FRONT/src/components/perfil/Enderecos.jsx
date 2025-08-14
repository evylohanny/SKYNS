import { useState } from "react";


function Enderecos() {

  const [valor_cep_endereco, setValor_cep_endereco] = useState()

  const formatarCEP = (value) => {
  value = value.replace(/\D/g, ""); // remove tudo que não é número
  value = value.replace(/^(\d{5})(\d)/, "$1-$2"); // adiciona o traço
  return value.slice(0, 9); // limita a 9 caracteres
};
  return (
    <div className='bg-[#F4F4F4] h-160 w-60/100 flex flex-col items-center  rounded-2xl'>
      <div className="w-84/100 h-10/100 flex mt-4 items-center"> 
          <h1 className="text-2xl font-medium ">Endereço</h1>
      </div>
      <div className="flex flex-col w-84/100">
         <label htmlFor="" className="text-lg">CEP</label>
         <div className="w-full pt-2" >
           <input type="text" placeholder="Ex: 88060-205" className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none " 
             value={valor_cep_endereco}
            onChange={(e) => setValor_cep_endereco(formatarCEP(e.target.value))}
             />
         </div>
         <label htmlFor="" className="text-lg pt-5">Rua/servidão</label>
         <div className="w-full pt-2" >
           <input type="text" placeholder="Ex: Servidão rosalina" className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none " 
             />
         </div>
         <label htmlFor="" className="text-lg pt-5">Numero</label>
         <div className="w-full pt-2" >
           <input type="text" maxLength={5} placeholder="Ex: 163" className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none " 
             />
         </div>
         <label htmlFor="" className="text-lg pt-5">Complemento</label>
         <div className="w-full pt-2" >
           <input type="text" placeholder="Ex: Casa/apartamento" className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none " 
             />
         </div>
       
         <div className="flex w-full justify-end items-center h-40">
            <button className="p-2 border-purpledark border-2 w-38/100 rounded-lg font-medium text-purpledark 
            hover:cursor-pointer hover:bg-purpledark hover:text-white hover:transition duration-400 ease-in-out"
            >
                EDITAR
            </button>
         </div>
       </div>
    </div>
  )
}

export default Enderecos