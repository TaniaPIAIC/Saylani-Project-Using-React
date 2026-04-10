import React from "react";
import Button from "./Button";

const Course = () => {
  return (
    <>
      <div className="bg-amber-400 h-180 w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center mt-10 py-8 text-white">
          Browse Our Top Courses
        </h1>
        <div className="bg-yellow-700 flex justify-evenly items-center w-270 h-[70%] m-15 gap-5 py-6">
          <div className="w-3/4 bg-gray-400 h-[90%] rounded-lg flex flex-col items-center gap-3">
            <div className="w-full h-3/5 ">
              <img
                src="https://www.saylanimit.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsaylani-welfare%2Fimage%2Fupload%2Fv1764063900%2FSMIT%2FCourses%2FSAB.jpg&w=1920&q=75"
                alt=""
              />
            </div>
            <div className="w-full h-1/5 bg-blue-800">
              <h3 className="text-gray-500 font-bold mt-2 p-2">
                Skill Accelator Bootcamp
              </h3>
              <p className="text-gray-400 font-light  pb-2">
                Skill Accelator Bootcamp
              </p>
            </div>
            <div className="w-full h-1/5 bg-blue-800 p-3 flex   items-center justify-between">
              <Button />
              <div>
                <p>Duration</p>
              <p>5 months</p>
              </div>
            </div>
          </div>
          <div className="w-3/4 bg-gray-400 h-[60%] rounded-lg "></div>
          <div className="w-3/4 bg-gray-400 h-[60%] rounded-lg "></div>
        </div>
      </div>
    </>
  );
};

export default Course;
