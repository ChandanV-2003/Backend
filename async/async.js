// print 1 to 5 with 1 second delay
let count = 1;
const interval = setInterval(() => {
    console.log(count);
    count++;
    if(count > 5){
        clearInterval(interval)
    }
}, 1000);

