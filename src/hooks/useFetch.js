import {useState, useEffect} from 'react';

const useFetch = (url) => {
  const [response, setResponse] = useState([])
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    (async function fetchData() {
      try {
        const res = await fetch(url)
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setStatus('error');
      } finally {
        setStatus('loaded');
      }
    })();
  }, [url])

  return [response, status];
}

export default useFetch;