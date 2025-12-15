import React, { useState, Component, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import zlogo from '../assets/Zepto_Logo.png'
import { IoMenu, IoSearchOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import '../../App.css';
import redzepto from '../assets/redzepto.png'
import { SiInstagram } from 'react-icons/si';
import { FaAngleLeft, FaFacebook, FaLinkedinIn, FaPlus, FaTwitter } from 'react-icons/fa';
import platstore from '../assets/platstorelogo.svg'
import appstorelogo from '../assets/appstorelogo.svg'
import Login from '../page/Loginpage/Login';
import tick from '../assets/truetick.png'
import timer from '../assets/timer.png'
import { FiMinus } from 'react-icons/fi'
import { TbMotorbike } from 'react-icons/tb';
import axios from 'axios';
import BaseUrl from '../service/Baseurl'

const Navigation = ({ children }) => {
    const navigate = useNavigate()

    const [categorydetails, setcategorydetails] = useState([])
    const [isOpen, setisOpen] = useState(false)
    const [changes, setchanges] = useState(0)
    const [islogin, setislogin] = useState(false)
    const [isSlider, setIsSlider] = useState(false);
    const [Count, setCount] = useState(0)
    const [cartData, setCartData] = useState([])

    useEffect(() => {
        const storedCart = localStorage.getItem('cartData')
        if (storedCart) {
            setCartData(JSON.parse(storedCart))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cartData', JSON.stringify(cartData))
    }, [cartData])

    const handleIncrease = (index) => {
        const updated = [...cartData]
        updated[index].quantity = (updated[index].quantity || 1) + 1
        setCartData(updated)
    }

    const handleDecrease = (index) => {
        const updated = [...cartData]
        if ((updated[index].quantity || 1) > 1) {
            updated[index].quantity -= 1
        } else {
            updated.splice(index, 1)
        }
        setCartData(updated)
    }

    const totalAmount = cartData.reduce(
        (sum, item) => sum + item.product_discount_price * (item.quantity || 1),
        0
    )

    const fetchcategory = async () => {
        try {
            const result = await axios.get(`${BaseUrl}/fetchcategory/details/page`)
            if (result?.data?.success) {
                setcategorydetails(result?.data?.data)
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    useEffect(() => {
        fetchcategory()
    }, [])

    return (
        <>

            <div className='max-w-[1456px] mx-auto'>
                <nav style={{ background: 'linear-gradient(rgb(236,220,255), rgb(255,255,255))' }} className='flex items-center justify-between w-full h-[91px] px-5 lg:px-20 z-0'>
                    <div className='w-[90px] h-[30px]'>
                        <img src={zlogo} />
                    </div>
                    <div className='-translate-x-20 sm:translate-x-0 max-sm:ml-[100px]'>
                        <label className="inline-flex items-center me-5 cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer" checked />
                            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                        </label>
                    </div>
                    <div className='hidden sm:block sm:w-[400px] lg:w-[718px] h-[46px] bg-white rounded-md shadow relative'>
                        <IoSearchOutline className='text-[25px] absolute top-3 left-2' />
                        <input type='text' placeholder='Search for "amul butter"' className='w-full h-full rounded-md pl-10 focus:outline-none placeholder:text-black font-uifontfamily placeholder:font-uifontfamily' />
                    </div>
                    <div onClick={() => setislogin(true)} className='hidden sm:block'>
                        <CgProfile className='text-[25px] mx-auto' style={{ cursor: 'pointer' }} />
                        <h2 className='font-uifontfamily text-center'>Profile</h2>
                    </div>
                    <div className='hidden sm:block' onClick={() => navigate('/Orders')}>
                        <TbMotorbike className='text-[25px] mx-auto' />
                        <h2 className='font-uifontfamily text-center'>Rider</h2>
                    </div>
                    <div className='hidden sm:block' onClick={() => setIsSlider(true)}>
                        <AiOutlineShoppingCart className='text-[25px] mx-auto' />
                        <h2 className='font-uifontfamily text-center'>Cart</h2>
                    </div>
                    <div className='block sm:hidden'>
                        <IoMenu className='text-[25px]' onClick={() => setisOpen(true)} />
                    </div>
                </nav>

                <div className='block sm:hidden w-full h-[46px] bg-white rounded-md shadow relative'>
                    <IoSearchOutline className='text-[25px] absolute top-3 left-2' />
                    <input type='text' placeholder='Search for "amul butter"' className='w-full h-full rounded-md pl-10 focus:outline-none placeholder:text-black font-myfont placeholder:font-myfont' />
                </div>

                {
                    isOpen && (
                        <div onClick={() => setisOpen(false)} className="fixed inset-0 bg-black/50 w-full h-screen z-40"></div>
                    )
                }

                <div style={{ background: 'linear-gradient(rgb(236,220,255), rgb(255,255,255))' }} className={`absolute top-0 left-0 bg-white w-[350px] h-screen transition-all duration-300 ease-in-out z-50 p-5 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <img src={zlogo} className='w-[250px] h-[100px]' />
                    <hr />
                    <div onClick={() => setislogin(true)} className='flex items-center gap-2 w-full mt-10'>
                        <CgProfile className='text-[35px]' />
                        <h2 className='font-uifontfamily text-[30px] text-center'>Profile</h2>
                    </div>
                    <div className='flex items-center gap-2 w-full pt-5' onClick={() => setIsSlider(true)} >
                        <AiOutlineShoppingCart className='text-[35px]' />
                        <h2 className='font-uifontfamily text-center text-[30px]'>Cart</h2>
                    </div>
                </div >
                {isSlider && (
                    <div
                        onClick={() => setIsSlider(false)}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    />
                )}
                <div
                    className={`fixed top-0 right-0 h-full w-[400px] bg-[#f0f4f9] shadow-lg z-50 transition-transform duration-300 ${isSlider ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    {/* Header */}
                    <div className="rounded-b-2xl shadow-lg bg-white px-4 pb-4">
                        <div className="flex items-end gap-5 justify-between">
                            <div className="flex items-end">
                                <FaAngleLeft size={30} onClick={() => setIsSlider(false)} />
                                <h2 className="font-bold text-[25px]">Your Cart</h2>
                            </div>
                            <div className="-translate-x-20 sm:translate-x-0 max-sm:ml-[100px]">
                                <label className="inline-flex items-center me-5 cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked readOnly />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center p-2">
                            <img src={tick} className="p-2 w-8 h-8" alt="tick" />
                            <p className="text-gray-800 text-sm">
                                You are{' '}
                                <span className="text-[#06A976] font-semibold">saving ₹75</span> through free delivery!
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <img src={timer} className="h-9 w-9" alt="timer" />
                        <p className="font-bold">Delivery in 6 mins</p>
                    </div>

                    {/* Cart Items */}
                    <div className="overflow-y-auto h-[70vh] px-4 py-2">
                        {cartData.length === 0 ? (
                            <p className="text-center text-gray-500 mt-10">Your cart is empty 😔</p>
                        ) : (
                            cartData.map((item, index) => (
                                <div key={index} className="rounded-xl mb-4 bg-white p-4 shadow-sm">
                                    <div className="flex items-center justify-between gap-2">
                                        <img
                                            src={`${BaseUrl}/${item.product_Image}`}
                                            className="h-12 w-12 border rounded-md object-cover"
                                            alt={item.product_Name}
                                        />
                                        <div className="text-sm w-[170px] line-clamp-2">
                                            {item.product_Name}
                                        </div>
                                        <div
                                            className="flex items-center justify-between p-2 w-[80px] rounded-xl border border-pink-100"
                                            style={{ backgroundColor: 'rgb(255, 247, 250)' }}
                                        >
                                            <button type="button" onClick={() => handleDecrease(index)}>
                                                <FiMinus color="rgb(236 72 153)" size={20} />
                                            </button>
                                            <h1>{item.quantity || 1}</h1>
                                            <button type="button" onClick={() => handleIncrease(index)}>
                                                <FaPlus color="rgb(236 72 153)" size={15} />
                                            </button>
                                        </div>
                                        <p className="text-sm font-medium">
                                            ₹{(item.product_discount_price * (item.quantity || 1)).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cartData.length > 0 && (
                        <div className="bg-white p-4 rounded-t-2xl shadow-lg absolute bottom-0 w-full">
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-semibold text-gray-700">Total:</p>
                                <p className="font-bold text-[#EF4372] text-lg">₹{totalAmount.toFixed(2)}</p>
                            </div>
                            <button className="w-full bg-[#EF4372] hover:bg-[#d92a5b] text-white font-semibold py-2 rounded-xl transition">
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
                <br />
                <div className='flex overflow-x-auto space-x-6 px-4 md:space-x-10 md:px-8 text-nowrap'>
                    {categorydetails.map((item, index) => (
                        <div key={index} className='relative shrink-0'>
                            <Link to={item?.category_Name === 'All' ? '/' : `/category/${item?._id}`} className={`flex gap-1 pb-2 ${changes === index ? 'navunderlink' : ''}`} onClick={() => setchanges(index)}>
                                <img src={`${BaseUrl}/${item?.category_Image}`} className='h-[24px] w-[24px]' />
                                <span className={changes === index ? 'text-[#9A16CA]' : 'text-[#586274]'}>
                                    {item?.category_Name}
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>

                <hr />
                <div>
                    <Link to={'/'}></Link>
                </div>
                {children}
                <br /><hr />
                <div>
                    <h1 className='font-bold text-[20px] ml-8'>Popular Searches</h1></div>
                <br />
                <div className='flex gap-[10px] ml-8 mr-8 text-[#2B1E35BF] text-[15px] flex-wrap'>
                    <h3 className='text-black font-bold'>Products :</h3>
                    <a href='About.js'>Avacado |</a>
                    <a href='About.js'>Strawberry |</a>
                    <a href='About.js'>Pomegranate |</a>
                    <a href='About.js'>Beetroot |</a>
                    <a href='About.js'>Ash Ground |</a>
                    <a href='About.js'>Bottle Ground |</a>
                    <a href='About.js'>Lady Finger |</a>
                    <a href='About.js'>Potato |</a>
                    <a href='About.js'>Lemon |</a>
                    <a href='About.js'>Dalchini |</a>
                    <a href='About.js'>Fennel seeds |</a>
                    <a href='About.js'>Blueberry |</a>
                    <a href='About.js'>Papaya |</a>
                    <a href='About.js'>Dragion Fruit |</a>
                    <a href='About.js'>Mushroom |</a>
                    <a href='About.js'>Lettuce</a>
                </div>
                <br />
                <div className='flex gap-[10px] ml-8 mr-8 text-[#2B1E35BF] text-[15px] flex-wrap'>
                    <h3 className='text-black font-bold'>Brands :</h3>
                    <a href='About.js'>Yakult |</a>
                    <a href='About.js'>My Muse |</a>
                    <a href='About.js'>Ashirvaad Atta |</a>
                    <a href='About.js'>Too Yumm |</a>
                    <a href='About.js'>Lays |</a>
                    <a href='About.js'>Figaro Olive Oil |</a>
                    <a href='About.js'>Nandini Milk |</a>
                    <a href='About.js'>Fortune Oil |</a>
                    <a href='About.js'>Superyou |</a>
                    <a href='About.js'>Durex Condoms |</a>
                    <a href='About.js'>Ferns and Petals |</a>
                </div>
                <br />
                <div className='flex gap-[10px] ml-8 mr-8 text-[#2B1E35BF] text-[15px] flex-wrap'>
                    <h3 className='text-black font-bold'>Categories :</h3>
                    <a href='About.js'>Grocery |</a>
                    <a href='About.js'>Cigarettes |</a>
                    <a href='About.js'>Chips |</a>
                    <a href='About.js'>Curd |</a>
                    <a href='About.js'>Hukka flavour |</a>
                    <a href='About.js'>Paan shop near me |</a>
                    <a href='About.js'>Eggs price |</a>
                    <a href='About.js'>Cheese slice |</a>
                    <a href='About.js'>Fresh fruits |</a>
                    <a href='About.js'>Fresh vegetables |</a>
                    <a href='About.js'>Refined oil |</a>
                    <a href='About.js'>Butter Price |</a>
                    <a href='About.js'>Paneer Price |</a>
                </div>
                <br />
                <div className='font-bold text-[20px] ml-8'>
                    <h3>Categories</h3>
                </div>
                <div className='mt-4 ml-8 mr-8 sm:mr-0'>
                    <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 '>
                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Fruits & Vegetables</p>
                            </a>
                        </li>
                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Atta, Rice, Oil & Dals</p>
                            </a>
                        </li>
                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Masala & Dry Fruits</p>
                            </a>
                        </li>
                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Sweet Cravings</p>
                            </a>
                        </li>
                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Frozen Food & Ice Creams</p>
                            </a>
                        </li>
                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Baby Food</p>
                            </a>
                        </li>
                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Dairy, Bread & Eggs</p>
                            </a>
                        </li>
                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Cold Drinks & Juices</p>
                            </a>
                        </li>
                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Munchies</p>
                            </a>
                        </li>
                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Meats, Fish & Eggs</p>
                            </a>
                        </li>

                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Breakfast & Sauces</p>
                            </a>
                        </li>

                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Tea, Coffee & More</p>
                            </a>
                        </li>

                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Biscuits</p>
                            </a>
                        </li>

                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Makeup & Beauty</p>
                            </a>
                        </li>

                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Bath & Body</p>
                            </a>
                        </li>

                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Cleaning Essentials</p>
                            </a>
                        </li>

                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold '>Home Needs</p>
                            </a>
                        </li>

                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Electricals & Accessories</p>
                            </a>
                        </li>

                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Hygiene & Grooming</p>
                            </a>
                        </li>

                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Health & Baby Care</p>
                            </a>
                        </li>

                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Homegrown Brands</p>
                            </a>
                        </li>

                        <li className='my-2.5'>
                            <a href='#'>
                                <p className=' font-myfont text-[14px] font-bold'>Paan Corner</p>
                            </a>
                        </li>
                    </ul>
                </div><br />
                <hr />
                <br />
                <div className='flex items-start grid-cols-4 gap-[100px] px-10 py-16 max-md:px-0 max-md:py-0 max-md:flex-col max-md:gap-[0px]'>
                    <div className='my-6 flex-col justify-around align-top sm:mt-14 sm:flex sm:flex-row sm:justify-between'>
                        <div className='flex flex-col'>
                            <img src={redzepto} className='w-[100px] object-contain max-md:ml-3' />
                            <div className='mt-6 max-md:ml-4 flex flex-row'>
                                <a className='w-fit' target='_blank' href='https://www.instagram.com/zeptonow/'>
                                    <SiInstagram className='text-[25px] text-[#586274]' />
                                </a>
                                <a className='w-fit  ml-8' target='_blank' href='https://x.com/ZeptoNow'>
                                    <FaTwitter className='text-[25px] text-[#586274] ' />
                                </a>
                                <a className='w-fit  ml-8' target='_blank' href='https://www.facebook.com/Zeptonow/'>
                                    <FaFacebook className='text-[25px] text-[#586274]' />
                                </a>
                                <a className='w-fit  ml-8' target='_blank' href='https://www.linkedin.com/company/zeptonow/'>
                                    <FaLinkedinIn className='text-[25px] text-[#586274]' />
                                </a>
                            </div>

                            <div className='flex flex-col'>
                                <p className='max-md:ml-3 font-myfont mt-4 text-gray-400'>© Savaliya Technologies Private Limited</p>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 sm:flex sm:flex-row sm:justify-evenly gap-[200px] max-lg:gap-[50px] max-md:p-7'>
                        <div className='flex flex-col '>
                            <a target='_blank' href='#' >
                                <p className=' font-myfont mb-4'>Home</p>
                            </a>
                            <a target='_blank' href='#' >
                                <p className='font-myfont mb-4'>Delivery Areas</p>
                            </a>
                            <a target='_blank' href='#' >
                                <p className=' font-myfont mb-4'>Careers</p>
                            </a>
                            <a target='_blank' href='#' >
                                <p className=' font-myfont mb-4'>Customer Support</p>
                            </a>
                            <a target='_blank' href='#' >
                                <p className=' font-myfont mb-4'>Press</p>
                            </a>
                        </div>
                        <div className='flex flex-col'>
                            <a target='_blank' href='#' >
                                <p className=' font-myfont mb-4'>Privacy Policy</p>
                            </a>
                            <a target='_blank' href='#' >
                                <p className=' font-myfont mb-4'>Terms of Use</p>
                            </a>
                            <a target='_blank' href='#' >
                                <p className=' font-myfont mb-4'>Responsible Disclosure Policy</p>
                            </a>
                            <a target='_blank' href='#' >
                                <p className=' font-myfont mb-4'>Mojo - a Zepto Blog</p>
                            </a>
                            <a target='_blank' href='#' >
                                <p className=' font-myfont mb-4'>Sell on Zepto</p>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col px-4 max-w-md w-full md:max-w-sm">
                        <p className="font-myfont font-bold text-center md:text-left mb-3 md:mb-2 text-base md:text-[15px]">
                            Download App
                        </p>

                        <div className="flex flex-col gap-4 md:gap-3">
                            <a href="https://play.google.com/store/apps/details?id=com.zeptoconsumerapp&pli=1">
                                <button className="flex items-center border border-gray-300 rounded-md py-2.5 px-4 justify-center w-full">
                                    <img src={platstore} alt="Play Store" className="w-5 h-5 mr-2 object-contain" />
                                    <p className="font-myfont text-[11px] font-bold whitespace-nowrap">Get it on Play Store</p>
                                </button>
                            </a>
                            <a href="https://apps.apple.com/in/app/zepto-10-min-grocery-delivery/id1575323645">
                                <button className="flex items-center border border-gray-300 rounded-md py-2.5 px-4 justify-center w-full">
                                    <img src={appstorelogo} alt="App Store" className="w-5 h-5 mr-2 object-contain" />
                                    <p className="font-myfont text-[11px] font-bold whitespace-nowrap">Get it on App Store</p>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {islogin && <Login setislogin={setislogin} />}
        </>
    )
}

export default Navigation