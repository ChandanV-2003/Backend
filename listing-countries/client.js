window.onload = function(){
    const listHandle = document.querySelector('#list');
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://restcountries.com/v3.1/all?fields=name,capital,flags');
    xhr.send();
    xhr.onload = function(){
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        
        listHandle.innerHTML = "";
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        console.log(data);

        data.forEach((ele) => {
            const liTag = document.createElement('li');
            const imgTag = document.createElement('img');
            
            imgTag.src = ele.flags.png;
            imgTag.width = 20;
            imgTag.height =15;

            liTag.appendChild(imgTag);
            liTag.appendChild(document.createTextNode(${ele.name.common} - ${ele.capital}));

            listHandle.appendChild(liTag);
        })
    };
}