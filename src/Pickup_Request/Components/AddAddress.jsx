import { useEffect, useState } from "react";
import "../styles/pickupRequest.css";
import { getAllAddress } from "../../Services/pickupRequest";
import { useLocation, useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

import Edit_Address_form from "./Edit_Address_form";
import AddAddressForm from "./AddAddressForm";

const AddAddress = () => {
  const [addres, setAddress] = useState();
  const [checked, setChecked] = useState(false);
  const [selectAddress, setSelectAddress] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const location = useLocation();
  const [addAddressForm, setAddAddressForm] = useState(false)
  const passData = location.state ? location.state.passData : null;

  console.log("card data list", passData);

  // const ChangeAddress = () => {
  //   const payload = {
  //     scrapId: passData.scrapId,
  //     addToCartId: passData.addToCartId,
  //     scraplist: passData.scrapList,
  //   };
  //   navigate("/addAddressForm", {
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
  const openAddressForm = () => {
    setAddAddressForm(true);
  };

  const onChange = (item) => {
    console.log({ item })
    setSelectAddress(item);
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
          {/* // Address */}
          {/* {selectAddress ? (
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
          )} */}
          {
            addAddressForm ?
              <AddAddressForm setAddAddressForm={setAddAddressForm}
                getAddress={getAddress}
              /> :
              <>
                {addres?.map((item, i) => (
                  <div
                    onChange={() => onChange(item)}
                    className="border-l-8 border-[#3CB043] flex p-3 gap-3 mt-5 bg-white shadow-xl  rounded-xl overflow-hidden items-center justify-start">
                    <div className="relative w-16 h-12 flex-shrink-0 ">
                      <input
                        checked={item._id === selectAddress?._id}
                        type="checkbox"
                        className="checkbox-round"
                      />
                    </div>

                    <div className="flex flex-col gap-2 py-2 ">
                      <p className="text-xl font-bold">{item.fullName}</p>

                      <p className="text-gray-500">
                        {item.address} {item.city} {item.pincode}
                      </p>
                      <p className="text-gray-500">
                        {item?.dialCode} {item?.phoneNumber}
                      </p>
                    </div>
                  </div>
                ))}</>
          }

          <div className="flex flex-col gap-6 mx-auto mt-10">
            <div
              className="cursor-pointer shadow-md  w-full text-center inline-block px-12 py-3 text-sm font-medium text-white bg-[#3CB043] focus:outline-none focus:ring rounded-3xl"
              onClick={openAddressForm}
            >
              Add New Address
            </div>
            {selectAddress && (
              <button
                onClick={handlePickup}
                disabled={addAddressForm}
                className={`shadow-md text-center inline-block px-12 py-3 text-sm font-medium text-white bg-[#3CB043] focus:outline-none focus:ring rounded-3xl ${addAddressForm ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              >
                Pickup From this address
              </button>
            )}
            {selectAddress && (
              <button
                onClick={onOpenModal}
                disabled={addAddressForm}
                className={`text-center shadow-md inline-block px-12 border border-[#585858] py-3 text-sm font-medium text-[#585858]  focus:outline-none focus:ring rounded-3xl ${addAddressForm ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              >
                Edit Address
              </button>
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
