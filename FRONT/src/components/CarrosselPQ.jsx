import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function CarrosselPQ() {
  return (
    <div class="flex gap-1.5 bg-blue p-3 items-center justify-center">
      <Swiper spaceBetween={20} slidesPerView={1}>
        <SwiperSlide class="flex gap-1.5 items-center justify-center">
            <h1 class="text-purpledark font-bold">Ganhe 10,00% de desconto no seu primeiro pedido. Utilize o cupom</h1>
            <h1 class="text-purpledark italic">DESCONTO10</h1>
        </SwiperSlide>
        <SwiperSlide class="flex gap-1.5 items-center justify-center">
            <h1 class="text-purpledark font-bold">Ganhe 10,00% de desconto no seu primeiro pedido. Utilize o cupom</h1>
            <h1 class="text-purpledark italic">DESCONTO10</h1>
        </SwiperSlide>
        <SwiperSlide class="flex gap-1.5 items-center justify-center">
            <h1 class="text-purpledark font-bold">Ganhe 10,00% de desconto no seu primeiro pedido. Utilize o cupom</h1>
            <h1 class="text-purpledark italic">DESCONTO10</h1>
        </SwiperSlide>
        <SwiperSlide class="flex gap-1.5 items-center justify-center">
            <h1 class="text-purpledark font-bold">Ganhe 10,00% de desconto no seu primeiro pedido. Utilize o cupom</h1>
            <h1 class="text-purpledark italic">DESCONTO10</h1>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default CarrosselPQ
