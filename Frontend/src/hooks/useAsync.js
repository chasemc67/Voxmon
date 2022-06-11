import { useState, useEffect } from "react";

export const useAsync = (fn, deps = []) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [res, setRes] = useState();
    useEffect(() => {
       setLoading(true);
       let cancel = false;
       fn().then(response => {
          if (cancel) return;
          setRes(response);
          setLoading(false);
       }, error => {
          if (cancel) return;
          setLoading(false);
          setError(error);
       })
       return () => {
          cancel = true;
       }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, fn])
    return {loading, error, res};
 };