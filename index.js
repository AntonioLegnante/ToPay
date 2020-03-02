const express = require('express');
const path = require('path');

const sqlite3 = require('sqlite3');
const app = express();
const bodyParser = require('body-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));

const db = new sqlite3.Database("Pay.db", function(err){
    app.listen(3000);
});




app.get("/", function(req,res) 
{
    const sql = "SELECT * FROM ToPay";
    db.all(sql, function(err,rows){
        console.log(rows);
        res.render("index", {topays: rows
        });
    });

    
});

app.post("/aggiungi", function(req,res){
    console.log(req.body);
    const pay = req.body.pay;
    const sql = "INSERT INTO ToPay (pay) values (?);";
    db.run(sql, [pay], function(){
        res.redirect("/");
    });

});

app.post("/toggle", function(req,res){
    console.log(req.body);
    const id = req.body.id;
    const sql = "UPDATE ToPay SET done = 1 - done WHERE id_Prova = ?;"
    db.run(sql, [id], function(){
        res.redirect("/");
    });

});

app.post("/elimina", function(req,res){
    const sql = "DELETE FROM ToPay WHERE done = 1;";
    db.run(sql, function(){
        res.redirect("/");

    });
});

app.post("/aggiungiquantita", function(req,res){
    const id = req.body.id;
    const sql = "UPDATE ToPay SET quantita = quantita + 1 WHERE id_Prova = ?;";
    db.run(sql, [id], function(){
        res.redirect("/");
    });
});

app.post("/rimuoviquantita", function(req,res){
    const id = req.body.id;
    const sql ="UPDATE ToPay Set quantita = quantita - 1 WHERE id_Prova = ?;";
    db.run(sql, [id], function(){
        res.redirect("/");
    });
});

app.get("/modifica/:id", function(req,res){
    const id = req.params.id;
    sql = "Select * FROM ToPay WHERE id_Prova = ?;";
    db.all(sql, [id], function(err,rows){
    console.log(rows);
    const ToPay = rows[0];
    res.render("modifica", {topay: ToPay});
    });
});

app.post("/modifica" ,function(req,res){
   console.log(req.body);
   const sql = "UPDATE ToPay SET pay = ? where id_Prova = ?;";
   db.run(sql, [req.body.pay, req.body.id], function(){
       console.log(this);
       res.redirect("/");
   });
});

app.use( function(req,res) 
{
    res.sendFile(path.join (__dirname, "public" , "404.html"));
});

