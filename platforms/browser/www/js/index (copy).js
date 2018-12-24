//var address = "";
//var latest = new Date();
//var cam = 0;
//
//$('#Update').html(latest.getFullYear() + "/" + latest.getMonth() + "/" + latest.getDate() + "  " + 
//	latest.getHours() + ":" + latest.getMinutes() + ":" + latest.getSeconds());
//$('#Cam_id').html(cam);
//var warnid = [1, 2];
//var sign = "<img class=\"warning\" src=\"img/Warn/" + warnid[0] + ".png\">";
//var sign = sign + "<img class=\"warning\" src=\"img/Warn/" + warnid[1] + ".png\">";
//$('#warn_sign').html(sign);

//var result_s = "<img class=\"result\" src=\"img/platform.jpeg\">";
//$('#Result').html(result_s);
//
$(document).ready(function(){
    document.addEventListener("deviceready", function(){
		address = prompt("Server IP", "192.168.2.5:5000");
		
        getjsonp();
        //update_f();
    });
});

/*
function update_f()
{
	var latest = new Date();
	var cam = 0;
	$('#Update').html(latest.getFullYear() + "/" + latest.getMonth() + "/" + latest.getDate() + "  " + 
	latest.getHours() + ":" + latest.getMinutes() + ":" + latest.getSeconds());
	$('#Cam_id').html(cam);
	var warnid = [1, 2, 3, 4];
	var sign = "";
	for (var i = 0; i < warnid.length; i++)
	{
		var sign = sign + "<img class=\"warning\" src=\"img/Warn/" + warnid[i] + ".png\">";
	}

	//var sign = sign + "<img class=\"warning\" src=\"img/Warn/" + warnid[0] + ".png\">";
	//var sign = sign + "<img class=\"warning\" src=\"img/Warn/" + warnid[1] + ".png\">";
	$('#warn_sign').html(sign);
	path_i = "img/platform.jpeg";
	var result_s = "<img class=\"result\" src=\"" + path_i + "\">";
	$('#Result').html(result_s);


	setTimeout("update_f()",500);
}
*/

/*
json format

*/
// Get json for update
function getjsonp()
{
    var html = '';
	
	//console.log("==>get json from<==");
	
	var path_j = "http://" + address + "/json";
        
	//console.log(path_j);
	
	$.getJSON(path_j, function(result)
	{
		console.log("hihi")
		
		$('#Cam_id').html(result.camid);
	    $('#Update').html(result.Time);
	    $('#warn_sign').html("<img class=\"warning\" src=./img/Warn/" + result.warnS + ".png>");
        $('#warn_C').html(result.warnC);
        var img_s = "<img src=http://" + address + "/img/" + result.img + ">"
        console.log(img_s)
	    $('#Result').html(img_s);
		
			
		
	})
        .fail(function(jqXHR)
        {
            
            $('#Cam_id').html("NA");
			$('#Update').html("NA");
			$('#warn_C').html("NA");
            address = prompt("Not Connected, \nPlease try with other ip:", address);
        });
	setTimeout("getjsonp()",500);
	
	
}
