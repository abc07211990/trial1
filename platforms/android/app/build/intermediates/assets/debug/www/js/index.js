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
		var date = new Date
		
		$('#Cam_id').html(result.camid);
		$('#Update').html(result.date + " " + result.time);
		
		if (result.warnSign == 0) {var blink = "\"warningN\""}
		else { var blink = "\"warning\"" }
		
		$('#warn_sign').html("<img class=" + blink + "src=http://" + address + "/img/Img/Warn/" + result.warnSign + ".png>");
		
        $('#warn_Msg').html(result.warnMsg);
        
        var img_s = "<img class=\"result\" src=http://" + address + "/img/" + result.image + "?" + date.getTime() + ">"
        console.log(img_s)
		$('#Result').html(img_s);
		
		console.log(result.detail)
		var detail = "<table border=1 class=\"centerTable\">"
		detail += "<tr><td>Yline\[A|B|C\]</td><td>" + result.detail.Y + "</td></tr>"
		detail += "<tr><td>Train\[N|M|O|S\]</td><td>" + result.detail.T + "</td></tr>"
		detail += "<tr><td>Help\[H|L|N\]</td><td>" + result.detail.H + "</td></tr>"
		detail += "<tr><td>Adnormal\[D|N|R|Si|Sq\]</td><td>" + result.detail.A + "</td></tr>"
		detail += "<tr><td>OnTrack\[N|O\]</td><td>" + result.detail.O + "</td></tr>"
		detail += "</table>"
		$('#warn_Det').html(detail);
		
			
		
	})
        .fail(function(jqXHR)
        {
            $('#warn_sign').html("<img class=\"warning\" src=\"./img/NoService.png\">");
            $('#Cam_id').html("NA");
			$('#Update').html("NA");
			$('#warn_Msg').html("NA");
			$('#warn_Det').html("NA");
			var img_s = "<img class=\"result\" src=./img/NoService.jpg>"
			$('#Result').html(img_s);
            //address = prompt("Not Connected, \nPlease try with other ip:", address);
        });
	setTimeout("getjsonp()",500);
	
	
}
