
const srart_pos = 90.75;
const item_count = 13;
const s = 0.52 * Math.PI / 180; //Ð’Ñ‹Ñ‡Ð¸ÑÐ»Ð¸Ð¼ ÑƒÐ³Ð¾Ð» ÑÐ¼ÐµÑ‰ÐµÐ½Ð¸Ñ

var pos = [];
var elem = document.getElementsByClassName('item');
 

function allocationItems() {
  var i;
  var pp = elem[6].getElementsByTagName('a')[0].getAttribute('data-img'); 
  document.getElementById("pic").style.backgroundImage = "url('"+pp+"')"; 
  document.getElementById("pic").className = "img-box";
  pos[0] = srart_pos;
  for (i = 1; i < item_count; i++) {
    pos[i] = pos[i - 1] - 0.2;
    last_pos=pos[i];
  }
  for (i = 0; i < item_count+1; i++) {
    if(elem[i] != undefined){
       elem[i].style.left = 240 + 250 * Math.sin(pos[i]) + 'px';
       elem[i].style.top = 240 + 250 * Math.cos(pos[i]) + 'px'; 
    }
    
  }
}  

allocationItems();

function animation(args, flag) { // Ð½ÐµÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ðµ Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚Ñ‹ Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»Ð¸Ð¼ Ð½Ð° Ð±ÑƒÐ´ÑƒÑ‰ÐµÐµ
    var $ = {
        radius: 250, // Ñ€Ð°Ð´Ð¸ÑƒÑ Ð¾ÐºÑ€ÑƒÐ¶Ð½Ð¾ÑÑ‚Ð¸ 
        speed: 10 // ÑÐºÐ¾Ñ€Ð¾ÑÑ‚ÑŒ/Ð·Ð°Ð´ÐµÑ€Ð¶ÐºÐ° ( Ð² js ÑÑ‚Ð¾ Ð¼Ñ, Ð½Ð°Ð¿Ñ€Ð¸Ð¼ÐµÑ€ 10 Ð¼Ñ = 100 ÐºÐ°Ð´Ñ€Ð¾Ð² Ð² ÑÐµÐºÑƒÐ½Ð´Ñƒ)
    };
    var e = elem;
    document.getElementById("pic").className = "hide";    
    function animate(draw, duration, callback) {
        var start = performance.now();
        requestAnimationFrame(function animate(time) {
            // Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»Ð¸Ñ‚ÑŒ, ÑÐºÐ¾Ð»ÑŒÐºÐ¾ Ð¿Ñ€Ð¾ÑˆÐ»Ð¾ Ð²Ñ€ÐµÐ¼ÐµÐ½Ð¸ Ñ Ð½Ð°Ñ‡Ð°Ð»Ð° Ð°Ð½Ð¸Ð¼Ð°Ñ†Ð¸Ð¸
            var timePassed = time - start;
            console.log(time, start)
            // Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ Ð½ÐµÐ±Ð¾Ð»ÑŒÑˆÐ¾Ðµ Ð¿Ñ€ÐµÐ²Ñ‹ÑˆÐµÐ½Ð¸Ðµ Ð²Ñ€ÐµÐ¼ÐµÐ½Ð¸, Ð² ÑÑ‚Ð¾Ð¼ ÑÐ»ÑƒÑ‡Ð°Ðµ Ð·Ð°Ñ„Ð¸ÐºÑÐ¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ ÐºÐ¾Ð½ÐµÑ†
            if (timePassed > duration)
                timePassed = duration;
            // Ð½Ð°Ñ€Ð¸ÑÐ¾Ð²Ð°Ñ‚ÑŒ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ðµ Ð°Ð½Ð¸Ð¼Ð°Ñ†Ð¸Ð¸ Ð² Ð¼Ð¾Ð¼ÐµÐ½Ñ‚ timePassed
            draw(timePassed);
            // ÐµÑÐ»Ð¸ Ð²Ñ€ÐµÐ¼Ñ Ð°Ð½Ð¸Ð¼Ð°Ñ†Ð¸Ð¸ Ð½Ðµ Ð·Ð°ÐºÐ¾Ð½Ñ‡Ð¸Ð»Ð¾ÑÑŒ - Ð·Ð°Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ ÐµÑ‰Ñ‘ ÐºÐ°Ð´Ñ€
            if (timePassed < duration) {
                requestAnimationFrame(animate);
            } else callback();
        });
    }
    animate(function (timePassed) {
        var i;
        for (i = 0; i < item_count; i++) {
            e[i].style.left = 240 + $.radius * Math.sin(pos[i]) + 'px';
            e[i].style.top = 240 + $.radius * Math.cos(pos[i]) + 'px';
            if (flag) {
                pos[i] += s; 
            } else {
                pos[i] -= s; 
            }
        }   /* callback function */
    }, 400, function changeItems() {
        var list = document.getElementById('list');
        var ch = flag ? list.firstElementChild : list.lastElementChild
        ch.remove();
        if (flag) {
          list.appendChild(ch);
        } else {
          list.insertBefore(ch, list.firstChild);
        }
        allocationItems();
    });
}