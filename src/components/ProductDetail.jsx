import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 underline mb-4 block">← Back to Products</Link>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img src={product.image} alt={product.title} className="w-60 h-60 object-contain" />
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-lg text-gray-700 mb-2">{product.description}</p>
          <p className="text-green-700 font-bold text-xl">${product.price}</p>
          <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
