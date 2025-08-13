import React from 'react'

function Cartoes() {
  return (
    <div className='bg-[#F4F4F4] h-160 w-60/100 flex flex-col items-center  rounded-2xl'>
      <div className="w-84/100 h-10/100 mt-4 flex items-center"> 
          <h1 className="text-2xl font-medium ">Seu cartão</h1>
      </div>
      <div className="flex flex-col w-84/100">
         <label htmlFor="" className="text-lg">Nome do titular</label>
         <div className="w-full pt-2" >
           <input type="text" placeholder="Ex: Manassés marcelino" className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none " 
             />
         </div>
         <label htmlFor="" className="text-lg pt-5">Numero</label>
         <div className="w-full pt-2" >
           <input type="text" placeholder="Ex: 1111 1111 1111 1111" className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none " 
             />
         </div>
         <label htmlFor="" className="text-lg pt-5">CVC</label>
         <div className="w-full pt-2" >
           <input type="text" placeholder="Ex: 011" className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
             focus:border-purpleborde outline-none " 
             />
         </div>
         <label htmlFor="" className="text-lg pt-5">Validade</label>
         <div className="w-full pt-2" >
           <input type="text" placeholder="Ex: 06/40" className="w-full border-[#D9D9D9] border-2 rounded-lg p-1.5
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

export default Cartoes