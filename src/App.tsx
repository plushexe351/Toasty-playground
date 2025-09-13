import { useState, type Dispatch, type SetStateAction } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/github-dark.css";
import "./App.css";
import floatifyLogo from "./assets/floatify.png";

import {
  ToastProvider,
  useToast,
  type Position,
  type ToastSlideFrom,
  type ToastSpacing,
  type ToastType,
  type ToastVariant,
} from "react-floatify";

import "react-floatify/dist/react-floatify.css";
import { Copy, RotateCcwIcon } from "lucide-react";

hljs.registerLanguage("typescript", typescript);

function CodeBlock({ code }: { code: string }) {
  const highlighted = hljs.highlight(code, { language: "typescript" }).value;
  const { addToast } = useToast();
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    addToast("Copied to clipboard", {
      type: "success",
      variant: "outlined",
      spacing: "small",
      duration: 5,
      showProgress: false,
    });
  };

  return (
    <div className="code-block">
      <button className="copy-btn" onClick={copyToClipboard}>
        <Copy size={14} />
      </button>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}

interface AppProps {
  position: Position;
  setPosition: Dispatch<SetStateAction<Position>>;
}

function App({ position, setPosition }: AppProps) {
  const { addToast } = useToast();

  const DEFAULTS = {
    message: "Welcome to floatify",
    type: "default" as ToastType,
    variant: "regular" as ToastVariant,
    spacing: "regular" as ToastSpacing,
    duration: 5,
    disableAnimation: false,
    showProgress: true,
    slideFrom: "right" as ToastSlideFrom,
    fontSize: 14,
    iconSize: 17,
    elevation: 1,
    position: "bottom right" as Position,
  };

  // Toast config state
  const [message, setMessage] = useState(DEFAULTS.message);
  const [type, setType] = useState<ToastType>(DEFAULTS.type);
  const [variant, setVariant] = useState<ToastVariant>(DEFAULTS.variant);
  const [spacing, setSpacing] = useState<ToastSpacing>(DEFAULTS.spacing);
  const [duration, setDuration] = useState(DEFAULTS.duration);
  const [disableAnimation, setDisableAnimation] = useState(
    DEFAULTS.disableAnimation
  );
  const [showProgress, setShowProgress] = useState(DEFAULTS.showProgress);
  const [slideFrom, setSlideFrom] = useState<ToastSlideFrom>(
    DEFAULTS.slideFrom
  );
  const [fontSize, setFontSize] = useState<string | number>(DEFAULTS.fontSize);
  const [iconSize, setIconSize] = useState(DEFAULTS.iconSize);
  const [elevation, setElevation] = useState(DEFAULTS.elevation);

  const resetToDefaults = () => {
    setMessage(DEFAULTS.message);
    setType(DEFAULTS.type);
    setVariant(DEFAULTS.variant);
    setSpacing(DEFAULTS.spacing);
    setDuration(DEFAULTS.duration);
    setDisableAnimation(DEFAULTS.disableAnimation);
    setShowProgress(DEFAULTS.showProgress);
    setSlideFrom(DEFAULTS.slideFrom);
    setFontSize(DEFAULTS.fontSize);
    setIconSize(DEFAULTS.iconSize);
    setElevation(DEFAULTS.elevation);
    setPosition(DEFAULTS.position);
  };

  const triggerToast = () => {
    addToast(message, {
      type,
      variant,
      duration,
      spacing,
      disableAnimation,
      showProgress,
      slideFrom,
      fontSize,
      iconSize,
      elevation,
    });
  };

  const code = `
  addToast("${message}", {
  type: "${type}",
  variant: "${variant}",
  spacing: "${spacing}",
  duration: ${duration},
  fontSize: ${fontSize},
  iconSize: ${iconSize},
  elevation: ${elevation},
  disableAnimation: ${disableAnimation},
  showProgress: ${showProgress},
  slideFrom: ${slideFrom},
});

// where you declare ToastProvider
<ToastProvider position="${position}">...</ToastProvider>
`;

  return (
    <ToastProvider position={position}>
      <div className="app">
        <header>
          <h1>
            <img src={floatifyLogo} alt="floatify-icon" className="logo" />
            Floatify Playground
          </h1>
          <p className="subtitle">
            Adjust the props and preview your toast in real-time.
          </p>
        </header>

        <main className="playground">
          <section className="controls">
            <h2>Options</h2>
            <label className="message">
              Message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>

            <label>
              Type
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
              Variant
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
              Spacing
              <select
                value={spacing}
                onChange={(e) => setSpacing(e.target.value as ToastSpacing)}
              >
                <option value="small">Small</option>
                <option value="regular">Regular</option>
                <option value="large">Large</option>
              </select>
            </label>
            <label>
              Position
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as Position)}
              >
                <option value="top left">Top Left</option>
                <option value="top center">Top Center</option>
                <option value="top right">Top Right</option>
                <option value="bottom left">Bottom Left</option>
                <option value="bottom center">Bottom Center</option>
                <option value="bottom right">Bottom Right</option>
              </select>
            </label>
            <label>
              Slide From
              <select
                value={slideFrom}
                onChange={(e) => setSlideFrom(e.target.value as ToastSlideFrom)}
              >
                <option value="left">Left</option>
                <option value="top">Top</option>
                <option value="right">Right</option>
                <option value="bottom">Bottom</option>
              </select>
            </label>

            <label>
              Duration (sec)
              <input
                type="number"
                value={duration}
                min="1"
                max="30"
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </label>

            <label>
              Font Size
              <input
                type="text"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              />
            </label>

            <label>
              Icon Size
              <input
                type="number"
                value={iconSize}
                onChange={(e) => setIconSize(Number(e.target.value))}
              />
            </label>

            <label>
              Elevation
              <input
                type="number"
                value={elevation}
                min="1"
                max="30"
                onChange={(e) => setElevation(Number(e.target.value))}
              />
            </label>
            <div className="checkbox-container">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={disableAnimation}
                  onChange={(e) => setDisableAnimation(e.target.checked)}
                />
                Disable animation
              </label>

              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={showProgress}
                  onChange={(e) => setShowProgress(e.target.checked)}
                />
                Show Progress
              </label>
            </div>

            <button onClick={triggerToast} className="show-toast-btn">
              Show Toast
            </button>
            <button onClick={resetToDefaults} className="reset-options-btn">
              <RotateCcwIcon size={17} /> Reset
            </button>
          </section>

          <section className="aside">
            <div className="preview">
              <h2>Generated Code</h2>
              <CodeBlock code={code} />
            </div>
            <div className="cta">
              <h2>Get Floatify</h2>
              <div className="badges">
                <a
                  href="https://www.npmjs.com/package/react-floatify"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.shields.io/npm/v/react-floatify"
                    alt="npm version"
                  />
                </a>
                <a
                  href="https://opensource.org/licenses/MIT"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.shields.io/badge/License-MIT-green.svg"
                    alt="License: MIT"
                  />
                </a>
                <a
                  href="https://github.com/plushexe351"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.shields.io/badge/github-plushexe351-181717?logo=github"
                    alt="GitHub: plushexe351"
                  />
                </a>
              </div>

              <CodeBlock code="npm install react-floatify" />
            </div>
          </section>
        </main>

        <footer>
          &copy;{new Date().getFullYear()} react-floatify · With ❤️ by{" "}
          <a href="https://github.com/plushexe351">Ushnish Tapaswi</a> |{" "}
          <a href="https://github.com/plushexe351/react-floatify">
            View Source
          </a>
        </footer>
      </div>
    </ToastProvider>
  );
}

export default App;
