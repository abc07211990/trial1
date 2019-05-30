//var address = '';
//console.log('hi');
$(document).ready(function(){
    
    document.addEventListener("deviceready", function(){
		address = prompt("Server IP", "192.168.2.5:5000");
		
        getjsonp();
        //update_f();
    });
});



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
		
        
        var img_s = document.getElementById("warn_sign");
        var imP_s = "http://" + address + "/img/Img/Warn/" + result.warnSign + ".png";
        if (result.warnSign == 0) {img_s.className = "warningN";}
        else { img_s.className = "warning";}
        var im_s = new Image();
        im_s.onload = function(){ img_s.src = this.src;};
        im_s.src = imP_s;
        
        var img_r = document.getElementById("Result");
        var imP_r = "http://" + address + "/img/" + result.image + "?" + date.getTime();
        var im_r = new Image();
        im_r.onload = function(){ img_r.src = this.src;};
        im_r.src = imP_r;
        
        
        //var img_s = "<img class=\"result\" src=http://" + address + "/img/" + result.image + "?" + date.getTime() + ">"
        //console.log(img_s)
        //$('#Result').html(img_s);
		
        
        $('#Cam_id').html(result.camid);
		$('#Update').html(result.date + " " + result.time);
		
		if (result.warnSign == 0) {var blink = "\"warningN\"";}
		else 
            { 
                var blink = "\"warning\"";
                navigator.notification.beep(1);
                navigator.vibrate(500);
            }
		
		
		
        $('#warn_Msg').html(result.warnMsg);
        
        
		
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
            document.getElementById("warn_sign").src="./img/NoService.png";
            document.getElementById("warn_sign").className="warning";
            $('#Cam_id').html("NA");
			$('#Update').html("NA");
			$('#warn_Msg').html("NA");
			$('#warn_Det').html("NA");
			//var img_s = "<img class=\"result\" src=./img/NoService.jpg>"
			//$('#Result').html(img_s);
            document.getElementById("Result").src="./img/NoService.jpg";
            //address = prompt("Not Connected, \nPlease try with other ip:", address);
        });
	setTimeout("getjsonp()",500);
	
	
}
