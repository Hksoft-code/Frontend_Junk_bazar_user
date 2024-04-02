import { useEffect, useState } from "react";
import "../styles/pickupRequest.css";
import { getAllAddress } from "../../Services/pickupRequest";
import { useLocation, useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

import Edit_Address_form from "./Edit_Address_form";

const AddAddress = () => {
  const [addres, setAddress] = useState();
  const [checked, setChecked] = useState(false);
  const [selectAddress, setSelectAddress] = useState("");
  const [defaultAddress, setDefault] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const location = useLocation();
  const passData = location.state ? location.state.passData : null;

  console.log("card data list", passData);

  // const ChangeAddress = () => {
  //   const payload = {
  //     scrapId: passData.scrapId,
  //     addToCartId: passData.addToCartId,
  //     scraplist: passData.scrapList,
  //   };
  //   navigate("/addAddress", {
  //     state: {
  //       payload,
  //     },
  //   });
  // };

  useEffect(() => {
    getAddress();
    console.log("set Address");
  }, []);

  const getAddress = async () => {
    try {
      const allAddress = await getAllAddress();
      setAddress(allAddress.address);
      setSelectAddress(allAddress.address[0]);
      console.log("selected Address", selectAddress);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handlePickup = async () => {
    const payload = {
      fullName: selectAddress.fullName,
      scrapId: passData.scrapId,
      stateCode: selectAddress.stateCode,
      countryCode: selectAddress.countryCode,
      addressId: selectAddress.addressId, // addressId
      pincode: selectAddress.pincode,
      dialCode: selectAddress.dialCode,
      phoneNumber: selectAddress.phoneNumber,
      address: selectAddress.address,
      city: selectAddress.city,
      addToCartId: passData.addToCartId,
      scraplist: passData.scrapList,
    };
    navigate("/summaryOrder", {
      state: {
        payload,
      },
    });
  };
  const AdAddress = async () => {
    const payload = {
      fullName: selectAddress?.fullName ? selectAddress?.fullName : "",
      scrapId: passData.scrapId,
      stateCode: selectAddress?.stateCode ? selectAddress.stateCode : "",
      countryCode: selectAddress?.countryCode ? selectAddress?.countryCode : "",
      addressId: selectAddress?.addressId ? selectAddress?.addressId : "", // addressId
      pincode: selectAddress?.pincode ? selectAddress?.pincode : "",
      dialCode: selectAddress?.dialCode ? selectAddress?.dialCode : "",
      phoneNumber: selectAddress?.phoneNumber ? selectAddress?.phoneNumber : "",
      address: selectAddress?.address ? selectAddress?.address : "",
      city: selectAddress?.city ? selectAddress?.city : "",
      addToCartId: passData.addToCartId,
      scraplist: passData.scrapList,
    };
    navigate("/addAddress", {
      state: {
        payload,
      },
    });
  };

  return (
    <>
      <div className="">
        <div className="max-w-2xl mx-auto mt-12">
          {/* <div
            onClick={ChangeAddress}
            className="cursor-pointer w-full text-right"
          >
            Change
          </div> */}

          <h3 className="flex items-center w-full mb-5">
            <span className="flex-grow bg-gray-200 rounded h-1"></span>
            <span className="mx-3 text-lg font-medium"></span>
            <span className="flex-grow bg-gray-200 rounded h-1"></span>
          </h3>
          {selectAddress ? (
            <div className="grid grid-cols-[auto,1fr] p-3 mb-5 gap-3 bg-white shadow-xl shadow-inner  rounded-xl overflow-hidden items-start justify-start transition-transform hover:shadow-2xl">
              <div className="relative flex justify-center items-center w-10 h-10">
                <input
                  checked={defaultAddress}
                  onChange={() => setChecked((prevState) => !prevState)}
                  type="radio"
                  className="radio-round mt-2"
                />
              </div>
              <div className="gap-2 py-2">
                <p className="text-xl font-medium">{selectAddress?.fullName}</p>
                <p className="text-gray-500">
                  {selectAddress?.address},{' '} {selectAddress?.city},{' '}
                  {selectAddress?.pincode}
                </p>
                <p className="text-gray-500">
                  {selectAddress?.stateCode} {selectAddress?.dialCode} {selectAddress?.phoneNumber}
                </p>
              </div>
            </div>

          ) : (
            <div></div>
          )}

          <div className="flex flex-col gap-6 mx-auto mt-10">
            <div
              className="cursor-pointer shadow-md  w-full text-center inline-block px-12 py-3 text-sm font-medium text-white bg-[#3CB043] focus:outline-none focus:ring rounded-3xl"
              onClick={AdAddress}
            >
              Add New Address
            </div>
            {selectAddress && (
              <div
                onClick={handlePickup}
                className="cursor-pointer shadow-md   text-center inline-block px-12 py-3 text-sm font-medium text-white bg-[#3CB043] focus:outline-none focus:ring rounded-3xl"
              >
                Pickup From this address
              </div>
            )}
            {selectAddress && (
            <div
              onClick={onOpenModal}
              className="cursor-pointer text-center shadow-md inline-block px-12 border border-[#585858] py-3 text-sm font-medium text-[#585858]  focus:outline-none focus:ring rounded-3xl"
            >
              Edit Address
            </div>
            )}
            <Modal open={open} onClose={onCloseModal} center>
              <Edit_Address_form data={selectAddress} />
            </Modal>
            {/* <div className="cursor-pointer shadow-md text-center inline-block px-12 border border-[#585858] py-3 text-sm font-medium text-[#585858]  focus:outline-none focus:ring rounded-3xl">
              Add Delivery Instruction
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
