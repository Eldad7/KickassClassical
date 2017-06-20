$(document).ready(function(){
	var instruments = $("#instruments");
	var composers = $("#composers");
	$.get("https://kickass-classical.herokuapp.com/getAllInstruments", function(data, status){
        var arr = [];
        arr = data["data"];
        for (var i in arr)
        	instruments.append($("<option>").attr('value', arr[i]).text(arr[i]));
    });
	$.get("https://kickass-classical.herokuapp.com/getAllComposers", function(data, status){
        var arr = [];
        arr = data["data"];
        for (var i in arr)
        	composers.append($("<option>").attr('value', arr[i]).text(arr[i]));
    });
});