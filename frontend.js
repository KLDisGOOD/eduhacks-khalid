const socket = new WebSocket("ws://localhost:6060");

const term = new Terminal({
    rows: 16,
    cols: 55, 
    fontSize: 7,
        
        theme: {
            background: "black",
            foreground: "#A688AB",
            cursorstyle: 'underline',
        }
});
term.open(document.getElementById('terminal'));

function init() {
    if (term._initialized) {
        return;
    }

    term._initialized = true;

    term.prompt = () => {
        term.write('\r\n$ ');
    };
    prompt(term);

    term.onData(e => {
        switch (e) {
            case '\u0003': // Ctrl+C
                term.write('^C');
                prompt(term);
                break;
            case '\r': // Enter
                runCommand(term, command);
                command = '';
                break;
            case '\u007F': // Backspace (DEL)
                
                if (term._core.buffer.x > 2) {
                    term.write('\b \b');
                    if (command.length > 0) {
                        command = command.substr(0, command.length - 1);
                    }
                }
                break;
            case '\u0009':
                console.log('tabbed', output, ["dd", "ls"]);
                break;
            default:
                if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
                    command += e;
                    term.write(e);
                }
        }
    });
}




function pastecommand(pastedcomnd) {
    var index = 0;

    function typeNextCharacter() {
        if (index < pastedcomnd.length) {
            term.write(pastedcomnd.charAt(index));
            command += pastedcomnd.charAt(index);
            index++;
            setTimeout(typeNextCharacter, 50);
        } 
    }

    typeNextCharacter();
}





function clearInput(command) {
    var inputLengh = command.length;
    for (var i = 0; i < inputLengh; i++) {
        term.write('\b \b');
    }
}
function prompt(term) {
    command = '';
    term.write('\r\n$ ');
}


let storedOutput = ''; // initialize to store the output

socket.onmessage = (event) => {
    const newData = event.data; 
    storedOutput += newData; 
    term.write(newData); 
};
function runCommand(term, command) {
    if (command.length > 0) {
        clearInput(command);
        socket.send(command + '\n');
        return;
    }
}




const sendBtn = document.querySelector('.sendbutton');
const chatBody = document.querySelector('.chatbox');
const msgTxt = document.querySelector('#mytextarea');
let reply = 0






const replies = [


 'Hello, I am Vuba, your virtual assistant. How can I help you?',
 'I can help you with the following:',
 '1. I can help you with your account related queries.',
]

function typingDots() {
 return `
     <div class="typing">
         <span class="circle scaling"></span>
         <span class="circle bouncing"></span>
         <span class="circle scaling"></span>
     </div>
     
 `;
}

function chatReply(message) {
    let newMsg = document.createElement('div');
    newMsg.setAttribute('class', 'chat-wrapper');
  
    let vubapfpDiv = document.createElement('div');
    vubapfpDiv.setAttribute('class', 'vubapfp');
    let vubapfpImg = document.createElement('img');
    vubapfpImg.setAttribute('src', 'images/V.svg');
    vubapfpImg.setAttribute('class', 'vubapfpimg');
    vubapfpDiv.appendChild(vubapfpImg);
    newMsg.appendChild(vubapfpDiv);
  
    let chatReplySpan = document.createElement('span');
    chatReplySpan.setAttribute('class', 'chat-reply');
    chatReplySpan.innerHTML = typingDots();
    newMsg.appendChild(chatReplySpan);
  
    chatBody.appendChild(newMsg);
  
    let typing = newMsg.querySelector('.typing');
    setTimeout(() => {
      typing.classList.add('hidden');
    }, 100);
  
    setTimeout(() => {
      let chatReply = newMsg.querySelector('.chat-reply');
      chatReply.innerHTML = `<label>${message}</label>`;
      chatBody.scrollTop = chatBody.scrollHeight;
      typing.innerHTML = ''; 
    }, 100);
  }
  
  
function chatSent(message) {
 let d = new Date();

 let newMsg = document.createElement('div');
 newMsg.setAttribute('class', 'chat-wrapper-sent');
 
 newMsg.style.wordwrap = 'break-word'; 
 newMsg.innerHTML = `
 <div class="userpfp"><img src="images/User.svg" class="userpfpimg"></div>
 <span class="chat-sent">
 ${message}
 </span>
 `;
 document.getElementById('greettext').hidden = true;
 document.getElementById('firstvuba').hidden = true;
 
 chatBody.appendChild(newMsg);


}


function clearconvo() {

    location.reload()
}

function sendB() {
if(msgTxt.value == '') {
 msgTxt.focus();
 return;
}



var userInputValue = document.getElementById('mytextarea').value;
   
               // Define the JSON data to be sent in the POST request
               var postData = {
                   user_input: userInputValue
               };
   
             
               var serverAddress = 'https:vuba.pythonanywhere.com'
                                            
               fetch(serverAddress + '/send', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(postData),
                   mode: 'cors',
               })
               
               .then(response => response.json())
               .then(data => {
                   // Display the server response in the 'response' div
                   var firstResponse = data.first_response;
                   var command = data.command;
                 
    

    

chatSent(msgTxt.value);
chatReply(firstResponse);


chatBody.scrollTo = chatBody.scrollHeight;
msgTxt.value = '';
msgTxt.focus();
console.log('Command received:', command);

pastecommand(command)


               }
                
           ) }

msgTxt.addEventListener('keyup', function(e) {
 if(e.keyCode === 13) {
     sendBtn.click();
 }
});


 function uncheckCheckbox() {
     let checkbox = document.getElementById('menuignore');
     checkbox.checked = false;
       }
   
   
init();




