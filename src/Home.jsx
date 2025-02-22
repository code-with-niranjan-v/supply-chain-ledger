import { useState, useEffect } from "react";
import logo from "./assets/supply-chain.png";
import axios from "axios";
function Home() {
  const URL = "http://localhost:4000";
  const [stocks, setStocks] = useState([]);
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [quantity, setQuantity] = useState();
  const [status, setStatus] = useState();
  const [owner, setOwner] = useState();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = { username: localStorage.getItem("username") };
        const res = await axios.post(URL + "/queryAllStocks", data);
        setStocks(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []);

  const handleNewStock = async () => {
    const username = localStorage.getItem("username");
    if (name && id && quantity && owner && status) {
      const data = {
        id,
        name,
        quantity,
        status,
        owner,
        username,
      };
      const res = await axios.post(URL + "/createStock", data);
    }
  };

  function getColor(status) {
    if (status == "Available") {
      return "bg-green-300 rounded-md text-sm text-green-900";
    } else if (status == "Low Stock") {
      return "bg-yellow-200 rounded-md text-sm text-yellow-900";
    } else if (status == "In-Transit") {
      return "bg-purple-200 rounded-md text-sm text-purple-900";
    } else if (status == "Packing") {
      return "bg-orange-200 rounded-md text-sm text-orange-900";
    } else {
      return "bg-red-200 rounded-md text-sm text-red-900";
    }
  }
  return (
    <>
      <div className="flex flex-col h-full w-full min-h-screen ">
        <div className="ml-3 p-4 flex items-center gap-x-2">
          <img src={logo} alt="Supply Chain Logo" className="w-16 h-16" />
          <p className="font-bold text-3xl">Supply Chain Ledger</p>
        </div>

        <div className="flex flex-row gap-x-4 ">
          <div className=" ml-10 space-y-4 bg-white p-6 rounded-lg shadow-md w-1/4 ">
            <p className="font-bold text-3xl">Add Stocks</p>
            <div className="flex flex-col">
              <label for="id" className="p-2">
                Stock ID{" "}
              </label>
              <input
                type="text"
                name="id"
                onChange={(e) => setId(e.target.value)}
                value={id}
                placeholder="Enter Stock ID"
                className="bg-gray-100 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <label for="name" className="p-2">
                Stock Name
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter Stock Name"
                className="bg-gray-100 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <label for="quanity" className="p-2">
                Stock Quantity{" "}
              </label>
              <input
                type="text"
                name="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                placeholder="Enter Stock Quantity"
                className="bg-gray-100 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <label for="status" className="p-2">
                Stock Status{" "}
              </label>
              <input
                type="text"
                name="status"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                placeholder="Enter Stock Status"
                className="bg-gray-100 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label for="owner" className="p-2">
                Stock Supplier{" "}
              </label>
              <input
                type="text"
                name="owner"
                onChange={(e) => setOwner(e.target.value)}
                value={owner}
                placeholder="Enter Stock Owner"
                className="bg-gray-100 rounded-md p-2"
              />
            </div>

            <button
              onClick={() => {
                handleNewStock();
              }}
              className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 rounded-md"
            >
              Submit
            </button>
          </div>
          <div className="flex-1 mr-10">
            <div className="flex flex-row w-full ">
              <table className="space-y-4 bg-white p-6 rounded-lg shadow-md divide-y divide-gray-100 table-auto w-full ">
                <thead>
                  <tr>
                    <th className="p-3 font-medium text-xs">ID</th>
                    <th className="p-3 font-medium text-xs">NAME</th>
                    <th className="p-3 font-medium text-xs">QUANTITY</th>
                    <th className="p-3 font-medium text-xs"> STATUS</th>
                    <th className="p-3 font-medium text-xs">SUPPLIER</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.length > 0 ? (
                    stocks.map((stock, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="p-2 text-center font-medium">
                          {stock.Record.id}
                        </td>
                        <td className="p-2 text-center ">
                          {stock.Record.name}
                        </td>
                        <td className="p-2 text-center ">
                          {stock.Record.quantity}
                        </td>
                        <td className="p-2 flex justify-center ">
                          <p className={`p-2 ${getColor(stock.Record.status)}`}>
                            {stock.Record.status}
                          </p>
                        </td>
                        <td className="p-2 text-center ">
                          {stock.Record.owner}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-3 text-center text-gray-500">
                        No stocks available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
