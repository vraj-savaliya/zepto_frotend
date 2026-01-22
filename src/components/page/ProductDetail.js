import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../service/Baseurl";

const ProductDetail = () => {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get("id");

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `${BaseUrl}/admin/fetch/productdetail?id=${productId}`
                );  
                if (res.data.success) {
                    setProduct(res.data.data);
                }
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="max-w-[1200px] mx-auto p-6">
                <div className="h-[300px] bg-gray-100 rounded-2xl animate-pulse" />
            </div>
        );
    }

    if (!product) return null;

    const price = Number(product.product_price);
    const discountPrice = Number(product.product_discount_price);

    const discount =
        price && discountPrice
            ? Math.round(((price - discountPrice) / price) * 100)
            : 0;

    return (
        <div className="max-w-[1200px] mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT IMAGE */}
            <div className="bg-white rounded-2xl shadow p-4">
                <img
                    src={
                        product.product_Image?.startsWith("http")
                            ? product.product_Image
                            : `${BaseUrl}/${product.product_Image}`
                    }
                    alt={product.product_Name}
                    onError={(e) => {
                        e.target.src =
                            "https://via.placeholder.com/600x400?text=No+Image";
                    }}
                    className="w-full rounded-xl object-cover"
                />
            </div>

            {/* RIGHT DETAILS */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h1 className="text-3xl font-bold">
                    {product.product_Name}
                </h1>

                <p className="text-gray-500 mt-1">
                    {product.product_wieght || "Standard size"}
                </p>

                <p className="mt-4 text-gray-700">
                    {product.product_description}
                </p>

                {/* PRICE BOX */}
                <div className="mt-6 bg-pink-50 p-4 rounded-xl flex items-center gap-4">
                    <span className="text-3xl font-bold text-[#EF4372]">
                        ₹{discountPrice}
                    </span>

                    {price > discountPrice && (
                        <>
                            <span className="line-through text-gray-400">
                                ₹{price}
                            </span>

                            <span className="text-red-500 font-medium">
                                {discount}% OFF
                            </span>
                        </>
                    )}
                </div>

                <button className="w-full mt-6 bg-[#EF4372] text-white py-3 rounded-xl font-semibold">
                    Add to Cart
                </button>

                <div className="mt-6 text-green-600 font-medium">
                    ✔ In Stock
                </div>

                <p className="text-xs text-gray-400 mt-4">
                    All nutritional information displayed is as per the product label.
                </p>
            </div>
        </div>
    );
};

export default ProductDetail;
