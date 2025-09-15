//imagens
import Logo from "../assets/logo.svg";

//componentes
import CarrosselPQ from "../components/CarrosselPQ";

function Pagamento() {
  return (
    <div>
      <CarrosselPQ />
      <div class="w-400 border-b border-b-blackwhite/20 flex items-center justify-center p-4">
        <img class=" w-30" src={Logo} alt="" />
      </div>

      <div class="flex">
        {/* lado esquerdo */}
        <div class="w-[60%] p-5">
          {/* Entrega */}
          <div class="flex flex-col p-10 justify-center pl-[40%]">
            <p class="text-2xl font-secondary text-blackwhite/80 ">Entrega</p>
            <label class="mt-3 text-blackwhite/80 font-semibold">CEP</label>
            <input
              class="text-sm p-1 mt-1 border-2 px-2 border-purple w-85 rounded-[5px]"
              type="text"
              name=""
              id=""
              placeholder="ex: 88010-120"
            />
          </div>
          <div class="flex flex-col justify-center pl-[40%]">
            <label class=" text-blackwhite/80 font-semibold">
              Cupom de desconto
            </label>
            <input
              class="text-sm p-1 mt-3 border-2 px-2 border-purple w-85 rounded-[5px]"
              type="text"
              name=""
              id=""
              placeholder="ex: desconto10"
            />
          </div>
          <div class="flex flex-col p-10 justify-center pl-[40%] ">
            <p class="text-1xl font-secondary text-blackwhite/80 font-bold">
              Resumo
            </p>
            <div class="flex justify-between w-79 items-center">
              <label class="mt-3 text-blackwhite/80 text-[13px]">ENTREGA</label>{" "}
              <p class="mt-3 font-medium"> R$16,90</p>
            </div>
            <div class="flex justify-between w-79 items-center border-b-1 border-b-blackwhite/20 pb-10">
              <label class="mt-3 text-blackwhite/80 font-bold text-[20px]">
                Subtotal
              </label>{" "}
              <p class="mt-3 font-medium text-2xl text-purpledark"> R$290,90</p>
            </div>
          </div>

          {/* Pagamento */}
          <div class="flex flex-col p-6 justify-center pl-[40%]">
            <p class="text-2xl font-secondary text-blackwhite/80 ">Pagamento</p>
            <label class="mt-3 text-blackwhite/80 font-semibold">
              Número do Cartão
            </label>
            <input
              class="text-sm p-1 mt-1 border-2 px-2 border-purple w-85 rounded-[5px]"
              type="text"
              name=""
              id=""
              placeholder="ex: 123456789"
            />
          </div>
          <div className="flex justify-center gap-5  pl-[17%]">
            <div className="flex flex-col">
              <label className="text-blackwhite/80 font-semibold">
                Data de expiração
              </label>
              <input
                className="text-sm p-1 mt-1 border-2 px-2 border-purple w-40 rounded-[5px]"
                type="text"
                placeholder="ex: 10/30"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-blackwhite/80 font-semibold">
                Código de segurança
              </label>
              <input
                className="text-sm p-1 mt-1 border-2 px-2 border-purple w-40 rounded-[5px]"
                type="text"
                placeholder="ex: 975"
              />
            </div>
          </div>
           <div class="flex flex-col p-6 justify-center pl-[40%]">
            <label class="mt-3 text-blackwhite/80 font-semibold">
              Titular do Cartão
            </label>
            <input
              class="text-sm p-1 mt-1 border-2 px-2 border-purple w-85 rounded-[5px]"
              type="text"
              name=""
              id=""
              placeholder="ex: Manassés Marcelino"
            />
          </div>
        </div>

        {/* lado Direito */}
        <div class="w-[40%] bg-blackwhite/10">
          {/* Entrega */}
          <div class="flex flex-col p-10">
            <p>Entrega</p>
            <label>CEP</label>
            <input type="text" name="" id="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagamento;
