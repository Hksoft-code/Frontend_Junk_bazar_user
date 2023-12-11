import axios from "axios";
import React, {
    useState
} from "react";
import customer from "../../assets/PNG/customer.png";
import Input from "../../Components/auth/Input.jsx";
import LabeledInput from "../../Components/auth/LabeledInput.jsx";
import Button from "../../Components/auth/Button.jsx";
import Swal from "sweetalert2";
import {
    serverUrl
} from "../../api-config/config";
import {
    useLocation,
    useNavigate
} from "react-router-dom";

import api from '../../api-config/axiosInstance.js';

const SignIn = ({ navigation }) => {
    const location = useLocation()
    const navigate = useNavigate();
    console.log("token", localStorage.getItem("token"))
    const [checked,
        setChecked] = React.useState(true);
    const [phoneNumber,
        setPhoneNumber] = useState("");

    const Sign_In = async () => {


        try {
            const payLoad = {
                dialCode: "+91",
                phoneNumber: phoneNumber
            };

            const response = await api.post(`${serverUrl}/login`, payLoad);
            const data = response.data;
            if (data.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: response.data.message
                });
                navigate("/otp-verify", { state: { id: phoneNumber } });
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            if (error.response) {
                // If server responded with a status code for a request  
                Swal.fire({
                    icon: "error",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: error.response.data.error._message
                });
            }
            else if (error.request) {
                // Client made a request but response is not received 
                console.log("<<<<<<<Response Not Received>>>>>>>>");
                console.log(error.request);
            }
            else {
                // Other case 
                console.log("Error", error.message);
            }
        }

        // await axios
        //     .post(`${serverUrl}/login`, data, {
        //         headers: headers
        //     })
        //     .then((res) => {
        //         console.log('api called', res);
        //         const data = res.data;
        //         // console.log('api called',res.data);
        //         Swal.fire({
        //             icon: "success",
        //             position: "center",
        //             showConfirmButton: false,
        //             timer: 2500,
        //             title: res.data.message
        //         });

        //         if (data.statusCode === 200) {
        //             navigate("/otp-verify", { replace: true })
        //         }

        //     })

        //     .catch(error => {
        //         if (error.response) {
        //             // If server responded with a status code for a request  
        //             Swal.fire({
        //                 icon: "error",
        //                 position: "center",
        //                 showConfirmButton: false,
        //                 timer: 2500,
        //                 title: error.response.data.error._message
        //             });
        //         }
        //         else if (error.request) {
        //             // Client made a request but response is not received 
        //             console.log("<<<<<<<Response Not Received>>>>>>>>");
        //             console.log(error.request);
        //         }
        //         else {
        //             // Other case 
        //             console.log("Error", error.message);
        //         }
        //         // Error handling here 
        //     });
    };

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-20 gap-y-20 px-6 lg:px-8 xl:grid-cols-2 lg:grid-cols-2">
                <div className="w-full text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome To JunkBazar</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">Sign up to enjoy exclusive access!.</p>
                    <img className="h-full w-full rounded-full" src={customer} alt=" " />
                </div>
                <div className="w-full">
                    <div className="shadow-md p-8">
                        {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome To JunkBazar</h2> */}
                        <p className="mt-6 text-lg leading-8 text-gray-600">Sign into your account.</p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">Enter Phone Number.</p>

                        <p className="mt-6 text-sm leading-8 text-gray-600">Phone number</p>
                        <LabeledInput
                            type='number' inputMode='numeric' pattern="[0-9]*"
                            maxlength="10"
                            handleChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />

                        <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
                            <p className="text-[14px] text-[#666666] font-semibold mt-24 mb-5">
                                <Input
                                    type="checkbox"
                                    classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                                    value={checked}
                                    checked={checked}
                                    handleChange={() => setChecked((prevState) => !prevState)}
                                />By creating an account, I agree to our {" "}
                                <span className="underline cursor-pointer">Terms of use</span> and{" "}
                                <span className="underline cursor-pointer">Privacy Policy </span>
                            </p>
                        </div>
                        <Button
                            label="Continue"
                            classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
                            handleClick={Sign_In}

                        />
                        <div className="relative text-center mt-10">
                            <span className="text-darkslategray-200">
                                Already have an account?
                            </span>
                            <span className="text-dimgray-200">{" "}</span>
                            <span onClick={() => navigate("/sign-up")} className="[text-decoration:underline]">{"Sign Up  "}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignIn;
