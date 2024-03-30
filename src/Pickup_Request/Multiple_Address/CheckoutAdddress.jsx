import { Link } from "react-router-dom";
import Footer from "../../Common/Footer/Footer";
import Nav from "../../Common/Navbar/Nav";
import { IoChevronBackOutline } from "react-icons/io5";
import AddAddress from "../Components/AddAddress";

const CheckoutAdddress = () => {
  return (
    <>
      <div>
        <Nav />
        <div className=" mt-20 lg:mt-32  lg:max-w-[1250px] mx-auto">
          <div className="grid grid-cols-12 items-center justify-start">
            <Link to="/cart" className="col-span-1">
              <IoChevronBackOutline className="ml-12 w-12 h-12 cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200" />
            </Link>
            <h2 className="col-span-10 text-3xl text-center text-[#060714] font-['Gilroy-Bold'] font-extrabold ">
              Checkout
            </h2>
          </div>
          <div className="pricing-lists p-2">
            <AddAddress />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CheckoutAdddress;
