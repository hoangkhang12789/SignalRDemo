var signalR = new SignalRService("https://localhost:7079/", "render");
//signalR.start();
signalR.startWithGroup("JoinGroup", "Khang")
const car = { type: "Fiat", model: "500", color: "white" };
signalR.on("Send", function x(obj) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    console.log(obj + " mes")

    li.textContent = `say: ${obj} `;
})
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    signalR.sendToGroup("Send", "Khang", JSON.stringify(car));
});
