import React, { useState, useRef } from 'react';
import Button from 'components/Button/Button';
import { Input } from 'reactstrap';

const ChatGPTField = (props) => {
  const [reply, setReply] = useState('');
  const [querying, setQuerying] = useState(false);
  const [mode, setMode] = useState('rewrite-existing-text');
  const [styleGuideMode, setStyleGuideMode] = useState('default');
  const textareaRef = useRef(null);
  const customStyleGuideRef = useRef(null);
  const followUpRef = useRef(null);

  const handleSubmit = () => {
    const text = textareaRef.current.value;
    if (!text) {
      setReply('Please enter some text in the field above.');
      return;
    }
    const url = `${props.data.queryUrl}`;
    let styleGuide = '';
    if (styleGuideMode === 'custom') {
      styleGuide = customStyleGuideRef.current.value;
      if (styleGuide) {
        // remove leading bullet points from each line
        const styleguideList = styleGuide.split('\n');
        styleGuide = styleguideList.map((item) => item.replace(/^[\*\-] */, '')).join('\n');
        styleGuide = styleGuide
          .replaceAll('\n', '|')
          .replaceAll('||', '|')
          // remove non-printable characters
          // eslint-disable-next-line no-control-regex
          .replaceAll(/[\x00-\x1F\x7F]/gm, '');
        // url += `&styleguide=${encodeURIComponent(styleguide)}`;
      }
    }
    setQuerying(true);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        mode,
        text,
        styleGuide,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        const content = responseJson[responseJson.length - 1].content;
        setReply(content);
        setQuerying(false);
      });
  };

  const handleFollowUp = () => {};

  const createButton = (text, buttonMode) => <Button
    color="info"
    onClick={() => setMode(buttonMode)}
    active={mode === buttonMode}
    outline="true"
  >{text}</Button>;

  const createStyleGuideButton = (text, buttonMode) => <Button
    color="info"
    onClick={() => setStyleGuideMode(buttonMode)}
    active={styleGuideMode === buttonMode}
    outline="true"
  >{text}</Button>;

  const styleGuide = props.data.styleGuide.replace(/\n/g, ', ');
  const styleGuideList = styleGuide.split(',').map((item) => <li>{item}</li>);

  let text = '';
  if (mode === 'rewrite-existing-text') {
    text = <div>Apply the style guide to text entered below</div>;
  } else if (mode === 'freeform-prompt') {
    text = <div>Ask ChatGPT to do something for you. The results will have the style guide applied to it</div>;
  }

  // no-change-track is to prevent the 'unsaved changes' warning on navigate away
  return <div className="ChatGPTField no-change-track">
    <div>
      <strong>Mode: </strong>
      { createButton('Rewrite text', 'rewrite-existing-text') }
      { createButton('Freeform prompt', 'freeform-prompt') }
    </div>
    {text}
    <div>
      <Input type="textarea" rows="6" innerRef={textareaRef} />
    </div>

    <div>
      <strong>Style guide mode: </strong>
      { createStyleGuideButton('Default', 'default') }
      { createStyleGuideButton('Custom', 'custom') }
    </div>
    { styleGuideMode === 'default' && <div>
      <strong>Default style guide:</strong>
      <ul>{styleGuideList}</ul>
      <div className="ChatGPTField__edit-style-guide">Administrators can <a href="/admin/settings#Root_ContentAI" target="_blank">edit the default style guide</a></div>
    </div> }
    { styleGuideMode === 'custom' && <div>
      Enter your custom style guide rules seperated by line breaks.
      <Input type="textarea" rows="4" innerRef={customStyleGuideRef} />
    </div> }
    <div>
      <Button color="warning" onClick={handleSubmit}>Submit</Button>
      { (querying) && <span className="ChatGPTField__querying">Communicating with ChatGPT...</span> }
    </div>
    <div>
      <strong>Response from ChatGPT:</strong><br/>
      {/* Using an input so that line break are preserved.
      Note you cannot put <br> in here they render as plain text */}
      <Input type="textarea" rows="8" value={reply} readOnly="true" />
      <br/>Submit again to get a different result.
    </div>
    <div>
      <strong>Follow up:</strong><br/>
      <Input type="textarea" rows="2" innerRef={followUpRef} disabled={!reply} />
      <Button color="warning" onClick={handleFollowUp}>Submit</Button>
    </div>
  </div>;
};

export default ChatGPTField;
