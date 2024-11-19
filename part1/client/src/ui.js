import { postMessage } from "./service.js";
import { getMessages } from "./service.js";

const messageAnchorNode = document.getElementById("commentContainer");

function addEventListeners() {
  const formNode = document.getElementById("commentForm");
  const inputNode = document.getElementById("commentContent");
  const submitNode = document.getElementById("submitButton");

  formNode.addEventListener("submit", async (e) => {
    e.preventDefault();

    const content = inputNode.value;
    const time = new Date();

    await postMessage(content, time);
    renderComments();
  });
}

async function renderComments() {
  const messageList = await getMessages();
  const messageListNode = document.createElement("div");

  messageList.forEach((message) => {
    const commentNode = document.createElement("article");
    commentNode.textContent = message.posted + " " + message.text;
    messageListNode.appendChild(commentNode);
  });

  messageAnchorNode.replaceChildren(messageListNode);
}

addEventListeners();
renderComments();
