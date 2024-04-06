import { useEffect, useState } from "react";

import { getCountriesDetails } from "../../Services/user";
import { addAddrress } from "../../Services/pickupRequest";
import showErrorMessage from "../../utils/ErrorAlert";
import showSuccessMessage from "../../utils/SweetAlert";
import ErrorMessage from "../../Auth/Pages/ErrorMessage";

const AddAddressForm = ({setAddAddressForm,getAddress}) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [countriesAndStates, setcountriesAndStates] = useState([]);
  const [fullName, setFullName] = useState("");
  const [selectedDialCode, setDialCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [seed, setSeed] = useState(1);
  const [error, setError] = useState('');

  const fetchCountry = async () => {
    try {
      const response = await getCountriesDetails();

      const countriesAndStatesData = response;

      console.log("countriesAndStatesData", {countriesAndStatesData});

      setcountriesAndStates(countriesAndStatesData);
    } catch (error) {
      console.warn("Error fetching data:", error);
    }
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState("");
    for (let i = 0; countriesAndStates.length > i; i++) {
      setDialCode(`${countriesAndStates[0].phone_code}`);
    }
  };
  // Get the list of states based on the selected country
  const states = selectedCountry
    ? countriesAndStates?.find((country) => country.iso2 === selectedCountry)
      ?.states || []
    : [];
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };
  // Get the list of cities based on the selected state
  const cities =
    states.filter((el) => {
      if (el.state_code === selectedState) return el.cities;
    })[0]?.cities || [];

  const handleCityChange = (event) => {
    const citySelected = event.target.value;

    setSelectedCity(citySelected);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCountry();
  }, []);

  const handleAddAddress = async () => {
    try {
      const addressRepo = await addAddrress(
        selectedCity,
        selectedCountry,
        selectedState,
        address,
        pincode,
        fullName,
        selectedDialCode,
        phoneNumber
      );
      // const addresData = addressRepo.dat;
      setSeed(Math.random());
      setSelectedCountry("");
      setSelectedState("");
      setDialCode("")
      window.location.reload(true)
      setAddAddressForm(false)
      getAddress();
    } catch (error) {
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;
      setError(errorMessage);
    }
  };

  return (
    <>
      <div class="" key={seed}>
        <div class="w-full max-w-3xl mx-auto p-2">
          <div class="bg-white:bg-gray-800 p-8 rounded-lg shadow-md border white:border-gray-700">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Add New Address
            </h1>
            <div className="col-span-6 sm:col-span-3">
              <div>
                <label className="block py-3 text-black">Enter Full Name</label>
                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                  <input
                    required
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter Full Name"
                    className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div className="col-span-6 sm:col-span-3">
                <div>
                  <label className="block py-3 text-black">Enter Address</label>
                  <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                    <input
                      required
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter Address"
                      className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-6">
              <div className="col-span-6 sm:col-span-3">
                <div className="grid  grid-cols-2 gap-6">
                  <div>
                    <label className="block py-3 text-black">
                      Select Country
                    </label>
                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                      <div className="w-full">
                        <select
                          className="w-full bg-[#80d7421c] p-1"
                          value={selectedCountry}
                          onChange={handleCountryChange}
                        >
                          <option value="">Select Country</option>
                          {countriesAndStates.map((country) => (
                            <option key={country.iso2} value={country.iso2}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block py-3 text-black">
                      Select State
                    </label>
                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                      <div className="w-full">
                        <select
                          className="w-full bg-[#80d7421c] p-1"
                          value={selectedState}
                          onChange={handleStateChange}
                        >
                          <option value="">Select State</option>
                          {states.map((stateObj) => (
                            <option
                              key={stateObj.state_code}
                              value={stateObj.state_code}
                            >
                              {stateObj.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <div className="grid  grid-cols-3 gap-6">
                  <div>
                    <label className="block py-3 text-black">DialCode</label>
                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                      <input
                        required
                        defaultValue={selectedDialCode}
                        placeholder="Select DialCode"
                        className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block py-3 text-black">
                      Enter Phone Number
                    </label>
                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                      <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxlength="10"
                        required
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (error) setError('');

                        }}
                        placeholder="Enter Phone Number"
                        className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div className="col-span-6 sm:col-span-3">
                  <div className="grid  grid-cols-2 gap-6">
                    <div>
                      <label className="block py-3 text-black">
                        Enter Pincode
                      </label>
                      <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                        <input
                          type="number"
                          required
                          onChange={(e) => {
                            setPincode(e.target.value);
                            if (error) setError('');

                          }}
                          placeholder="Enter Pincode"
                          className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block py-3 text-black">
                        Select City
                      </label>
                      <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                        <div className="w-full">
                          <select
                            className="w-full bg-[#80d7421c] p-1"
                            value={selectedCity}
                            disabled={!selectedState}
                            onChange={(e) => {
                              handleCityChange(e);
                              if (error) setError('');

                            }}
                          >
                            <option value="">Select City</option>
                            {cities.map((cityObj) => (
                              <option key={cityObj.id} value={cityObj.name}>
                                {cityObj.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {error?.length ? <ErrorMessage errorMessage={error === "Field required" ? "Please Fill All The Input Fields" : error} /> : <div className="p-3"></div>}
            <div class="mt-8 flex justify-end">
            <button
                onClick={()=>setAddAddressForm(false)}
                className="cursor-pointer bg-gray-200 mx-5 text-black text-bold px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAddress}
                className={`${!error ? "cursor-pointer" : "cursor-not-allowed"
                  } bg-[#5AB344] text-white px-4 py-2 rounded-lg`}
                disabled={error}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAddressForm;
