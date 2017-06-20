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

    $("#submit").click(function (){
	    	var favInstruments = $('#instruments').val();
	    	var favComposer = $("#composers").val();
	    	$.post("https://kickass-classical.herokuapp.com/addNewUser",
	    		{"firstName":$("#first").val(), "lastName":$("#last").val(),"email":$("#email").val(),"profileImg":"test.jpg","favInstruments":favInstruments,"favComposer":favComposer,"token":$("#token").val()})
	    	.done(function(data, status){
	    		/*console.log("DONE!" + JSON.stringify(data)+" "+status);
	    		var url = $("#form").attr("action")+"?"+data["data"]["_id"];
	    		$("#form").attr("action", url);
	    		$('#form').submit();*/
	    		localStorage.setItem("id", data["data"]["_id"]);
	    		window.location.assign("index.html");
	    	});
	    	//return false;
    });
});