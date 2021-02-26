import { useState } from 'react';

const Whatever = () => {
  const [state, setState] = useState('Initial State');
  return (
    <div>
      <h1>{state}</h1>
      <button onClick={() => setState('Button clicked')}> click me</button>
    </div>
  );
};

export default Whatever;
