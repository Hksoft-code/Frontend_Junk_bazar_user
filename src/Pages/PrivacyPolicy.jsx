import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen p-10 overflow-auto flex flex-col font-['Gilroy-Medium']">
      <div className="w-full">
        <p className="text-lime-600 text-[25px] text-center">
          Privacy and Policy
        </p>
      </div>
      <div className="px-2 sm:px-0 w-full font-sans mt-4 mb-5">
        <div className="text-[#737373] w-full">
          <span className="font-sans font-semibold flex  justify-start text-[18px] text-left ">
            Terms and Conditions of Use
          </span>
          <p className="mt-2 text-[14px] text-left text-black">
            Welcome to JunkBazar! These terms and conditions
            (&apos;&apos;Terms&apos;&apos;) govern your use of our website and
            services, including placing orders for food delivery. By accessing
            or using our website, you agree to be bound by these Terms. If you
            do not agree with any part of these Terms, please do not use our
            website.
          </p>
        </div>
        <div className="text-black mt-2">
          <div>
            <span className="font-sans font-semibold flex  justify-start text-[18px] text-left ">
              1. Information We Collect
            </span>
            <span className="text-left text-[14px] flex justify-start mt-2">
              We may collect personal information from you when you use our
              Website and Services, including but not limited to.
            </span>
            <div className="ml-8">
              <ol className="list-disc flex flex-col gap-2 mt-2">
                <li className="text-left text-[14px]">
                  Contact information, such as your name, email address, phone
                  number, and mailing address.
                </li>
                <li className="text-left text-[14px]">
                  Account information, including your username, password, and
                  payment information.
                </li>
                <li className="text-left text-[14px]">
                  Order information, including your food preferences, delivery
                  address, and payment details.
                </li>
                <li className="text-left text-[14px]">
                  Communications you send to us, such as feedback, inquiries, or
                  support requests.
                </li>
                <li className="text-left text-[14px]">
                  Website usage information, including your IP address, browser
                  type, operating system, and pages visited on our Website.
                </li>
                <li className="text-left text-[14px]">
                  We may use cookies, web beacons, and other similar
                  technologies to collect information about your browsing
                  behavior, preferences, and device information.We may use
                  cookies, web beacons, and other similar technologies to
                  collect information about your browsing behavior, preferences,
                  and device information.
                </li>
              </ol>
            </div>
          </div>
          <div>
            <span className="font-sans font-semibold flex  justify-start text-[18px] text-left ">
              2. Use of Information
            </span>
            <span className="text-left text-[14px] flex justify-start mt-2">
              We use the personal information we collect for the following
              purposes:
            </span>
            <div className="ml-8">
              <ol className="list-disc flex flex-col gap-2 mt-2">
                <li className="text-left text-[14px]">
                  To provide and improve our Services, including processing your
                  orders, delivering food to your chosen address, and processing
                  payments.{" "}
                </li>
                <li className="text-left text-[14px]">
                  To communicate with you, including sending order
                  confirmations, updates, and customer service responses.
                </li>
                <li className="text-left text-[14px]">
                  To personalize your experience on our Website, including
                  displaying relevant content and offers.
                </li>
                <li className="text-left text-[14px]">
                  To enforce our terms of service and other policies.
                </li>
                <li className="text-left text-[14px]">
                  To conduct research and analytics, such as analyzing website
                  usage, trends, and preferences.
                </li>
                <li className="text-left text-[14px]">
                  To protect the security and integrity of our Website and
                  Services, and prevent fraud or other illegal activities.
                </li>
                <li className="text-left text-[14px]">
                  To comply with legal requirements, such as responding to
                  subpoenas, court orders, or other legal processes.
                </li>
                <li className="text-left text-[14px]">
                  With your consent, to send you promotional and marketing
                  communications about our products, services, and special
                  offers.
                </li>
              </ol>
            </div>
          </div>
          <div>
            <span className="font-sans font-semibold flex  justify-start text-[18px] text-left ">
              3. Disclosure of Information
            </span>
            <span className="text-left text-[14px] flex justify-start mt-2">
              We may disclose your personal information to the following third
              parties.
            </span>
            <div className="ml-8">
              <ol className="list-disc flex flex-col gap-2 mt-2">
                <li className="text-left text-[14px]">
                  Service providers who help us operate our Website and
                  Services, such as payment processors, delivery partners, and
                  IT service providers.
                </li>
                <li className="text-left text-[14px]">
                  Business partners and affiliates, with whom we may collaborate
                  or offer joint promotions.
                </li>
                <li className="text-left text-[14px]">
                  Law enforcement, government agencies, or other authorized
                  third parties, if required by law or to protect our legal
                  rights or the rights of others.
                </li>
                <li className="text-left text-[14px]">
                  In the event of a merger, acquisition, or sale of our
                  business, your personal information may be transferred to the
                  acquiring entity or successor.
                </li>
              </ol>
            </div>
          </div>
          <div className="mt-1">
            <span className="font-sans font-semibold flex  justify-start text-[18px] text-left ">
              4. Data Retention
            </span>
            <span className="text-left text-[14px] flex justify-start mt-2">
              We will retain your personal information for as long as necessary
              to fulfill the purposes for which it was collected, as outlined in
              this Policy, and as required by applicable laws and regulations.
              When your personal information is no longer needed, we will
              securely dispose of it or de-identify it.{" "}
            </span>
          </div>
          <div className="mt-3">
            <span className="font-sans font-semibold flex  justify-start text-[18px] text-left ">
              5. Data Security
            </span>
            <span className="text-left text-[14px] flex justify-start mt-2">
              We take reasonable measures to protect the security and
              confidentiality of your personal information. However, please note
              that no method of transmission over the Internet or method of
              electronic storage is 100% secure. We cannot guarantee the
              absolute security of your personal information, and you provide it
              to us at your own risk.
            </span>
          </div>
          <div className="mt-3">
            <span className="font-sans font-semibold flex  justify-start text-[18px] text-left ">
              6. Childrens Privacy
            </span>
            <span className="text-left text-[14px] flex justify-start mt-2">
              Our Website and Services are not intended for use by individuals
              under the age of 18. We do not knowingly collect personal
              information from children. If you are a parent or guardian and
              believe your child has provided us with personal information,
              please contact us immediately. If we become aware that we have
              collected personal information from a child without parental
              consent, we will take steps to delete the information as soon as
              possible.
            </span>
          </div>
          <div className="mt-3">
            <span className="font-sans font-semibold flex  justify-start text-[18px] text-left ">
              6. Your Rights and Choices
            </span>
            <span className="text-left text-[14px] flex justify-start mt-2">
              You have certain rights and choices regarding your personal
              information, including the right to.
            </span>
          </div>
          <div className="mt-3">
            <span className="font-sans font-semibold flex  justify-start text-[18px] text-left ">
              6. Childrens Privacy
            </span>
            <span className="text-left text-[14px] flex justify-start mt-2">
              Our Website and Services are not intended for use by individuals
              under the age of 18. We do not knowingly collect personal
              information from children. If you are a parent or guardian and
              believe your child has provided us with personal information,
              please contact us immediately. If we become aware that we have
              collected personal information from a child without parental
              consent, we will take steps to delete the information as soon as
              possible.
            </span>
          </div>
          <div className="mt-3">
            <span className="font-sans font-semibold flex  justify-start text-[18px] text-left ">
              7. Access, update and modify marketing choices.
            </span>
            <span className="text-left text-[14px] flex justify-start mt-2">
              Right to access: You have the right to access the personal data
              that the website collects about you. This should include
              information such as your name, address, phone number, and email
              address.
            </span>
            <div className="ml-8">
              <ol className="list-disc flex flex-col gap-2 mt-2">
                <li className="text-left text-[14px]">
                  Right to rectification: You have the right to request that any
                  inaccurate personal data the website holds about you be
                  corrected.
                </li>
                <li className="text-left text-[14px]">
                  Right to object: You have the right to object to the website
                  processing your personal data. This might include opting out
                  of marketing communications or asking the website to stop
                  using your data for certain purposes.
                </li>
                <li className="text-left text-[14px]">
                  Choices regarding data collection: You should have the ability
                  to choose what information the website collects about you.
                  This might include opting out of certain types of data
                  collection, such as location tracking or cookies.
                </li>
                <li className="text-left text-[14px]">
                  Choices regarding marketing: You have the ability to choose
                  whether or not you receive marketing communications from the
                  website. This might include opting out of email newsletters or
                  text message promotions.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[20px] font-bold">Contact</p>
        <p className="min-large:flex">
          For any inquiries or complaints regarding the service or website,
          please contact- ASAR Green Kabadi Pvt Ltd{" "}
          <p className="text-red-600 min-large:ml-2">
            www.theJunk Bazar.com +91 7697 260 260 (contact@theJunk Bazar.com.)
          </p>{" "}
          <a
            href="https://www.thekabadiwala.com/contact-us"
            className="text-blue-600 min-large:ml-4"
          >
            You can reach us here →{" "}
          </a>
        </p>
      </div>
      <div className="flex justify-center items-center mt-4 mb-6">
        <button
          type="button"
          className="bg-lime-600 px-6 py-2 text-white shadow-lg rounded-lg"
          onClick={() => {
            navigate("/");
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
