import { useState } from "react";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const createProduct = useProductStore((state) => state.createProduct);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name: productName,
      price,
      image: imageUrl,
    };

    const { success, message } = await createProduct(newProduct);
    console.log("success:", success);
    console.log("message:", message);

    if (success) {
      toast.success("✅ Product created successfully!");
      setProductName("");
      setPrice("");
      setImageUrl("");
    } else {
      toast.error("❌ Failed to create product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white px-4">
      <h2 className="text-5xl font-bold text-green-400 mb-10">
        Create a New Product 🚀
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-10 rounded-xl w-full max-w-xl shadow-md space-y-6"
      >
        <input
          type="text"
          placeholder="Product Name"
          className="w-full px-5 py-4 text-lg rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (in Rupees)"
          className="w-full px-5 py-4 text-lg rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full px-5 py-4 text-lg rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-4 text-lg bg-blue-400 hover:bg-blue-500 text-black font-semibold rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
