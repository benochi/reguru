import { useState, useEffect } from "react";

//keeps state data synced with localStorage
//creates item as state and looks in localstorage for value, if not found defaults to null.
function useLocalStorage(key, firstValue = null) {
  const initialValue = localStorage.getItem(key) || firstValue;
  const [item, setItem] = useState(initialValue);

  useEffect(function setLocalStorageKey(){
    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;