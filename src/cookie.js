var COOKIE_HTML = '<div class="cookie"></div>';


var Cookie = function(x, y){
    this._x = 0 || x;
    this._y = 0 || y;

};

Cookie.prototype.drawCookie = function(){
    $('.cookie').remove();
    $('#'+this._x+'-'+this._y).append(COOKIE_HTML);
};

Cookie.prototype.eat = function(){
    $('.cookie').remove();
};

Cookie.prototype.x = function(x){
    if(x != undefined) this._x = x;
    else return this._x;
};

Cookie.prototype.y = function(y){
    if(y != undefined) this._y = y;
    else return this._y;
};