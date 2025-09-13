import { useState } from "react";
import "./App.css";
import { useToast, type ToastType, type ToastVariant } from "react-floatify";

import "react-floatify/dist/react-floatify.css";

function App() {
  const { addToast } = useToast();

  // Toast config state
  const [message, setMessage] = useState("Hello, world!");
  const [type, setType] = useState<ToastType>("default");
  const [variant, setVariant] = useState<ToastVariant>("regular");
  const [duration, setDuration] = useState(5);
  const [disableAnimation, setDisableAnimation] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const [fontSize, setFontSize] = useState<string | number>(14);
  const [iconSize, setIconSize] = useState(17);

  const triggerToast = () => {
    addToast(message, {
      type,
      variant,
      duration,
      disableAnimation,
      showProgress,
      fontSize,
      iconSize,
    });
  };

  return (
    <div className="App">
      <div className="playground">
        <h1>🍞 Toasty Playground</h1>
        <p className="subtitle">
          Use the controls OR edit the code below to preview your toast.
        </p>

        <div className="controls">
          <label>
            Message:
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <label>
            Type:
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ToastType)}
            >
              <option value="default">Default</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
            </select>
          </label>
          <label>
            Variant:
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as ToastVariant)}
            >
              <option value="regular">Regular</option>
              <option value="outlined">Outlined</option>
              <option value="contained">Contained</option>
            </select>
          </label>
          <label>
            Duration (sec):
            <input
              type="number"
              value={duration}
              min="1"
              max="30"
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </label>
          <label>
            Font Size:
            <input
              type="text"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
          </label>
          <label>
            Icon Size:
            <input
              type="number"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
            />
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={disableAnimation}
              onChange={(e) => setDisableAnimation(e.target.checked)}
            />
            <p>Disable animation</p>
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={showProgress}
              onChange={(e) => setShowProgress(e.target.checked)}
            />
            <p>Show Progress</p>
          </label>
        </div>

        <button onClick={triggerToast}>Show Toast</button>
      </div>
    </div>
  );
}

export default App;
