import React, { useState } from 'react';

const ExampleHook = () => {
    const [count, setCount] = useState(0);
    const increase = () => {
        setCount(count + 1);
    };
    return (
        <>
            <h3>counter: {count}</h3>
            <button onClick={increase}>Increase</button>
        </>
    );
};

export default ExampleHook;
