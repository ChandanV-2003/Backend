// function handleClick(){  // eventListener / eventHandler

window.onload = function(){    // category of events, other events are keyboard event, mouse event, form event
            // traditional - xhr obj
                // const countHandle = document.getElementById('count');
                const countHandle = document.querySelector('#count');
                // const listHandle = document.getElementById('list');
                const listHandle = document.querySelector('#list');
                
                listHandle.innerHTML = "";  // clean up code 
                
                const xhr = new XMLHttpRequest(); //creat new object
                xhr.open("GET", "http://localhost:3050/employees"); //configure xhr obj
                xhr.send(); //make a request to the server
                
                xhr.onload = function(){  //function gets called once the response has been recived from the server
                    const data = JSON.parse(xhr.responseText);  //parse the data
                    console.log(data);  //data in json format i.e string object
                    countHandle.textContent = data.length;
                    data.forEach(function(ele){
                        const liTag = document.createElement('li');
                        liTag.textContent = ele.name;
                        listHandle.appendChild(liTag);
                    })
                    };
}