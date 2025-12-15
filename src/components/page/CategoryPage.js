import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BaseUrl from '../service/Baseurl'

const CategoryPage = () => {
  const { id } = useParams()
  const [products, setProducts] = useState([])
  const [collectdataforaddtocart, setcollectdataforaddtocart] = useState([])

  console.log(collectdataforaddtocart);
  useEffect(() => {
    const storedCart = localStorage.getItem('cartData')
    if (storedCart) {
      setcollectdataforaddtocart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${BaseUrl}/fetchproduct/details/page/for/show/categorywise/products/${id}`
        )
        if (res.data.success) {
          setProducts(res.data.data)
        }
      } catch (err) {
        console.error(err.message)
      }
    }
    fetchProducts()
  }, [id])

  const handleAddToCart = (item) => {
    const productData = {
      product_Name: item.product_Name,
      product_description: item.product_description,
      product_price: item.product_price,
      product_discount_price: item.product_discount_price,
      product_wieght: item.product_wieght,
      product_Brand: item.product_Brand,
      categoryid: item.categoryid,
      product_Image: item.product_Image,
    }

    setcollectdataforaddtocart((prev) => {
      const updatedCart = [...prev, productData]
      localStorage.setItem('cartData', JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Category Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-3 cursor-pointer"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={`${BaseUrl}/${item?.product_Image}`}
                alt={item.product_Name}
                className="h-48 w-full object-fill rounded-xl group-hover:scale-105 transition duration-300"
              />
              {item.discount && (
                <>
                  <img
                    src={item.discountimage}
                    className="absolute top-3 left-3 h-10 z-10"
                    alt="Discount badge"
                  />
                  <p className="absolute top-4 left-5 text-white text-xs font-semibold z-20">
                    {item.discount}% <br /> OFF
                  </p>
                </>
              )}
            </div>

            {/* Product Info */}
            <div className="mt-3">
              <p className="font-semibold text-gray-800 truncate">
                {item.product_Name}
              </p>
              <p className="text-sm text-gray-500">{item.product_wieght}</p>
              <p className="text-gray-600 text-sm line-clamp-3 mt-1">
                {item.product_description}
              </p>

              {/* Price Section */}
              <div className="flex justify-between items-center mt-3">
                <div>
                  <p className="text-lg font-bold text-[#EF4372]">
                    ₹{item.product_discount_price}
                  </p>
                  <p className="text-xs line-through text-gray-400">
                    ₹{item.product_price}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-3 py-1 text-xs font-semibold rounded-full border border-[#EF4372] text-[#EF4372] bg-[#FFF5F8] hover:bg-[#EF4372] hover:text-white transition duration-200"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage
