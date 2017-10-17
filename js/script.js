
$(document).ready(function(){

    // SENDING MESSAGES IN CHAT
    $("#sendBtn").click(function(){
    
        if ($("#messageTextarea").val() != ""){
    
            writeMessage($("#messageTextarea").val(), true);
            $("#messageTextarea").val("");
    
        }
    })

    
    // AUTOMATIC MESSAGES
    setTimeout(function() {
        
        writeMessage("Hey guys, for question 3? What do they mean by abelian group?", false);
        $("#messageTextarea").val("");
    
    }, 900);
    setTimeout(function () {
        
        writeMessage("The rational numbers together with addition and multiplication form a field which contains the integers and is contained in any field containing the integers. Finite extensions of Q are called algebraic number fields, and the algebraic closure of Q is the field of algebraic numbers.", false);
        $("#messageTextarea").val("");
        
    }, 3000);
    setTimeout(function() {
        
        writeMessage("Try out this link: https://www.youtube.com/watch?v=-ygExIZm7Wo", false);
        $("#messageTextarea").val("");
    
    }, 5000);
    
    
    // FUNCTION FOR WRITING MESSAGES IN THE CHAT
    function writeMessage(message, outbound){
        
        // time
        var now = new Date($.now());
        var nowFormatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        //append 
        if (outbound){
            $(".messageArea").append("<h5 class='outbound message'>" + message  +"<br><span class='timestamp'>" + nowFormatted + "</span>" + "</h5>")
        } else{
            $(".messageArea").append("<h5 class='inbound message'>" + message + "<p class='plusOne'>+1</p>" +"<br><span class='timestamp'>" + nowFormatted + "</span>" + "</h5>")
        }
    }
    
    
    // ADDING GROUP MEMBER MODAL FUNCTIONALITY
    $("#addGroupMember").click(function(){
        var input; // What goes inside the circle
    
        if ($(".studentNumInput").val() == ""){ // Dont allow nothing
            return null;
        }
        // Certain values:
        // if ($(".studentNumInput").val() == 42673681){
        //     input = "Tony";
        // } else if ($(".studentNumInput").val() == 44772912){
        //     input = "Annie";
        // } else if ($(".studentNumInput").val() == 42833521) {
        //     input = "Roger";
        // } else if ($(".studentNumInput").val() == 42295639) {
        //     input = "Tim";
        // }
        // else{ // default value:
        //     input = "John"
        // }
    
        input = $(".studentNumInput").val();
        // Appends the circle, changes the input to added, switches back
        $(".circleContainer").append("<div class='circle'>" + input + "</div>");
        $(".studentNumInput").val("");
        $(".studentNumInput").attr("placeholder", "Added!");
        setTimeout(function() {
            $(".studentNumInput").attr("placeholder", "Student Number:");
        }, 2000);
    
    
        // ADDS THE NAME TO THE ASSIGNMENT MODAL:
        var ULchildren = $(".delegateAssignment").children();
        for (var i=0; i < ULchildren.length; i++){
            $(".delegateAssignment").children().eq(i).append("<span class='badge badge-secondary delegateBadge'>" + input + "</span>")
            console.log($(".delegateAssignment").children().eq(i))
        }
    })
    
    
    // ONCLICK FOR BADGES IN THE ASSIGNMENT MODAL
    $(".delegateBadge").parent().on('click', 'span', function () {
    
        // get number to find exact row (title name)
        var whichNumberTitleIsIt = $(this).parent()[0].classList[0] - 1;
    
        if ($(this).hasClass("activeBadge")){ // currently clicked
            $(this).removeClass("activeBadge"); 
            var currentBadges =  $(".assignment1Text").children().eq(whichNumberTitleIsIt).children(".titleContainer").children(); // look through badges
            for (var i = 0; i < currentBadges.length; i++){
                if (currentBadges[i].innerHTML == this.innerHTML){ // if the badge matches the name, remove it
                    currentBadges[i].remove();
                }
            }
    
        } else{ // not currently clicked
    
            $(this).addClass("activeBadge"); // ADD active badge
    
            // get number to find exact row (title name), append badge
            $(".assignment1Text").children().eq(whichNumberTitleIsIt).children(".titleContainer").append("<span class='delegateBadgeSidebar badge badge-secondary activeBadge'>" + this.innerHTML + "</span>");
    
            // ADD TO MY TASKS:
            if(this.innerHTML == "Me"){
                $(".myTasksBody").append("<li>" + $(this).parent()[0].innerHTML.split(":")[0] +"<span class='progressText'>Progress:</span>" +"<input type='range' min='0' max='100' value='0' class='slider' id='" + $(this).parent()[0].innerHTML.split(":")[0] +"'>"+ "<div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100'></div> </div>" +"</li>");
              
            }
        }
    })

    $(document).on('input', '.slider', function () {

        var sliderVal = $(this).val();
        $(this).next(".progress").children(".progress-bar").css({ "width": sliderVal + "%" }); // change slider in mytasks
        var otherSlider = $(this).attr("id") + "Progress";
        otherSlider = otherSlider.replace(/\s/g, '');
        var string = "." + otherSlider;
        $(string).css({ "width": sliderVal + "%" });
        // console.log($(("." + $(this).attr("id") + "Progress")));
    });



    // STAR RATING SYSTEM
    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function () {
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function (e) {
            if (e < onStar) {
                $(this).addClass('hover');
            }
            else {
                $(this).removeClass('hover');
            }
        });

    }).on('mouseout', function () {
        $(this).parent().children('li.star').each(function (e) {
            $(this).removeClass('hover');
        });
    });


    /* 2. Action to perform on click */
    $('#stars li').on('click', function () {
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');

        for (i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }

        // // JUST RESPONSE (Not needed)
        // var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        // var msg = "";
        // if (ratingValue > 1) {
        //     msg = "Thanks! You rated this " + ratingValue + " stars.";
        // }
        // else {
        //     msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
        // }
        // responseMessage(msg);

    });
    // STAR RATING SYSTEM


    $("strong").click(function(){
        $(this).toggleClass("activeStrong");
    })
    
    $("#createStudySave").click(function(){

        var name = $(".studyName").val();
        var date = $(".studyDate").val();
        var time = $(".studyTime").val();
        var location = $(".studyLocation").val();

        if(name != "" && date != "" && time != "" && location != ""){

            $(".upcomingSessions").append("<div class='session'>" + name + "<p>" + date + " - " + time + " - " + location + "</p>" + "<button class='btn btn-primary btn-block disabled'>Going</button>"+"<p class='peopleGoing'>You</p></div>")

        } else{
            alert("Please fill in all fields.")
        }

    })

    $(".joinOtherSessionBtn").click(function(){
        if($(this).hasClass("disabled")){

        } else{
            $(this).addClass("disabled");
            this.innerHTML = "Going";
            $(".peopleGoing").prepend("You, ");

        }
    })

    $("body").on("click", ".plusOne", function(){
        $(this).parent().css({border:"1px solid blue"});
        $(this).css({opacity:"1"});
    })

    $("#runTopic").click(function(){
        $(".topic").show();
    })



}) // end doc ready

