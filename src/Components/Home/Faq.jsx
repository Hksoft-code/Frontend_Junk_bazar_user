import team from "../../assets/PNG/TEAM 1.png";

const Faq = () => {
  return (
    <main className="max-w-[1200px] mx-auto">
      <section>
        <div className="mt-10">
          <h1 className="font-['Gilroy-Regular'] font-bold text-black text-3xl text-center lg:my-8">
            Why Junk Bazar ?
          </h1>
        </div>

        <section className="grid lg:grid-cols-2 justify-around ">
          <div className="text-zinc-500 text-sm mt-10 mx-8 lg:mx-4 my-2 lg:max-w-[500px]">
            <h1 className="text-3xl font-bold text-black font-['Gilroy-Bold']">
              Scrap Smart: Sell, Buy and Earn.
            </h1>
            <p>
              Whether you are an environmentally-conscious seller looking to
              declutter responsibly or a savvy buyer searching for bargains,
              JunkBazar is your all-in-one solution. As a leading waste
              management company in Bihar, we specialise in managing waste
              materials while promoting sustainable practices.
            </p>

            <aside>
              <ul>
                <li className="my-4">
                  <span className=" mr-1 text-gray-950  font-normal font-['Gilroy-Bold'] text-lg tracking-tight">
                    Scrap Buyer:
                  </span>
                  <span>
                    At JunkBazar, we take your scrap seriously. Our dedicated
                    scrap buyers are here to offer you a seamless and lucrative
                    solution for all your scrap materials. With our simple,
                    user-friendly platform, you can easily turn your scrap into
                    cash. We pride ourselves on being the best waste management
                    company for scrap in Bihar, ensuring that you receive top
                    value for your materials.
                  </span>
                </li>
                <li className="my-4">
                  <span className=" mr-1 text-gray-950  font-normal font-['Gilroy-Bold'] text-lg tracking-tight">
                    Verified Hero:
                  </span>
                  <span>
                    Our heroes ensure that your scrap materials find a new
                    purpose, all while putting money in your pocket. These
                    diligent professionals have undergone our rigorous
                    verification process, so you can trust them to provide a
                    safe and reliable scrap-selling experience. As part of our
                    commitment to sustainable waste management, they help reduce
                    environmental impact through responsible recycling.
                  </span>
                </li>
                <li className="my-4">
                  <span className=" mr-1 text-gray-950  font-normal font-['Gilroy-Bold'] text-lg tracking-tight">
                    Digital Weighing Scale:
                  </span>
                  <span>
                    At JunkBazar, we value accuracy and transparency. That’s why
                    we have introduced our cutting-edge digital weighing scale
                    feature. When you sell your scrap with us, you can be sure
                    that every gram counts, reinforcing our status as a trusted
                    waste management company in Bihar.
                  </span>
                </li>
                <li className="my-4">
                  <span className=" mr-1 text-gray-950  font-normal font-['Gilroy-Bold'] text-lg tracking-tight">
                    Multiple payments options:
                  </span>
                  <span>
                    We understand that flexibility is key in compensating our
                    valued sellers. That’s why we offer a range of payment
                    options designed to suit your preferences and needs, making
                    us an affordable waste management service for scrap in
                    Bihar.
                  </span>
                </li>

                <li className="my-4">
                  <span className=" mr-1 text-gray-950  font-normal font-['Gilroy-Bold'] text-lg tracking-tight">
                    Free Pickup:
                  </span>
                  <span>
                    Disposing of scrap materials can be both a challenge and a
                    chore. That’s why we have introduced our free scrap pickup
                    service, designed to simplify the process at no cost to you.
                    Choose JunkBazar, the sustainable waste management company
                    in Bihar, for a hassle-free experience.
                  </span>
                </li>
              </ul>
            </aside>
          </div>

          <div className="hidden lg:block">
            <img src={team} alt="team-img" />
          </div>
        </section>
      </section>
    </main>
  );
};

export default Faq;
