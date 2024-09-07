import { Link } from "react-router-dom";
import TrustedBy from "./TrustedBy";

function GetStarted() {
  return (
    <div className="get-started px-6 md:px-16 lg:px-24 ">
      <div className="container mx-auto px-4   flex flex-col-reverse md:flex-row items-center h-screen">
        <div className="left-side w-full md:w-1/2 flex justify-center md:justify-start my-6 md:my-10">
          <div className="left-side-container text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium font-main leading-tight my-6 md:my-8 lg:my-5 ">
              <span>How work</span>
              <br />
              <span>should work</span>
            </h1>
            <p className="text-secondary text-lg md:text-lg lg:text-2xl font-medium max-w-lg md:max-w-md lg:max-w-xl my-4 md:my-5 lg:my-6">
              Forget the old rules. You can have the best people. Right now.
              Right here.
            </p>
            <Link to={"/started"}>
              <button
                type="button"
                className="focus:outline-none text-lg my-5 md:my-7 lg:my-8 text-black bg-amber-300 hover:bg-yellow-400 focus:ring-amber-400 font-medium rounded-lg px-7 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                Get started
              </button>
            </Link>
            <TrustedBy />
          </div>
        </div>
        <div className="right-side w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0">
          <img
            src="./images/home3.jpg"
            alt="homeimage"
            className="w-full h-auto max-w-xs md:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
