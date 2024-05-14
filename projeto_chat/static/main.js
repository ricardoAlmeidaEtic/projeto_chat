window.onload = (event) => {
    scrollToBottom();

    const chatSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/chat/'
    );

    chatSocket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        console.log("data: " + JSON.stringify(data)); // Check the structure of the received data
        
        const list = document.getElementById("tweet-list");
        if (list) {
            let postHTML = `
            <div class="tweet">
                <span class="user">${data['user']}</span>
                <span class="timestamp">${data['date']}</span>
                <div class="content">
                    ${data['message']}
                </div>`;
            if (data['image'] !== "") {
                postHTML += `<img src="/projeto_chat/static/${data['image']}" style="max-width: 100%;">`;
            }
            postHTML += `
                <i id="like" class="fa fa-heart fa-outline" style="font-size:30px;margin-top: 40px;margin-right: 10px;"></i>
                <small id="likenumber" style="font-size:15px;color:black;">0 likes</small>
            </div>`;
    
            list.innerHTML += postHTML;
        }
    });

    chatSocket.addEventListener("like", (event) => {
        const data = JSON.parse(event.data);
        console.log("data: " + JSON.stringify(data)); // Check the structure of the received data
        
        const tweet = document.getElementById(`tweet-${data['id']}`);
        tweet.getElementById('likenumber').text = `${data['likes']} likes`;
    });

    // Connection opened
    chatSocket.addEventListener("open", (event) => {
        console.log('client says connection opened')
    });

    // Connection closed
    chatSocket.addEventListener("close", (event) => {
        console.log('client says connection closed')
    });

    if(document.getElementById('submitMessage')){
        document.getElementById('submitMessage').onclick = (e) => {
            e.preventDefault();
            const messageInputDom = document.querySelector('#your_message');
            const imageInputDom = document.querySelector('#your_image');
        
            let imageFile = null;
            let imageName = null;
            let message = null;
        
            if (messageInputDom.value.trim() !== '') {
                message = messageInputDom.value.trim();
            } else {
                console.warn("Message box needs to contain text to send a message, please write something...");
                return;
            }
            
            if (imageInputDom.files.length > 0) {
                imageFile = imageInputDom.files[0];
                imageName = imageInputDom.files[0].name;
                
                const reader = new FileReader();
                reader.onload = () => {
                    const imageData = reader.result.split(',')[1];
                    chatSocket.send(JSON.stringify({
                        'message': message,
                        'imageData': imageData,
                        'imageName': imageName
                    }));
                };
                reader.readAsDataURL(imageFile);
            } else {
                // Send message without image
                chatSocket.send(JSON.stringify({
                    'message': message
                }));
            }
        
            messageInputDom.value = '';
            imageInputDom.value = '';
        };
    }

}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}