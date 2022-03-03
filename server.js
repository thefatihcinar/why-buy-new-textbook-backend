console.log("dandik bir tane appdi");

const express = require('express');

const app = express(); 

function fatihProcessor(request, response){
    response.send("<h1>fatih </h1>");
}

function ikinciElKitaplar(request, response){
    response.send("25");
}

let ikinciElKitaplarDizisi = []
ikinciElKitaplarDizisi.push({
  "id": "1",
  "name": "Operating System Lecture Notes",
  "university": "Ankara University"
});

function kitaplariGetirenFonksiyon(request, response){
    let kitap = ikinciElKitaplarDizisi[0];
    kitap.hoca = "özgür hoca";

    // ödeme aldın
    // mail atar 

    response.send("siparis alındı");
}


app.get("/fatih", fatihProcessor);

app.get("/ikinci-el-kitaplar", kitaplariGetirenFonksiyon);


app.listen(5005);