//import express from 'express; 동일
const express = require('express'); 
const fs = require('fs');
const cors = require('cors');

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// console.log(data);

const app = express();
app.use(express.json());
app.use(cors()); //cors 에러 해결

//[req]request - client가 server에 요청줄때
//[res]response - 어떻게 응답할지
// data를 가져올 때 사용
app.get('/', (req, res) => {
    // res.send("<h1>I'm get methode!!</h1>");

    //url에 ? 를 붙이면 됨
    //예: localhost:3000?author=익명
    //예: localhost:3000?author=에머슨&message=엄선된
    const { author, message } = req.query; 
    console.log(author, message);

    // method - 1
    // let _data = data;
    // if(author) {
    //     _data = _data.filter(value => author ? value.author.includes(author) : false);
    // }
    // if(message) {
    //     _data = _data.filter(value => value.message.includes(message));
    // }
    //res.json(_data);

    // method - 2
    res.json( data
        .filter(value => author ? value.author.includes(author) : true)
        .filter(value => message ? value.message.includes(message) : true) ); 
});

app.get('/random', (req, res) => {
    const rand = Math.floor(Math.random() * data.length);
    console.log('random:'+rand);
    res.json(data[rand]);
});

app.get('/:id', (req, res) => {
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

    res.json(data[num]);
});

// data를 생성할 때 사용(예: user생성)
app.post('/', (req, res) => {
    console.log(req.body);
    
    const { author, message } = req.body;
    if(!(author && author.length > 0 &&
        message && message.length> 0)) {
        //응답: json에 추가되지 않음
        res.json({ rs:false, msg:"author, message undefined" });
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
app.put('/:id', (req, res) => {
    // res.send("<h1>I'm put methode</h1>");

    //id 검증
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

    const { author, message } = req.body;
    if(!(author && author.length > 0 &&
        message && message.length > 0)) {
        res.json({ rs:false });
        return;
    }

    console.log('변경 전:'+JSON.stringify(data[num]));
    // 명언을 변경
    data[num] = {
        author: req.body.author,
        message: req.body.message
    };
    console.log('변경 후:'+JSON.stringify(data[num]));

    res.json({ rs: true });
});

//patch 도 있음
//data를 일 부분만 수정할 때
//patch보다 push를 일반적으로 사용됨 => 프로그램에서 구현하기에 용이함

app.listen(3000, () => {
    console.log('start server!');
});