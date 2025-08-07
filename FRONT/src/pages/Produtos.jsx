import React, { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import NavBar from '../components/NavBar'
import foto1 from '../assets/Produtoesfoliante.png'
import foto2 from '../assets/foto2.svg'
import foto3 from '../assets/ESfoliantesozinho.png'
import estrelas from '../assets/estrelas.svg'

const imagens = [foto1, foto2, foto3]

function Produtos() {
  const swiperRef = useRef(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleMiniaturaClick = (index) => {
    swiperRef.current?.swiper.slideTo(index)
    setActiveIndex(index)
  }

  useEffect(() => {
    const swiper = swiperRef.current?.swiper
    if (!swiper) return

    // Linka os botões customizados às navegações do Swiper
    swiper.params.navigation.prevEl = prevRef.current
    swiper.params.navigation.nextEl = nextRef.current

    // Inicializa a navegação com os botões customizados
    swiper.navigation.destroy()
    swiper.navigation.init()
    swiper.navigation.update()

    swiper.on('slideChange', () => {
      setActiveIndex(swiper.realIndex)
    })
  }, [])

  return (
    <div>
      <NavBar />
      <div className=" flex ml-30 gap-20 mt-10 px-1">
        {/* Miniaturas */}
        <div className="flex">
          <div className="flex flex-col space-y-4 mr-6">
            {imagens.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Miniatura ${index}`}
                onClick={() => handleMiniaturaClick(index)}
                className={`w-28 h-28 object-cover cursor-pointer transition ${
                  activeIndex === index ? 'border-2 border-purpledark' : 'border border-transparent'
                }`}
              />
            ))}
          </div>

          {/* Swiper e botões */}
          <div className="w-[500px] relative">
            <Swiper
              modules={[Navigation]}
              ref={swiperRef}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              slidesPerView={1}
            >
              {imagens.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`Slide ${index}`} className="w-150 h-140 object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              ref={prevRef}
              className="swiper-button-prev-custom absolute hover:border-purpledark top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white rounded-full cursor-pointer z-10 bg-white/20 backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </div>

            <div
              ref={nextRef}
              className="swiper-button-next-custom absolute hover:border-purpledark top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white rounded-full cursor-pointer z-10 bg-white/20 backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        <div >
            <div class='flex gap-4'>
                <p class= 'font-medium text-purpledark bg-grennSemiDark p-0.5 px-2 rounded-lg'>10% OFF</p>
                <img src={estrelas} alt="" />
            </div>
            <div>
                <p class='font-bold text-blackwhite/80 text-3xl pt-2'>Esfoliante Solar ultra UV</p>
            </div>
            <div class='flex justify-end items-end w-90'>
                <p class='bg-black/10 max-w-fit p-1 px-1 text-xs  '>300g</p>
            </div>
            <div class='pt-15 flex gap-5 items-center'>
                <p class='line-through text-blackwhite/50'>R$89,90</p>
                <p class='text-purpledark font-bold text-2xl'>R$59,90</p>
            </div>
            <div class='w-150 pt-10 text-blackwhite/90'>
                <p>Pele renovada e protegida, até nos dias mais ensolarados! Prepare sua pele para brilhar com segurança! O Esfoliante Solar Ultra UV Apripeiadi foi desenvolvido especialmente para quem quer cuidar das manchas e renovar a pele sem abrir mão da proteção solar.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Produtos
