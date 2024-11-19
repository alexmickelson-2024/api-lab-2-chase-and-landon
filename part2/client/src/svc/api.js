const apiAddress = "http://localhost:5159";

export const sendMessageToApi = async (messageText, parentId) => {
  const parent = parentId ?? null;
  const body = {
    id: Date.now(), // unique id as a long data type
    text: messageText,
    parentId: parent, // same data type as id
  };
  await fetch(`${apiAddress}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const getMessagesFromApi = async () => {
  const response = await fetch(`${apiAddress}/messages`, {
    method: "GET",
  });
  return response.json();
};
