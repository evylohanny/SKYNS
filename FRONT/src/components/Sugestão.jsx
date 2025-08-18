import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import foto1Su from '../assets/foto1Su.svg';
import setaEsquerda from '../assets/setaEsquerda.svg';
import setaDireita from '../assets/setaDireita.svg';

function Sugestão() {
  const produtos = [
    {
      img: foto1Su,
      nome: 'Protetor labial sabor cereja do amor',
      preco: 'R$ 59,90'
    },
    {
      img: foto1Su,
      nome: 'Ativo labial cereja do amor',
      preco: 'R$ 59,90'
    },
    {
      img: foto1Su,
      nome: 'Ativo labial laranja vern de verão ',
      preco: 'R$ 59,90'
    },
    {
      img: foto1Su,
      nome: 'Protetor labial sabor cereja do amor',
      preco: 'R$ 59,90'
    },
    {
      img: foto1Su,
      nome: 'Ativo labial cereja do amor',
      preco: 'R$ 59,90'
    }
  ];

  return (
    <div className="relative bg-graymedium p-6 rounded-lg">
      <div className='flex flex-col px-20'>
        <h2 className="text-lg font-semibold text-gray2">Aproveite as promoções e complete sua rotina</h2>
        <p className="text-gray2 text-sm mb-6">Até 10% OFF na compra de 3 unidades</p>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        spaceBetween={20}
        slidesPerView={1}
        className="pb-6"
      >
        {produtos.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!flex flex-row px-20 text-center justify-center items-center h-[350px]"
          >
            {/* repetições de produto */}
            <div className='flex flex-col w-[20%] justify-center items-start'>
              <img
                src={item.img}
                alt={item.nome}
                className="object-cover w-[80%]"
              />
              <div className='!flex flex-col w-[70%] items-start gap-3'>
                <p className="text-sm font-medium mt-3 line-clamp-2 text-black/70">{item.nome}</p>
                <p className="text-purpledark/75 font-semibold">{item.preco}</p>
              </div>
              <button className="bg-purpledark text-white px-10 py-2 mt-3 rounded-full font-semibold">
                LEVAR
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botão Esquerda */}
      <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <img src={setaEsquerda} alt="Anterior" className="w-8 h-8" />
      </button>

      {/* Botão Direita */}
      <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <img src={setaDireita} alt="Próximo" className="w-8 h-8" />
      </button>
    </div>
  );
}

export default Sugestão;
