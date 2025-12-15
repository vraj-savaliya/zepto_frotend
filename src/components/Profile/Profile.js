import React, { useEffect, useState } from 'react'
import { data, useLocation, useNavigate } from 'react-router-dom'
import { GoHeart } from 'react-icons/go'
import { IoGift, IoLocationOutline, IoPersonCircleOutline } from 'react-icons/io5'
import { LuMessageCircleMore } from 'react-icons/lu'
import { PiHandbagBold } from 'react-icons/pi'
import z from '../assets/z.png'
import peson from '../assets/person.png'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { FaChevronLeft, FaRegShareSquare, FaWhatsapp } from 'react-icons/fa'
import { TbGiftCard } from 'react-icons/tb'
import zeptograylogo from '../assets/zeptograylogo.svg'
import arrow from '../assets/arrow.svg'
import lock from '../assets/lock.svg'
import rupiyo from '../assets/rupiyo.svg'
import paisa from '../assets/paisa.svg'
import BaseUrl from '../service/Baseurl'
import axios from 'axios'
import toast from 'react-hot-toast'
import RenderRazorpay from './RenderRazorpay'

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [order, setorder] = useState(null);
  const [printdataininput, setprintdataininput] = useState({});
  const [formData, setFormData] = useState({
    street1: "",
    street2: "",
    area: "",
    city: "",
    pincode: "",
    state: "",
  });

  const [username, setusername] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newAddress = {
        street1: formData.street1,
        street2: formData.street2,
        area: formData.area,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
      };

      const body = {
        user_email: printdataininput.user_email || "",
        user_name: printdataininput.user_name || "",
        user_wallet: printdataininput.user_wallet || 0,
        free_cash: printdataininput.free_cash || 0,
        user_address: newAddress,
      };

      const result = await axios.post(`${BaseUrl}/add/userdetails`, body);

      if (result.data.success) {
        toast.success("Address added successfully!");
        setFormData({
          street1: "",
          street2: "",
          area: "",
          city: "",
          pincode: "",
          state: "",
        });
        setIsModalOpen(false);

        // ✅ Fetch fresh user details (addresses updated)
        handleFetchUserDetails();
      } else {
        toast.error(result.data.message || "Failed to add address");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving address.");
    }
  };



  useEffect(() => {
    handleFetchUserDetails();
  }, []);
  const handleFetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem('userid');
      if (!userId) return;

      const result = await axios.get(`${BaseUrl}/fetch/userdetails/${userId}`);
      console.log("API Response:", result.data);

      if (result.data.success) {
        const userData = result.data.data;
        setprintdataininput(userData);
        setusername(userData.user_name);

        const userAddress = Array.isArray(userData.user_address)
          ? userData.user_address
          : userData.user_address
            ? [userData.user_address]
            : [];

        console.log("Setting addresses:", userAddress);
        setAddresses(userAddress);

        // ✅ Save addresses to localStorage
        localStorage.setItem("addresses", JSON.stringify(userAddress));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  const hendleUserUpdateDetilas = async () => {
    try {
      const result = await axios.put(`${BaseUrl}/update/name/email/profile`, {
        user_name: username,
        userid: localStorage.getItem("userid"),
      });

      if (result.data.success) {
        toast.success(result.data.message);
        handleFetchUserDetails();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   handleFetchUserDetails();
  //   hendleUserUpdateDetilas();
  // }, []);

  const activePanel = location.hash ? location.hash.substring(1) : "default";
  const [selectedPanel, setSelectedPanel] = useState(activePanel);

  useEffect(() => {
    if (activePanel !== selectedPanel) {
      setSelectedPanel(activePanel);
    }
  }, [activePanel, selectedPanel]);

  const handlePanelClick = (panelName) => {
    setSelectedPanel(panelName);
    navigate(`#${panelName}`, { replace: true });
  };

  const [amount, setamount] = useState("");
  const [isAmountModalOpen, setIsAmountModalOpen] = useState(false);

  const handleProcessPayment = async () => {
    try {
      const body = {
        amount: amount,
        userId: localStorage.getItem("userid"),
      };
      const result = await axios.post(`${BaseUrl}/user/add/amount`, body);

      if (result?.data?.success) {
        toast.success(result?.data?.message);
        setorder(result?.data?.data);
        setIsAmountModalOpen(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const panelContent = {
    default: (
      <div className="flex-1 max-md:hidden ">
        <div className="flex items-center space-x-4 p-[10px]">
          <span className="text-xl"><FaChevronLeft /></span>
          <h1 className="text-lg font-semibold">Settings</h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center bg-[#f0f4f9] p-[20px]">
          <img src={z} className='bg-transparent flex justify-center' />
          <h2 className="text-lg font-medium">No orders yet</h2>
          <button className="mt-4 px-4 py-2 bg-white text-[#4C1577] border border-[#4C1577] rounded">Browse products</button>
          <button className="mt-2 px-4 py-2 border border-pink-500 text-pink-500 rounded-2xl">↓ Load More</button>
        </div>
      </div>
    ),
    orders: <div className="flex-1 max-md:hidden ">
      <div className="flex items-center space-x-4 p-[10px]">
        <span className="text-xl"><FaChevronLeft /></span>
        <h1 className="text-lg font-semibold">Settings</h1>
      </div>
      <div className="flex flex-col items-center justify-center text-center bg-[#f0f4f9] p-[20px]">
        <img src={z} className='bg-transparent flex justify-center' />
        <h2 className="text-lg font-medium">No orders yet</h2>
        <button className="mt-4 px-4 py-2 bg-white text-[#4C1577] border border-[#4C1577] rounded">Browse products</button>
        <button className="mt-2 px-4 py-2 border border-pink-500 text-pink-500 rounded-2xl">↓ Load More</button>
      </div>
    </div>,
    customersupport: <div className='p-4 space-y-4'>
      <h1 className='font-bold text-[20px]'>FAQs</h1><br />
      <a href='#' className='flex items-center justify-between'>
        <p className='text-[15px] font-[500]'>Coupons & Offers</p>
        <p><MdOutlineKeyboardArrowRight size={25} color='red' /></p>
      </a>
      <hr />
      <a href='#' className='flex items-center justify-between'>
        <p className='text-[15px] font-[500]'>General Inquiry</p>
        <p><MdOutlineKeyboardArrowRight size={25} color='red' /></p>
      </a>
      <hr />
      <a href='#' className='flex items-center justify-between'>
        <p className='text-[15px] font-[500]'>Payment Related</p>
        <p><MdOutlineKeyboardArrowRight size={25} color='red' /></p>
      </a>
      <hr />
      <a href='#' className='flex items-center justify-between'>
        <p className='text-[15px] font-[500]'>Feedback & Suggestions</p>
        <p><MdOutlineKeyboardArrowRight size={25} color='red' /></p>
      </a>
      <hr />
      <a href='#' className='flex items-center justify-between'>
        <p className='text-[15px] font-[500]'>Order / Products Related</p>
        <p><MdOutlineKeyboardArrowRight size={25} color='red' /></p>
      </a>
      <hr />
      <a href='#' className='flex items-center justify-between'>
        <p className='text-[15px] font-[500]'>Gift Card</p>
        <p><MdOutlineKeyboardArrowRight size={25} color='red' /></p>
      </a>
      <hr />
      <a href='#' className='flex items-center justify-between'>
        <p className='text-[15px] font-[500]'>No-Cost EMI</p>
        <p><MdOutlineKeyboardArrowRight size={25} color='red' /></p>
      </a>
      <hr />
      <a href='#' className='flex items-center justify-between'>
        <p className='text-[15px] font-[500]'>Wallet Related</p>
        <p><MdOutlineKeyboardArrowRight size={25} color='red' /></p>
      </a>
      <hr />
      <a href='#' className='flex items-center justify-between'>
        <p className='text-[15px] font-[500]'>Zepto Super Saver</p>
        <p><MdOutlineKeyboardArrowRight size={25} color='red' /></p>
      </a>
      <hr />
      <a href='#' className='flex items-center justify-between'>
        <p className='text-[15px] font-[500]'>Zepto Daily</p>
        <p><MdOutlineKeyboardArrowRight size={25} color='red' /></p>
      </a>
      <hr />
    </div>,
    referrals: <div><div className='bg-indigo-500 p-4'>
      <div className='flex justify-between items-start p-0'>
        <p className='text-white font-bold tracking-wide '>25% off for you, Pass for them @ ₹1!</p><br /><br />
        <img src={paisa} className='-mr-[16px] h-[200px] -mt-[16px]' />
      </div>
      <div className='border border-white h-auto rounded-xl bg-white -mt-[100px]'>
        <div className='p-4'>
          <p className='font-[800]'>How it works</p>
          <div className='mt-4 flex gap-4'>
            <img src={arrow} />
            <p>Share the referral link <span className='font-[600]'>with your friend</span> </p>
          </div>
          <div className='mt-4 flex gap-4'>
            <img src={lock} />
            <p className='text-[15px]'>After your friend places their first order, you <span className='font-[600]'>get 25% off</span> up to ₹200 on your next order</p>
          </div>
          <div className='mt-4 flex gap-4'>
            <img src={rupiyo} />
            <p>Upon 10 successful referrals, <span className='font-[600]'>you earn ₹2000</span> </p>
          </div>
        </div>
        <br />
        <button className='flex gap-3 items-center border border-black p-2 w-[650px] mx-auto justify-center rounded-2xl' type='button'>
          <FaWhatsapp color='green' size={30} />Invite via Whatsapp
        </button><br />
        <button className='flex gap-3 items-center border border-black mx-auto p-2 w-[650px] justify-center rounded-2xl' type='button'>
          <FaRegShareSquare size={30} />Share Invite Link
        </button>
        <br />
      </div>
    </div>
      <br />
      <hr className='opacity-100' />
      <p className='text-[20px] font-bold mt-4 ml-[40%]'>Your Referrals</p><br />
      <p className='text-gray-500 ml-[25%]'>No referrals yet. Share with friends to start saving!</p>
    </div>,
    addresses: <div className="flex-1 max-md:hidden ">
      {/* Header */}
      <div className="flex items-center space-x-4 p-[10px] border shadow-md">
        <span className="text-xl">
          <FaChevronLeft />
        </span>
        <h1 className="text-lg font-semibold">Addresses</h1>
      </div>

      {/* address filed  */}
      {/* Title and Add Button */}
      <div className="flex items-center justify-between p-8">
        <p className="text-base font-bold">All Saved Addresses</p>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: "rgb(255, 58, 109)",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add New Address
        </button>
      </div>

      <hr />
      <div className="p-8 space-y-4">
        {addresses.length === 0 ? (
          <p className="text-gray-500">No saved addresses yet.</p>
        ) : (
          addresses.map((addr, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm flex justify-between items-start">
              <div>
                <p className="font-bold">
                  {addr.street1}{addr.street2 ? `, ${addr.street2}` : ""}
                </p>
                <p>
                  {addr.area}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[420px] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Add New Address
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="street1"
                placeholder="Street Address (Line 1)"
                value={formData.street1}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="text"
                name="street2"
                placeholder="Street Address (Line 2)"
                value={formData.street2}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="text"
                name="area"
                placeholder="Area / Locality"
                value={formData.area}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <input
                type="number"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400"
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-white font-medium shadow-md transition duration-200"
                  style={{ backgroundColor: "rgb(255, 58, 109)" }}
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>,
    profile: <div className="flex-1 max-md:hidden ">
      <div className="flex items-center space-x-4 p-[10px] border shadow-md">
        <span className="text-xl"><FaChevronLeft /></span>
        <h1 className="text-lg font-semibold">Profile</h1>
      </div>
      <div>
        <form><br />
          <div className='flex flex-col gap-2'>
            <label htmlFor='name' className='text-gray-500 ml-7' >Name*</label>
            <input
              type='text'
              className='border h-[43px] w-[660px] rounded-lg mx-auto'
              placeholder='Enter Your Name'
              value={username || ""}   // bind state
              onChange={(e) => setusername(e.target.value)} // update state
            />

          </div>
          <br />
          <div className='flex flex-col gap-2'>
            <label htmlFor='name' className='text-gray-500 ml-7' >Email Address *</label>
            <input type='text' className='border h-[43px] w-[660px] rounded-lg mx-auto' placeholder='-' readOnly value={printdataininput.user_email} />
          </div>
          <p className='text-gray-500 p-4 ml-4'>We promise not to spam you</p>
        </form>
        <button className='ml-[600px]' type='button' style={{ backgroundColor: 'rgb(255, 58, 109)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }} onClick={hendleUserUpdateDetilas}>
          Submit
        </button>
        <br /><br />
        <hr className='space-y-4' />
        <div className='p-4 mt-5'>
          <p className='text-[#EF4372] font-bold'>Delete Account</p>
          <p>Deleting your account will remove all your orders, wallet amount and any active referral</p>
        </div>
      </div>
    </div>,
  }

  return (
    <>
      <br />
      <div className='flex border border-gray-300 rounded-lg h-screen w-[1100px] mx-auto max-md:w-auto max-lg:w-auto'>
        <div className='w-96 shadow-md rounded-lg space-y-9 p-5'>
          <div className='flex items-center gap-[10px] mt-5'>
            <div>
              <img src={peson} className='h-[50px]' alt="user" />
            </div>
            <div>
              <p className='font-bold text-[17px]'>{printdataininput.user_name}</p>
              <p className='text-[#A7A7A7]'>{printdataininput.user_email}</p>
            </div>
          </div>

          <div className='border p-4 rounded-lg bg-[#F3F5F7]'>
            <div className='flex items-center justify-between'>
              <p className='font-semibold text-[15px] flex items-center gap-1'>
                <TbGiftCard color='#9A16CA' size={20} />Zepto Cash & Gift Card
              </p>
              <MdOutlineKeyboardArrowRight size={20} />
            </div>
            <p className='text-gray-500'>------------------------------------------------</p>
            <div className='flex items-center justify-between'>
              <p className='text-[#6B7280] flex'>Available Balance: <span className='text-black font-bold'>₹{printdataininput.user_wallet}</span></p>
              <button
                onClick={() => setIsAmountModalOpen(true)}
                className='text-white bg-black p-[8px] rounded-lg'
              >
                Add Balance
              </button>
            </div>
          </div>
          {isAmountModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-2xl shadow-2xl w-[420px] relative">
                {/* Close button */}
                <button
                  onClick={() => setIsAmountModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>

                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  Add Balance
                </h2>

                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setamount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 outline-none mb-4"
                />

                <button
                  onClick={handleProcessPayment}
                  className="w-full px-6 py-2 rounded-lg text-white font-medium shadow-md transition duration-200"
                  style={{ backgroundColor: "rgb(255, 58, 109)" }}
                >
                  Process
                </button>
              </div>
            </div>
          )}

          <nav className='space-y-4'>
            <div className={`flex items-center justify-between cursor-pointer ${selectedPanel === 'freecash' ? 'font-bold text-black' : 'text-gray-700'}`}>
              <div className='flex items-center gap-3'>
                <IoGift size={20} color='red' />
                <p>Free Cash</p>
              </div>
              <div>
                <p className='font-bold'>{printdataininput.free_cash}</p>
              </div>
            </div>
            <hr />
            <div onClick={() => handlePanelClick('orders')} className={`flex items-center space-x-3 cursor-pointer ${selectedPanel === 'orders' ? 'font-bold text-black' : 'text-gray-700'}`}>
              <PiHandbagBold size={20} />
              <span>Orders</span>
            </div>
            <hr />
            <div onClick={() => handlePanelClick('customersupport')} className={`flex items-center space-x-3 cursor-pointer ${selectedPanel === 'customersupport' ? 'font-bold text-black' : 'text-gray-700'}`}>
              <LuMessageCircleMore size={20} />
              <span>Customer Support</span>
            </div>
            <hr />
            <div onClick={() => handlePanelClick('referrals')} className={`flex items-center space-x-3 cursor-pointer ${selectedPanel === 'referrals' ? 'font-bold text-black' : 'text-gray-700'}`}>
              <GoHeart size={20} />
              <span>Manage Referrals</span>
            </div>
            <hr />
            <div onClick={() => handlePanelClick('addresses')} className={`flex items-center space-x-3 cursor-pointer ${selectedPanel === 'addresses' ? 'font-bold text-black' : 'text-gray-700'}`}>
              <IoLocationOutline size={20} />
              <span>Addresses</span>
            </div>
            <hr />
            <div onClick={() => handlePanelClick('profile')} className={`flex items-center space-x-3 cursor-pointer ${selectedPanel === 'profile' ? 'font-bold text-black' : 'text-gray-700'}`}>
              <IoPersonCircleOutline size={20} />
              <span>Profile</span>
            </div>
            <hr />
            <br />
            <button className='font-black ml-[140px]'>Log Out</button>
            <img src={zeptograylogo} alt="logo" className='ml-[125px]' style={{ filter: 'grayscale(100%) brightness(250%)' }} />
          </nav>
        </div>
        <div className="flex-1 max-md:hidden ">
          {panelContent[selectedPanel] || panelContent['default']}
        </div>
      </div>
      <br />
      <br />

      {/* {order && (
        <RenderRazorpay
          amount={order.amount}
          currency={order.currency}
          orderId={order.id}
          transactionID=""
          keyId={order.key_id}
        />
      )} */}

      {order && (
        <RenderRazorpay
          amount={order.amount}
          currency={order.currency}
          orderId={order.id}
          transactionID=""
          keyId={order.key_id}
          onSuccess={() => {
            handleFetchUserDetails();
            setorder(null);
          }}
        />
      )}
    </>
  )
}

export default Profile