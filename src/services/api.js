import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Api() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:5001/api/')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {data && <p>{data.message}</p>}
    </div>
  );
}

export default Api;
