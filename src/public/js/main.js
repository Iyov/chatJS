$(function(){
    const socket = io();
    
    //Obteniendo los elementos del DOM
    const messageForm = $('#message-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    //Obteniendo los elementos del nickNameForm
    const nickForm = $('#nickForm');
    const nickError = $('#nickError');
    const nickname = $('#nickname');
    const users = $('#usernames');

    nickForm.submit( e => {
        e.preventDefault();
        socket.emit('new user', nickname.val(), data => {
            if(data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
            } else {
                nickError.html(
                    "<div class='alert alert-danger'>"+
                    "El username ya existe."+
                    "</div>"
                );
            }
            nickname.val('');
        });
    });

    //events
    messageForm.submit( e => {
        e.preventDefault();
        socket.emit('send message', messageBox.val(), data => {
            chat.append("<p class='error'>"+data+"</p>");
        });
        messageBox.val('');
    });

    //Recibe los datos del "new message" y los apendiza en el chat
    socket.on('new message', function(data) {
        chat.append('<b>' + data.nick + '</b>: '+data.msg+'<br/>');
    });

    socket.on('usernames', data => {
        let html = '';
        for(i=0; i < data.length; i++) {
            html += '<p><i class="fas fa-user" /> '+data[i]+'</p>';
        }
        users.html(html);
    });

    socket.on('whisper', data => {
        
    });

    socket.on('load old msgs', msgs => {
        for (let i=0; i < msgs.length; i++) {
            displayMsg(msgs[i]);
        }
    });

    function displayMsg(data) {
        chat.append('<p class="whisper"><b>'+data.nick+':</b> '+data.msg+'</p>');
    }

});
