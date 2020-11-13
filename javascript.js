$(function(){
    loadrecipes();
    $("#recipes").on("click",".btn-danger",handledelete);
    $("#recipes").on("click",".btn-warning",handleupdate);
    $("#addbtn").click(addrecipe);
    $("#updatesave").click(function(){
        var id=$("#updateid").val();
        var title=$("#updatetitle").val();
        var body=$("#updatebody").val();
        $.ajax({
            url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
            method: "PUT",
            data:{title,body},
            success:function(response){
                console.log(response);
                loadrecipes();
                $("#updatemodel").modal("hide");


            }
        })
    });

});

function handledelete(){
    var btn = $(this);
    var pdiv = btn.closest(".recipe");
    var id = pdiv.attr("data-id");
    console.log(id);
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method:"DELETE",
        success:function(){
            loadrecipes();
        }
    })
}
function loadrecipes(){
     $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"GET",
        error:function(response){
            var r = $("#recipes");
            r.html("Error has Occured");
        },
        success:function(response){
            console.log(response);
            var recipes = $("#recipes");
            recipes.empty();
            for(var i=0;i<response.length; i++){
                var rec = response[i];
                recipes.append(`<div class="recipe" data-id="${rec._id}"><h3>${rec.title}<button id="delbtn" class="btn btn-danger btn-sm">Delete</button><button id="delbtn" class="btn btn-warning btn-sm">Edit</button></h3><p>${rec.body}</p></div>`)


            }
            
        }
     });
}
function addrecipe(title,body){
    var title=$("#title").val();
    var body =$("#body").val();
    $.ajax({

        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"POST" ,
        data:{title,body},
        success:function(response){
            console.log(response);
            loadrecipes();
            alert("Recipe Added Successfully");
        }


    });
}
function handleupdate(){
    
    
    var btn = $(this);
    var pdiv = btn.closest(".recipe");
    var id = pdiv.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/recipes/"+id,function(response){

    $("#updateid").val(response._id);
    $("#updatetitle").val(response.title);
    $("#updatebody").val(response.body);
    });
    $("#updatemodel").modal("show");
}