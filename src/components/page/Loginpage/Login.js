import React, { useEffect, useState } from 'react';
import mobilezepto from '../../assets/mobilezepto.png';
import gplay from '../../assets/gplay.svg';
import appstore from '../../assets/appstore.svg';
import zeptoformlogo from '../../assets/zeptoformlogo.svg';
import { useNavigate } from 'react-router-dom';
import Otp from '../OTP/Otp';
import axios from 'axios';
import BaseUrl from '../../service/Baseurl';
import { toast } from 'react-hot-toast';
import Spinner from '../Spinner';

const Login = ({ setislogin }) => {
  const navigate = useNavigate();
  const [isSpin, setisSpin] = useState(false)

  // prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [otp, setotp] = useState(false);
  const [email, setEmail] = useState('');

  const fetchotpapi = async () => {
    try {
      if (!email) {
        toast.error("Please enter email first!");
        return;
      }
      setisSpin(true)

      const result = await axios.post(`${BaseUrl}/user/send/otp`, { email });
      if (result.data.success) {
        setisSpin(false)
        localStorage.setItem('email', email)
        toast.success(result.data.message);
        setotp(true);
      }
    } catch (error) {
      setisSpin(false)
      console.error(error.message);
      toast.error("Something went wrong. Try again.");
    }
  };

  if (otp) {
    return <Otp setotp={setotp} setislogin={setislogin} email={email} />;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4"
        onClick={() => setislogin(false)}
      >
        <div
          className="relative z-40 flex w-full max-w-5xl flex-row rounded-lg justify-center overflow-hidden shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Side */}
          <div
            style={{
              background: 'linear-gradient(to bottom right, #450467, #C73664)',
            }}
            className="w-[500px] rounded-l-lg"
          >
            <div className="w-full overflow-auto p-6 pt-[10%] sm:p-8 sm:pt-10">
              <div>
                <img
                  src={zeptoformlogo}
                  alt="Zepto Logo"
                  className="relative overflow-hidden object-contain h-[54px] w-[164px]"
                />
                <h2 className="block tracking-wider font-bold text-4xl mb-8 mt-7 max-w-[60%] text-left sm:max-w-full text-white">
                  Groceries delivered <br /> in 10 minutes
                </h2>

                {/* Email Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    fetchotpapi();
                  }}
                >
                  <div className="w-full relative text-base flex bg-white items-center border mb-4 rounded-full">
                    <input
                      className="focus:outline-none block py-3 px-4 appearance-none flex-grow font-normal bg-transparent text-md"
                      type="email"
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {isSpin ?
                    <Spinner />
                    :
                    <button
                      type="submit"
                      className="tracking-widest w-full mt-1 rounded-3xl bg-[linear-gradient(92.16deg,_#ff3269_1.82%,_#ff794d_98.18%)] p-3 text-lg font-semibold text-white"
                    >
                      <div className="flex items-center justify-center">
                        SendOtp
                      </div>

                    </button>
                  }
                </form>
              </div>

              {/* Terms */}
              <div className="flex flex-col items-center justify-center pt-8 sm:pt-6 mt-8">
                <p className="block text-base text-white font-[400]">
                  By continuing, you agree to our
                </p>
                <p className="block text-base">
                  <a
                    className="px-1 font-bold text-[#E24468]"
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms of Service
                  </a>{' '}
                  &amp;
                  <a
                    className="px-1 font-bold text-[#E24468]"
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div
            className="hidden w-[300px] sm:block rounded-r-lg"
            style={{
              background:
                'radial-gradient(circle at top left, #ffffff 20%, #FDF1F7 100%)',
            }}
          >
            <div className="flex h-full w-full flex-col items-center overflow-auto pt-4">
              <img
                src={mobilezepto}
                width={100}
                height={100}
                alt="Mobile Preview"
                className="relative overflow-hidden mt-5 object-contain bg-transparent"
              />
              <div className="mt-2 px-8 text-center">
                <h3
                  className="block tracking-wider font-bold text-[30px]"
                  style={{ color: 'rgb(76, 0, 115)' }}
                >
                  Order faster <br /> &amp; easier everytime
                </h3>
                <h3 className="block text-lg tracking-wider text-gray-500">
                  with the Zepto App
                </h3>
              </div>
              <a href="#" target="_blank" rel="noreferrer">
                <img
                  src={gplay}
                  height={46}
                  width={180}
                  alt="Google Play"
                  className="relative overflow-hidden mt-6 bg-transparent object-contain"
                />
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <img
                  src={appstore}
                  height={46}
                  width={180}
                  alt="App Store"
                  className="relative overflow-hidden mt-6 bg-transparent object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;