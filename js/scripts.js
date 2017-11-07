$(document).ready(function(){
	
	
	//Intro texts
	//WORKING

	
	$('.magicDiv').each(function(i, obj) {
		$(this).attr('style', 'background-color:'+$(this).attr("data-color")+'');
	});
	
	
	$("#introBG").fadeOut("slow",function(){
		$("#magicCircleContainer").fadeIn("slow");
	});

});

$(document).on("click",".magicDiv",function(){
	console.log("clicked...");
	//TODO: change bg color
	if($(this).attr("currentlyOpen") != "true"){
		var thisColor = $(this).attr("data-color");
		$(".magicDiv").addClass("noTranslation");
		$(this).addClass("open");
		var position = $(this).offset();
		
		$(this).attr("topBefore", position.top);
		$(this).attr("leftBefore", position.left);
		$(this).attr("currentlyOpen","true");
		
		$("#rotatingContainer").addClass("paused");
		
		//Get translation values
		var finalLeft =  position.left*1.15;
		var finalTop =  position.top*1.05;
		
		
		var path = {
            start: {
              x:  0,
              y:  0,
             angle: 3.839,
              length: 0.695
            },
            end: {
              x: - finalLeft,
              y: -  finalTop,
              angle: 64.286,
              length: 0.795
            }
          };
		  $(this).animate(
			{
			  path : new $.path.bezier(path)
			}
		  );
		  
		$.when($(this).animate({
			width: '110vw',
			height: '110vw',
			zIndex:2
		}, 300)).pipe(function() {
			
			
			return this.animate({
				width: '210vw',
				height: '210vw',		
				borderRadius:0
			}, 300);
		
		}).then(function() {
			
			console.log('done');
		});  
		var content = $(this).find(".content");
		setTimeout(function(){
		 	$("#rotatingContainer").removeClass("rotating ");
			content.addClass("visible");
			setTimeout(function(){
				$(".content.visible").fadeIn();
			}, 1300);
			$("#magicCircleContainer").css("background-color",thisColor);
		}, 1300);
	
		
	}
});

$(document).on("click",".goBack",function(){
	var magicDiv = $(this).closest(".magicDiv.noTranslation.open");
	$(".magicDiv.noTranslation.open").find(".content").removeClass("visible");
	if(magicDiv.attr("currentlyOpen") == "true"){
		magicDiv.attr("currentlyOpen","false");
		
		
		magicDiv.removeClass("open");
		var position = magicDiv.offset();
		
		magicDiv.attr("topBefore", position.top);
		magicDiv.attr("leftBefore", position.left);
		magicDiv.attr("currentlyOpen","true");
		
		$("#rotatingContainer").removeClass("paused");
		
		//Get translation values
		var finalLeft = magicDiv.attr("leftBefore");
		var finalTop =   magicDiv.attr("topBefore");
		
		
		var path = {
            start: {
              x:  0,
              y:  0,
             angle: 3.839,
              length: 0.695
            },
            end: {
              x:  finalLeft,
              y:   finalTop,
              angle: 64.286,
              length: 0.795
            }
          };
		  magicDiv.animate(
			{
			  path : new $.path.bezier(path)
			}
		  );
		  
		$.when(magicDiv.animate({
			width: '8.4vw',
			height: '8.4vw',		
			borderRadius:'50%',
			zIndex:1
		},1)).pipe(function() {
			
			
			return null;
		
		}).then(function() {
			
			console.log('done');
		});  
		setTimeout(function(){
		 	$("#rotatingContainer").addClass("rotating ");
			
		}, 300);
	
		
		
	}
	$("#magicCircleContainer").css("background-color","#EDEDED");
	setTimeout(function(){
		
		$(".magicDiv").removeClass("noTranslation");
		$(".magicDiv").attr("currentlyOpen","false");
		
	}, 1300);
	
});


	