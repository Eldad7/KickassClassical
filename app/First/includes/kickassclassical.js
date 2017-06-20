$(document).ready(function(){
	id = localStorage.getItem("id");
	var instruments = [];
	$.get("https://kickass-classical.herokuapp.com/getUserById/"+id,function(data, status){

		arr = data["data"]["favInstruments"];
		console.log(arr);
		$.post("https://kickass-classical.herokuapp.com/getMixtapesFiltered",{"instruments":arr})
		.done(function(data, status){
		console.log(data["data"]);
        var ul = $("#mixtapes ul");
        var arr = [];
        arr = data["data"];
        for (var i in arr){
        	var li = $("<li>").attr('id', arr[i]["_id"]);
        	var img = $("<img>").attr("src",arr[i]["coverImg"]);
        	li.append(img);
        	ul.append(li);
        }
    	});
	});
});