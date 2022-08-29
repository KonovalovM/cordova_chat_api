// создаем объект app
let messages = {
    
    initialize: function() {
        let formBlock = document.querySelector("#send-form");
        formBlock.addEventListener("submit", this.sendMessage.bind(this), false);

        let photoBtn = document.querySelector("#photo");
        photoBtn.addEventListener('click', function (){
           navigator.camera.getPicture(onSuccess, onFail, { quality:100, destinationType: Camera.DestinationType.FILE_URI });
           function onSuccess(imageURI) {
               let image = document.getElementById('#myImage');
               image.src = imageURI;
           }
           function onFail(message){
               alert("Error");
           }
        });
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
    },

    sendMessage: function (e) {
        e.preventDefault();

        let user_id_1 = document.querySelector("#send-form input[name='user_id_1']").value;
        let user_id_2 = document.querySelector("#send-form input[name='user_id_2']").value;
        let file = document.querySelector("#send-form input[name='file']").files[0];
        let content = document.querySelector("#send-form textarea").value;

        let data = new FormData();
        data.append('file', file);
        data.append('user_id_1', user_id_1);
        data.append('user_id_2', user_id_2);
        data.append('content', content);

        let ajax = new XMLHttpRequest();
        ajax.open("POST", "http://chatapi.local/api/messages.php?page=send", false);
        ajax.send(data)
        console.dir(ajax);
    }

};

messages.initialize();


