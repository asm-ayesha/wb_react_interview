import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";

const Search = () => {
    const [formNo, setFormNo] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [orderData, setOrderData] = useState(null);

    const handleSearch = async () => {
        const trimmedFormNo = formNo.trim();
        const trimmedPhoneNo = phoneNo.trim();

        if (!trimmedFormNo || !trimmedPhoneNo) {
            toast.error("Please enter both Order ID and Phone Number.");
            return;
        }

        setIsLoading(true);
        setOrderData(null);

        try {
            const res = await fetch(
                "https://itder.com/api/search-purchase-data",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        form_no: trimmedFormNo,
                        phone_no: trimmedPhoneNo,
                    }),
                }
            );

            console.log("search-purchase-data status:", res.status);

            if (!res.ok) {
                const errorBody = await res.text();
                console.log("search-purchase-data error response:", errorBody);

                if (res.status === 404) {
                    toast.error("No order found with this ID. Please check and try again.");
                } else {
                    toast.error("Something went wrong while searching. Please try again.");
                }
                return;
            }

            const data = await res.json();
            console.log("search-purchase-data success response:", data);

            
            const result = data?.data || data;

            if (!result || (Array.isArray(result) && result.length === 0)) {
                toast.error("No order found with this ID.");
                return;
            }

            setOrderData(result);
            toast.success("Order found successfully!");
        } catch (err) {
            console.log("search-purchase-data fetch failed (network/CORS error):", err);
            toast.error("Could not connect to the server. Please check your internet connection.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleFormNoChange = (e) => setFormNo(e.target.value);
    const handlePhoneNoChange = (e) => setPhoneNo(e.target.value);

    
    const courses = Array.isArray(orderData?.courses)
        ? orderData.courses
        : orderData?.course
        ? [orderData.course]
        : [];

    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
                Search here
            </h1>

            <div className="w-full max-w-[600px] flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    name="formNo"
                    value={formNo}
                    onChange={handleFormNoChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your Order ID"
                    className="text-black text-base font-normal px-3 w-full h-[52px] outline-0 rounded-[4px] border border-gray-300 focus:border-[#6f42c1]"
                />
                <input
                    type="text"
                    name="phoneNo"
                    value={phoneNo}
                    onChange={handlePhoneNoChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your Phone Number"
                    className="text-black text-base font-normal px-3 w-full h-[52px] outline-0 rounded-[4px] border border-gray-300 focus:border-[#6f42c1]"
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    disabled={isLoading}
                    aria-label="Search"
                    className="shrink-0 w-full sm:w-[52px] h-[52px] flex items-center justify-center border border-gray-300 rounded-[4px] hover:bg-gray-50 disabled:opacity-50"
                >
                    <IoMdSearch className="text-2xl text-black" />
                </button>
            </div>

            {isLoading && (
                <p className="mt-6 text-base font-medium text-gray-500">
                    Searching for your order...
                </p>
            )}

            {/* Order Details Result */}
            {orderData && !isLoading && (
                <div className="w-full max-w-4xl mt-10 bg-white shadow-md rounded-lg p-4 md:p-6 text-base font-normal">
                    <div className="text-center flex flex-col justify-center items-center mb-4">
                        <p className="text-xl font-bold">Order Information</p>
                        <p className="p-3 rounded-md my-2 w-fit border bg-[#D2C5A2] font-bold text-lg">
                            Order Id :
                            <span className="font-semibold">
                                {" "}
                                {orderData.form_no || formNo}
                            </span>
                        </p>
                    </div>

                    <div className="w-full border flex flex-col md:flex-row md:items-start bg-[#D2C5A2] rounded-md p-4 gap-4">
                        <div className="flex-1 font-semibold md:border-r-2 md:border-black md:pr-10 text-sm md:text-base">
                            <p className="font-bold mb-3">Personal Information</p>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                    <p>Full Name :</p>
                                    <p className="text-right">{orderData.name || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>Email :</p>
                                    <p className="text-right">{orderData.email || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>Phone No :</p>
                                    <p className="text-right">{orderData.phone_no || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>Gender :</p>
                                    <p className="text-right capitalize">{orderData.gender || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>Date of Birth :</p>
                                    <p className="text-right">{orderData.date_of_birth || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>Blood Group :</p>
                                    <p className="text-right">{orderData.blood_group || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>NID No :</p>
                                    <p className="text-right">{orderData.nid_no || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 font-semibold text-sm md:text-base">
                            <p className="font-bold mb-3">Guardian & Address Information</p>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                    <p>Father/Mother Name :</p>
                                    <p className="text-right">{orderData.father_name || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>Father/Mother Phone :</p>
                                    <p className="text-right">{orderData.father_phone_no || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>School/College :</p>
                                    <p className="text-right">{orderData.school_collage_name || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>Job Title :</p>
                                    <p className="text-right">{orderData.job_title || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>Local Guardian Name :</p>
                                    <p className="text-right">{orderData.local_guardian_name || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>Local Guardian Phone :</p>
                                    <p className="text-right">{orderData.local_guardian_phone_no || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>Present Address :</p>
                                    <p className="text-right">{orderData.present_address || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <p>Permanent Address :</p>
                                    <p className="text-right">{orderData.permanent_address || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {orderData.photo && (
                        <div className="flex flex-col items-center mt-6">
                            <p className="font-semibold mb-2">Student Photo:</p>
                            <img
                                src={orderData.photo}
                                alt="Student"
                                className="w-32 h-32 object-cover rounded-md border"
                            />
                        </div>
                    )}

                    {/* Courses Table */}
                    {courses.length > 0 && (
                        <div className="my-8 overflow-x-auto">
                            <p className="my-2 font-semibold">Courses:</p>
                            <table className="border w-full min-w-[500px]">
                                <thead>
                                    <tr className="text-sm">
                                        <th className="w-16 py-2 md:py-4 border">Image</th>
                                        <th className="py-2 md:py-4 border">Course Name</th>
                                        <th className="w-20 py-2 md:py-4 border">Quantity</th>
                                        <th className="w-24 py-2 md:py-4 border text-center">
                                            Price
                                        </th>
                                        <th className="w-24 py-2 md:py-4 border text-center">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm md:text-base font-semibold">
                                    {courses.map((course, idx) => (
                                        <tr key={course.course_id || idx}>
                                            <td className="border text-center w-10 h-12 px-2">
                                                {course.photo ? (
                                                    <img
                                                        className="w-full h-full object-cover mx-auto"
                                                        src={course.photo}
                                                        alt={course.course_name || "course"}
                                                    />
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                            <td className="py-4 text-center border">
                                                {course.course_name || "N/A"}
                                            </td>
                                            <td className="py-4 text-center border">
                                                {course.course_qty || "N/A"}
                                            </td>
                                            <td className="py-4 text-center border">
                                                {course.course_fee || course.discount_course_fee || "N/A"} TK
                                            </td>
                                            <td className="py-4 text-center border">
                                                {course.sub_total_course_fee ||
                                                    course.total_course_fee ||
                                                    "N/A"}{" "}
                                                TK
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;