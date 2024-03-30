import React, { useState, useRef } from 'react';
import Button from 'components/Button/Button';
import { Input } from 'reactstrap';

const ChatGPTField = (props) => {
  const [reply, setReply] = useState('');
  const [querying, setQuerying] = useState(false);
  const textareaRef = useRef(null);

  const handleClick = () => {
    const text = textareaRef.current.value;
    if (!text) {
      setReply('Please enter some text to get possible text');
      return;
    }
    const url = props.data.queryUrl;
    setQuerying(true);
    fetch(url, {
      method: 'POST',
      body: text
    })
      .then(response => response.text())
      .then(responseText => {
        setReply(responseText);
        setQuerying(false);
      });
  };

  return <div className="ChatGPTField">
    <div>
      <strong>Paste in text here:</strong><br/>
      <Input type="textarea" rows="8" innerRef={textareaRef} />
    </div>
    <div>
      <Button color="warning" onClick={handleClick}>Generate alternate text</Button>
      { querying && <span>Communicating with ChatGPT...</span> }
    </div>
    { reply && <div>
      <strong>Alternate text:</strong><br/>
      {/* Using an input so that line break are preserved.
      Note you cannot put <br> in here they render as plain text */}
      <Input type="textarea" rows="16" value={reply} readOnly="true" />
    </div> }
  </div>;
};

export default ChatGPTField;
