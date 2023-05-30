import React, { useEffect, useState } from 'react';

const Home = (props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div>
      <p>{value}</p>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default Home;
