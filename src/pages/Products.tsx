import { useState } from "react";
import axios from "axios";
import { uri } from "@/Constant";
import { ToastContainer, toast } from "react-toastify";

type ProData = {
  productname: string;
  productprice: number;
  productquantity: number;
  totalprice: number;
};

const Products = () => {
  const [prodata, setProdata] = useState<ProData[]>([]);
  const [productname, setProductname] = useState<string>("");
  const [productprice, setProductprice] = useState<number>(0);
  const [productquantity, setProductquantity] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [enabledownload, setEnabledownload] = useState<boolean>(false);

  const calculate = () => {
    const totalprice = productprice * productquantity;

    const payload: ProData = {
      productname,
      productprice,
      productquantity,
      totalprice,
    };

    setProdata((prev) => {
      const newProData = [...prev, payload];
      const newSubtotal = newProData.reduce(
        (acc, item) => acc + item.totalprice,
        0
      );
      setSubtotal(newSubtotal); // Update subtotal here
      return newProData;
    });
  };

  const createPdf = async () => {
    try {
      const response = await axios.post(`${uri}createpdf`, prodata);

      if (response.status == 200) {
        toast.success("Pdf Generated Successfully");
        setPdfUrl(response.data.path);
        
        
        setEnabledownload(true);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Something Went Wrong");
    }
  };

  const downloadpdf = async () => {
    try {
      console.log(pdfUrl,"dfgg");
      
      const response = await axios.post(
        `${uri}downloadpdf`,
        { path: pdfUrl },
        { responseType: "blob" } // Ensure binary data is handled correctly
      );
  
      // Create a URL for the blob and initiate download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf"); // Set a default filename
      document.body.appendChild(link);
      link.click();
      
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full h-screen bg-[#141414] text-white p-[5%]">
      <ToastContainer />
      <div className="mb-10">
        <h1 className="text-2xl md:text-4xl">Add Products</h1>
        <p className="text-[#9b9595] mt-2">
          This is an admin panel for bill preparation
        </p>
        <div className="md:flex md:gap-8 mt-6">
          <div className="flex-1">
            <label className="block text-white mb-1">Product Name</label>
            <input
              placeholder="Enter the product name"
              type="text"
              className="mb-2 md:mb-0 w-full border border-gray-600 rounded p-2 bg-[#1f1f1f]"
              onChange={(e) => setProductname(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-white mb-1">Product Price</label>
            <input
              placeholder="Enter the price"
              type="number"
              className="mb-2 md:mb-0 w-full border border-gray-600 rounded p-2 bg-[#1f1f1f]"
              onChange={(e) => setProductprice(Number(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <label className="block text-white mb-1">Quantity</label>
            <input
              placeholder="Enter the Qty"
              type="number"
              className="w-full border border-gray-600 rounded p-2 bg-[#1f1f1f]"
              onChange={(e) => setProductquantity(Number(e.target.value))}
            />
          </div>
        </div>
        <button
          onClick={calculate}
          className="flex items-center m-auto gap-2 px-4 py-2 rounded-md bg-[#1f1f1f] text-[#CCF575] mt-8"
        >
          Add Product
        </button>
      </div>

      <table className="w-full text-left text-sm rounded-3xl border border-gray-600">
        <thead className="bg-white text-black">
          <tr>
            <th className="p-3">Product Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {prodata.length > 0 ? (
            <>
              {prodata.map((product, index) => (
                <tr key={index} className="border-b border-gray-600">
                  <td className="p-3">{product.productname}</td>
                  <td className="p-3">₹{product.productprice}</td>
                  <td className="p-3">{product.productquantity}</td>
                  <td className="p-3">₹{product.totalprice}</td>
                </tr>
              ))}
              <tr className="border-b border-gray-600">
                <td className="p-3 text-right pr-8" colSpan={3}>
                  Subtotal
                </td>
                <td className="p-3">₹{subtotal}</td>
              </tr>
              <tr>
                <td className="p-3 text-right pr-8" colSpan={3}>
                  Including 18% GST
                </td>
                <td className="p-3">₹{(subtotal * 18) / 100}</td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan={4} className="p-3 text-center">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        onClick={createPdf}
        className="flex items-center m-auto gap-2 px-4 py-2 rounded-md bg-[#1f1f1f] text-[#CCF575] mt-8"
      >
        Generate PDF Invoice
      </button>

      {enabledownload && (
        <button
          onClick={downloadpdf}
          className="flex items-center m-auto gap-2 px-4 py-2 rounded-md bg-[#1f1f1f] text-[#CCF575] mt-8"
        >
          Download Invoice
        </button>
      )}
    </div>
  );
};

export default Products;
