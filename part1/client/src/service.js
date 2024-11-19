export async function postMessage(content, time) {
  const response = await fetch("http://localhost:5154/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      posted: time,
      text: content,
    }),
  });
}

export async function getMessages() {
  const responseData = await fetch("http://localhost:5154/messages");
  const json = await responseData.json();
  return json;
}
