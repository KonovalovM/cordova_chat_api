// создаем объект app
let messages = {
    
    initialize: function() {
console.log("mess")
    },
    showMessages: function() {
        let user = this;
        let ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://chatapi.local/api/messages.php?page=get&user_id_1=1&user_id_2=' + user.id, false);
        ajax.send();

        let result = JSON.parse(ajax.response).messages;
        console.dir(result);
        let userListBlock = document.querySelector("#main");
        userListBlock.style.display = "none";

        let chatBlock = document.querySelector("#chat");
        chatBlock.style.display = "block";

        let messageBlock = document.querySelector("#chat .messages ul");
        messageBlock.innerText = "";
        for(let i = 0; i < result.length; i++) {
            messages.createMessage(result[i]);
        }
    },

    createMessage: function (message) {
        let li = document.createElement("li");
        li.className = message.from_user == "me" ? "left" : "right";

        let span = document.createElement("span");
        span.innerText = message.content;
        span.className = "clearfif";

        li.appendChild(span);

        let messageBlock = document.querySelector("#chat .messages ul");
        messageBlock.appendChild(li);
    }

};

messages.initialize();


