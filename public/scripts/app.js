// Client facing scripts here
$(document).ready(function(){
    alert('jQ loaded');
    $logoutBtn = $('[href="/logout"]');
    $logoutBtn.click((event)=>{
        event.preventDefault();
        $.post('/logout');
    })
});