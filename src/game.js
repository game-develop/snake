var FIELD_WIDTH = 20;
var FIELD_HEIGHT = 18;
var Game = function(fps, debugMode){
    this._fps = fps;
    this._head = new Head(parseInt(FIELD_HEIGHT/2), parseInt(FIELD_WIDTH/2));
    this._gameRun = true;
    this._debugMode = debugMode;
    this._fieldWidth = FIELD_WIDTH;
    this._fieldHeigth = FIELD_HEIGHT;
    this.addCookie();
};

Game.prototype.init = function(){
    var html = '<table>';
    for(var i = 0; i < this._fieldHeigth; ++i){
        html += '<tr>';
        for(var j = 0; j < this._fieldWidth; ++j){
            html += '<td id="' + i + '-' + j + '"></td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    $('body').append(html);
    this._head.fieldHeight(this._fieldHeigth);
    this._head.fieldWidth(this._fieldWidth);
    this._head.init();
    this.initArrowListeners();
    if(this._debugMode){
        $('table, th, td').css('border', '1px solid black');
    }
};

Game.prototype.fps = function(fps){
    if(fps != undefined)
        this._fps = fps;
    else
        return this._fps;
};

Game.prototype.initArrowListeners = function(){
    var head = this._head;
    $(document).keypress(function(e){
        var code = e.keyCode || e.which;
        if(code < 37 || code > 40){
            e.preventDefault();
            return false;
        }
        switch (code){
            case LEFT_ARROW:
                head.direction(DIRECTION.LEFT);
                break;
            case RIGHT_ARROW:
                head.direction(DIRECTION.RIGHT);
                break;
            case FORWARD_ARROW:
                head.direction(DIRECTION.FORWARD);
                break;
            case BACKWARD_ARROW:
                head.direction(DIRECTION.BACKWARD);
                break;
        }
    });
};

Game.prototype.fieldWidth = function(fieldWidth){
    if(fieldWidth != undefined) {
        this._fieldWidth = fieldWidth;
        this._head.fieldWidth(fieldWidth);
    } else {
        return this._fieldWidth;
    }
};

Game.prototype.fieldHeight = function(fieldHeight){
    if(fieldHeight != undefined) {
        this._fieldHeigth = fieldHeight;
        this._head.fieldHeight(fieldHeight);
    } else {
        return this._fieldHeigth;
    }
};

Game.prototype.gameRun = function(){
    return this._gameRun;
};

Game.prototype.stopGame = function(){
    this._gameRun = false;
};

Game.prototype.draw = function() {
    this._cookie.drawCookie();
    this._head.drawHead();
};

Game.prototype.update = function() {
    if(this._head.x() == this._cookie.x() && this._head.y() == this._cookie.y()){
        this._cookie.eat();
        this.addCookie();
    }
    this._head.move();
};

Game.prototype.run = function() {
    var self = this;
    var interval = setInterval(function() {
        self.update();
        self.draw();
        if(!self.gameRun()){
            clearInterval(interval);
        }
    }, 1000 / self.fps());
};

Game.prototype.addCookie = function(){
    var position = this.randomPositionForCookie();
    this._cookie = new Cookie(position.x, position.y);
};

Game.prototype.randomPositionForCookie = function(){
    return {
        x: Math.floor(Math.random() * (this._fieldHeigth + 1)),
        y: Math.floor(Math.random() * (this._fieldWidth + 1))
    };
};

