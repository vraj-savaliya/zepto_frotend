import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mobilezepto from '../../assets/mobilezepto.png';
import gplay from '../../assets/gplay.svg';
import appstore from '../../assets/appstore.svg';
import { LuMessageCircle, LuMoveLeft } from 'react-icons/lu';
import toast from 'react-hot-toast'
import Spinner from '../Spinner';
import axios from 'axios';
import BaseUrl from '../../service/Baseurl';

const Otp = ({ setotp, setislogin }) => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(new Array(5).fill(""))
    const [timeLeft, setTimeLeft] = useState(2 * 60);
    const [isSpin, setisSpin] = useState(false)

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // allow only digits
        if (value.length > 1) return; // prevent more than 1 digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // auto focus next box
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-${index + 1}`).focus();
        }

        console.log("OTP:", newOtp.join("")); // ✅ Logs full OTP
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };


    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) return; // stop when it reaches 0
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Format seconds into mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${secs}`;
    };

    const VeriFyOtp = async () => {
        try {
            setisSpin(true)

            const result = await axios.post(`${BaseUrl}/user/verify/otp`, { otp: otp.join('').toString(), email: localStorage.getItem('email') });
            if (result.data.success) {
                toast.success(result.data.message);
                localStorage.removeItem('email')
                localStorage.setItem('userid', result.data.data)
                setisSpin(false)
                setislogin(false)
                navigate('/profile')
            }
        } catch (error) {
            setisSpin(false)
            console.error(error.message);
            toast.error("Something went wrong. Try again.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">

                {/* Left Section - OTP Form */}
                <div style={{ background: 'linear-gradient(to bottom right, #450467, #C73664)' }} className="w-full md:w-1/2 p-6 md:p-10 h-full overflow-y-auto">
                    <div>
                        <LuMoveLeft color='white' size={32} className="mb-4 cursor-pointer" />
                        <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">OTP Verification</h2>
                        <p className="text-white text-sm font-semibold mb-6">OTP has been sent to +91 1478523690</p>

                        {/* OTP Inputs */}
                        <form>
                            <div className="flex justify-center gap-2 sm:gap-4">
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        id={`otp-${i}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(e, i)}
                                        onKeyDown={(e) => handleKeyDown(e, i)}
                                        className="bg-white w-10 h-12 sm:w-12 sm:h-14 text-center rounded-2xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                ))}
                            </div>
                        </form>

                        {/* Timer and Resend */}
                        <div className="flex flex-col items-center mt-10 space-y-2">
                            {/* Countdown timer */}
                            {isSpin ?
                                <Spinner />
                                :
                                <button
                                    type="button"
                                    onClick={VeriFyOtp}
                                    className="tracking-widest w-full mt-1 rounded-3xl bg-[linear-gradient(92.16deg,_#ff3269_1.82%,_#ff794d_98.18%)] p-3 text-lg font-semibold text-white"
                                >
                                    <div className="flex items-center justify-center">
                                        VerifyOtp
                                    </div>

                                </button>
                            }
                            <p className="text-white text-xl font-semibold">
                                {formatTime(timeLeft)}
                            </p>

                            <p className="text-white text-base">Didn't get it?</p>

                            {timeLeft === 0 && (
                                <div
                                    className="flex items-center gap-1 text-pink-200 underline cursor-pointer"
                                    onClick={() => setTimeLeft(2 * 60)} // ✅ reset timer on resend
                                >
                                    <LuMessageCircle color="pink" size={18} />
                                    <span>ReSend OTP (Email)</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Section - Zepto App Promo */}
                <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-6" style={{ background: 'radial-gradient(circle at top left, #ffffff 20%, #FDF1F7 100%)' }}>
                    <img src={mobilezepto} alt="Zepto Mobile" className="w-24 h-24 object-contain mb-4" />
                    <h3 className="text-xl md:text-2xl font-bold text-center text-purple-900 mb-2 leading-tight">
                        Order faster <br /> & easier everytime
                    </h3>
                    <p className="text-gray-500 mb-4 text-center">with the Zepto App</p>
                    <a target="_blank" rel="noopener noreferrer">
                        <img src={gplay} alt="Google Play" className="w-44 h-12 object-contain mb-3" />
                    </a>
                    <a target="_blank" rel="noopener noreferrer">
                        <img src={appstore} alt="App Store" className="w-44 h-12 object-contain" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Otp;
