document.getElementById("nav-mylist").classList.add("active");
let size=0;

$(document).ready(function () {
	$("#sidebar-toggle").click(function(e) {
	    e.preventDefault();
	    $("#list-sidebar-wrapper").toggleClass("active");

	    if($("#list-sidebar-wrapper").hasClass("active")) {
			$("#list-sidebar").show();
			$("#list-sidebar").css({opacity: 1});
			$("#list-div").css({width: "60%"});
		}
		else {
			$("#list-sidebar").hide();
			$("#list-sidebar").css({opacity: 0});
			$("#list-div").css({width: "80%"});
		}
	});

	if($(window).width() < 768) {
	  $('#list-sidebar-wrapper').toggleClass('active');

		if($("#list-sidebar-wrapper").hasClass("active")) {
			$("#list-sidebar").show();
			$("#list-sidebar").css({opacity: 1});
			$("#list-div").css({width: "60%"});
		}
		else {
			$("#list-sidebar").hide();
			$("#list-sidebar").css({opacity: 0});
			$("#list-div").css({width: "80%"});
		}
	}
    ///console.log("ftu");
	showAllItems("All");
});

function showAllItems(statu){
	$("li").removeClass("active");
	$('#'+statu).addClass("active");
	$.ajax({
		type: "GET",
		url: "/getItems",
		data: JSON.stringify({}),
		success: function(result){
			///console.log(result);
			showtems(result,statu);
		}

});
}
function showtems(result,statu){
	
			var myList = document.getElementById("list");
           //// console.log(result);
			var listItems ="";
		   size=result.length;
		   for(var i=0;i<result.length;i++){
			   ///console.log(result[i].status);
			   if(result[i].status=="Pending"&&(statu=="All"||statu=="Pending"))
			   listItems+=`<li > <span id="`+result[i]._id+`" class ="c">`+result[i].description+ `</span> <span class="cross"><i class="fas fa-times-circle"></i></span></li>
			   `;
			   else if(result[i].status=="Done"&&statu=="All")
			   listItems+=`<li > <span id="`+result[i]._id+`" class ="c checked">`+result[i].description+ `</span><span class="cross"><i class="fas fa-times-circle"></i></span></li>
			   `;
			   else if(result[i].status=="Done"&&statu=="Done")
			   listItems+=`<li > <span id="`+result[i]._id+`" class ="c">`+result[i].description+ `</span><span class="cross"><i class="fas fa-times-circle"></i></span></li>
			   `;
               else if(result[i].status=="Deleted"&&statu=="Deleted")
			   listItems+=`<li> <span id="`+result[i]._id+`" class="c">`+result[i].description+ `</span><span class="cross"><i class="fas fa-times-circle"></i></span></li>
					`;
			   
		   }
		   myList.innerHTML=listItems;
		   $("#list li .c").click(function(){
			$(this).toggleClass('checked');
			if($(this).hasClass("checked"))changeStatus($(this).attr('id'),"Done");
			else changeStatus($(this).attr('id'),"Pending");
		  });
		

}

function changeStatus(id,status){
	console.log(id,status);
	$.ajax({
		type:"POST",
		url: "/changeStatus",
		data :{id:id,status:status},
		success :function(result){
			///showAllItems("All");
			console.log(result);
        }

	});
}
function addElement() {
	var description=document.getElementById("list-new-input").value;
	size+=1;
	$.ajax({
		type: "POST",
		url: "/addItems",
		data: {description:description,status:"Pending"},
		success: function(result){
			///console.log(result);
		    showAllItems("All");
		}
    });
};


$('.fa-clipboard-list').click(function(){
	showAllItems("All");

});
$(document).on('click','.fa-check-square',(function(){
	console.log("done");
	showAllItems("Done");

}));

$('.fa-bullseye').click(function(){
	showAllItems("Pending");

});
$('.fa-times-circle').click(function(){
	showAllItems("Deleted");

});

$('#list').on('click', '.cross', function() {
  changeStatus($(this).siblings().attr('id'),"Deleted");
  $(this).parent().remove();
});
