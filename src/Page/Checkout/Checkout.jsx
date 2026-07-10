// import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";

const Checkout = () => {
    const { cart } = useContext(OrderContext);
    const navigate = useNavigate();
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);


       const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    }
};



    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNo: "",
        parentName: "",
        parentPhone: "",
        school: "",
        jobInfo: "",
        guardianName: "",
        guardianPhone: "",
        nid: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        presentAddress: "",
        permanentAddress: "",
    });


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

 

    const totalPrice = cart.reduce(
        (total, item) =>
            total + Number(item.discount_price) * item.quantity,
        0
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const orderDetails = {
            ...formData,
            cart,
            totalPrice,
        };

        navigate("/order-details", { state: orderDetails });
    };



    return (
        <div className="  mt-5 border mx-2">
            <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
                <h2 className='text-5xl font-bold'>Trainee Admission Form</h2>
            </div>
            <form onSubmit={handleSubmit}  className="bg-white shadow-md rounded-lg p-6">
                {/* Trainee Information Section */}
                <div className="form-section">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="fullName" className="block font-semibold text-base mb-2">Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="formNo" className="block font-semibold text-base mb-2">Form no:</label>
                            <input
                                type="text"
                                id="formNo"
                                className="w-full border border-gray-300 rounded-md p-2"
                                
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="parentName" className="block font-semibold text-base mb-2">Father/Mother Name:</label>
                            <input
                                type="text"
                                id="parentName"
                                className="w-full border border-gray-300 rounded-md p-2"
                                 value={formData.parentName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="parentNumber" className="block font-semibold text-base mb-2">Phone Number:</label>
                            <input
                                type="number"
                                id="parentNumber"
                                className="w-full border border-gray-300 rounded-md p-2"
                                 value={formData.parentNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="school" className="block font-semibold text-base mb-2">School/College:</label>
                            <input
                                type="text"
                                id="school"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={formData.school}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="jobInfo" className="block font-semibold text-base mb-2">Job Information:</label>
                            <input
                                type="text"
                                id="jobInfo"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={formData.jobInfo}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="email" className="block font-semibold text-base mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={formData.email}
                                 onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block font-semibold text-base mb-2">Gender:</label>
                            <select
                                id="gender"
                                className="w-full border border-gray-300 rounded-md p-2"
                                 value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="" disabled selected>Select Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Others">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="presentAddress" className="block font-semibold text-base mb-2">Present Address:</label>
                            <textarea
                                id="presentAddress"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={formData.presentAddress}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="permanentAddress" className="block font-semibold text-base mb-2">Permanent Address:</label>
                            <textarea
                                id="permanentAddress"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={formData.permanentAddress}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="nid" className="block font-semibold text-base mb-2">NID Number:</label>
                            <input
                                type="text"
                                id="nid"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={formData.nid}
                                 onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block font-semibold text-base mb-2">Mobile No:</label>
                            <input
                                type="text"
                                id="phoneNo"
                                className="w-full border border-gray-300 rounded-md p-2"
                                 value={formData.phoneNo}
                                 onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="guardianName" className="block font-semibold text-base mb-2">Local Guardian’s Name:</label>
                            <input
                                type="text"
                                id="guardianName"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={formData.guardianName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="dob" className="block font-semibold text-base mb-2">Date of Birth:</label>
                            <input
                                type="date"
                                id="dob"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="bloodGroup" className="block font-semibold text-base mb-2">Blood Group:</label>
                            <select
                                id="bloodGroup"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                            >
                                <option value="" disabled selected>Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>


                    <div className="mb-4">
                        <label htmlFor="studentPhoto" className="block font-semibold text-base mb-2">
                            Student Photo<span className="text-red-500">*</span>
                        </label>
                        <label
                            htmlFor="studentPhoto"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md py-10 cursor-pointer hover:bg-gray-50"
                        >
                            {photoPreview ? (
                                    <img
                                        src={photoPreview}
                                        alt="Student Preview"
                                        className="h-32 object-contain"
                                    />
                             ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12 text-gray-400 mb-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                    </svg>
                                    <span className="font-semibold text-gray-700">Upload Photo</span>
                                </>
                             )}
                                
                            <input onChange={handlePhotoChange} type="file" id="studentPhoto" accept="image/*" className="hidden" />
                        </label>
                    </div>
                </div>

                <div className="m-mt_16px">


                    <div className="pt-p_16px">
                        <div className="lg:flex items-start gap-3">
                            <div className="w-full lg:w-[58%] bg-white border-2">
                                <table className=" overflow-x-auto  w-full">
                                    <thead>
                                        <tr className="border-b-4 border-gray-300">
                                            <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                                                Course
                                            </th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">
                                                Price
                                            </th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">
                                                Quantity
                                            </th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">
                                                Sub Total
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="overflow-x-auto ">

                                        {cart.map((course) => (
                                            <tr key={course.id} className="border-b border-gray-300 overflow-x-auto">
                                                <td>
                                                    <div className="flex items-center justify-center ">
                                                        <div className="w-[20%] text-center flex items-center justify-center ">
                                                            <RiDeleteBin5Line
                                                                className="text-xl hover:text-footer_color cursor-pointer"

                                                            />
                                                        </div>
                                                        <div className="flex flex-col text-center justify-center items-center py-2  w-[80%]">
                                                            <div className="mask">
                                                                <img
                                                                    src={course.photo}
                                                                    alt={course.course_name}
                                                                    className="w-16 h-10"
                                                                />
                                                            </div>
                                                            <p className="text-[14.4px] px-[7px] text-center flex ">
                                                                Course name  <span className="hidden lg:flex ">- {course.course_name}</span>
                                                            </p>
                                                        </div>

                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                                                        {course.discount_price} TK
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="flex justify-center">
                                                        <div className="border">
                                                            <button
                                                                className="px-4 w-[30px] font-bold font_standard my-1.5"
                                                            // onClick={() => decreaseQuantity(course.id)}
                                                            >
                                                                -
                                                            </button>
                                                        </div>
                                                        <div className="border-y">
                                                            <input
                                                                type="number"
                                                                className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
                                                                value={course.quantity}
                                                            />
                                                        </div>
                                                        <div className="border">
                                                            <button
                                                                className="px-4 w-[30px] font-bold font_standard my-1.5"
                                                            // onClick={() => increaseQuantity(course.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-[14.4px] font-bold p-[7px] text-black text-center">

                                                        {Number(course.discount_price) * course.quantity} TK
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <div className="lg:w-[41%] bg-white border-2 ">
                                <div className="px-[30px]">
                                    <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                                        Cart Summary
                                    </h2>
                                    <div className="py-3 flex justify-between border-b border-gray-300">
                                        <p className="text-black font-bold">Total Price</p>
                                        <p className="text-black font-bold">
                                            {totalPrice}TK
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        // state={"bdt"}
                                        className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >


        </div >
    );
};

export default Checkout;
