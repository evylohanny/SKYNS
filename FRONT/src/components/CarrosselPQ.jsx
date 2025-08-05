import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

function CarrosselPQ() {
  return (
    <div className="bg-blue p-3 font-primary">
  <Swiper
    modules={[Autoplay]}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    loop={true}
    speed={2000}
    spaceBetween={20}
    slidesPerView={1}
  >
    <SwiperSlide>
      <div className="flex gap-1.5 items-center justify-center">
        <h1 className="text-purpledark font-bold">
          Ganhe 10,00% de desconto no seu primeiro pedido. Utilize o cupom
        </h1>
        <h1 className="text-purpledark italic">DESCONTO10</h1>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="flex gap-1.5 items-center justify-center">
        <h1 className="text-purpledark font-bold">
          Ganhe 10,00% de desconto no seu primeiro pedido. Utilize o cupom
        </h1>
        <h1 className="text-purpledark italic">DESCONTO10</h1>
      </div>
    </SwiperSlide>
  </Swiper>
</div>

  )
}

export default CarrosselPQ
