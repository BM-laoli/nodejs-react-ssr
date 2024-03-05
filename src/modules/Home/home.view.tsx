import React, { useState } from 'react';
import { Link } from '@/core/commonUI';
const Home = (props) => {
  const [value, setValue] = useState(props?.initState?.value || '');

  return (
    <div>
      <p>{value}</p>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Link href="/nas">go nas</Link>
    </div>
  );
};

export default Home;
