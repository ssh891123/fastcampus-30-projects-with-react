//import express from 'express; 동일
const express = require('express'); 

const app = express();

//[req]request - client가 server에 요청줄때
//[res]response - 어떻게 응답할지
// data를 가져올 때 사용
app.get('/', (req, res) => {
    res.send("<h1>I'm get methode!!</h1>");
});

// data를 생성할 때 사용(예: user생성)
app.post('/', (req, res) => {
    res.send("<h1>I'm post methode</h1>");
});


// data를 제거할 때(db에서 제거)
app.delete('/', (req, res) => {
    res.send("<h1>I'm delete methode</h1>");
});


// data를 일괄 변경할 때
app.put('/', (req, res) => {
    res.send("<h1>I'm put methode</h1>");
});

//patch 도 있음
//data를 일 부분만 수정할 때
//patch보다 push를 일반적으로 사용됨 => 프로그램에서 구현하기에 용이함

app.listen(3000, () => {
    console.log('start server!');
});