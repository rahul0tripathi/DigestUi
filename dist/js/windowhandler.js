"use strict";$(document).ready(function(){$(".nav_tab").click(function(t){var a=$(event.target).attr("show");$(event.target).attr("show")?($(".tab").fadeOut(300),$(".selector_nav").fadeOut(300),$("#".concat(a,"_select")).fadeIn(300),$(".".concat(a)).fadeIn(300),M.toast({html:'<span class="material-icons" style="color:#05dc5c">\n       notification_important\n       </span>Switched to '.concat(a),classes:"rounded"})):M.toast({html:'<span class="material-icons" style="color:#05dc5c">\n        notification_important\n        </span> Coming Soon !',classes:"rounded"})})});