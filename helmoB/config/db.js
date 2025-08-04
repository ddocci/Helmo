/*
    mysql에 접근할 수 있는 연결정보를 관리하는 파일
    주의점 : mysql2 모듈 설치 필요ㅛ
    사용법 : workbench에 입력했던 연결정보를 똑같이 입력

*/
const mysql = require("mysql2");

// mysql 모듈을 통해 연결을 생성
const conn = mysql.createConnection({
    host : "192.168.1.96",
    port : 3307,
    user : "helmo12",
    password : "mo1234",
    database : "helmo_db"
});

// 작성한 연결정보를 가지고 db에 연결해
conn.connect((err)=>{
    if(err){
        console.error("DB 연결 실패" , err);
    }
    else{
        console.log("DB 연결 성공");
    }
});
console.log("db연결 완료");

module.exports = conn;
