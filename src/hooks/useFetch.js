import {useState, useEffect} from 'react';

const useFetch = (url) => {
  const [response, setResponse] = useState([])
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await fetch(url)
        const json = await response.json();
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