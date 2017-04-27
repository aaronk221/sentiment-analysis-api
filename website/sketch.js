function setup() {
    
    createCanvas(400, 400);
    //drawData();
    console.log('running');
    
    var button = select('#submit');
    button.mousePressed(submitWord);
    var btnAnalyze = select('#analyze');
    btnAnalyze.mousePressed(analyzeThis);
    
}

function analyzeThis(){
    
    var txt = select('#textinput').value();
    
    var someData = {
        
        text: txt
        
    }
    
    httpPost('analyze/', someData, 'json', dataPosted, postErr);
    
}

function dataPosted(result){
    
    console.log(result);
    
}

function postErr(err){
    
    console.log(err);
    
}

function submitWord(){
    
    var word = select('#word').value();
    var score = select('#score').value();
    
    loadJSON('addWord/' + word + '/' + score, finished);
    
    function finished(data){
    
        console.log(data);
        //drawData();
    
    }
    
}
/*
function gotData(data) {
    
    console.log(data);
    background(51);
    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++){
        
        var word = keys[i];
        var score = data[word];
        var x = random(width);
        var y = random(height);
        fill(255);
        textSize(32);
        text(word, x, y);
        
    }
    console.log(keys);
  
}

function drawData(){
    
    loadJSON('/all', gotData);

}
*/