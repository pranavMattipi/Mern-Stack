import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";

const Home = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // DELETE handler
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("🗑️ Product deleted!");
        fetchProducts(); // Refresh list
      } else {
        toast.error("❌ Failed to delete product.");
      }
    } catch (error) {
      toast.error("❌ Error deleting product.");
      console.error(error);
    }
  };

  // EDIT handler using prompt
  const handleEdit = async (product) => {
    const newName = prompt("Edit product name:", product.name);
    const newPrice = prompt("Edit product price:", product.price);
    const newImage = prompt("Edit product image URL:", product.image);

    if (!newName || !newPrice || !newImage) {
      toast.error("❗ All fields are required.");
      return;
    }

    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          price: newPrice,
          image: newImage,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("✏️ Product updated!");
        fetchProducts();
      } else {
        toast.error("❌ Failed to update product.");
      }
    } catch (error) {
      toast.error("❌ Error updating product.");
      console.error(error);
    }
  };

  return (
    <div className="text-center mt-20 px-4">
      <h1 className="text-5xl font-bold text-blue-400 flex justify-center items-center gap-2 mb-4">
        Current Products <Rocket className="w-8 h-auto" />
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-400 mt-4">
          No products found 😢{" "}
          <Link to="/create" className="text-blue-500 text-3xl font-semibold">
            Create a product
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-lg p-6 text-left shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold text-green-400">
                {product.name}
              </h3>
              <p className="text-gray-300 mt-2">₹ {product.price}</p>

              {/* Action buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
