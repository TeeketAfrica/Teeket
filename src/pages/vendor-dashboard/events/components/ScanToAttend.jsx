import { Html5QrcodeScanner } from 'html5-qrcode'
import React, { useEffect, useState } from 'react'

const ScanToAttend = () => {
    const [scanResult, setScanResult] = useState('')
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
                    console.warn(err);
    
                }                 
       
        }, [])
  return (
    <div className='h-screen flex justify-center items-center relative'>
        {
            scanResult ?
            <div>Success: <Link href={"http://" + scanResult}>Press Me</Link> </div> :
            <div id="reader"></div>
        }
    </div>
  )
}

export default ScanToAttend