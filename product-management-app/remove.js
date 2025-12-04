function removeItem(arr, ele){
    const result = arr.indexOf(ele);
    if(result == -1){
        return 'element not found in the array'
    }
    arr.splice(result, 1);
    return arr;
}
console.log(removeItem([10, 20, 30, 40, 50], 30));

