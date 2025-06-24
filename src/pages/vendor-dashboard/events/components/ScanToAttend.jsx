import { asyncThunkCreator } from '@reduxjs/toolkit'
import { Html5QrcodeScanner } from 'html5-qrcode'
import React, { useEffect, useState } from 'react'
import { teeketApi } from '../../../../utils/api'
import { Link, useNavigate } from 'react-router-dom'

const ScanToAttend = () => {
    const [scanResult, setScanResult] = useState('')
    const [orderId, setOrderId] = useState('')
    const navigate = useNavigate()
        useEffect(()=>{
                const scanner = new Html5QrcodeScanner('reader', {
                    qrbox:{
                        width:250,
                        height:250
                    },
                    fps: 5
                })
    
                scanner.render(success, error);
    
                function success(result){
                    scanner.clear();
                    setScanResult(result)
                }
    
                function error(err){
                    // console.warn(err);
    
                }                 
       
        }, [])

        const handleVerifyOrder = async()=>{
            if(scanResult){
                try {
                  const response = await teeketApi.post(`/events/tickets/qr-code/verify`, {token:scanResult})
                  console.log(response)
                  console.log(response.data.order_id)
                    setOrderId(response.data.data.order_id)
                    navigate(`/app/preview-scanned/${response.data.data.order_id}`)
                } catch (error) {
                  console.error("Error verifying order:", error);
                  navigate(`/app/preview-scanned/${error.response?.data?.message || 'An error occurred while verifying the order.'}`)
                }                
            }

        }

        useEffect(()=>{
            handleVerifyOrder()
        }, [scanResult])
  return (
    <div className='h-screen flex justify-center items-center relative'>
        {
            orderId ?
            <div>Success: <Link to={`/app/preview-scanned/${orderId}/${error}`}>Preview Ticket</Link> </div> :
            <div id="reader"></div>
        }
    </div>
  )
}

export default ScanToAttend