import React, { useState } from 'react';
import ChildChallenge from './ChildChallenge';


const Challenge = () => {
  const [name, setName] = useState('name');
  const [age, setAge] = useState('age');

  return (
    <div>
      <ChildChallenge name1={name} age1={age} />
      <button onClick={() => { setName('Malchi'); setAge('26'); }}>Update Props</button>
    </div>
  );
};




export default Challenge;
