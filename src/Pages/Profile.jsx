import React, { useEffect, useState } from "react";
import location from "../assets/PNG/location.png";
import axiosInstance from "../api-config/axiosInstance";
// import SettingsInput from "../Components/Setting/SettingInput";
import add from "../assets/PNG/add.png";
import edit from "../assets/PNG/edit.png";
import Nav from "../Common/Navbar/Nav";
import Footer from "../Common/Footer/Footer";
import { getCountriesDetails } from "../Services/user";
import { generateSignedUrl, uploadFileOnS3 } from "../Services/upload";

const Profile = () => {
  const [profile, setProfileData] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    stateCode: '',
    city: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [userFormType, setUserFormType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const fileInputRef = React.createRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Reset error for this field if it previously failed validation
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
    // Update cities when state is changed
    if (name === 'stateCode') {
      const selectedState = states.find(state => state.state_code === value);
      if (selectedState) {
        setCities(selectedState.cities);
        setFormData({ ...formData, city: '', stateCode: selectedState?.state_code }); // Reset city when state changes
      } else {
        // Reset city and state code if no state is selected
        setCities([]);
        setFormData({ ...formData, city: '', stateCode: '' });
      }
    }
  };

  const addProfileDetails = async () => {
    const payload = {
      userId: profile._id,
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      city: formData?.city,
      countryCode: 'In',
      stateCode: formData?.stateCode,
      address: formData?.address
    };
    try {
      const addedProfileDataResponse = await axiosInstance.post("/addUserDetail", payload);
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
      if (userFormType === 'add') {
        // Verify all fields if userFormType is 'add'
        if (field === 'city' && value.length === 0) {
          newErrors[field] = 'Please select a city.';
        } else if (field === 'stateCode' && value.length === 0) {
          newErrors[field] = 'Please select a state.';
        } else if (field !== 'stateCode' && field !== 'city' && value.length < 4) {
          newErrors[field] = 'Field must be at least 4 characters long.';
        }
      } else if (userFormType === 'edit') {
        // Verify only firstName and lastName if userFormType is 'edit'
        if ((field === 'firstName' || field === 'lastName') && value.length < 4) {
          newErrors[field] = 'Field must be at least 4 characters long.';
        }
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      userFormType === 'edit' ? updateProfile(null, formData?.firstName, formData.lastName) : addProfileDetails();
    }
  };


  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/getCurrentUser");
      if (response.status === 200) {
        const data = JSON.parse(response.data.data);
        setProfileData(data);
        const formData = {
          firstName: data?.firstName ? data?.firstName : '',
          lastName: data?.lastName ? data?.lastName : '',
          stateCode: data?.stateCode ? data?.stateCode : '',
          city: data?.city ? data?.city : '',
          address: data?.address ? data?.address : ''
        };
        setFormData(formData)
      } else {
        console.warn("Unexpected server response:", response);
        // Handle the error or redirect to login page
      }
    } catch (error) {
      console.warn("Error fetching data:", error);
      // Handle the error or redirect to login page
    }
  };

  const fetchCountry = async () => {
    const response = await getCountriesDetails();
    const { states } = response[0];
    setStates(states);
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
    setUserFormType('')
  }

  const updateProfile = async (imageKey, firstName, lastName) => {
    const payload = {};
    if (imageKey) payload.profile = imageKey;
    if (firstName) payload.firstName = firstName;
    if (lastName) payload.lastName = lastName;
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
      const imageSignedObj = await generateSignedUrl(
        file.name,
        file.type,
      );
      const imageKey = imageSignedObj.key;
      await uploadFileOnS3(
        file,
        imageSignedObj.signedUrl
      );
      await updateProfile(imageKey, formData?.firstName, formData?.lastName);
    } catch (error) {
      console.log('error', error)
    }
  };

  return (
    <>
      <Nav />
      <div className="flex  px-24 py-12 m-12 mt-24 justify-between items-center shadow-lg hover:shadow-2xl transition duration-300 ease-in-out  ">
        <div className="flex items-center">
          <img
            src={ profile?.profile || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600"}
            className="w-[138px] h-[138px] mr-4 rounded-full"
            alt=""
          />
          <span className="mt-8">
            <h2 className="font-semibold text-[#343434]  flex items-center text-[24px]">
              {!profile.firstName && !profile.lastName ? "Name" : `${profile.firstName ? profile.firstName : '-'} ${profile.lastName ? profile.lastName : '-'}`}
              {
                profile?.firstName && profile?.lastName ?
                  <img
                    src={edit}
                    onClick={() => setUserFormType("edit")}
                    alt=""
                    className="w-[13px] h-[13px] mx-4 mt-1 "
                  />
                  : null
              }
            </h2>
            <p className="font-[400] text-[20.32px] text-[#4A4A4A] mr-2 ml-2">
              {profile.dialCode}{' '} {profile.phoneNumber}
            </p>
            <span className="flex">
              <img
                src={location}
                alt=""
                className="w-[24px] h-[26px] mt-1 "
              />
              <p className="font-[400] text-[20.32px] text-[#4A4A4A] mr-2 ml-2">
                {"India"},{' '} {profile?.stateCode ? profile?.stateCode : 'State code'}, {' '} {profile.city ? profile.city : "City"}.
              </p>
            </span>
          </span>
        </div>
        <div className="text-center flex mt-8">
          <div >
            <label >
              <button
                type="button"
                className="shadow-0 0 7px 0 cursor-pointer text-[14px] font-[600] text-[#4A4A4A] bg-green-50 rounded-[8px] w-[186px] h-[45px] btn-shadow"
                onClick={() => {
                  !profile?.firstName && !profile.lastName ? setUserFormType('add') : handleFileButtonClick()
                }}
              >
                {!profile?.firstName && !profile.lastName ? "Add Profile Details" : "Upload New Picture"}
              </button>
              {
                !profile?.firstName && !profile.lastName ?
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange}
                    style={{
                      position: "relative",
                      top: 0,
                      left: 0,
                      opacity: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    ref={fileInputRef}
                  /> :
                  null
              }

            </label>
          </div>
        </div>
      </div>
      {
        userFormType &&
        <div className="px-24 mx-12 mt-2 mb-2">
          <h6 className="font-medium py-1 pb-4 text-base text-center">Please fill the details.</h6>
          <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-4">
            {/* first name */}
            <div className="col-span-2 flex items-center">
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="col-span-1 flex items-center">
              <span>:</span>
            </div>
            <div className="col-span-2">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-green-50 w-full p-1"
              />
              {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
            </div>
            {/* last name */}
            <div className="col-span-2 flex items-center">
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="col-span-1 flex items-center">
              <span>:</span>
            </div>
            <div className="col-span-2">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-green-50 w-full p-1"
              />
              {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
            </div>
            {
              userFormType !== "edit" ?
                <>            {/* state */}
                  <div className="col-span-2 flex items-center">
                    <label htmlFor="state">State</label>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <span>:</span>
                  </div>
                  <div className="col-span-2">
                    <select
                      id="state"
                      name="stateCode"
                      value={formData.state}
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
                    {errors.stateCode && <span className="text-red-500 text-xs">{errors.stateCode}</span>}
                  </div>
                  {/* city */}
                  <div className="col-span-2 flex items-center">
                    <label htmlFor="city">City</label>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <span>:</span>
                  </div>
                  <div className="col-span-2">
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="bg-green-50 w-full p-1"
                    >
                      <option value="">Select</option>
                      {cities.map((city) => (
                        <option key={city?.id} value={city?.name}>
                          {city?.name}
                        </option>
                      ))}
                    </select>
                    {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
                  </div>

                  {/* address */}
                  <div className="col-span-2 flex items-center">
                    <label htmlFor="address">Address</label>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <span>:</span>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="bg-green-50 w-full p-1"
                    />
                    {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
                  </div>
                </>
                : null
            }
            <div className="col-span-5 flex justify-end">
              <button type="button" className="mr-5 font-semibold text-[19px] p-[2] text-center bg-slate-100 w-full text-black rounded-[27px] outline-none border-none h-[55px] hover:opacity-80" onClick={handleClose}>Cancel</button>
              <button type="submit" className="ml-5 font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80">Submit</button>
            </div>
          </form>
        </div>
      }
      <Footer />
    </>
  );
};

export default Profile;
