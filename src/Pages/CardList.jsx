import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../api-config/axiosInstance";
import { useNavigate } from "react-router-dom";
import card from "../assets/PNG/cart.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/user/userSlice";
import { MdDeleteForever } from "react-icons/md";

const CartList = () => {
    const readCart = useSelector((state) => state.cart);
    const dispatch = useDispatch(0);
    const [scrapList, setScrapList] = useState([]);
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState({}); // Use an object to store quantity for each scrap

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/getAddToCart');
            const scrapList = JSON.parse(response.data.data);
            console.log('scrapList', scrapList);
            setScrapList(scrapList.cartLists);

            // Initialize quantity state with default values
            const initialQuantityState = {};
            scrapList.cartLists.forEach((cart) => {
                initialQuantityState[cart.scrapId] = 0;
            });
            setQuantity(initialQuantityState);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const removeFromCard = async (event) => {
        const payload = {
            addToCartId: event,
        };
        try {
            const response = await axiosInstance.post('/removeFormCart', payload);
            const data = response.data;
            if (data.statusCode === 200) {
                dispatch(removeFromCart(event));
                Swal.fire({
                    icon: "success",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: data.message,
                });
                fetchData(); // Refresh the data after removing an item
                window.location.reload(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleRequestAddTocart = async (scrapId) => {

        if (quantity[scrapId] > 0) {
            console.log("handleRequestAddTocart working", scrapId);
            const currentQuantity = quantity[scrapId];

            const payload = {
                addScrapQuantity: currentQuantity,
                scrapId: scrapId,
            };
            console.log('handleRequestAddTocart payload', payload, 'readCart', readCart);
            try {
                const response = await axiosInstance.post('/addScrapQuantity', payload);
                const data = response.data;
                if (data.statusCode === 200) {

                    fetchData(); // Refresh the data after updating quantity
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            navigate("/request_pickup", {
                state: {
                    id: scrapId,
                },
            });
        } else {
            Swal.fire({
                icon: "error",
                position: "center",
                showConfirmButton: false,
                timer: 2500,
                title: "Add Quantity",
            });
        }

    };

    const handleIncrement = (scrapId) => {
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [scrapId]: prevQuantity[scrapId] + 1,
        }));
    };

    const handleDecrement = (scrapId) => {
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [scrapId]: Math.max(prevQuantity[scrapId] - 1, 0),
        }));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    return (
        <div className="w-full mt-5 flex justify-center items-center lg:max-w-[1100px] mx-auto">
            <div className="max-w-screen-xl w-full md:px-2 lg:px-4 px-0 ">
                {scrapList && scrapList.length > 0 ? (
                    scrapList.map((cart, index) => (

                        <div key={index} className="w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c] mt-[10px] mb-[10px] flex flex-col md:flex-row justify-between items-center p-[2.5rem] py-[2.7rem] md:p-8 lg:p-12">

                            <div className="flex justify-center items-center mb-4 md:mb-0">
                                <img
                                    className="w-[150px] h-[150px] max-sm:w-[100px] max-sm:h-[100px] object-cover mr-[20px]  max-er:w-[120px] max-er:h-[120px] rounded-[10px]"
                                    src={cart?.docUrl}
                                    alt=""
                                />
                                <div>
                                    <h5 className="font-bold text-[20px] max-er:text-[20px] md:text-[30px] text-gray-700">
                                        {cart?.scrapInfo.scrapName}
                                    </h5>
                                    <p className="font-bold text-[10px] max-er:text-[10px] md:text-[14px] text-gray-700">
                                        ₹ {cart?.scrapInfo.price} - {cart?.scrapInfo.quantityType}
                                    </p>

                                    <div className="flex items-start mt-2">
                                        <button onClick={() => handleDecrement(cart.scrapId)} className="border bg-lime-500 text-white rounded-md py-2 px-4 mr-2">-</button>
                                        <span className="text-4xl font-bold mx-4">{quantity[cart.scrapId]}</span>
                                        <button onClick={() => handleIncrement(cart.scrapId)} className="border bg-lime-500 text-white rounded-md py-2 px-4 ml-2">+</button>
                                    </div>
                                    {/* <button
                                            onClick={() => handleDecrement(cart.scrapId)}
                                            className="flex justify-center items-center w- h-10 rounded-full text-white focus:outline-none bg-gray-400 hover:bg-gray-500"
                                        >
                                            -
                                        </button>
                                        <span className="text-4xl font-bold mx-4">
                                            {quantity[cart.scrapId]}
                                        </span>
                                        <button
                                            onClick={() => handleIncrement(cart.scrapId)}
                                            className="flex justify-center items-center w-10 h-10 rounded-full text-white focus:outline-none bg-indigo-500 hover:bg-indigo-600"
                                        >
                                            +
                                        </button> */}

                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => navigate("/pricing", { replace: true })}
                                    className="lg:w-[200px] h-[50px] font-semibold bg-transparent border border-black rounded-[30px] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3"
                                >
                                    Browse More Scraps
                                </button>
                                <button
                                    onClick={() => handleRequestAddTocart(cart.scrapId)}
                                    className="lg:w-[200px] rounded-[30px] h-[50px] font-semibold text-white bg-[#81D742] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3"
                                >
                                    Request Pickup
                                </button>
                            </div>
                            <div className="cursor-pointer" onClick={() => { removeFromCard(cart.addToCartId) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                                <div class="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 ml-14 px-3 pointer-events-none">
                                    Remove
                                    <svg class="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" ><polygon class="fill-current" points="0,0 127.5,127.5 255,0" /></svg>
                                </div>
                            </div>

                            {/* <MdDeleteForever className="bg-[#81D742]" onClick={() => { removeFromCard(cart.addToCartId) }} /> */}
                            {/* <button className="bg-[#81D742] p-2 rounded items-end text-white text-right justify-end" onClick={() => { removeFromCard(cart.addToCartId) }}>Cross</button> */}
                        </div>
                    ))
                ) : (
                    <div className="container mx-auto max-w-sm w-full  sm:w-1/2">
                        <div className="card flex flex-col justify-center p-10 rounded-lg ">
                            <div className="prod-img">
                                <img src={card} className="w-full object-cover object-center" alt="" />
                            </div>
                            <div className="prod-info grid gap-10">
                                <div>
                                    <p>You don’t have any scrap in your cart</p>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between items-center gap-5 text-gray-900">
                                    <button
                                        onClick={() => navigate("/pricing", { replace: true })}
                                        className="px-2 py-2 transition ease-in duration-200 uppercase rounded-full   border-2 border-lime-500 focus:outline-none"
                                    >
                                        Browse Scraps
                                    </button>
                                    <button
                                        onClick={() => navigate("/pricing", { replace: true })}
                                        className="px-2 py-2 transition ease-in duration-200 uppercase rounded-full bg-lime-500  border-2 border-lime-500 focus:outline-none"
                                    >
                                        Return To Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartList;