import React, { useEffect, useState } from 'react';

const ChatGPTField = (props) => {
  const url = props.data.queryUrl;

  const [result, setResult] = useState('');

  const startText = 'The quick brown fox jumped over the lazy dog';

  useEffect(async () => {
    const response = await fetch(url, {
      method: 'POST',
      body: startText
    });
    const res = await response.text();
    setResult(res);
  }, []);

  return <div>
    <h2>React field has loaded</h2>
    <div>Start text is: <strong>{startText}</strong></div>
    <div>Result is: <strong>{result}</strong></div>
  </div>;
};

export default ChatGPTField;
