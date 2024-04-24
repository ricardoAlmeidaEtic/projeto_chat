window.onload = (event) => {
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
            list.innerHTML += `
            <div class="tweet">
                <span class="user">${data['user']}</span>
                <span class="timestamp">${data['date']}</span>
                <div class="content">
                    ${data['message']}
                </div>`
                if (data['image'] !== "") {
                    list.innerHTML += `<img src="/projeto_chat/static/${data['image']} " style="max-width: 100%;">`
                }
            list.innerHTML += `</div>`;
        }
    });

    // Connection opened
    chatSocket.addEventListener("open", (event) => {
        console.log('client says connection opened')
    });

    // Connection closed
    chatSocket.addEventListener("close", (event) => {
        console.log('client says connection closed')
    });

    document.getElementById('submitMessage').onclick = (e) => {
        e.preventDefault();
        const messageInputDom = document.querySelector('#your_message');
        const message = messageInputDom.value;
        const imageInputDom = document.querySelector('#your_image');
        const imageFile = imageInputDom.files[0];
        const imageName = imageInputDom.files[0].name;
        
        const reader = new FileReader();
        reader.onload = () => {
            const imageData = reader.result.split(',')[1];
            chatSocket.send(JSON.stringify({
                'message': message,
                'imageData': imageData,
                'imageName':imageName
            }));
        };
        reader.readAsDataURL(imageFile);
        
        messageInputDom.value = '';
    };

}