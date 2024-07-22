/** @format */

import { useState, useEffect } from "react";
type props = {
  value: string;
  Delay: number;
};
function useDebounce({ value, Delay }: props) {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, Delay);
    return () => {
      clearTimeout(debounce);
    };
  }, [value, Delay]);
  return debouncedValue;
}
export default useDebounce;
