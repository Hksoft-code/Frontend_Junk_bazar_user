import React from "react";
import Nav from "../../Common/Navbar/Nav";
import banner from "../../../src/assets/blogBanner.png";
import blog1 from "../../../src/assets/blog1.png";
import poster from "../../../src/assets/poster.png";
import poster2 from "../../../src/assets/poster2.jpeg";
import poster3 from "../../../src/assets/poster3.jpeg";
import poster4 from "../../../src/assets/poster4.jpeg";
import poster5 from "../../../src/assets/poster5.jpeg";
import poster6 from "../../../src/assets/poster6.jpeg";
import poster7 from "../../../src/assets/poster7.jpeg";
import poster8 from "../../../src/assets/poster8.jpeg";
import poster9 from "../../../src/assets/poster9.jpeg";
import Junk from "../AboutUs/Junk";
import Footer from "../../Common/Footer/Footer";

const BlogHomePage = () => {
  return (
    <div>
      <Nav />
      <div className="mt-16  flex items-center justify-between md:px-10 lg:px-14 px-5">
        <div>
          <h1 className="text-6xl font-bold">Blog page</h1>
          <p className="!font-extralight text-xl mt-3">
            We offer a full range of services aimed at preserving a Healthy,
            Green Environment.
          </p>
          <div className="flex mt-10 gap-5">
            <img
              className="w-full max-w-[200px]"
              alt=""
              src="https://e7.pngegg.com/pngimages/52/715/png-clipart-google-play-logo-google-play-computer-icons-app-store-google-text-logo.png"
            />
            <img
              className="w-full max-w-[200px]"
              alt=""
              src="https://e7.pngegg.com/pngimages/52/715/png-clipart-google-play-logo-google-play-computer-icons-app-store-google-text-logo.png"
            />
          </div>
        </div>
        <div>
          <img src={banner} />
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center my-8">
          Read our Latest Blogs
        </h1>
        <div className="flex px-5 items-center flex-wrap gap-5">
          {" "}
          {arr.map((e) => (
            <div className="max-w-[350px] border-solid border-[1px] border-lime-400 rounded-lg p-3 shadow-2xl">
              <img className="w-full" src={blog1} alt="" />
              <p className="text-lime-400 mt-3">Junk Bazar • 2 Sep 2024</p>
              <h1 className="mt-3 text-xl font-semibold">{e.heading}</h1>
              <p className="mt-1 font-extralight">
                {e.subHeading}
              </p>
              <div className="flex mt-4 gap-2">
                <button className="bg-lime-400 text-white px-4 rounded-xl">
                  hello
                </button>
                <button className="text-lime-400 border-solid border-[1px] border-lime-400 px-4 rounded-xl">
                  hello
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center my-8">
          Socialise Marketing
        </h1>
        <div className="flex px-5 items-center flex-wrap gap-5">
          {" "}
          {posterArr.map((e) => (
            <div className="max-w-[350px] border-solid border-[1px] border-lime-400 rounded-lg p-3 shadow-2xl">
              <img className="w-full" src={e.image} alt="" />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogHomePage;

const arr = [
  {
    heading: "स्क्रैप धातु पुनर्चक्रण के पर्यावरणीय लाभ",
    subHeading:
      "स्क्रैप धातु पुनर्चक्रण (Scrap metal recycling) एक प्रभावी तरीका है जो न केवल अपशिष्ट प्रबंधन में सुधार करता है बल्कि पर्यावरणीय दृष्टिकोण से भी महत्वपूर्ण योगदान देता है।",
  },{
    heading: "स्क्रैप धातु पुनर्चक्रण के पर्यावरणीय लाभ",
    subHeading:
      "स्क्रैप धातु पुनर्चक्रण (Scrap metal recycling) एक प्रभावी तरीका है जो न केवल अपशिष्ट प्रबंधन में सुधार करता है बल्कि पर्यावरणीय दृष्टिकोण से भी महत्वपूर्ण योगदान देता है।",
  },{
    heading: "स्क्रैप धातु पुनर्चक्रण के पर्यावरणीय लाभ",
    subHeading:
      "स्क्रैप धातु पुनर्चक्रण (Scrap metal recycling) एक प्रभावी तरीका है जो न केवल अपशिष्ट प्रबंधन में सुधार करता है बल्कि पर्यावरणीय दृष्टिकोण से भी महत्वपूर्ण योगदान देता है।",
  },{
    heading: "स्क्रैप धातु पुनर्चक्रण के पर्यावरणीय लाभ",
    subHeading:
      "स्क्रैप धातु पुनर्चक्रण (Scrap metal recycling) एक प्रभावी तरीका है जो न केवल अपशिष्ट प्रबंधन में सुधार करता है बल्कि पर्यावरणीय दृष्टिकोण से भी महत्वपूर्ण योगदान देता है।",
  },{
    heading: "स्क्रैप धातु पुनर्चक्रण के पर्यावरणीय लाभ",
    subHeading:
      "स्क्रैप धातु पुनर्चक्रण (Scrap metal recycling) एक प्रभावी तरीका है जो न केवल अपशिष्ट प्रबंधन में सुधार करता है बल्कि पर्यावरणीय दृष्टिकोण से भी महत्वपूर्ण योगदान देता है।",
  },
  
];
const posterArr = [
  {
    image: poster,
  },
  {
    image: poster2,
  },
  {
    image: poster3,
  },
  {
    image: poster4,
  },
  {
    image: poster5,
  },
  {
    image: poster6,
  },
  {
    image: poster7,
  },
  {
    image: poster8,
  },
  {
    image: poster9,
  },
];
