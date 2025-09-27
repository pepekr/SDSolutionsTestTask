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
