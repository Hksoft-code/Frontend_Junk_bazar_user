import React from "react";

const Enquiry = ({ setIsEnquiryOpen }) => {
  return (
    <div className="bg-white w-[50%]">
      <div>
        <p
          className="text-[26px] font-bold text-black cursor-pointer flex justify-end px-5"
          onClick={() => {
            setIsEnquiryOpen(false);
          }}
        >
          X
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <span className="flex  gap-4 justify-center">
          <p className="text-[40px] font-semibold text-black">Send</p>
          <p className="text-[#3cb042] text-[40px] font-semibold">Enquiry</p>
        </span>
        <p>
          You will get a response in few minute. Please fill the enquiry form
          and let's know how we can help you
        </p>
      </div>
      <div className="flex flex-col w-[70%] mx-auto my-10 gap-8">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[16px] font-semibold ">Name :</p>
          <input
            type="text"
            className="border-b-[1px] border-black text-[15px] w-full outline-none"
            placeholder="Name"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <p className="text-[16px] font-semibold ">Email address :</p>
          <input
            type="text"
            className="border-b-[1px] border-black text-[15px] w-full outline-none"
            placeholder="Email address"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <p className="text-[16px] font-semibold ">Phone number :</p>
          <input
            type="number"
            className="border-b-[1px] border-black text-[15px] w-full outline-none"
            placeholder="Phone number"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <p className="text-[16px] font-semibold ">Write your message :</p>
          <input
            type="text"
            className="border-b-[1px] border-black text-[15px] w-full outline-none"
            placeholder="Message"
          />
        </div>
      </div>
      <div className="w-[70%] mx-auto flex justify-between gap-2 mb-10">
        <button className="bg-[#3cb042] w-full h-14 shadow-lg rounded-xl text-[18px] font-semibold text-white">
          Submit
        </button>
        <button
          className="overflow-hidden w-full border-2 h-14 border-[#3cb042] shadow-lg rounded-xl text-[18px] font-semibold text-[#3cb042]"
          type="button"
          onClick={() => {
            setIsEnquiryOpen(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Enquiry;
