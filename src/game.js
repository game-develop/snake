var FIELD_WIDTH = 20;
var FIELD_HEIGHT = 18;
var Game = function(fps, position){
    this._fps = fps;
    this._head = new Head(parseInt(FIELD_HEIGHT/2), parseInt(FIELD_WIDTH/2));
};

Game.prototype.init = function(){
    var html = '<table>';
    for(var i = 0; i < FIELD_HEIGHT; ++i){
        html += '<tr>';
        for(var j = 0; j < FIELD_WIDTH; ++j){
            html += '<td id="' + i + '-' + j + '"></td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    $('body').append(html);
    this._head.fieldHeight(FIELD_HEIGHT);
    this._head.fieldWidth(FIELD_WIDTH);
    this.initArrowListeners();
    this._head.init();
};

Game.prototype.fps = function(fps){
    if(fps != undefined)
        this._fps = fps;
    else
        return this._fps;
};

Game.prototype.draw = function() {
    this._head.drawHead();
};

Game.prototype.update = function() {
    this._head.move();
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

Game.prototype.run = function() {
    var self = this;
    setInterval(function() {
        self.update();
        self.draw();
    }, 1000 / this.fps());
};