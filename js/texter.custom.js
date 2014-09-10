/*
    jQuery Text Messaging Prototype
    Author: Brenton Reid
    Date: 09.02.2014
*/

Texter = window.Texter || {};
(function($, Texter) {
    
    Texter.Helpers = {
        timeFormatMilitarytoAMPM: function(date) {
            var
                    hours = date.getHours() > 12 ? (date.getHours() % 12) : date.getHours(),
                    minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
                    f = date.getHours() >= 12 ? 'pm' : 'am';

            return hours + (minutes ? (':' + minutes) : false) + f;
        }
    }


    Texter.MessagingController = {
        nowFormatted : Texter.Helpers.timeFormatMilitarytoAMPM(new Date),
        lastTimeStamp : false,
        init: function() {
            var _this = this;
            $(function () {
                _this.bindEvents();    
            });
        },
        bindEvents: function() {
            var _this = this,
                html = '';
            
            $('#text-send-result').click(function () {
                    var     mode        = $('input[name=mode]:checked').val(),
                            msg_content = $('#msg-content').val(),
                            html        = '';
                  
                    if (_this.lastTimeStamp !== _this.nowFormatted) {
                        html += _this.renderHtml('', 'timestamp');
                        _this.lastTimeStamp = _this.nowFormatted;    
                    }
                    
                    html += _this.renderHtml(msg_content, mode);
                    _this.injectHTML(html);      
            });
            $('#text-photo-upload').click(function () {
                    var     html        = '',
                            mode        = $('input[name=mode]:checked').val();
                    
                    html = _this.renderImageHTML(mode);
                    _this.injectHTML(html);
            });
            
            $('#msg-content').keypress(function(e) {
                if(e.which == 13) {
                    $('#text-send-result').click();
                }
            });
        },
        renderHtml: function (msg, mode) {
            var     html = '',
                    classes = [],
                    that = this;
            
            
            
            classes[classes.length] = 'bubble';
            
            switch (mode) {
                /*case 'green':
                    classes[classes.length] = 'green';
                    break;*/
                case 'sender':
                    classes[classes.length] = 'blue';
                    break;
                case 'timestamp':
                    html += '<div class="msg-timestamp example-msg" id="example-msg">';
                    html += '<div class="content"><p><span>Today</span> ' + that.nowFormatted;
                    html += '</p></div><div class="sep"></div></div>';
                    break;
                case 'reciever':
                    classes[classes.length] = 'bubble-alt';
                    classes[classes.length] = 'white';
                    break;
            }
            
            if (mode !== 'timestamp') {
                html += '<div class="' + classes.join(' ') + '" style="width:' + that.getWidth(msg) + ';">';
                html += '<p>';
                html += msg;              
                html += '</p>';
                html += '</div>';
            }
            return html;
        },
        renderImageHTML: function (mode) {
            var     html    =   '';
            
            switch (mode) {
                case 'sender':
                    html += '<div class="msg-img bubble example-msg"><div class="top-left-border img-borders"></div>';
                    html +=     '<div class="top-right-border img-borders"></div><div class="bottom-left-border img-borders"></div>';
                    html +=     '<div class="bottom-right-border img-borders"></div>';
                    html +=     '<img src="img/img.jpg" />'; //image source goes here
                    html += '</div>';
                
                    break;
                case 'reciever':
                    html += '<div class="msg-img bubble bubble-alt white example-msg"><div class="top-left-border img-borders"></div>';
                    html +=     '<div class="top-right-border img-borders"></div><div class="bottom-left-border img-borders"></div>';
                    html +=     '<div class="bottom-right-border img-borders"></div>';
                    html +=     '<img src="img/img.jpg" />'; //image source goes here
                    html += '</div>';
                
                    break;
            }
            
             
            
            return html;
        },
        injectHTML: function (html) {
            this.nowFormatted = Texter.Helpers.timeFormatMilitarytoAMPM(new Date);
            return $('#msgs').append(html);
        },
        getWidth: function (msg) {
            var     _this = this,
                    winWidth = $(window).width();
            
            if (msg.length < 20) {
                return winWidth / 5;
            } else if (msg.length > 19 && msg.length < 50) {
                return winWidth / 3;
            } else if (msg.length > 49 && msg.length < 100) {
                return winWidth / 2;
            } else {
                return winWidth / 1.5;
            }
        }
    };

    Texter.MessagingController.init();

}(window.jQuery, window.Texter));
