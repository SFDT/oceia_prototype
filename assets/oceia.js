"use strict";
(function(_w, _d, $, _v){
  var cmn = { supportLocalStorage : function(){ return (_w.localStorage!=undefined); } }
  _v = (typeof _v == 'undefined')?{}:_v;
  cmn = {
    setItem : function(key,value){ if(cmn.supportLocalStorage()){_w.localStorage.setItem(key,value);return true;}return false;},
    getItem : function(key){if(cmn.supportLocalStorage()){ return _w.localStorage.getItem(key);}return null;},
    setItemObj : function(key,value){return setItem(key,JSON.stringify(value));},
    getItemObj : function(key){var o = getItem(key); if(o){o=JSON.parse(o);} return o;},
    removeItem : function(key){if(cmn.supportLocalStorage()){return _w.localStorage.removeItem(key);}return false;},
    clearStorage : function(){ if(cmn.supportLocalStorage()){return _w.localStorage.clear();}return false;},
    set : function(key,value){ _v[key] = value;},
    get : function(key){return _v[key];},
  }
  var oceia = {
    msg : {
      clear : function(){
        $('.oceia-message').remove();
      },
      display : function(m, el){
        el = el?el:$('#main-content');
        el.after('<div class="message is-reserved oceia-message"><span class="message-text">'+(m?m:'Error')+'</span></div>'); 
      }
    },
    qs : function(){
      var hide = function(){$('.question').hide(); }
      $('.question button').click(function(e){
        var el = $(this), name = el.data('name'), next = el.data('next'), value = false; 
        oceia.msg.clear();
        
        if(name){
          var selected = [], input = $('.question *[name="'+name+'"]');
          if(input.length){ 
            if(input.attr('type')=='checkbox' || input.attr('type')=='radio'){
              input.map(function(i,e){
                if($(e).is(':checked')){ 
                  value = $(e).val();
                  selected.push($(e).val())
                }}); 
            }else{
              value = input.val();
              selected.push(input.val());
            }
            if(!selected.length){
              oceia.msg.display((el.data('error')?el.data('error'):'Required'),el.closest('.question').find('div:not(.form-back)').first());
              return;
            }
          }
        }

        if(next){ 
          next = (next=='value' && value !== false)?value:next;
          if($('#'+next).length){
            hide(); $('#'+next).show(); 
          }else{
            if(next){
              _w.location.href=next;
            } 
          }
          return; 
        }
      }); 

      $('.question .form-back a').click(function(e){
        e.preventDefault(); 
        var el = $(this), back = el.data('href');
        if($('#'+back).length){
          hide(); $('#'+back).show(); 
        }
      });

    },
    ready : function(){
      oceia.qs();
    }
  }
  $(document).ready(oceia.ready);
})(window, document, jQuery);