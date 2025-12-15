import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import hair from '../../assets/hairdryer.png'
import smwatch from '../../assets/samrtwatch.png'
import box from '../../assets/box.png'
import mouse from '../../assets/mouse.png'
import adeptor from '../../assets/adeptor.png'
import shaving from '../../assets/shaving.png'
import tabs from '../../assets/tabs.png'
import lipstick from '../../assets/lipstic.webp'
import lucilips from '../../assets/lucilips.png'
import facef from '../../assets/flawface.png'
import makeup from '../../assets/makeup.png'
import nailpolish from '../../assets/nailpolish.png'
import cream from '../../assets/cream.png'
import love from '../../assets/love.png'
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Coffeecarousl from '../../Coffee_props/Coffeecarousl';
import Noisecarousel from '../../Noiseprops/Noisecarousel';
import typecpincharger from '../../assets/typecpincharger.png'
import Grocery from '../../Groceryprops/Grocery';
import axios from 'axios';
import BaseUrl from '../../service/Baseurl';

const Home = () => {
    const [carouselarray, setcarouselarray] = useState([])

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

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ]
    };

    const navsettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ]
    };

    const dishes = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
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

    const [Navsettings, setNavsettings] = useState([
        smwatch,
        box,
        mouse,
        adeptor,
        shaving,
        tabs,
    ]);

    const [beautyproduct, setbeautyproduct] = useState([
        lucilips, facef, makeup, nailpolish, cream, love,
    ]);

    const [typecp, settypec] = useState([
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
        {
            img: typecpincharger,
            title: "Mobile Accessories",
        },
    ]);

    const [coffeeProducts, setcoffeeProducts] = useState([]);

    const fetchapifordisplaycafedetails = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchproduct/details/page/coffee`)
            if (result?.data?.success) {
                setcarouselarray(result?.data?.data)
            }

        } catch (error) {
            return console.log(error.message);
        }
    }
    useEffect(() => {
        fetchproduct();
        fetchapifordisplaycafedetails();
    }, [])


    const fetchapiforfoodcarousel = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchfoodcarousel/details/page`)
            if (result?.data?.success) {
                setcoffeeProducts(result?.data?.data)
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    useEffect(() => {
        fetchapiforfoodcarousel();
    }, [])

    const [noiseproducts, setnoiseproducts] = useState([]);

    const fetchfashioninallpage = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchproduct/details/page/for/all/page/fashion`)
            if (result?.data?.success) {
                setnoiseproducts(result?.data?.data)
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    const [mobileinallpage, setmobileinallpage] = useState([])

    const fetchmobileinallpage = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchproduct/details/page/for/all/page/mobile`)
            if (result?.data?.success) {
                setmobileinallpage(result?.data?.data)
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    const [beautyinallpage, setbeautyinallpage] = useState([])

    const fetchbeautyinallpage = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchproduct/details/page/for/all/page/beauty`)
            if (result?.data?.success) {
                setbeautyinallpage(result?.data?.data)
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    const [grocery, setgrocery] = useState([]);

    const fetchfreshinallpage = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchproduct/details/page/for/all/page/fresh`)
            if (result?.data?.success) {
                setgrocery(result?.data?.data)
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    const [snacks, setsnacks] = useState([]);

    const fetchcafeinallpage = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchproduct/details/page/for/all/page/cafe`)
            if (result?.data?.success) {
                setsnacks(result?.data?.data)
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    const [personalcare, setpersonalcare] = useState([]);

    const fetchbabystoereinallpage = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchproduct/details/page/for/all/page/babystore`)
            if (result?.data?.success) {
                setpersonalcare(result?.data?.data)
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    const [house, sethouse] = useState([]);

    const fetchhomeinallpage = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchproduct/details/page/for/all/page/home`)
            if (result?.data?.success) {
                sethouse(result?.data?.data)
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    const [offedetails, setoffedetails] = useState([])

    const fetchoffer = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchoffer/details/page`)
            if (result?.data?.success) {
                setoffedetails(result?.data?.data)
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    const fetchproduct = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchproduct/details/page`)
            if (result?.data?.success) {
                setcarouselarray(result?.data?.data)
            }

        } catch (error) {
            return console.log(error.message);
        }
    }

    useEffect(() => {
        fetchoffer();
        fetchbanner();
        fetchproduct();
        fetchelectronicsinallpage();
        fetchhomeinallpage();
        fetchfashioninallpage();
        fetchmobileinallpage();
        fetchbeautyinallpage();
        fetchfreshinallpage();
        fetchcafeinallpage();
        fetchbabystoereinallpage();
    }, [])

    const [bannerdetails, setbannerdetails] = useState([])

    const fetchbanner = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchbanner/details/page`)
            if (result?.data?.success) {
                setbannerdetails(result?.data?.data)
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    const [electronics, setelectronics] = useState([])

    const fetchelectronicsinallpage = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchproduct/details/page/for/all/page/electronics`)
            if (result?.data?.success) {
                setelectronics(result?.data?.data)
            }
        } catch (error) {
            return console.log(error.message);
        }
    }


    return (
        <>
            <br />
            <Slider {...settings}>
                {carouselarray.map((item, index) => (
                    <div key={index} className='max-md:overflow-scroll'>
                        <img src={`${BaseUrl}/${item?.product_Image}`} className='h-[100px] w-[100px] mx-auto overflow-hidden' />
                        <p className='text-center'>{item.product_Name}</p>
                    </div>
                ))}
            </Slider>
            <div>
                <a>
                    {bannerdetails.map((item, index) => (
                        <div key={index}>
                            <img src={`${BaseUrl}/${item?.Banner_Images}`} className='w-full mt-[50px] max-md:h-[150px] max-md:pl-4 max-md:pr-4 max-md:object-fill' />
                        </div>
                    ))}
                </a>
            </div>
            <br /><br />
            <div className='grid h-auto w-auto grid-cols-2 gap-[25px] max-md:gap-[2px] max-md:p-[15px] max-lg:grid-cols-1 max-md:grid-cols-1'>
                <div className='overflow-hidden p-7  mb-[52px] rounded-2xl border-white bg-black max-md:p-0 max-md:pr-1'>
                    <img className='w-[2368px] h-[200px] relative overflow-hidden object-fill bg-transparent' src={hair} />
                    <br />
                    <Slider {...navsettings}>
                        {Navsettings.map((item, index) => (
                            <a href='#' key={index} >
                                <img src={item} className='overflow-hidden h-[120px] w-[100px]' />
                            </a>
                        ))}
                    </Slider>
                </div>
                <div className='overflow-hidden p-7 mb-[52px] rounded-2xl border-white bg-[rgb(247,194,194)] max-md:p-0'>
                    <img className='w-[2368px] h-[200px] relative overflow-hidden object-fill' src={lipstick} />
                    <br />
                    <Slider {...navsettings}>
                        {beautyproduct.map((item, index) => (
                            <a href='#' key={index}>
                                <img src={item} className=' overflow-hidden h-[120px] w-[100px]' />
                            </a>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="md:hidden flex overflow-x-auto whitespace-nowrap gap-4 px-2">
                {offedetails.map((item, index) => (
                    <a href="#" key={index} className="flex-shrink-0">
                        <img src={`${BaseUrl}/${item?.offercardImage}`} className="h-[200px] w-auto min-w-[300px] min-h-[250px] rounded-xl" />
                    </a>
                ))}
            </div>

            <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 px-4">
                {offedetails.map((item, index) => (
                    <a href="#" key={index} className="flex-shrink-0">
                        <img src={`${BaseUrl}/${item?.offercardImage}`} className="h-[200px] w-auto min-w-[300px] min-h-[250px] rounded-xl" />
                    </a>
                ))}
            </div>
            <br />
            <Coffeecarousl title={coffeeProducts[0]?.Title} titlecolor={'rgb(153,101,55)'} bgcolor={'rgb(255, 241, 236)'} description={coffeeProducts[0]?.description} btncolor={'rgb(153,101,55)'} data={carouselarray} />
            <br /><br />
            <div className='flex items-center justify-between '>
                <div className='ml-[10px]'>
                    <h1 className='font-bold text-[25px]'>Elevate Yourself</h1>
                </div>
                <div>
                    <Link to="">
                        <button className='text-[#EF4372] p-3 font-bold rounded border-[#EF4372] flex items-center text-[19px]'>
                            See All <RiArrowRightDoubleFill />
                        </button>
                    </Link>
                </div>
            </div>
            <br />
            <div>
                <Noisecarousel data={noiseproducts} />
            </div>
            <br /><br />
            <div className='p-8 flex items-center justify-around max-md:flex-col max-md:gap-[20px]' style={{ backgroundColor: 'rgb(242, 255, 239) ' }}>
                <div className='max-md:text-nowrap'>
                    <p className='tracking-[3px]' style={{ color: 'rgb(139, 167, 160)' }}>MORE TO LOVE</p>
                    <p className='text-[30px] font-bold' style={{ color: 'rgb(27, 87, 84)' }}>Explore more & <br /> uncover hidden <br /> gems</p>
                </div>
                <div className='grid grid-cols-7 max-md:grid-cols-3'>
                    {typecp.map((item, index) => (
                        <div key={index}>
                            <img src={item.img} className="h-[100px] object-contain" />
                            <h1 className="font-medium text-gray-800 mt-2 w-[100px] text-center">{item.title}</h1>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <div className='flex items-center justify-between '>
                <div className='ml-[10px]'>
                    <h1 className='font-bold text-[25px]'>Get Your Home Needs</h1>
                </div>
                <div>
                    <Link to="/Seeall">
                        <button className='text-[#EF4372] p-3 font-bold rounded border-[#EF4372] flex items-center text-[19px]'>
                            See All <RiArrowRightDoubleFill />
                        </button>
                    </Link>
                </div>
            </div>
            <br />
            <Noisecarousel data={mobileinallpage} />
            <br />
            <Coffeecarousl data={house} title={coffeeProducts[1]?.Title} titlecolor={'rgb(105, 33, 158)'} bgcolor={'rgb(244, 235, 255)'} description={coffeeProducts[1]?.description} btncolor={'rgb(105, 33, 158)'} />
            <br />
            <div className='flex items-center justify-between '>
                <div className='ml-[10px]'>
                    <h1 className='font-bold text-[25px]'>New In Store</h1>
                </div>
                <div>
                    <Link to="/Seeall">
                        <button className='text-[#EF4372] p-3 font-bold rounded border-[#EF4372] flex items-center text-[19px]'>
                            See All <RiArrowRightDoubleFill />
                        </button>
                    </Link>
                </div>
            </div>
            <br />
            <Noisecarousel data={beautyinallpage} />
            <br />
            <p className='font-bold text-[20px] ml-[25px]'>Grocery & Kitchen</p>
            <br />
            <Grocery data={grocery} />
            <br />
            <p className='font-bold text-[20px] ml-[25px]'>Snacks & Drinks</p>
            <br />
            <Grocery data={snacks} />
            <br />
            <p className='font-bold text-[20px] ml-[25px]'>Beauty & Personal Care</p>
            <br />
            <Grocery data={personalcare} />
            <br />
            <p className='font-bold text-[20px] ml-[25px]'>Household Essentials</p>
            <br />
            <Grocery data={house} />
            <br />
            <div className='flex items-center justify-between '>
                <div className='ml-[10px]'>
                    <h1 className='font-bold text-[25px]'>Mobile Accessories</h1>
                </div>
                <div>
                    <Link to="/Seeall">
                        <button className='text-[#EF4372] p-3 font-bold rounded border-[#EF4372] flex items-center text-[19px]'>
                            See All <RiArrowRightDoubleFill />
                        </button>
                    </Link>
                </div>
            </div>
            <Noisecarousel data={electronics} />
        </>
    )
}

export default Home