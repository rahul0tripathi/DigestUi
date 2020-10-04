$(document).ready(()=>{
    $('.nav_tab').click((e)=>{
        var toShow = $(event.target).attr('show')
       if( $(event.target).attr('show')){  
            $('.tab').fadeOut(300)
       $('.selector_nav').fadeOut(300)
       $(`#${toShow}_select`).fadeIn(300)
       $(`.${toShow}`).fadeIn(300)
       M.toast({html:`<span class="material-icons" style="color:#05dc5c">
       notification_important
       </span>Switched to ${toShow}`,classes: 'rounded'})}
     else{
        M.toast({html:`<span class="material-icons" style="color:#05dc5c">
        notification_important
        </span> Coming Soon !`,classes: 'rounded'})
     }
    })
})