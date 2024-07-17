import React, { useEffect, useState, useRef } from "react";
import location from "../assets/PNG/location.png";
import axiosInstance from "../api-config/axiosInstance";
import add from "../assets/PNG/add.png";
import edit from "../assets/PNG/edit.png";
import Nav from "../Common/Navbar/Nav";
import Footer from "../Common/Footer/Footer";
import { getCountriesDetails } from "../Services/user";
import { generateSignedUrl, uploadFileOnS3 } from "../Services/upload";

const Profile = () => {
  const [profile, setProfileData] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    stateCode: "",
    city: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [userFormType, setUserFormType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Reset error for this field if it previously failed validation
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
    // Update cities when state is changed
    if (name === "stateCode") {
      const selectedState = states.find((state) => state.state_code === value);
      if (selectedState) {
        setCities(selectedState.cities);
        setFormData({
          ...formData,
          city: "",
          stateCode: selectedState?.state_code,
        }); // Reset city when state changes
      } else {
        // Reset city and state code if no state is selected
        setCities([]);
        setFormData({ ...formData, city: "", stateCode: "" });
      }
    }
  };

  const addProfileDetails = async () => {
    const payload = {
      userId: profile._id,
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      city: formData?.city,
      countryCode: "In",
      stateCode: formData?.stateCode,
      address: formData?.address,
    };
    try {
      const addedProfileDataResponse = await axiosInstance.post(
        "/addUserDetail",
        payload
      );
      handleClose();
      fetchData();
    } catch (error) {
      console.warn("error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    for (const field in formData) {
      const value = formData[field];
      if (userFormType?.length) {
        // Verify all fields if userFormType is 'add'
        if (field === "city" && value.length === 0) {
          newErrors[field] = "Please select a city.";
        } else if (field === "stateCode" && value.length === 0) {
          newErrors[field] = "Please select a state.";
        } else if (
          field !== "stateCode" &&
          field !== "city" &&
          value.length < 4
        ) {
          newErrors[field] = "Field must be at least 4 characters long.";
        }
      } else if (userFormType?.length) {
        // Verify only firstName and lastName if userFormType is 'edit'
        if (
          (field === "firstName" || field === "lastName") &&
          value.length < 4
        ) {
          newErrors[field] = "Field must be at least 4 characters long.";
        }
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      userFormType === "edit"
        ? updateProfile(null, formData)
        : addProfileDetails();
    }
  };

  const fetchData = async () => {
    let userData = {};
    try {
      const response = await axiosInstance.get("/getCurrentUser");
      if (response.status === 200) {
        const data = JSON.parse(response.data.data);
        console.log("==== CURRENT USER ===", { data });
        setProfileData(data);
        const formData = {
          firstName: data?.firstName ? data?.firstName : "",
          lastName: data?.lastName ? data?.lastName : "",
          stateCode: data?.stateCode ? data?.stateCode : "",
          city: data?.city ? data?.city : "",
          address: data?.address ? data?.address : "",
        };
        setFormData(formData);
        userData = data;
        console.log({ userData });
      } else {
        console.warn("Unexpected server response:", response);
        // Handle the error or redirect to login page
      }
    } catch (error) {
      console.warn("Error fetching data:", error);
      // Handle the error or redirect to login page
    } finally {
      fetchCountry(userData?.stateCode);
    }
  };

  const fetchCountry = async (previousStateCodeValue) => {
    const response = await getCountriesDetails();
    const { states } = response[0];
    setStates(states);
    const value = previousStateCodeValue
      ? previousStateCodeValue
      : profile?.stateCode;
    const previousState = states.find((state) => {
      console.log(value, "Nice");
      return state.state_code === value;
    });
    console.log({ previousState, states });
    if (previousState?.cities?.length) setCities(previousState?.cities);
  };

  useEffect(() => {
    fetchData();
    fetchCountry();
  }, []);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleClose = () => {
    setErrors({});
    setUserFormType("");
  };

  const updateProfile = async (imageKey, updatedData) => {
    const payload = updatedData ? updatedData : {};
    if (imageKey) payload.profile = imageKey;
    try {
      await axiosInstance.post("/updateProfile", payload);
      handleClose();
      fetchData();
    } catch (error) {
      console.warn("error", error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    // Check if the selected file has a valid extension
    const validExtensions = [".png", ".jpg", ".jpeg"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!validExtensions.includes(`.${fileExtension}`))
      alert("Invalid file type. Please select a PNG, JPG, or JPEG file.");
    setSelectedFile(file);
    try {
      const imageSignedObj = await generateSignedUrl(file.name, file.type);
      const imageKey = imageSignedObj.key;
      await uploadFileOnS3(file, imageSignedObj.signedUrl);
      await updateProfile(imageKey, formData);
    } catch (error) {
      console.log("error", error);
    }
  };
console.log("profile....",profile)
  return (
    <>
      <Nav />
      <div className="flex  px-24 py-12 m-12 mt-24 justify-between items-center shadow-lg hover:shadow-2xl transition duration-300 ease-in-out  ">
        <div className="flex items-center">
          <img
            src={
              profile.profileUrl
                ? profile.profileUrl
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGUYpBf56aEz0Oihd1-ZWykIwFmDf0yV_LHg&usqp=CAU"
            }
            className="w-[138px] h-[138px] mr-4 rounded-full"
            alt=""
          />
          <span className="mt-8">
            <span className="text-[#343434]  flex items-center gap-2">
              <p className="text-[18px] font-semibold">Name: </p>
              <p className="text-[17px] font-normal">
                {!profile.firstName && !profile.lastName
                  ? "N/A"
                  : `${profile.firstName ? profile.firstName : "-"} ${
                      profile.lastName ? profile.lastName : "-"
                    }`}
              </p>
              <h2 className="font-semibold text-[#343434]  flex items-center text-[18px]">
                {profile?.firstName && profile?.lastName ? (
                  <img
                    src={edit}
                    onClick={() => setUserFormType("edit")}
                    alt=""
                    className="w-[13px] h-[13px] ml-1"
                  />
                ) : null}
              </h2>
            </span>

            <span className=" text-[#4A4A4A]  flex items-center gap-2">
              <p className="text-[18px] font-semibold">Phone Number: </p>
              <p className="text-[17px] font-normal">
                {profile.dialCode} {profile.phoneNumber}
              </p>
            </span>
            <span className="flex items-center">
              <img src={location} alt="" className="w-[24px] h-[27px] mt-1 " />
              <span className="font-[400] text-[17px] text-[#4A4A4A] mr-2 flex gap-1">
                {"India"},{" "}
                <p>State: {profile?.stateCode ? profile?.stateCode : "N/A"} </p>
                ,<p>City: {profile.city ? profile.city : "N/A"} </p> ,
                <p>Pin Code: {profile.pincode ? profile.pincode : "N/A"} </p>
              </span>
            </span>
          </span>
        </div>
        <div className="text-center flex mt-8">
          <div>
            {!profile.firstName && !profile.lastName ? (
              <label className="relative">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  ref={fileInputRef}
                />
                <button
                  className="shadow-0 0 7px 0 cursor-pointer text-[14px] font-[600] text-[#4A4A4A] bg-green-50 rounded-[8px] w-[186px] h-[45px] btn-shadow"
                  onClick={handleFileButtonClick}
                >
                  Upload New Picture
                </button>
              </label>
            ) : (
              <button
                type="button"
                className="shadow-0 0 7px 0 cursor-pointer text-[14px] font-[600] text-[#4A4A4A] bg-green-50 rounded-[8px] w-[186px] h-[45px] btn-shadow"
                onClick={() => setUserFormType("add")}
              >
                Add Profile Details
              </button>
            )}
          </div>
        </div>
      </div>
      {userFormType?.length ? (
        <div className="mx-12 px-16 mt-2 mb-2">
          <h6 className="font-medium py-1 pb-4 pr-8 text-base text-center">
            Please fill the details.
          </h6>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-11 gap-4">
              {/* first name */}
              <div className="col-span-5   flex items-center">
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="col-span-1 flex items-center">
                <span>:</span>
              </div>
              <div className="col-span-5  ">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-green-50 w-full p-1"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-xs">
                    {errors.firstName}
                  </span>
                )}
              </div>
              {/* last name */}
              <div className="col-span-5   flex items-center">
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="col-span-1 flex items-center">
                <span>:</span>
              </div>
              <div className="col-span-5  ">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-green-50 w-full p-1"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-xs">
                    {errors.lastName}
                  </span>
                )}
              </div>
              <>
                {" "}
                {/* state */}
                <div className="col-span-5   flex items-center">
                  <label htmlFor="state">State</label>
                </div>
                <div className="col-span-1 flex items-center">
                  <span>:</span>
                </div>
                <div className="col-span-5  ">
                  <select
                    id="state"
                    name="stateCode"
                    value={formData.stateCode}
                    onChange={handleChange}
                    className="bg-green-50 w-full p-1"
                  >
                    <option value="">Select</option>
                    {states.map((state) => (
                      <option key={state.state_code} value={state.state_code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors.stateCode && (
                    <span className="text-red-500 text-xs">
                      {errors.stateCode}
                    </span>
                  )}
                </div>
                {/* city */}
                <div className="col-span-5   flex items-center">
                  <label htmlFor="city">City</label>
                </div>
                <div className="col-span-1 flex items-center">
                  <span>:</span>
                </div>
                <div className="col-span-5  ">
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-green-50 w-full p-1"
                  >
                    <option value="">Select</option>
                    {cities?.map((city) => (
                      <option key={city?.id} value={city?.name}>
                        {city?.name}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <span className="text-red-500 text-xs">{errors.city}</span>
                  )}
                </div>
                {/* address */}
                <div className="col-span-5   flex items-center">
                  <label htmlFor="address">Address</label>
                </div>
                <div className="col-span-1 flex items-center">
                  <span>:</span>
                </div>
                <div className="col-span-5  ">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="bg-green-50 w-full p-1"
                  />
                  {errors.address && (
                    <span className="text-red-500 text-xs">
                      {errors.address}
                    </span>
                  )}
                </div>
              </>
            </div>
            <div className="flex justify-end mt-4 mb-2">
              <button
                type="button"
                className="mr-5 px-4 py-1 font-semibold text-[19px]  text-center bg-slate-100  text-black rounded-lg outline-none border-none  hover:opacity-80"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-5 px-4 py-1  font-semibold text-[19px]  text-center bg-[#5AB344]  text-white rounded-lg outline-none border-none  hover:opacity-80"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : null}
      <Footer />
    </>
  );
};

export default Profile;
