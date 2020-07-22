function toggle(){
    var post = event.target.parentNode; //discussion-content div
    var postRepliesSection = post.getElementsByClassName("all-replies")[0];
    
    let hidden = postRepliesSection.classList.contains("hidden");

    if(hidden){
        postRepliesSection.classList.remove("hidden");
    } else postRepliesSection.classList.add("hidden");
}


function checkEmpty() {  // function for all-messages-profile.hbs
    if(document.getElementById("message-area").value.length == 0) {
        document.getElementById("submit-btn").disabled = true;
    } else {
        document.getElementById("submit-btn").disabled = false;
    }
}

function init() {
    document.getElementById("submit-btn").disabled = true;
}

// window.onload=init; 


// Format Date/Time
var convoDate = document.getElementsByClassName("convo-date");
var postDate = document.getElementsByClassName("post-date");
var messageDate = document.getElementsByClassName("message-date");
var messageTime = document.getElementsByClassName("message-time");
var editDOB = document.getElementsByClassName("edit-DOB");
var convoOption = {month: 'short', day: '2-digit'};
var postOptionMonth = {month: 'short'};
var messageOptionTime = {hour: 'numeric', minute: '2-digit'};
var i;

// Date format in conversation-partial.hbs
for (i = 0; i < convoDate.length; i++) {
    var d = new Date(convoDate[i].textContent);
    convoDate[i].textContent = d.toLocaleDateString("en-US", convoOption);
}

// Date format in post-partial.hbs
for (i = 0; i < postDate.length; i++) {
    var d = new Date(postDate[i].textContent);
    postDate[i].textContent = d.getDate() + " " + d.toLocaleDateString("en-US", postOptionMonth) + " " + d.getFullYear();
}

// Date and time formats in message-partial.hbs
for (i = 0; i < messageDate.length; i++) {
    var d = new Date(messageDate[i].textContent);
    messageDate[i].textContent = d.toLocaleDateString("en-US", convoOption).toUpperCase();
    messageTime[i].textContent = d.toLocaleTimeString("en-US", messageOptionTime);
}

// Date format in edit-profile.hbs
for (i = 0; i < editDOB.length; i++) {
    var d = new Date(editDOB[i].value);
    editDOB[i].value = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
}