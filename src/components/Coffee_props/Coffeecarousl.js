import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import BaseUrl from '../service/Baseurl';

const Coffeecarousl = ({ data, bgcolor, title, titlecolor, description, btncolor }) => {

    const NextArrowCoffee = ({ onClick }) => (
        <div
            className="absolute top-1/2 right-[-25px] transform mr-[10px] -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10 max-md:mr-[120px]"
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

    const coffeecarousl = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrowCoffee />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <>
            <div className='grid grid-cols-4 max-md:grid-cols-1' style={{ backgroundColor: bgcolor }}>
                <div className='max-md:text-nowrap pl-10 pt-10'>
                    <p className='tracking-[3px]' style={{ color: titlecolor }}>{title}</p>
                    <p className="text-[22px] xl:text-[30px] font-semibold" style={{ color: titlecolor }} dangerouslySetInnerHTML={{ __html: description }}></p>
                    <button className='flex p-4 rounded-2xl tracking-[2px] font-bold mt-10' style={{ backgroundColor: btncolor, color: bgcolor }}>More Items <RiArrowRightDoubleFill className='mt-[5px]' /></button>
                </div>
                <div className="py-4 col-span-3 max-md:ml-[60px]">
                    <Slider {...coffeecarousl}>
                        {data.map((item, index) => (
                            <div key={index} className="px-2">
                                <div className='p-2'>
                                    <div className='relative border bg-white rounded-md shadow-sm p-2 h-auto w-auto max-md:w-[200px]'>
                                        <img src={`${BaseUrl}/${item?.product_Image}`} className='xl:h-[250px] xl:w-[200px] object-cover rounded' />
                                        <img src={item.discountimage} className='absolute top-2 left-2 h-[37px] z-10' />
                                        <p className='absolute top-3 left-5 text-white text-[10px] z-20'>{item.discount}<br /></p>
                                        <div className='mt-2'>
                                            <p className='font-semibold line-clamp-1'>{item.product_Name}</p>
                                            <p className='text-md text-gray-400'>{item.product_wieght}</p>
                                            <p className='text-[#586274] text-sm line-clamp-4'>{item.product_description}</p>
                                            <div className='flex justify-between items-center mt-2'>
                                                <div>
                                                    <p className='text-sm font-bold text-[#000]'>{item.product_discount_price}</p>
                                                    <p className='text-xs line-through text-gray-400'>{item.product_price}</p>
                                                </div>
                                                <div className='flex items-center gap-1 text-[#EF4372] border p-2 text-xs font-bold rounded-xl border-[#EF4372] bg-white'>
                                                    {item.product_Brand}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default Coffeecarousl

//
//
//
//
//