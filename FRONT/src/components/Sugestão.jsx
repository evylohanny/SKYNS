import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import foto1Su from '../assets/foto1Su.svg';

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
    <div className="bg-graymedium p-6 rounded-lg">
      <h2 className="text-lg font-semibold">Aproveite as promoções e complete sua rotina</h2>
      <p className="text-gray-500 text-sm mb-6">Até 10% OFF na compra de 3 unidades</p>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={4}
        className="pb-6"
      >
        {produtos.map((item, index) => (
          <SwiperSlide
            key={index}
            className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col justify-between h-[350px]"
          >
            <img
              src={item.img}
              alt={item.nome}
              className="object-cover"
            />
            <div>
              <p className="text-sm font-medium mt-3 line-clamp-2">{item.nome}</p>
              <p className="text-purple-500 font-semibold">{item.preco}</p>
            </div>
            <button className="bg-purple-500 hover:bg-purple-600 text-purpledark px-5 py-2 mt-3 rounded-full font-semibold transition-colors">
              LEVAR
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Sugestão;
