var SimpleEditor = {};
/*
menghapus script samapah
*/
SimpleEditor.filterJunk = function(txt){
  var str = `<div></div><!-- some comment --><p></p><!-- some comment -->`
  txt =  txt.replace(/\n/g,'');
  txt = txt.replace(/<\!--.*?-->/g, '');
  txt = txt.replace(/<style.*?style>/ig,'')
  txt = txt.replace(/<o:p.*?o:p>/ig,'')
  txt = txt.replace(/"file:\/\/\/.*?"/ig,'')
  txt = txt.replace(/class="Mso.*?"/ig,'')
  txt = txt.replace(/&[a-z]{3,5};/ig,'')
  txt = txt.replace(/<span .*?>/ig,'')
  txt = txt.replace(/<\/span>/ig,'')
  txt = txt.replace(/<[a-z]{1,3}><\/[a-z]{1,3}>/ig,'');
  $('#editor').html(txt)
}
/*
Perataan (Alignment)
*/
SimpleEditor.alignment= function(alg){
  var old = SimpleEditor.cursorTarget;
  var content = $(old).html();
  var style = old.match(/style=".*?"/);
  if(style==null){
    var upd = '<p style="text-align:'+alg+'">'+content+'</p>'
  }else{
    var align = style[0].match(/text-align:.*?;/);
    stC = align[0].split(':'); 
    if(stC[1].replace(';','') == alg){
      var upd = old.replace(new RegExp('text-align:'+alg), 'text-align:left')
    }else{
      var upd = old.replace('text-align:'+stC[1], 'text-align:'+alg+';')
    }
  }
  $('#editor').html(($('#editor').html()).replace(old,upd))
}
/*
Pengaturan bullet/numbering
*/
SimpleEditor.bullet = function(bull){
  var old = SimpleEditor.cursorTarget;
  var content = $(old).html();
  return false;
}
/*
mengambil posisi text aktif
*/
$(document).on('click','#editor', function(e){
  SimpleEditor.posX = e.clientX;
  SimpleEditor.posY = e.clientY;
  SimpleEditor.cursorTarget = e.target.outerHTML;
})
/*
penggunaan shortcut
*/
$(document).ready(function(){
    $(document).on('keyup', function(e){
        console.log(e.which)
            var alg = {
            67 : 'center',
            74 : 'justify',
            76 : 'left',
            82 : 'right',
        }
        var bullet = {
            85 : 'ul',
            79 : 'ol'
        }
        switch(e.which){
            case  67 :
            case  74 :
            case  76 :
            case  82 :
                if(e.altKey){
                    return SimpleEditor.alignment(alg[e.which]);
                }
                break;
            case 79 :
            case 85 :
                if(e.altKey){
                    return SimpleEditor.bullet(bullet[e.which]) 
                }
                break;
            case 84 :
                if(e.altKey){
                    return $('#editor').html(SimpleEditor.filterJunk($('#editor').html()));
                }
                break; 
        }
    })
})
