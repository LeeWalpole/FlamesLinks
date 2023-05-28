"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css/pagination"
import "swiper/css"

interface ProfileCardProps {
  images: { title: string; link: string; imageURL: string }[]
}

const ProfileCard: React.FC<ProfileCardProps> = ({ images }) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={30}
      className="mySwiper max-w-full"
    >
      {images.map((image, index) => (
        <div className="w-[100px]">
          <SwiperSlide key={index} className="swiper-carousel">
            <figure>
              <Image
                width={250}
                height={250}
                src={image.imageURL}
                alt={`Slide ${index + 1}`}
                className="imageClassName" // Replace with your desired image class name
              />
              <figcaption>{image.title}</figcaption>
            </figure>
          </SwiperSlide>
        </div>
      ))}
    </Swiper>
  )
}

export default ProfileCard
