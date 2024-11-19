import {sendMessageToApi} from "./svc/api.js"
import {displayMessages} from "./ui/ui.js"


const form = document.getElementById("newMessage")
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    
    const textElement = document.getElementById("messageText")
    await sendMessageToApi(textElement.value);

    textElement.value = ""
    
    await displayMessages()
})

await displayMessages()