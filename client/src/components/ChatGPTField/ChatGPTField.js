import React, { useState, useRef } from 'react';
import Button from 'components/Button/Button';
import { Input } from 'reactstrap';

const ChatGPTField = (props) => {
  const [reply, setReply] = useState('');
  const [querying, setQuerying] = useState(false);
  const [mode, setMode] = useState('rewrite-existing-text');
  const rewriteExistingTextTextareaRef = useRef(null);
  const freeformPromptTextareaRef = useRef(null);

  const styleGuide = props.data.styleGuide.replace(/\n/g, ', ');

  const handleSubmitRewriteExistingText = () => {
    const text = rewriteExistingTextTextareaRef.current.value;
    if (!text) {
      setReply('Please enter some text in the field above.');
      return;
    }
    const url = `${props.data.queryUrl}?mode=rewrite-existing-text`;
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

  // todo: duplicate code, refactor
  const handleSubmitFreeformPrompt = () => {
    const text = freeformPromptTextareaRef.current.value;
    if (!text) {
      setReply('Please enter some text in the field above.');
      return;
    }
    const url = `${props.data.queryUrl}?mode=freeform-prompt`;
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

  // no-change-track is to prevent the 'unsaved changes' warning on navigate away
  const renderRewriteExistingTextMode = () => <div className="ChatGPTField__rewriteExistingText">
    <div>Use this mode to rewrite existing text applying the style guide to it</div>
    <div>
      <strong>Paste in text here:</strong><br/>
      <Input type="textarea" rows="8" innerRef={rewriteExistingTextTextareaRef} />
    </div>
    <div>
      <Button color="warning" onClick={handleSubmitRewriteExistingText}>Submit</Button>
    </div>
  </div>;

  const renderFreeformPromptMode = () => <div className="ChatGPTField__freePrompt">
    <div>
      <strong>Enter a free form prompt request that will have the style guide applied to it:</strong><br/>
      <Input type="textarea" rows="8" innerRef={freeformPromptTextareaRef} />
    </div>
    <div>
      <Button color="warning" onClick={handleSubmitFreeformPrompt}>Submit</Button>
    </div>
  </div>;

  const textModeHtml = mode === 'rewrite-existing-text'
    ? renderRewriteExistingTextMode()
    : renderFreeformPromptMode();

  return <div className="ChatGPTField no-change-track">
    <div>
      <strong>Mode: </strong>
      <Button color="info" onClick={() => setMode('rewrite-existing-text')}>Existing text mode</Button>
      <Button color="info" onClick={() => setMode('freeform-prompt')}>Freeform prompt mode</Button>
    </div>
    { textModeHtml }
    <div>
      { querying && <span>Communicating with ChatGPT...</span> }
    </div>
    <div>
      <strong>Style guide: </strong>
      {styleGuide}
    </div>
    { reply && <div>
      <strong>Response from ChatGPT:</strong><br/>
      {/* Using an input so that line break are preserved.
      Note you cannot put <br> in here they render as plain text */}
      <Input type="textarea" rows="16" value={reply} readOnly="true" />
    </div> }
    <div>
      <strong>Sample text that could be optimised:</strong><br/>
      All information (including name and address details) contained in submissions will be made
      available to the public on the website unless you indicate that you would like all or part of
      your submission to remain in confidence. Automatically generated confidentiality statements in
      emails do not suffice for this purpose.<br/><br/>Respondents who would like part of their
      submission to remain in confidence should provide this information marked as such in a separate
      attachment.
    </div>
  </div>;
};

export default ChatGPTField;
