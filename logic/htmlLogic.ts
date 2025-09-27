/**
 * A helper function that shows a message to the user, and executes a callback when they confirm (click OK
 * @param text will be displayed to user
 * @param callbackToProceed a function that will be executed once user clicked "ok"
 */
export function placeMessage(text: string, callbackToProceed: () => void) {
  const container = document.createElement("div");
  container.className = "message-container";
  const box = document.createElement("div");
  box.className = "message-box";
  box.innerHTML = `<p>${text}</p>`;
  const okButton = document.createElement("button");
  okButton.textContent = "OK";
  okButton.onclick = () => {
    document.body.removeChild(container);
    callbackToProceed();
  };

  const exitButton = document.createElement("button");
  exitButton.textContent = "X";
  exitButton.onclick = () => {
    document.body.removeChild(container);
  };
  box.appendChild(okButton);
  box.appendChild(exitButton);
  container.appendChild(box);

  document.body.appendChild(container);
}
/**
 * Displaying an error 
 * @param text text that describes an error
 */
export function placeError(text: string) {
  const container = document.createElement("div");
  container.className = "error-container";
  const box = document.createElement("div");
  box.className = "error-box";
  box.innerHTML = `<p>${text}</p>`;
  const exitButton = document.createElement("button");
  exitButton.textContent = "X";
  exitButton.onclick = () => {
    document.body.removeChild(container);
  };
  box.appendChild(exitButton);
  container.appendChild(box);
  document.body.appendChild(container);
}
