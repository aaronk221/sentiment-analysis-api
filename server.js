var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');

console.log('server is starting...');

var data = fs.readFileSync('words.json');
var afinnData = fs.readFileSync('afinn.json');
var words = JSON.parse(data);
var afinn = JSON.parse(afinnData);

var app = express();

var server = app.listen(8080, listening);

app.use(express.static('website'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/addWord/:word/:score?', addWord);

app.get('/search/:word', searchWord);

app.get('/all', sendAll);

app.post('/analyze', analyzeThis);

function analyzeThis(req, res){
    
    console.log(req.body);
    
    var reply = {
        
        msg: 'thank you'
        
    };
    
    res.send(reply);
    
}

function listening(){
    
    console.log('listening. . . ');
    
}

function addWord(req, res){
    
    var data = req.params;
    var word = data.word;
    var score = Number(data.score);
    if(!score){
        
        var reply = { msg: 'Score is required' };
        
    }
    else{
    
    words[word] = score;
    
    var reply = { word: word, score: score, status: 'success' };
    
    fs.writeFile('words.json', JSON.stringify(words), function(err){
        
        if(err) throw err;
        
    });
    
    }
    
    res.send(reply);
    
}

function searchWord(req, res){
    
    var word = req.params.word;
    
    var reply;
    
    if(words[word]) {
        
        reply = {
            
            status: 'found',
            word: word,
            score: words[word]
        
        };
        
    }
    else {
        
        reply = {
            
            status: 'not found',
            word: word
            
        };
        
    }
    
    res.send(reply);
    
}

function sendAll(req, res){
    
    var data = {
        
        additional: words,
        afinn: afinn
        
    }
    res.send(data);
    
}