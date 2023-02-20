import React from "react";
import Layouts from "@/layouts/default";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "flowbite-react";
import { useQuery } from "react-query";
import { API } from "@/config/api";

import "swiper/css";
import { Link } from "react-router-dom";

export default function Order() {
    return (
        <Layouts className={""}>
            <div>
                <h1>jdhfgbjk</h1>
            </div>

            <div className='h-full w-full  absolute top-0'>
                <img
                    className='object-cover object-bottom h-full w-full'
                    src='/img/bg.svg'
                    alt=''
                />
            </div>
        </Layouts>
    );
}