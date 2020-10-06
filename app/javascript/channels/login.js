const { param } = require("jquery");

window.addEventListener("load", function() {
    var user = document.getElementById("login-user-text");

    if(user) {
        user.addEventListener("focus", addClassLoginUserHighlight);
        user.addEventListener("blur", removeClassLoginUserHighlight);
    }
});

function addClassLoginUserHighlight() {
    document.getElementById("login-user").classList.add("login-user-border");
    document.getElementById("login-user-label").classList.add("login-user-label-float");
    document.getElementById("user-check").classList.remove("user-check-draw");
}

function removeClassLoginUserHighlight() {
    document.getElementById("login-user").classList.remove("login-user-border");

    if(document.getElementById("login-user-text").value == "") {
        document.getElementById("login-user-label").classList.remove("login-user-label-float");
    }
    else {
        checkUserExists("/login/user_exists").then(function() {
            document.getElementById("user-check").classList.add("user-check-draw");
        });
    }
}

function checkUserExists(url) {
    return new Promise(function(resolve) {
        var params = '?user='.concat(document.getElementById("login-user-text").value);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url.concat(params), true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                if(response.message == "true")
                    resolve();
            }
        };
        xhr.send();
    });
}