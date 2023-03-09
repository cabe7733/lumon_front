function salaChat(str) {
    let arr = str.split('');
    let result = arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    });
    let finalStr = result.join("").toLowerCase() == "hola" ? 'VERDADERO' : "Falso";
    console.log(finalStr);
}