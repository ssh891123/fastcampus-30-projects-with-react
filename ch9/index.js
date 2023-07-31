//import express from 'express; 동일
const express = require('express'); 
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// console.log(data);

const app = express();
app.use(express.json());

//[req]request - client가 server에 요청줄때
//[res]response - 어떻게 응답할지
// data를 가져올 때 사용
app.get('/', (req, res) => {
    // res.send("<h1>I'm get methode!!</h1>");
    res.json(data);
});

// data를 생성할 때 사용(예: user생성)
app.post('/', (req, res) => {
    console.log(req.body);
    
    const { author, message } = req.body;
    if(!(author && author.length > 0 &&
        message && message.length> 0)) {
        //응답: json에 추가되지 않음
        res.json({
            rs:false
        });
        return;
    }

    // 추가된 명언은 서버를 껏다 켜면 제거됨
    data.push({
        author: req.body.author,
        message: req.body.message
    });

    //응답: json에 추가
    res.json({
        rs: true
    })

    // res.send("<h1>I'm post methode</h1>");
});


// data를 제거할 때(db에서 제거)
app.delete('/:id', (req, res) => {
    // res.send("<h1>I'm delete methode</h1>");

    // usl path parameter를 통해 몇번째 명언을 제거할지 결정
    const { id } = req.params; //id type은 string
    if(isNaN(id)) {
        res.json({
            rs:false,
            msg:"id is not number!"
        });
        return;
    }
    const num = parseInt(id);
    if(num >= data.length || num < 0) {
        res.json({
            rs:false,
            msg:"id Index is not valid"
        });
        return;
    }

    // console.log(data[id]);
    data.splice(num, 1);

    res.json({
        rs:true
    })
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