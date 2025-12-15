import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import axios from 'axios';
import BaseUrl from '../service/Baseurl';


const Noisecarousel = ({ data }) => {

    const NextArrow = ({ onClick }) => (
        <div
            className="absolute top-1/2 right-[-1rem] transform -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10 max-md:mr-5"
            onClick={onClick}
        >
            <span className="text-xl"><MdOutlineKeyboardArrowRight /></span>
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div
            className="absolute top-1/2 left-[-1rem] transform -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10 max-md:ml-5"
            onClick={onClick}
        >
            <span className="text-xl"><MdOutlineKeyboardArrowLeft /></span>
        </div>
    );
    const noisecarousl = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ]
    };

    return (
        <>
            <div className='p-2 max-md:-ml-[10px]'>
                <Slider {...noisecarousl}>
                    {data.map((item, index) => (
                        <div key={index} >
                            <div className='relative rounded-md shadow-sm p-2 h-auto w-auto max-md:w-[200px] '>
                                <img src={`${BaseUrl}/${item?.product_Image}`} className='h-[250px] w-[200px] border object-contain rounded shadow-md' />
                                <img src={item.disimage} className='absolute top-2 left-2 h-[37px] z-10' />
                                <p className='absolute top-3 left-5 text-white text-[10px] z-20'>{item.discount}<br />off</p>
                                <div className='mt-2'>
                                    <p className='font-thin h-[50px] line-clamp-1'>{item.product_Name}</p>
                                    <p className='font-thin h-[50px] '>{item.product_wieght}</p>
                                    <p className='text-[#586274] text-sm line-clamp-3'>{item.product_description}</p>
                                    <div className='flex justify-between items-center mt-2'>
                                        <div>
                                            <p className='text-sm font-bold text-[#000]'>{item.product_discount_price}</p>
                                            <p className='text-xs line-through text-gray-400'>{item.product_price}</p>
                                        </div>
                                        <button className='text-[#EF4372] border p-3 text-xs font-bold rounded border-[#EF4372]'>
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default Noisecarousel



