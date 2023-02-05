import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: "Message 1",
      variant: "error",
    },
    {
      id: crypto.randomUUID(),
      message: "Message 2",
      variant: "success",
    },
  ]);
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = React.useState("");

  function handleToastCreation(e) {
    e.preventDefault();
    const nextToast = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];
    setToasts(nextToast);
    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  }

  const handleDismiss = (id) => {
    const nextToasts = toasts.filter((toast) => toast.id !== id);

    setToasts(nextToasts);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {/* {isRendered && (
        <Toast variant={variant} handleDismiss={handleDismiss}>
          {message}
        </Toast>
      )} */}
      <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />

      <form onSubmit={handleToastCreation} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required={true}
              id="message"
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {/* TODO Other Variant radio buttons here */}
            {VARIANT_OPTIONS.map((option) => {
              return (
                <label key={option} htmlFor={`variant-${option}`}>
                  <input
                    id={`variant-${option}`}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === variant}
                    onChange={(e) => setVariant(e.target.value)}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
