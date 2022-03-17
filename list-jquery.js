$(document).ready(function(){
    let trashedListElement;

    $("#list").on("click", "li div button", function(){
        if (confirm('Czy na pewno chcesz usunąć ten element z listy')) {
            trashedListElement = $(this).parent().parent();
            trashedListElement.remove();
        }
    });

    $("#restore-list-element-button").click(function(){
        if(trashedListElement !== undefined){
            $("#list").append(trashedListElement);
            trashedListElement = undefined;
        }
    });
});