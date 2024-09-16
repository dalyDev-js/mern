import React from "react";
import eng from "../../assets/eng.jpg";
import { Link } from "react-router-dom";

export default function JobProposals() {
  return (
    <>
      <div className="jobs-proposals w-3/5 mx-auto  ">
        <div className="job-proposals p-7 my-10 bg-slate-100 rounded-lg ">
          <div className="job flex">
            <div className="job-data w-3/4">
              <p className="job-name text-2xl font-medium text-amber-700">
                E-commerce Dashboard UI Design
              </p>
              <p className="job-description w-4/5 text-gray-600 mt-2">
                I need a front-end interface for an admin dashboard to manage an
                e-commerce platform. The design should include user and product
                management pages, with filters and data tables. The project must
                be built using HTML, CSS, Tailwind, and ReactJS. Backend APIs
                are already prepared for integration.
              </p>
              <div className="skills flex gap-2  mt-5">
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  JavaScript
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  Tailwind
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  ReactJs
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  CSS
                </div>
              </div>
            </div>
            <div className="view-proposals w-1/4  ">
              <button className="view mt-4 px-4 float-end font-semibold p-2 rounded-full text-white bg-red-500  hover:bg-red-600 ">
                <i class="text-white fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          <p className=" text-lg mt-4 font-medium">Job Proposals</p>
          <hr />
          <div className="proposals">
            <div className="proposal p-4 mt-4 bg-slate-50 hover:bg-white cursor-pointer hover:shadow-lg rounded-lg">
              <div className="eng-name-image-view flex items-center justify-between gap-2">
                <div className="name-image flex items-center gap-2">
                  {" "}
                  <img className="w-12 h-12 rounded-full" src={eng} />
                  <p className="text-lg font-semibold">Eng/ Mohamed Abo Saif</p>
                  <div className="verified px-2 py-1 text-sm rounded-full text-white bg-blue-500 ">
                    <i class="fa-solid fa-check"></i>
                  </div>{" "}
                </div>
                <Link to={"/engineer-details"}>
                  <button className="View p-2 bg-amber-400 hover:bg-amber-500 rounded-md font-medium">
                    view Profile
                  </button>
                </Link>
              </div>
              <hr />{" "}
              <div className="eng-proposal p-4 text-base font-medium text-gray-600">
                "I’m excited to offer my services for the development of your
                Event Registration Page. With extensive experience in building
                high-quality, responsive web applications using ReactJS and
                Tailwind CSS, I am confident in delivering a fast, modern, and
                efficient registration page that will meet your specific needs."
              </div>
            </div>
            <div className="proposal p-4 mt-4 bg-slate-50 hover:bg-white cursor-pointer hover:shadow-lg rounded-lg">
              <div className="eng-name-image-view flex items-center justify-between gap-2">
                <div className="name-image flex items-center gap-2">
                  {" "}
                  <img className="w-12 h-12 rounded-full" src={eng} />
                  <p className="text-lg font-semibold">Eng/ Kareem Tawfik</p>
                  <div className="verified px-2 py-1 text-sm rounded-full text-white bg-blue-500 ">
                    <i class="fa-solid fa-check"></i>
                  </div>{" "}
                </div>
                <Link to={"/engineer-details"}>
                  <button className="View p-2 bg-amber-400 hover:bg-amber-500 rounded-md font-medium">
                    view Profile
                  </button>
                </Link>
              </div>
              <hr />{" "}
              <div className="eng-proposal p-4 text-base font-medium text-gray-600">
                "Dear Client, I hope this message finds you well. I am excited
                to submit my proposal for the development of your Event
                Registration Page using ReactJS and Tailwind CSS. As a front-end
                developer with experience in creating responsive, user-friendly
                interfaces, I am confident that I can deliver a polished and
                functional registration page that meets your needs. "
              </div>
            </div>
            <div className="proposal p-4 mt-4 bg-slate-50 hover:bg-white cursor-pointer hover:shadow-lg rounded-lg">
              <div className="eng-name-image-view flex items-center justify-between gap-2">
                <div className="name-image flex items-center gap-2">
                  {" "}
                  <img className="w-12 h-12 rounded-full" src={eng} />
                  <p className="text-lg font-semibold">Eng/ Kareem Tawfik</p>
                  <div className="verified px-2 py-1 text-sm rounded-full text-white bg-blue-500 ">
                    <i class="fa-solid fa-check"></i>
                  </div>{" "}
                </div>
                <Link to={"/engineer-details"}>
                  <button className="View p-2 bg-amber-400 hover:bg-amber-500 rounded-md font-medium">
                    view Profile
                  </button>
                </Link>
              </div>
              <hr />{" "}
              <div className="eng-proposal p-4 text-base font-medium text-gray-600">
                "Dear Client, I hope this message finds you well. I am excited
                to submit my proposal for the development of your Event
                Registration Page using ReactJS and Tailwind CSS. As a front-end
                developer with experience in creating responsive, user-friendly
                interfaces, I am confident that I can deliver a polished and
                functional registration page that meets your needs. "
              </div>
            </div>
            <div className="proposal p-4 mt-4 bg-slate-50 hover:bg-white cursor-pointer hover:shadow-lg rounded-lg">
              <div className="eng-name-image-view flex items-center justify-between gap-2">
                <div className="name-image flex items-center gap-2">
                  {" "}
                  <img className="w-12 h-12 rounded-full" src={eng} />
                  <p className="text-lg font-semibold">Eng/ Kareem Tawfik</p>
                  <div className="verified px-2 py-1 text-sm rounded-full text-white bg-blue-500 ">
                    <i class="fa-solid fa-check"></i>
                  </div>{" "}
                </div>
                <Link to={"/engineer-details"}>
                  <button className="View p-2 bg-amber-400 hover:bg-amber-500 rounded-md font-medium">
                    view Profile
                  </button>
                </Link>
              </div>
              <hr />{" "}
              <div className="eng-proposal p-4 text-base font-medium text-gray-600">
                "Dear Client, I hope this message finds you well. I am excited
                to submit my proposal for the development of your Event
                Registration Page using ReactJS and Tailwind CSS. As a front-end
                developer with experience in creating responsive, user-friendly
                interfaces, I am confident that I can deliver a polished and
                functional registration page that meets your needs. "
              </div>
            </div>
            <div className="proposal p-4 mt-4 bg-slate-50 hover:bg-white cursor-pointer hover:shadow-lg rounded-lg">
              <div className="eng-name-image-view flex items-center justify-between gap-2">
                <div className="name-image flex items-center gap-2">
                  {" "}
                  <img className="w-12 h-12 rounded-full" src={eng} />
                  <p className="text-lg font-semibold">Eng/ Kareem Tawfik</p>
                  <div className="verified px-2 py-1 text-sm rounded-full text-white bg-blue-500 ">
                    <i class="fa-solid fa-check"></i>
                  </div>{" "}
                </div>
                <Link to={"/engineer-details"}>
                  <button className="View p-2 bg-amber-400 hover:bg-amber-500 rounded-md font-medium">
                    view Profile
                  </button>
                </Link>
              </div>
              <hr />{" "}
              <div className="eng-proposal p-4 text-base font-medium text-gray-600">
                "Dear Client, I hope this message finds you well. I am excited
                to submit my proposal for the development of your Event
                Registration Page using ReactJS and Tailwind CSS. As a front-end
                developer with experience in creating responsive, user-friendly
                interfaces, I am confident that I can deliver a polished and
                functional registration page that meets your needs. "
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
