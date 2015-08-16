var player = '<div class="player-head"></div>';
var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var FORWARD_ARROW = 38;
var BACKWARD_ARROW = 40;

var FIELD_WIDTH = 20;
var FIELD_HEIGHT = 18;
var DIRECTION = {
    FORWARD: 0,
    BACKWARD: 1,
    LEFT: 2,
    RIGHT: 3
};

var Head = function(x, y){
    this._position = {
        x: x,
        y: y
    };
    this._fieldWidth = 10;
    this._fieldHeigth = 10;
    this._direction = DIRECTION.FORWARD;
};

Head.prototype.init = function(){

};

Head.prototype.x = function(x){
    if(x != undefined) this._position.x = x;
    else return this._position.x;
};

Head.prototype.y = function(y){
    if(y != undefined) this._position.y = y;
    else return this._position.y;
};

Head.prototype.direction = function(direction){
    if(direction != undefined)
        this._direction = direction;
    else
        return this._direction;
};

Head.prototype.fieldWidth = function(fieldWidth){
    if(fieldWidth != undefined)
        this._fieldWidth = fieldWidth;
    else
        return this._fieldWidth;
};

Head.prototype.fieldHeight = function(fieldHeight){
    if(fieldHeight != undefined)
        this._fieldHeigth = fieldHeight;
    else
        return this._fieldHeigth;
};

Head.prototype.moveForward = function(){
    var position = this._position;
    if(position.x == 0) position.x = FIELD_HEIGHT - 1;
    else position.x = position.x - 1;
};

Head.prototype.moveBackward = function(){
    var position = this._position;
    if(position.x == FIELD_HEIGHT - 1) position.x = 0;
    else position.x = position.x + 1;
};

Head.prototype.moveLeft = function(){
    var position = this._position;
    if(position.y == 0) position.y = FIELD_WIDTH - 1;
    else position.y = position.y - 1;
};

Head.prototype.moveRight = function(){
    var position = this._position;
    if(position.y == FIELD_WIDTH - 1) position.y = 0;
    else position.y = position.y + 1;
};

Head.prototype.move = function(){
    switch (this.direction()){
        case DIRECTION.LEFT:
            this.moveLeft();
            break;
        case DIRECTION.RIGHT:
            this.moveRight();
            break;
        case DIRECTION.FORWARD:
            this.moveForward();
            break;
        case DIRECTION.BACKWARD:
            this.moveBackward();
            break;
    }
};

Head.prototype.drawHead = function(){
    $('.player-head').remove();
    $('#'+this._position.x+'-'+this._position.y).append(player);
};

window.Head = Head;