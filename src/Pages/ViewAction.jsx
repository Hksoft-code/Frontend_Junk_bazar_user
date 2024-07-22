import React, { useState } from "react";
import Nav from "../Common/Navbar/Nav";
import Footer from "../Common/Footer/Footer";
import image1 from "../assets/PNG/icons8-watch-24.png";
import image2 from "../assets/PNG/icons8-watch-24 (1).png";
import image3 from "../assets/PNG/icons8-hammer-64 (1).png";
import image4 from "../assets/PNG/icons8-hammer-64.png";
import image5 from "../assets/PNG/junk-bg.png";
import carousel1 from "../assets/JPEG/JUNK1.jpeg";
import carousel2 from "../assets/JPEG/junk2.jpg";
import carousel3 from "../assets/JPEG/JUNK3.jpeg";
import carousel4 from "../assets/JPEG/JUNK1.jpeg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";

import { useNavigate } from "react-router-dom";
import Enquiry from "../Components/Auction/Enquiry";
import Carousel from "react-multi-carousel";

const ViewAction = () => {
  const navigate = useNavigate();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const style = {
    common_style_1: "flex justify-between text-[19px] font-normal",
    common_style_2:
      "border-[1px]  border-gray-400 rounded-md m-2 mb-10 auctionGridBox1",
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <div className="h-[100px]">
        <Nav />
      </div>
      <div className="h-full overflow-y-auto flex flex-col">
        {/* Header Details */}
        <div className="bg-[#3cb042] mx-[90px] px-14 py-12">
          <p className="text-white font-semibold text-[24px] text-center">
            PR-512 | Cyclone Affected Stock of Steel Coils belongs to Indian
            Pipes Pvt Ltd Approx 2, 33, 444 Kgs & Michung Cyclone Affected Stock
            of Steel Coils belongs to Indian Pipes
          </p>
        </div>
        {/* Image Carousel */}
        <div className="px-20 my-10 w-full mx-auto">
          <Carousel
            responsive={responsive}
            showDots={true}
            autoPlay={true}
            transitionDuration={500}
            itemClass="carousel-item-padding-40-px"
            dotListClass="custom-dot-list-style"
            className="flex flex-row gap-4"
            slidesToSlide={1}
          >
            <div className={`${style.common_style_2}`}>
              <img
                src={carousel1}
                alt="carousle_image"
                className="rounded-md"
              />
            </div>
            <div className={`${style.common_style_2}`}>
              <img
                alt="carousle_image"
                className="rounded-md"
                src={carousel2}
              />
            </div>
            <div className={`${style.common_style_2}`}>
              <img
                alt="carousle_image"
                className="rounded-md"
                src={carousel1}
              />
            </div>
            <div className={`${style.common_style_2}`}>
              <img
                alt="carousle_image"
                className="rounded-md"
                src={carousel4}
              />
            </div>
            <div className={`${style.common_style_2}`}>
              <img
                alt="carousle_image"
                className="rounded-md"
                src={carousel3}
              />
            </div>
            <div className={`${style.common_style_2}`}>
              <img
                alt="carousle_image"
                className="rounded-md"
                src={carousel3}
              />
            </div>
          </Carousel>
        </div>
        <div className="h-full  flex flex-col justify-between">
          {/* Auction Details */}
          <div className="bg-gray-100 w-full">
            <div className="w-[50%] mx-auto flex flex-col gap-4 mt-10">
              <div className={`${style.common_style_1}`}>
                <p>Auction ID</p>
                <p>PR-512</p>
              </div>
              <div className={`${style.common_style_1}`}>
                <p>Auction Type</p>
                <p>Private</p>
              </div>
              <div className={`${style.common_style_1}`}>
                <p>Start Time</p>
                <p>30 Dec 2023 4:00 PM</p>
              </div>
              <div className={`${style.common_style_1}`}>
                <p>End Time</p>
                <p>30 Dec 2023 6:00 PM</p>
              </div>
              <div className={`${style.common_style_1}`}>
                <p>Starting Price</p>
                <p>INR 51</p>
              </div>
              <div className={`${style.common_style_1}`}>
                <p>Minimum Increment</p>
                <p>INR 0.30</p>
              </div>
              <div className={`${style.common_style_1}`}>
                <p>EMD Amount</p>
                <p>INR 15, 00, 000</p>
              </div>
              <div className={`${style.common_style_1}`}>
                <p>Quantity</p>
                <p>Approx 2,33,22 Kgs</p>
              </div>
              <div className={`${style.common_style_1}`}>
                <p>Location</p>
                <p>Odisha</p>
              </div>
              <div className="mt-4 mb-16">
                <button
                  className="bg-[#3cb042] w-full h-14 shadow-lg rounded-xl text-[18px] font-semibold text-white"
                  type="button"
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
          {/* Related Listing */}
          <div className="px-20 w-full mx-auto">
            <p className="text-[26px] font-semibold mt-4">Related Listing</p>
            <div className="grid grid-cols-3 gap-10 mt-4">
              {[1, 2, 3].map((data, index) => (
                <div className="bg-white h-[380px] rounded-xl auctionGridBox px-5 py-5  flex justify-between flex-col ">
                  <div className="flex justify-between items-center px-3 pt-1">
                    <p className="text-[20px] font-semibold ">
                      GR-291 | Fire Damaged Carpets
                    </p>
                    <p className="text-[14px] font-medium">03 Jan 2024</p>
                  </div>
                  <div className="w-full flex gap-4 px-3 ">
                    <div className="w-[40%]">
                      <img
                        src={image5}
                        alt="Junk-bazzar-logo"
                        className="w-full h-[210px] rounded-lg border-[1.5px]"
                      />
                    </div>
                    <div className="w-[60%] flex gap-[22px] flex-col">
                      <div className="flex justify-between w-full">
                        <div className="flex gap-3 items-center">
                          <img
                            src={image1}
                            alt="Junk-bazzar-logo"
                            className="w-5 h-5 "
                          />
                          <p className="text-[14px] text-black">Start Time</p>
                        </div>
                        <div className="text-[14px] text-black font-semibold">
                          9:00pm
                        </div>
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="flex gap-3 items-center">
                          <img
                            src={image2}
                            alt="Junk-bazzar-logo"
                            className="w-5 h-5 "
                          />
                          <p className="text-[14px] text-black">Start Time</p>
                        </div>
                        <div className="text-[14px] text-black font-semibold">
                          9:00pm
                        </div>
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="flex gap-3 items-center">
                          <img
                            src={image4}
                            alt="Junk-bazzar-logo"
                            className="w-6 h-6 "
                          />
                          <p className="text-[14px] text-black">Start Time</p>
                        </div>
                        <div className="text-[14px] text-black font-semibold">
                          9:00pm
                        </div>
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="flex gap-3 items-center">
                          <img
                            src={image3}
                            alt="Junk-bazzar-logo"
                            className="w-6 h-6 "
                          />
                          <p className="text-[14px] text-black">Start Time</p>
                        </div>
                        <div className="text-[14px] text-black font-semibold">
                          9:00pm
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        Starts In :
                        <p className="text-red-600 text-[18px] font-semibold">
                          {" "}
                          4D, 23hrs, 34m, 3s
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" flex w-full justify-between gap-2">
                    <button
                      className="bg-[#3cb042] w-full h-14 shadow-lg rounded-xl text-[18px] font-semibold text-white"
                      type="button"
                      onClick={() => {
                        navigate("/view-auction");
                      }}
                    >
                      View
                    </button>
                    <button
                      className="overflow-hidden w-full border-2 h-14 border-[#3cb042] shadow-lg rounded-xl text-[18px] font-semibold text-[#3cb042]"
                      type="button"
                      onClick={() => {
                        setIsEnquiryOpen(true);
                      }}
                    >
                      Send Enquiry
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {isEnquiryOpen && (
              <div className="absolute h-full w-full bg-[#0000004d] top-0 left-0 bottom-0 right-0 overflow-y-auto flex justify-center items-center">
                <Enquiry setIsEnquiryOpen={setIsEnquiryOpen} />
              </div>
            )}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ViewAction;
