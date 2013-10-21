$(document).on('pagebeforeshow', "#home", function(event, ui) {
    if(localStorage.dudas == null){
        getDudas();
    } 

    else{
        var dudas = JSON.parse(localStorage.dudas);
        generateDudasList(dudas);
    }
});

//SINGLE VIEW
$(document).on('pagebeforeshow', "#dudasSingleView", function( event, ui ) {
    var dudas = JSON.parse(localStorage.dudas);
    var currentID = localStorage.id;
    console.log(dudas);
    var current;
    for(var i = 0; i<dudas.length; i++){
        if(dudas[i]._id == currentID){
            current = dudas[i];
            break;
        }
    }
    var name = current.children[0].word
        for(var b = 1; b< current.children.length;b++){
            name += '  |  '+dudas[i].children[b].word;
        }
        console.log(name);
    $('#singleHeading').text(name);

    var content = $('#singleDudaContent');
    content.empty();
    for(var i = 0; i<current.children.length;i++){
        content.append('<h1>'+current.children[i].word+'<span class="type"> - ('+current.children[i].clasification+')</span></h1>');
        content.append('<p>'+current.children[i].description+'</p>')
    }
});


// ERRORES JS
$(document).on('pagebeforeshow', "#errores", function(event, ui) {
    if(localStorage.errores == null){
        getErrores();
    } 

    else{
        var errores = JSON.parse(localStorage.errores);
        generateErroresList(errores);
    }
});



//SEARCH JS
$(document).ready(function(){
    $('#searchForm').on('submit',function(event){
        $('#rae').remove();
        event.preventDefault();
        var query = $('#search-basic').val();
        var searchString = "<iframe id='rae' frameBorder='0' width='100%' height='300px' src='http://lema.rae.es/drae/srv/search?d=drae&val="+query+"'></iframe>"
        $('#searchResult').append(searchString);
    })
})


//SEARCH BEFORE LOAD
$(document).on('pagebeforeshow', "#search", function(event, ui) {
                $('#searchResult').empty();
                $('#search-basic').val('');
               });



//HELPER FUNCTIONS

function generateDudasList(dudas){
    var list = $("#dudas-list");
    list.empty();
    for (var i = 0; i < dudas.length; ++i){
        var name = dudas[i].children[0].word
        for(var b = 1; b< dudas[i].children.length;b++){
            name += '  |  '+dudas[i].children[b].word;
        }
        var currentid = ''+dudas[i]._id;
        console.log(typeof currentid);
        list.append("<li><a onClick=getDudasPage('"+currentid+ "')><h2>"+name+"</h2></a></li>");
        list.listview("refresh");
    }
}

function generateErroresList(errores){
    localStorage.errores = JSON.stringify(errores);
    var list = $("#errores-list");
    list.empty();
    for (var i = 0; i < errores.length; ++i){
        list.append("<li><h3> Si: "+errores[i].si+"</h3><h3> No: "+errores[i].no+"</h3></li>");
        list.listview("refresh");
    }  
}

function getDudasPage(id){
    localStorage.id = id;
    $.mobile.changePage("#dudasSingleView");
}

function refreshContent(){
    getDudas();
    getErrores();
    alert('El contenido a sido actualizado');
}

function getDudas(){
   $.ajax({
        url : "http://diacritico.herokuapp.com/getdudas",
        contentType: "application/json",
        success : function(dudas, textStatus, jqXHR){
            localStorage.dudas = JSON.stringify(dudas);
            generateDudasList(dudas);
            // alert("El contenido ha sido actualizado exitosamente");
        },
        error: function(data, textStatus, jqXHR){
            console.log("textStatus: " + textStatus);
        }
    });
}
function getErrores(){
   $.ajax({
        url : "http://diacritico.herokuapp.com/geterrores",
        contentType: "application/json",
        success : function(errores, textStatus, jqXHR){
            generateErroresList(errores);
        },
        error: function(data, textStatus, jqXHR){
            console.log("textStatus: " + textStatus);
            alert("Data not found!");
        }
    });     
}