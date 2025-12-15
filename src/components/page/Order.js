import React, { useState } from 'react'
import AraeaChart from '../common/AraeaChart'
import map from '../assets/map.png'
import { FaCaretUp } from 'react-icons/fa'
import Secondchart from '../common/Secondchart'
import ReactApexChart from 'react-apexcharts'
import boy from '../assets/boy.png'
import { IoSearchOutline } from 'react-icons/io5'
import buds from '../assets/buds.jpeg'
import random from '../assets/random.jpeg'

const Orders = () => {

    const [hoveredShop, setHoveredShop] = useState(null);

    const shops = [
        { id: 1, name: 'Katargam 500$', top: '50%', left: '35%' },
        { id: 2, name: 'Mota Varacha 250$', top: '28%', left: '60%' },
        { id: 3, name: 'Athwalines 100$', top: '80%', left: '52%' },
        { id: 4, name: 'Olpad 50$', top: '20%', left: '85%' },
        { id: 5, name: 'Kamrej 500$', top: '30%', left: '15%' },
    ];

    const series = [25];

    const options = {
        chart: {
            type: 'radialBar',
            height: 350,
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '60%',
                },
                track: {
                    background: '#e0e0e0',
                },
                dataLabels: {
                    show: false
                }
            }
        },
        colors: ['#1565C0'],
        labels: ['Progress'],
    };

    const [notifications] = useState([
        {
            id: 1,
            title: 'Received New Order',
            date: 'April 24, 2018',
            description: 'I shared this on my fb wall a few months back,',
            avatar: boy
        },
        {
            id: 2,
            title: 'iPhone develeverd',
            date: 'April 24, 2018',
            description: 'I shared this on my fb wall a few months back,',
            avatar: boy
        },
        {
            id: 3,
            title: '3 Order Pending',
            date: 'April 24, 2018',
            description: 'I shared this on my fb wall a few months back,',
            avatar: boy
        },
        {
            id: 4,
            title: 'Join new Manager',
            date: 'April 24, 2018',
            description: 'I shared this on my fb wall a few months back,',
            avatar: boy
        },
        {
            id: 5,
            title: 'Branch open 5 min Late',
            date: 'April 24, 2018',
            description: 'I shared this on my fb wall a few months back,',
            avatar: boy
        },
        {
            id: 6,
            title: 'New support ticket received',
            date: 'April 24, 2018',
            description: 'I shared this on my fb wall a few months back,',
            avatar: boy
        },
    ]);

    const statusColorMap = {
        Accepted: "bg-green-100 text-green-600",
        Pending: "bg-yellow-100 text-yellow-600",
        Completed: "bg-blue-100 text-blue-600",
        Rejected: "bg-red-100 text-red-600"
    };

    const [orders, setOrders] = useState([
        {
            product1: buds,
            product2: random,
            product: "Airpods Pro Max 2024",
            category: "Electric Product",
            customer: "Muhammad Fateh",
            type: "Pro Customer",
            orderId: "#01766703570",
            date: "Jan 01, 2024",
            amount: "$10,120.00",
            payment: "Paid by Mastercard",
            status: "Accepted"
        },
        {
            product1: buds,
            product2: random,
            product: "Neathly Beauty Cream",
            category: "Beauty Product",
            customer: "Kazi Mukaram",
            type: "New Customer",
            orderId: "#01766707087",
            date: "Feb 24, 2024",
            amount: "$5,180.00",
            payment: "Cash on Delivery",
            status: "Accepted"
        },
        {
            product1: buds,
            product2: random,
            product: "Apple Watch Series 4 New",
            category: "Electric Product",
            customer: "Anderson Mark",
            type: "Star Customer",
            orderId: "#01766701234",
            date: "Mar 05, 2024",
            amount: "$13,145.00",
            payment: "Paid by Visacard",
            status: "Pending"
        },
        {
            product1: buds,
            product2: random,
            product: "iPhone 16 Pro Max Plus",
            category: "Electric Product",
            customer: "John Kales",
            type: "Pro Customer",
            orderId: "#01766727267",
            date: "Mar 01, 2024",
            amount: "$50,760.00",
            payment: "Paid by Mastercard",
            status: "Completed"
        },
        {
            product1: buds,
            product2: random,
            product: "Small Hi-Speed Fan",
            category: "Electric Product",
            customer: "Saleh Ahmed",
            type: "Pro Customer",
            orderId: "#01766713223",
            date: "Apr 01, 2024",
            amount: "$10,120.00",
            payment: "Paid by Mastercard",
            status: "Rejected"
        },
        {
            product1: buds,
            product2: random,
            product: "MI Watch Pro X231 Max",
            category: "Electric Product",
            customer: "Muhammad Salim",
            type: "New Customer",
            orderId: "#01766712398",
            date: "May 25, 2024",
            amount: "$18,190.00",
            payment: "Cash on Delivery",
            status: "Accepted"
        },
        {
            product1: buds,
            product2: random,
            product: "Nike New Model Shoes",
            category: "Shoes Product",
            customer: "Saad Makki",
            type: "Star Customer",
            orderId: "#01766712078",
            date: "May 20, 2024",
            amount: "$13,760.00",
            payment: "Paid by Mastercard",
            status: "Accepted"
        },
        {
            product1: buds,
            product2: random,
            product: "Man T-shirt Green Color",
            category: "Clothes Product",
            customer: "Jack Kalis",
            type: "Pro Customer",
            orderId: "#01766756777",
            date: "May 15, 2024",
            amount: "$9,720.00",
            payment: "Paid by Visacard",
            status: "Completed"
        },
        {
            product1: buds,
            product2: random,
            product: "Fifa 2026 Football",
            category: "Sports Product",
            customer: "Jhon Ken",
            type: "Pro Customer",
            orderId: "#01766712233",
            date: "May 10, 2024",
            amount: "$90,120.00",
            payment: "Paid by Mastercard",
            status: "Rejected"
        },
        {
            product1: buds,
            product2: random,
            product: "Winter Cloth Siwiter",
            category: "Clothes Product",
            customer: "Makkolam Bennndon",
            type: "New Customer",
            orderId: "#01766712876",
            date: "May 05, 2024",
            amount: "$40,980.00",
            payment: "Cash on Delivery",
            status: "Pending"
        }
    ]);

    const stats = [
        {
            title: "Total Orders",
            count: "2,40,120",
            color: "text-teal-600",
            indicator: "bg-teal-500",
            note: "Total Orders last 365 days",
        },
        {
            title: "New Orders",
            count: "1,70,190",
            color: "text-yellow-600",
            indicator: "bg-yellow-500",
            note: "New Orders last 365 days",
        },
        {
            title: "Completed Orders",
            count: "1,40,530",
            color: "text-green-600",
            indicator: "bg-green-500",
            note: "Completed Order last 365 days",
        },
        {
            title: "Cancelled Orders",
            count: "99,349",
            color: "text-red-600",
            indicator: "bg-red-500",
            note: "Cancelled Order last 365 days",
        },
    ];

    // const stats = [
    //     {
    //         title: "Customers",
    //         count: "8,540",
    //         note: "32 joined today",
    //         indicator: "bg-green-400",
    //     },
    //     {
    //         title: "Revenue",
    //         count: "₹1.2M",
    //         note: "Up by 15% this week",
    //         indicator: "bg-blue-400",
    //     },
    //     {
    //         title: "Issues",
    //         count: "24",
    //         note: "5 new today",
    //         indicator: "bg-red-400",
    //     },
    // ];
    return (
        <>
            <div className='bg-[#0a192f] h-auto'>
                <div className="flex flex-col md:flex-row justify-between items-stretch mx-auto p-4 md:p-6 gap-4 sm:w-full">
                    {stats.map((item, index) => (
                        <div key={index} className="flex-1 items-center justify-center backdrop-blur-md bg-[#0a192f] border border-gray-500 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="w-10 h-10 mb-3 flex items-center justify-center rounded-full bg-white/10 text-white text-lg">
                                <span>📊</span>
                            </div>

                            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                                {item.title}
                            </h2>

                            <div className="flex items-center gap-3 mt-1">
                                <p className="text-3xl font-bold text-white">{item.count}</p>
                                <span className={`w-3 h-3 rounded-full ${item.indicator} shadow-md`}></span>
                            </div>

                            <p className="text-xs text-gray-400 mt-2">{item.note}</p>
                        </div>
                    ))}
                </div>

                <div className='sm:flex pt-3 sm:flex-col lg:flex-row sm:space-y-5 lg:space-y-0 justify-around items-center space-y-5'>
                    <div className='border p-4 border-gray-500 rounded-xl bg-[#0a192f] text-white sm:w-[500px] max-md:mx-auto w-[370px]'>
                        <AraeaChart />
                    </div>
                    <div className="bg-[#0a192f] border border-gray-500 w-[500px] rounded-xl p-6 h-[398.6px] max-md:mx-auto max-md:w-[370px]">
                        <h2 className="text-base text-white font-[500] text-[20px] mb-2">Order Overview</h2>
                        <h1 className="text-4xl text-white">5680</h1>
                        <p className="text-sm text-white mb-6 mt-4">Total Revenue</p>
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-white">Online Order</span>
                                <span className="text-sm text-white">30%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                                <div className="h-2 bg-indigo-500 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-white">Offline Order</span>
                                <span className="text-sm text-white">50%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                                <div className="h-2 bg-green-400 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-white">Cash On Delivery</span>
                                <span className="text-sm text-white">20%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                                <div className="h-2 bg-orange-400 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                        </div>
                    </div>
                </div><br />
                <div className='flex items-center justify-around flex-col space-y-4 lg:space-y-0 lg:flex-row'>
                    <div className='border border-gray-500 h-auto w-[370px] p-4 rounded-2xl'>
                        <div className='flex items-end justify-between'>
                            <h1 className='text-white'>Sales Activities</h1>
                            <div className='flex items-end '><FaCaretUp color='rgb(34 197 94 / var(--tw-text-opacity, 1))' /><p className='text-green-500'>720</p></div>
                        </div>
                        <div className='flex items-end justify-between pt-2'>
                            <h1 className='text-white text-[12px]'>Last 6 Months</h1>
                            <p className='text-red-500 text-[12px]'>+120.5(5.0%)</p>
                        </div>
                        <div>
                            <Secondchart />
                        </div>
                        <hr style={{ color: 'gray' }} /><br />
                        <div className='text-white text-[13px] flex items-center justify-between'>
                            <p>
                                5% Negative <br /> Feedback <br />
                                95% Positive  <br /> Feedback <br /><br />
                                <span className='text-[20px]'>Customer <br /> Feedback <br />
                                    385749
                                </span>
                            </p>
                            <div className="w-32 h-32">
                                <ReactApexChart options={options} series={series} type="radialBar" height="100%" />
                            </div>
                        </div>
                    </div>
                    <div className='border border-gray-500 w-[350px] p-2 rounded-2xl h-[460.9px] overflow-y-auto scrollbar-hide'>
                        <p className='text-white'>Activity</p>
                        <div className="p-4 max-w-md mx-auto">
                            {notifications.map((note) => (
                                <div key={note.id} className="flex items-start gap-4 mb-6 border-b pb-4">
                                    <img src={note.avatar} alt="avatar" className="rounded-full w-10 h-10" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-white">{note.title}</h4>
                                            <span className="text-sm text-slate-200 text-nowrap">{note.date}</span>
                                        </div>
                                        <p className="text-slate-400 text-sm">{note.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-[#f9f9fb] rounded-xl p-6 shadow-md sm:w-[500px] w-[365px] space-y-4">
                        <h2 className="text-lg font-semibold mb-4">Store Location</h2>
                        <div className="relative h-auto">
                            <img src={map} alt="Surat Map" className="" />
                            {shops.map((shop) => (
                                <div key={shop.id} className="absolute w-4 h-4 bg-gray-600 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2" style={{ top: shop.top, left: shop.left }} onMouseEnter={() => setHoveredShop(shop.id)} onMouseLeave={() => setHoveredShop(null)}>
                                    {hoveredShop === shop.id && (
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded shadow-md z-10 whitespace-nowrap">
                                            {shop.name}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div><br />
                <div>
                    <div>
                        <div className="p-5">
                            <div className="relative bg-[#0A192F] h-12 sm:w-[500px] rounded-md shadow-md">
                                <IoSearchOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={20} />
                                <input type="text" placeholder="Search by users..." className="border rounded-3xl border-gray-400 w-full h-full pl-10 pr-3 bg-transparent text-white placeholder-gray-400 focus:outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 overflow-x-auto border border-gray-400 rounded-2xl">
                    <table className="min-w-full text-sm text-left text-white bg-[#0a192f] shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-[#0a192f]">
                            <tr>
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Customer Name</th>
                                <th className="px-4 py-2">Order ID</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">
                                        <div className='flex items-center sm:gap-2'>
                                            <div className='max-md:w-[60px]'><img src={item.product1} className='h-[40px] rounded-full' /></div>
                                            <div className='max-md:w-[60px]'>
                                                <p className="text-wrap">{item.product}</p>
                                                <p className="text-xs text-wrap text-gray-500">{item.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className='flex items-center sm:gap-2'>
                                            <div className='max-md:w-[60px]'>
                                                <img src={item.product2} className='h-[40px] rounded-full' />
                                            </div>
                                            <div className='max-md:w-[75px]'>
                                                <p>{item.customer}</p>
                                                <p className="text-xs text-gray-500">{item.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div>{item.orderId}</div>
                                        <div className="text-xs text-gray-500">{item.date}</div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div>{item.amount}</div>
                                        <div className="text-xs text-gray-500">{item.payment}</div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColorMap[item.status] || "bg-gray-100 text-gray-600"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button className="text-blue-500 hover:underline">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />
            </div>
        </>
    )
}

export default Orders