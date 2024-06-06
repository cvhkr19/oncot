document.querySelector(".image").addEventListener("click", () => {
  document.querySelector(".history").classList.toggle("history_close");
  document.querySelector(".main").classList.toggle("main_full");
});

const sendMessage = () => {
  const userInput = document.getElementsByTagName("textarea")[0].value;
  const chatBox = document.getElementsByClassName("ans")[0];
  chatBox.innerHTML += `<div class = "user_in"><div class = "user_profile"><img src = "abstract-user-flat-1.svg"></img>&nbsp;You</div>${userInput}</div>`
  chatBox.scrollTop = chatBox.scrollHeight;
  document.querySelector("#input").value = "";
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: userInput })
  })
    .then(response => response.json())
    .then(data => {
      chatBox.innerHTML += `<div class="bot-message"><div class = "user_profile"><img src = "cancer-ribbon.png" style = "height : 100%;"></img>&nbsp;Oncot</div>${data.message}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

document.querySelector("button").addEventListener("click", sendMessage)

document.querySelector("#input").addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    event.preventDefault();
    sendMessage();
  }
})

