import { useState } from "react";
// import { IoMdSearch } from "react-icons/io";

const Search = () => {
    // const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState(null);
    const [formId, setFormId] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

const handleSearch = async () => {
  const formData = new FormData();

  formData.append("form_no", formId);
  formData.append("phone_no", phoneNo);

  const res = await fetch(
    "https://itder.com/api/search-purchase-data",
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await res.json();

  console.log(result);

  setData(result.singleCoursePurchaseData);
};
    return (
        <div className="min-h-screen flex flex-col text-text_40px font-bold items-center justify-center">
            <h1 className="w-[600px] mx-auto">Search here</h1>
            <div className="shadow-md p-5 space-y-4">
                <div className="h-[52px] relative  w-[600px] mx-auto">
                    <input
                        type="text"
                        name="search"
                        placeholder="search here..."
                        value={formId}
                        onChange={(e) => setFormId(e.target.value)}
                        className="text-black p-4 w-full block h-full outline-0 rounded-md focus:outline-none focus:ring-2 border border-blue-400"
                    />

                </div>
                <div className="h-[52px] relative  w-[600px] mx-auto">
                    <input
                        type="text"
                        name="search"
                        placeholder="search here..."
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        className="text-black p-4 w-full block h-full outline-0 rounded-md focus:outline-none focus:ring-2 border border-blue-400"
                    />

                </div>
                <button className="bg-blue-500 flex mx-auto px-7 py-2 text-white rounded-md" onClick={handleSearch}>Submit</button>
            </div>









            {data && (
                <>
                    <div className="text-center flex flex-col justify-center items-center">
                        <p className="text-xl font-bold">Order Information</p>

                        <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
                            Order Id :
                            <span className="font-semibold">
                                {data.id || "N/A"}
                            </span>
                        </p>
                    </div>

                    <div className="w-full border flex flex-col md:flex-row md:items-start md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4">

                        <div className="md:text-base text-sm flex-1 font-semibold md:border-r-2 md:border-black md:pr-10">
                            <p className="font-bold md:mb-4">
                                Demo information, Checkout page information will be here
                            </p>

                            <div className="space-y-1">

                                <div className="flex justify-between">
                                    <p>Full Name :</p>
                                    <p>{data.name || "N/A"}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Email :</p>
                                    <p>{data.email || "N/A"}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Phone No :</p>
                                    <p>{data.phone_no || "N/A"}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Gender :</p>
                                    <p>{data.gender || "N/A"}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Date of Birth :</p>
                                    <p>{data.date_of_birth || "N/A"}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Blood Group :</p>
                                    <p>{data.blood_group || "N/A"}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>NID No :</p>
                                    <p>{data.nid_no || "N/A"}</p>
                                </div>

                            </div>
                        </div>


                        <div className="md:text-base text-sm flex-1 font-semibold md:ml-10 mt-6 md:mt-0">

                            <p className="font-bold md:mb-4">
                                Demo information, Checkout page information will be here
                            </p>

                            <div className="space-y-1">

                                <div className="flex justify-between">
                                    <p>Full Name :</p>
                                    <p>{data.name || "N/A"}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Email :</p>
                                    <p>{data.email || "N/A"}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Phone No :</p>
                                    <p>{data.phone_no || "N/A"}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Gender :</p>
                                    <p>{data.gender || "N/A"}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Date of Birth :</p>
                                    <p>{data.date_of_birth || "N/A"}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Blood Group :</p>
                                    <p>{data.blood_group || "N/A"}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>NID No :</p>
                                    <p>{data.nid_no || "N/A"}</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </>
            )}

        </div>

    );
};

export default Search;