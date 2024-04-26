import React, { useState, useRef } from 'react';
import Button from 'components/Button/Button';
import { Input } from 'reactstrap';

const ChatGPTField = (props) => {
  const [reply, setReply] = useState('');
  const [querying, setQuerying] = useState(false);
  const [mode, setMode] = useState('rewrite-existing-text');
  const [styleGuideMode, setStyleGuideMode] = useState('default');
  const [contextMode, setContextMode] = useState('none');
  const textareaRef = useRef(null);
  const customStyleGuideRef = useRef(null);

  const handleSubmit = () => {
    const text = textareaRef.current.value;
    if (!text) {
      setReply('Please enter some text in the field above.');
      return;
    }
    let url = `${props.data.queryUrl}?mode=${mode}`;
    if (styleGuideMode === 'custom') {
      let styleguide = customStyleGuideRef.current.value;
      if (styleguide) {
        // remove leading bullet points from each line
        const styleguideList = styleguide.split('\n');
        styleguide = styleguideList.map((item) => item.replace(/^[\*\-] */, '')).join('\n');
        styleguide = styleguide
          .replaceAll('\n', '|')
          .replaceAll('||', '|')
          // remove non-printable characters
          // eslint-disable-next-line no-control-regex
          .replaceAll(/[\x00-\x1F\x7F]/gm, '');
        url += `&styleguide=${encodeURIComponent(styleguide)}`;
      }
    }
    if (contextMode !== 'none') {
      url += `&contextMode=${encodeURIComponent(contextMode)}`;
    }
    setQuerying(true);
    fetch(url, {
      method: 'POST',
      body: text,
    })
      .then(response => response.text())
      .then(responseText => {
        setReply(responseText);
        setQuerying(false);
      });
  };

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

  const createContextsButton = (text, buttonMode) => <Button
    color="info"
    onClick={() => setContextMode(buttonMode)}
    active={contextMode === buttonMode}
    outline="true"
  >{text}</Button>;

  const styleGuide = props.data.styleGuide.replace(/\n/g, ', ');
  const styleGuideList = styleGuide.split(',').map((item) => <li>{item}</li>);

  const createContextButtons = () => props.data.contexts.split('\n').map((context) => {
    const text = context.substring(0, 10);
    return createContextsButton(text, context);
  });

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
      <strong>Context mode:</strong>
      { createContextsButton('None', 'none') }
      { createContextButtons() }
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
    { (reply || true) && <div>
      <strong>Response from ChatGPT:</strong><br/>
      {/* Using an input so that line break are preserved.
      Note you cannot put <br> in here they render as plain text */}
      <Input type="textarea" rows="8" value={reply} readOnly="true" />
      <br/>Submit again to get a different result.
    </div> }
    { mode === 'rewrite-existing-text' && false && <div className="ChatGPTField__sample-text">
      <strong>Sample text that could be optimised:</strong><br/>
      All information (including name and address details) contained in submissions will be made
      available to the public on the website unless you indicate that you would like all or part of
      your submission to remain in confidence. Automatically generated confidentiality statements in
      emails do not suffice for this purpose.<br/><br/>Respondents who would like part of their
      submission to remain in confidence should provide this information marked as such in a separate
      attachment.
    </div> }
  </div>;
};

export default ChatGPTField;
