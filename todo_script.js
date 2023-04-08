$(document).on("click", ".todo-add", function() {
	var inputText = $(".todo-input input").val();
	if ($.trim(inputText) == '') {
		
		$(".todo-error").html("You must enter something...");
		return;
	};

	$(".todo-error").html("");
	
	var nextNumber = getNextNumberOfList();
	var newItem = '<div class="todo-item">' +
				  '<div class="todo-number">' + nextNumber + '.</div>' +
				  '<div class="todo-text">' + inputText + '</div>' + 
				  '<div class="todo-edit">&#9998;</div>' +
				  '<div class="todo-delete">&#10007;</div>' +
				  '</div>'		
	
	$(".todo-list").append(newItem);
	$(".todo-input input").val("");
	
});

$(document).on("keydown", ".todo-input input", function(event) {
	if (event.which == 13) {
		event.preventDefault();
		$(".todo-add").click();
	
	}
	
});

$(document).on("click", ".todo-edit", function() {
	$(this).attr("class", "todo-update");
	$(this).html("&#10003;");
	
	var text = $(this).parent(".todo-item").find(".todo-text").html();
	var innerHeightText = $(this).parent(".todo-item").find(".todo-text").innerHeight();
	$(this).parent(".todo-item").find(".todo-text").attr("class", "todo-text-update");
	
	
	$(this).parent(".todo-item").find(".todo-text-update").html('<textarea style="height:' + innerHeightText + 'px">' + text + "</textarea>");
		
});

$(document).on("click", ".todo-update", function() {
	var text = $(this).parent(".todo-item").find(".todo-text-update textarea").val();
	$(this).parent(".todo-item").find(".todo-text-update").html(text);
	$(this).parent(".todo-item").find(".todo-text-update").attr("class", "todo-text");
	
	$(this).attr("class", "todo-edit");
	$(this).html("&#9998;");
	
});
	
$(document).on("keydown", ".todo-text-update", function(event) {
	if (event.which == 13) {
		event.preventDefault();
		$(".todo-update").click();
		
	}
	
});

$(document).on("click", ".todo-text", function() {
	if ($(this).css("text-decoration-line") == "none") {
		$(this).css({"text-decoration-line": "line-through"});	
	} else {
		$(this).css({"text-decoration-line": "none"});	
	};
			
});

$(document).on("click", ".todo-delete", function() {
	$(this).parent('.todo-item').remove();
	
	changeNumbersOfList();
	
});	

function getNextNumberOfList() {
	return $('.todo-list .todo-item').length + 1;	
	
}

function changeNumbersOfList() {
	var i=1;
	$(".todo-list").find(".todo-item").each(function() {
		$(this).find(".todo-number").html(i + ".");
		i++;
		
	});
	
}