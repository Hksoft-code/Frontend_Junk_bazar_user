import React, { useState } from "react";
import customer from "../../assets/PNG/customer.png";
import Input from "../../Components/auth/Input.jsx";
import LabeledInput from "../../Components/auth/LabeledInput.jsx";
import Button from "../../Components/auth/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../api-config/axiosInstance.js";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import SmallSignUp from "./SmallSignUp.jsx";
import { IoChevronBackOutline } from "react-icons/io5";
import { signUpUser } from "../../Services/user.js";
import ErrorMessage from "./ErrorMessage.jsx";

const SignUp = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const phoneRegex = /^\d{10}$/;
    const isValid = phoneRegex.test(value);

    // console.log("isValid", isValid);
    setPhoneNumber(value);
    setIsValidPhoneNumber(isValid);
  };
  const signUpService = async () => {
    if (checked) {
      const mobile = phoneNumber.slice(3, 13);
      const payload = {
        dialCode: "+91",
        phoneNumber: mobile,
      };
      try {
        // const resp = await axiosInstance.post("/register", payload);
        const response = await signUpUser(payload);
        if (response) {
          navigate("/otp-verify", {
            state: {
              mobile,
            },
          });
        }
      } catch (error) {
        const errorMessage = !error.response.data.error.message
          ? error.response.data.error?._message
          : error.response.data.error.message;
        setSignUpError(errorMessage);
      }
    } else {
    }
  };

  return (
    <>
      <SmallSignUp />

      <div class="h-screen md:flex signup-container">
        <div class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr  i justify-around items-center hidden sm:block ">
          <div className="w-full text-center   ">
            <div className="flex flex-row gap-2">
              <Link to="/">
                <IoChevronBackOutline className="ml-12 w-12 h-12 cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200" />
              </Link>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
                Welcome To <span className="text-lime-600">JunkBazar</span>
              </h2>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600 ">
              Sign In to enjoy exclusive access!.
            </p>
            <img
              className="max-w-lg mx-auto mt-4 rounded-full"
              src={customer}
              alt=" "
            />
          </div>
        </div>
        <div class="flex md:w-1/2 mx-auto justify-center py-10 items-center bg-white">
          <div className="max-w-2xl max-h-screen">
            <div className="shadow-xl p-20 w-full">
              <p className="mt-6  leading-8 text-gray-600 font-bold text-xl">
                Sign up now
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Enter Phone number
              </p>
              {/* <div className="border-solid p-2 max-w-md rounded-lg border-2 border-gray-600 "> */}
              {/* <PhoneInput
                                international
                                defaultCountry="IN"
                                value={phoneNumber}
                                onChange={setPhoneNumber}

                            /> */}
              <div className="border  rounded p-2 max-w-sm">
                <PhoneInput
                  maxLength={15}
                  className={"input-phone-number"}
                  international
                  defaultCountry="IN"
                  value={phoneNumber}
                  onChange={(number) => {
                    console.log({ number })
                    setPhoneNumber(number)
                    if (signUpError) setSignUpError('')
                  }}
                />
              </div>
              {signUpError?.length ? <ErrorMessage errorMessage={signUpError} /> : <div className="p-[0.75rem]"></div>}
              {/* <LabeledInput className="col-span-2"
                            type='number'
                            inputMode='numeric'
                            pattern="[0-9]*"
                            maxlength="10"
                            handleChange={handlePhoneNumberChange}
                        /> */}
              {/* </div> */}
              {/* {!isValidPhoneNumber && (
                            <p className="text-red-500 text-sm mt-1">Please enter a valid 10-digit phone number.</p>
                        )} */}
              <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
                <p className="text-[14px] text-[#666666] font-semibold mt-24 mb-5">
                  <Input
                    type="checkbox"
                    classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                    value={checked}
                    checked={checked}
                    handleChange={() => setChecked((prevState) => !prevState)}
                  />
                  By creating an account, I agree to our{" "}
                  <span className="underline cursor-pointer">Terms of use</span>{" "}
                  and{" "}
                  <span className="underline cursor-pointer">
                    Privacy Policy{" "}
                  </span>
                </p>
              </div>
              <Button
                label="Continue"
                classname={`${checked && !signUpError ? "cursor-pointer" : "cursor-not-allowed"
                  } font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80`}
                handleClick={signUpService}
                disabled={signUpError}
              />
              <p className="text-[14px] text-[#4A4A4A] mt-2 text-center font-[400] cursor-pointer">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/sign-in")}
                  className="text-[#81D742] hover:font-semibold hover:underline cursor-pointer"
                >
                  Sign In
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
