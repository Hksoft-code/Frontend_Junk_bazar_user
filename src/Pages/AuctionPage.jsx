import React, { useState } from "react";
// import junk_logo from "../../assets/PNG/icons8-watch-30.png";
import image1 from "../assets/PNG/icons8-watch-24.png";
import image2 from "../assets/PNG/icons8-watch-24 (1).png";
import image3 from "../assets/PNG/icons8-hammer-64 (1).png";
import image4 from "../assets/PNG/icons8-hammer-64.png";
import image5 from "../assets/PNG/junk-bg.png";

import Nav from "../Common/Navbar/Nav";
import Footer from "../Common/Footer/Footer";
import Enquiry from "../Components/Auction/Enquiry";
import { useNavigate } from "react-router-dom";

const AuctionPage = () => {
  const navigate = useNavigate();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <div className="h-[100px]">
        <Nav />
      </div>
      <div className="h-full overflow-y-auto flex flex-col justify-between">
        <div className="w-full mx-auto px-20">
          <div className="bg-[#3cb042] w-full h-fit p-10 flex flex-row gap-6 items-center justify-center">
            <select className="w-[250px] bg-white p-1 h-10 text-[#5AB344]">
              <option value="">Select Category</option>
              <option value="">India</option>

              {/* {countriesAndStates.map((country) => (
              <option key={country.iso2} value={country.iso2}>
                {country.name}
              </option>
            ))} */}
            </select>
            <select className="w-[250px] bg-white p-1 h-10 text-[#5AB344]">
              <option value="">Listing Type</option>
              <option value="">India</option>

              {/* {countriesAndStates.map((country) => (
              <option key={country.iso2} value={country.iso2}>
                {country.name}
              </option>
            ))} */}
            </select>
            <select className="w-[250px] bg-white p-1 h-10 text-[#5AB344]">
              <option value="">Location</option>
              <option value="">India</option>

              {/* {countriesAndStates.map((country) => (
              <option key={country.iso2} value={country.iso2}>
                {country.name}
              </option>
            ))} */}
            </select>
            <select className="w-[250px] bg-white p-1 h-10 text-[#5AB344]">
              <option value="">Auction Id/Title</option>
              <option value="">India</option>

              {/* {countriesAndStates.map((country) => (
              <option key={country.iso2} value={country.iso2}>
                {country.name}
              </option>
            ))} */}
            </select>
            <button className="bg-[#88f46c] px-10 h-10 rounded-md shadow-lg text-white">
              Search
            </button>
          </div>
          <div className="grid grid-cols-3 gap-10 mt-10">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((data, index) => (
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
                  <button className="bg-[#3cb042] w-full h-14 shadow-lg rounded-xl text-[18px] font-semibold text-white"
                  type="button"
                  onClick={()=>{
                    navigate("/view-auction")
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
  );
};

export default AuctionPage;
