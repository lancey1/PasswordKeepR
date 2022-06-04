// Client facing scripts here
$(document).ready(function(){
    
    //* Logout should be a post action, however HTML <a> cannot send a post request, So we use jQuery to do the action.
    $logoutBtn = $('[href="/logout"]');

    $logoutBtn.click((event)=>{
        event.preventDefault();
        $.post('/logout');
    })

    
});