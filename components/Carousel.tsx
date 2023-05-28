"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"

import { Button } from "@/components/ui/button"
import ProfileHeader from "@/components/Profile-Header"
import { Icons } from "@/components/icons"

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
              <Link href="/profile">
                <Image
                  width={250}
                  height={250}
                  src={image.imageURL}
                  alt={`Slide ${index + 1}`}
                  className="imageClassName" // Replace with your desired image class name
                />
              </Link>
              <figcaption className="bg-grey-800 ml-2 mt-4 flex flex-col items-start justify-center">
                <h5 className="text-lg font-bold text-white">{image.title}</h5>
                <p className="text-xs text-slate-300">@{image.title}</p>
              </figcaption>
            </figure>
            <div className="cta-buttons flex py-3.5">
              <div className=" grid text-left">
                <Button variant="secondary">
                  <Link href="/profile">View Profile</Link>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        </div>
      ))}
    </Swiper>
  )
}

export default ProfileCard
