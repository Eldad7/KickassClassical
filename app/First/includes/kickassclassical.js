$(document).ready(function(){
	$.get("https://kickass-classical.herokuapp.com/getMixtapesFiltered", function(data, status){
		console.log(data["data"]);
        var ul = $("#mixtapes ul");
        var arr = [];
        arr = data["data"];
        for (var i in arr){
        	console.log(arr[i]);
        	ul.append($("<li>").attr('id', arr[i]["_id"]).append("<img>").attr("src",arr[i]["coverImg"]);
        }
    });
});