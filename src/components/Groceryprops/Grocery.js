import React from 'react'
import BaseUrl from '../service/Baseurl'

const Grocery = ({ data }) => {
    return (
        <>
            <div className='flex justify-evenly flex-wrap'>
                {data.map((item, index) => (
                    <div key={index}>
                        <img src={`${BaseUrl}/${item?.product_Image}`} className='h-[180px] w-[150px]' />
                        <h1 className='font-[400px] text-[20px] text-wrap text-center w-[145px]'>{item.product_Name}</h1>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Grocery