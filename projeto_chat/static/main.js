window.onload = (event) => {
    const chatSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/chat/'
    );

    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        const list = document.getElementById("tweet-list");  // Added missing const declaration
        if (list) {
            list.innerHTML += `
            <div class="tweet">
                <span class="user">${data['user']}</span>
                <span class="timestamp">${data['date']}</span>
                <div class="content">
                    ${data['message']}
                </div>
            </div>`;
        }
    };

    chatSocket.onopen = function(event){
        console.log('client says connection opened')
    }

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

    document.querySelector('#submit').onclick = function(e) {
        const messageInputDom = document.querySelector('#your_message');
        const userInputDom = document.querySelector('#your_id');

        const message = messageInputDom.value;
        const id = userInputDom.value;
        
        chatSocket.send(JSON.stringify({
            'user':id,
            'message': message,
        }));
        
        messageInputDom.value = '';
    };

}