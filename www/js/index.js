// создаем объект app
var app = {
    
    initialize: function() {
        //document.addEventListener('deviceready', this.onDeviceReady.bind(this));
        let btnOpenMenu = document.querySelector('#open-menu');
        btnOpenMenu.addEventListener("click", this.openMenu, false);

        let appBlock = document.querySelector('#window');
        appBlock.addEventListener("click", this.closeMenu, true);

        let settings = document.querySelector('.settingsButton');
        settings.addEventListener("click", this.closeMenu);
        settings.addEventListener("click", this.closeMain);
        settings.addEventListener("click", this.openSettings);

        let contacts = document.querySelector('.contactsButton');
        contacts.addEventListener("click", this.closeMenu);
        contacts.addEventListener("click", this.closeMain);
        contacts.addEventListener("click", this.closeSettings);
        contacts.addEventListener("click", this.openMain);

        let logout = document.querySelector('.logoutButton');
        logout.addEventListener("click", this.closeMenu);
        logout.addEventListener("click", this.closeMain);
        logout.addEventListener("click", this.closeSettings);
        logout.addEventListener("click", this.closeMain);
        logout.addEventListener("click", this.openLogin);

        this.showContacts();
    },
    //
    onDeviceReady: function() {
        this.receivedEvent('#deviceready');
    },
      
    openMenu: function() {
        //let btnOpenmenu = document.querySelector('#menu');
        menu.style.display = "block";
    },
    closeMenu: function() {
        //let app = document.querySelector('#menu');
        menu.style.display = "none";
    },
    openSettings: function() {
        //let btnOpenmenu = document.querySelector('#menu');
        settings.style.display = "block";
    },
    closeSettings: function() {
        //let btnOpenmenu = document.querySelector('#menu');
        settings.style.display = "none";
    },
    openMain: function() {
        //let btnOpenmenu = document.querySelector('#menu');
        main.style.display = "block";
    },
    closeMain: function() {
        //let app = document.querySelector('#menu');
        main.style.display = "none";
    },
    openLogin: function() {
        //let btnOpenmenu = document.querySelector('#menu');
        login.style.display = "block";
    },

    showContacts: function() {
        let ajax = new XMLHttpRequest();
        ajax.open("GET", "http://chatapi.local/index.php?page=users", false);
        ajax.send();

        //let qw = ajax.response;
        //let res = [qw];
        //console.log(JSON.parse(res));

        let response = JSON.parse(ajax.responseText);
        let users = response.users;
        console.log(users);

        let mainContactsBlock = document.querySelector("#main ul");
        mainContactsBlock.innerText = "";

        for (let i = 0; i < users.length; i = i + 1) {
            mainContactsBlock.appendChild(this.createContact(users[i]));
        }
    },

    createContact: function (user) {
        let li = document.createElement("li");
        let div = document.createElement("div");
        div.className = "avatar";
        let img = document.createElement("img");
        img.src = user.avatar;
        div.appendChild(img)

        let h2 = document.createElement("h2");
        h2.innerText = user.login;

        li.appendChild(div);
        li.appendChild(h2);
        return li;
    }

};

app.initialize();


