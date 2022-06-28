import type { NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import ElevatedBox from "../src/EvelatedBox";
import Logo from "../assets/iNcubr.svg";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineWhatsApp,
  AiOutlineGoogle,
} from "react-icons/ai";
import {
  prefer_types,
  questions_bottom,
  questions_top,
} from "../src/questions";
import { toast } from "react-toastify";

interface FormState {
  [key: string]: string;
}

const Home: NextPage = () => {
  const [currentHeight, setCurrentHeight] = useState<number>(0);
  const [formState, setFormState] = useState<FormState>({});
  const [user, setUser] = useState<any>(null);

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.currentTarget as HTMLInputElement;
    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    const handleResize = () => {
      setCurrentHeight(window.innerHeight);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onSuccess = async (code: any) => {
    setUser(code);
    console.log(formState);
    const keys = Object.keys(formState);
    const question_keys = ["prefer"];

    for (let question of questions_top) {
      question_keys.push(question.name);
    }
    for (let question of questions_bottom) {
      question_keys.push(question.name);
    }

    for (let key of question_keys) {
      if (!keys.includes(key)) {
        return toast.warning("Please fill all the questions");
      }
    }

    return await axios
      .post("/api/login", { user: code, questions: formState })
      .then((res) => {
        window.location.href = "https://www.incubr.com/";
        toast.success("Successfully registered");
      })
      .catch((err) => toast.error("Something went wrong"));
  };

  const onFailure = () => {};

  return (
    <div
      className="flex flex-col w-full justify-center items-center"
      style={{
        background:
          "linear-gradient(0.56deg, #294C58 7.62%, #367589 42.54%, rgba(127, 88, 123, 0.709206) 73.65%, rgba(53, 107, 125, 0.452223) 82.48%, rgba(255, 255, 255, 0) 94.09%)",
      }}
    >
      <div className="flex w-full flex-col">
        <div style={{ height: currentHeight }} className="w-full flex flex-col">
          <div className="flex font-[Helvetica] h-full justify-around w-full flex-col">
            <div className="px-6 mb-8 sm:px-16 py-10 lg:px-24 xl:px-[10vw] h-full justify-around flex flex-col items-center">
              {/* <TitleText title="LET'S CONNECT" isDark /> */}
              <Image
                src={Logo}
                height={Logo.height - 20}
                width={Logo.width - 20}
              />
              <div className="flex flex-col items-center">
                <div className="flex mt-10">
                  <div
                    className={`p-2 uppercase border mb-10 tracking-widest font-[TitleFont] border-black py-5 pb-2 rounded-full px-5 text-2xl sm:text-4xl 2xl:text-5xl font-extralight`}
                  >
                    <span className="">SOCIAL MEDIA FORM</span>
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl text-center uppercase">
                  Lorem ipsum dolor sit amet, <br />
                  consectetur adipiscing elit.
                  <br />
                  duarum enim
                </div>
              </div>
              <div className=" cursor-pointer flex z-50">
                <div className="px-1 text-4xl 2xl:text-6xl font-extralight ">
                  <Link href={"https://www.instagram.com/incubr.tech/"}>
                    <AiOutlineInstagram />
                  </Link>
                </div>
                <div className="px-1 text-4xl 2xl:text-6xl font-extralight ">
                  <Link href={"https://www.linkedin.com/company/incubr/about/"}>
                    <AiOutlineLinkedin />
                  </Link>
                </div>
                <div className="px-1 text-4xl 2xl:text-6xl font-extralight ">
                  <Link
                    href={
                      "whatsapp://send?text=Hello World!&phone=+919999988493"
                    }
                  >
                    <AiOutlineWhatsApp />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 mb-8 sm:px-16 py-10 lg:px-24 xl:px-[10vw] h-full justify-around flex flex-col items-center">
          {questions_top.map((question) => (
            <ElevatedBox
              key={question.id}
              title={question.question}
              childern={
                <div className="flex w-full py-2">
                  <textarea
                    placeholder="Mention here."
                    rows={6}
                    className=" placeholder:text-white bg-transparent border border-white rounded-xl p-4 text-sm w-full"
                    value={formState?.[question.name]}
                    name={question.name}
                    onChange={handleChange}
                  ></textarea>
                </div>
              }
            />
          ))}

          <ElevatedBox
            title="4. What types of post you prefer the most?"
            childern={
              <div className="flex flex-col sm:flex-row flex-wrap space-x-3 justify-center items-center py-5">
                {prefer_types.map((item) => (
                  <span
                    key={item}
                    className=" text-xl mb-3 uppercase sm:mb-0 bg-[#1F1D1D] w-full lg:w-auto mt-3 font-bold text-white flex justify-between items-center py-2 px-8 rounded-full"
                  >
                    <label className="container font-[500] flex mt-3 items-center">
                      {item}
                      <input
                        type="radio"
                        name="prefer"
                        value={item}
                        onChange={handleChange}
                      />
                      <span className="checkmark" style={{ top: 0 }}></span>
                    </label>
                  </span>
                ))}
              </div>
            }
          />

          {questions_bottom.map((question) => (
            <ElevatedBox
              key={question.id}
              title={question.question}
              childern={
                <div className="flex w-full py-2">
                  <textarea
                    placeholder="Share the motivation of starting the company, its vision, mission and values in maximum of 250 words."
                    rows={6}
                    className=" placeholder:text-white bg-transparent border border-white rounded-xl p-4 text-sm w-full"
                    value={formState?.[question.name]}
                    onChange={handleChange}
                    name={question.name}
                  ></textarea>
                </div>
              }
            />
          ))}
        </div>
        <div className="px-6 mb-8 sm:px-16 py-10 lg:px-24 xl:px-[10vw] h-full justify-around flex flex-col text-white items-center">
          <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl text-center uppercase">
              THANKS FOR PARTICIPATING,
              <br /> WE TYPICALLY WILL REACH YOU
              <br /> IN 24 HOURS MAXIMUM
            </div>
          </div>
        </div>
        <div className="px-6 mb-8 sm:px-16 py-10 lg:px-24 xl:px-[10vw] h-full justify-around flex flex-col text-white items-center">
          {user ? (
            <button
              onClick={() => onSuccess(user)}
              className=" text-2xl px-10 rounded-full flex items-center font-[TitleFont] tracking-widest font-bold space-x-4 bg-[#1F1D1D] p-5"
            >
              <AiOutlineGoogle size={35} />
              <span className="mt-1">SUBMIT</span>
            </button>
          ) : (
            <GoogleLogin
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
              onSuccess={onSuccess}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className=" text-2xl px-10 rounded-full flex items-center font-[TitleFont] tracking-widest font-bold space-x-4 bg-[#1F1D1D] p-5"
                >
                  <AiOutlineGoogle size={35} />
                  <span className="mt-1">SUBMIT</span>
                </button>
              )}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              scope="openid email profile"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
