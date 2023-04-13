"use client"
import { useState, useEffect } from 'react';

export default function useDebounce(value, delay=500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}


// import { useState, useEffect } from "react";

// function useDebounce(value,delay=500) {
//     const [debounceValue, setValue] = useState(value)
//     useEffect(()=>{
//         const Delay = setTimeout(()=>{
//             setValue(value)
//         },delay)
//         return ()=>{
//             clearTimeout(Delay)
//         }
//     },[value,delay])

//     return debounceValue

// }
