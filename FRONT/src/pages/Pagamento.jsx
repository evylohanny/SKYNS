//imagens
import Logo from "../assets/logo.svg";
import foto1 from "../assets/SKYNSNature1.svg";
//componentes
import CarrosselPQ from "../components/CarrosselPQ";

function Pagamento() {
  return (
    <div>
      <CarrosselPQ />
      <div class="w-[100%] border-b border-b-blackwhite/20 flex items-center justify-center p-4">
        <img class=" w-30" src={Logo} alt="" />
      </div>

      <div class="flex">
        {/* lado esquerdo */}
        <div class="w-[60%] p-5 mr-[40%]">
          {/* Entrega */}
          <div class="flex flex-col p-10 justify-center pl-[40%]">
            <p class="text-2xl font-secondary text-blackwhite/80 ">Entrega</p>
            <label class="mt-3 text-blackwhite/80 font-semibold">CEP</label>
            <input
              class="text-sm p-2 mt-1 border-1 px-2 border-blackwhite/60 w-85 rounded-[5px] focus:border-purpledark"
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
              class="text-sm p-2 mt-3 border-1 px-2 border-blackwhite/60 w-85 rounded-[5px] focus:border-purpledark"
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
              class="text-sm p-2 mt-1 border-1 px-2 border-blackwhite/60 w-85 rounded-[5px] focus:border-purpledark"
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
                className="text-sm p-2 mt-1 border-1 px-2 border-blackwhite/60 w-40 rounded-[5px] focus:border-purpledark"
                type="text"
                placeholder="ex: 10/30"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-blackwhite/80 font-semibold">
                Código de segurança
              </label>
              <input
                className="text-sm p-2 mt-1 border-1 px-2 border-blackwhite/60 w-40 rounded-[5px] focus:border-purpledark"
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
              class="text-sm p-2 mt-1 border-1 px-2 border-blackwhite/60 w-85 rounded-[5px] focus:border-purpledark"
              type="text"
              name=""
              id=""
              placeholder="ex: Manassés Marcelino"
            />
          </div>

          <div class="flex gap-2 justify-center pl-[10%]">
            <input type="checkbox" name="" id="" />
            <label htmlFor=""> Salvar forma de pagamento 30 dias</label>
          </div>

          <div class="flex flex-col p-10 justify-center pl-[40%] ">
            <div class="flex justify-between w-79 items-center pb-10">
              <label class="mt-3 text-blackwhite/90 font-bold text-[22px]">
                Valor Total
              </label>{" "}
              <p class="mt-3 font-medium text-2xl text-purpledark"> R$290,90</p>
            </div>

            <div>
              <button class="bg-purpledark w-85 p-2 rounded-[5px] cursor-pointer text-white text-[17px] font-medium">
                Pagar
              </button>
            </div>
          </div>
        </div>

        {/* lado Direito */}
        <div className="absolute right-0 top-27 w-[40%] h-[150vh] bg-blackwhite/10 overflow-y-auto">

        <div class="fixed right-0 top-27 w-[40%] h-[90%] overflow-y-auto">
          {/* pedidos */}
          <div class="flex flex-col p-10 gap-5">
            <p class="text-[20px]">Resumo de Pedidos</p>
            <div class="flex  gap-4 w-98 ">
              <img class="w-23" src={foto1} alt="" />
              <div class="flex flex-col ">
                <p class="text-blackwhite/80">
                  Sérum Rejuvenescedor Nocturne 45+ - 300g pele madura
                </p>
                <p class="mt-3 text-[19px] text-purpledark font-semibold">
                  R$89,90
                </p>
              </div>
            </div>
            <div class="flex  gap-4 w-98 ">
              <img class="w-23" src={foto1} alt="" />
              <div class="flex flex-col ">
                <p class="text-blackwhite/80">
                  Sérum Rejuvenescedor Nocturne 45+ - 300g pele madura
                </p>
                <p class="mt-3 text-[19px] text-purpledark font-semibold">
                  R$89,90
                </p>
              </div>
            </div>
            <div class="flex  gap-4 w-98 ">
              <img class="w-23" src={foto1} alt="" />
              <div class="flex flex-col ">
                <p class="text-blackwhite/80">
                  Sérum Rejuvenescedor Nocturne 45+ - 300g pele madura
                </p>
                <p class="mt-3 text-[19px] text-purpledark font-semibold">
                  R$89,90
                </p>
              </div>
            </div>

            <div class="flex gap-5 mt-6">
              <button class="cursor-pointer border font-semibold border-purpledark p-1 px-5 text-purpledark rounded-[5px]">
                Limpar Pedido
              </button>{" "}
              <button class="bg-purpledark rounded-[5px] p-1 px-7 cursor-pointer text-white">
                Escolher Mais Produtos
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Pagamento;
