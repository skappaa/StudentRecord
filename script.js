$(document).ready(function(){
//var AllInfo = [];   
var start = 0;
var pagelimit =10,  totalpages;
var pagenumber =1;
var index;  
var end;
    
    //console.log("hello");
        
var data;
   // alert(localStorage.getItem("studentData"));
  // ajax call to load data to an obj array
    if((localStorage.getItem("studentData")) == null)
        {    
        console.log("Data not in Local Storage : retreving from ajax");
        $.ajax({
            url:'data.json',
            dataType:'json',
            type:'get',
            cache:false,
            success: function(dataObj){

              // saving data to local storage
                  localStorage.setItem("studentData", JSON.stringify(dataObj)); 
                        console.log("saved in local storage : ");
                        console.log(dataObj);
                        
                        console.log("retriving from local storage");    
             // retrieving our data and converting it back into an array
                    var retrievedStudentData = localStorage.getItem("studentData");
                    data = JSON.parse(retrievedStudentData);
             //data = data[0];
                            console.log(data);
                     end = data.length;
                            console.log("data length is");
                            console.log(end);
                        displayData(data);

                 },
            error: function() {
                    console.log("Error in loading ajax");
                    $('#error').html("<h5>Error loading the file.</h5>");
                }
            });
        }
    else 
        {
                console.log("Data in local storage so, retriving from local storage");    
         // retrieving our data and converting it back into an array
            var retrievedStudentData = localStorage.getItem("studentData");
            data = JSON.parse(retrievedStudentData);
            //data = data[0];
                console.log(data);
            end = data.length;
                console.log("data length is");
                console.log(end);
            displayData(data);
        }
//display data on the table function 
    function displayData(mydata){
        //if(!mydata)
          //  return;
        console.log("entered");
       $('.mytable tr').slice(1).remove();
    for(i = start; i < end; i++)
    {
        var formrow = '<tr class=\"sliderow1\"><td>'+[i]+'</td><td>'+mydata[i].firstname+'</td><td>'+mydata[i].lastname+'</td><td>'+mydata[i].email+'</td><td>'+mydata[i].phone+'</td><td>'+mydata[i].location+'</td><td>'+mydata[i].current_class+'</td></tr>';
        $('.myTable').append(formrow);
        
        var formrow1 = 
            '<tr class=\"sliderow2\"><td><p class=\"detailsrow\">Communication Address : </p>'+mydata[i].address.communication+'</td><td><p class=\"detailsrow\">Permanent Address : </p>'+mydata[i].address.permanent+'</td><td><p class=\"detailsrow\">English: </p>'+mydata[i].marks.english+'</td><td><p class=\"detailsrow\">Science: </p>'+mydata[i].marks.science +'</td><td><p class=\"detailsrow\">Computers:</p>'+mydata[i].marks.computers +'</td><td><p class=\"detailsrow\">Hardware: </p>'+mydata[i].marks.hardware+'</td><td><div class=\"changebuttons\"><button myID=\"' + i +'\" class=\"editbutton\" name=\"edit\" value=\"edit\"> Edit </button><button myID=\"' + i +'\" class=\"deletebutton\" name=\"delete\" value=\"delete\"> Delete </b utton> </div></td></tr>';
        $('.myTable').append(formrow1); 
    }
}; 
    
    //change the number of contents displaying in tabular format and displaying it
//$('#display').append(data[1]);
    
    $( "select" ).change(function() {
        
          if((localStorage.getItem("studentData")) == null)
             return;
              
              $( "select option:selected" ).each(function() {
                pagelimit = $( this ).val();
            });
        
            if(start == 0 && pagelimit == "150")
            {
                end = data.length;
            }
            else{
                start =0;
                end = pagelimit;
            }
        console.log("showing " + start +" to " +end);
          displayData(data);
        }).trigger("change");
    
    // function to generate start and end of the values for moving to next page
    $(document).on('click', "#nextpage", function()
    {
        console.log("next page event trigerred");
        totalpages = Math.ceil(data.length / pagelimit);
        console.log(pagenumber);
        
        if(pagenumber >= totalpages) {
              pagenumber = totalpages;  
              end = data.length;    
        }
        else {
           pagenumber++; 
        }
             
        if(pagelimit == "150")
        {
            start = 0;
            end = data.length;
        }
        else
        {
            start =(pagenumber - 1)* pagelimit;
             console.log(start);
            end = (pagelimit * pagenumber) - 1;
             console.log(end);  
        }
        if(pagenumber == totalpages)
            {
               end = data.length;  
            }
        displayData(data);
    });
    
    // function to generate start and end of the values for moving to previous page
    $(document).on('click', "#previouspage", function() {
        
        totalpages = Math.ceil(data.length / pagelimit);
        console.log("THe page num previous is : " + pagenumber);
        
        if(pagenumber > 1) {
              pagenumber--;   
        }
        else {
            pagenumber = 1;
        }
       
        if(pagelimit == "150")
        {
            start = 0;
            end = data.length;
        }
        else
        {
            
            start =(pagenumber - 1)* pagelimit;
             console.log(start);
            end = (pagelimit * pagenumber) - 1;
             console.log(end);  
        }
        displayData(data);
    });
     
    //new student button
     $('.entry').on('click', function(event) {  
         console.log("new entry event");
             $('#newentry').slideDown();
             $('.entry').slideUp(); 
        });
   
    // cancel button  new entry form 
    $('#cancelbutton').on('click', function(event) {    
        console.log("cancle button triggered");
        $('#newentry').slideUp(); 
        $('.entry').slideDown();
    });
    
    // cancel button update records form 
    $('#cancel').on('click', function(event) { 
        console.log("cancle event triggered");
        $('#updateEntry').slideUp();
        $('.entry').slideDown();
    });
    
    // sliding up and down between two rows
     $(document).on('click', ".sliderow1", function(){
         console.log("open element");
         $(this).next().slideToggle();
        // $(this).parent().(".sliderow2").slideToggle();            
     });
    
    
     // Add new entry
    $(document).on('click', "#addentry", function() {
        
        var newEntryObj = 
            {
			"firstname" : $('#firstname').val(),
			"lastname" : $('#lastname').val(),
			"email" : $('#email').val(),
			"location" : $('#location').val(),
			"phone" : $('#phone').val(),
			"current_class" : $('#currentclass').val(),
			"address" : 
			{
				"communication": $('#commAddress').val(),
				"permanent" : $('#permAddress').val()
			},
			"marks" : 
			{
				"english" : $('#engMarks').val(),
				"science" : $('#scMarks').val(),
				"computers" : $('#compMarks').val(),
				"hardware" : $('#hwMarks').val()
			}
		}
        console.log("new Entry event trigerred");
        console.log(newEntryObj);
        data.push(newEntryObj);
        console.log(data);
        localStorage.setItem("studentData", JSON.stringify(data));
        displayData(data);
    });
    
    // update entry form calling method
    $(document).on('click', ".editbutton", function() { 
         index = $(this).attr("myID");
          console.log("editing index : " + index); 
         $('#updateEntry').slideDown();
        
        $("#fname").val(data[index].firstname);
        $("#lname").val(data[index].lastname);
        $("#emailid").val(data[index].email);
        $("#loc").val(data[index].location);
        $("#ph").val(data[index].phone);
         $("#cls").val(data[index].current_class);
         $("#commAdd").val(data[index].address.communication);
         $("#permAdd").val(data[index].address.permanent);
         $("#eMarks").val(data[index].marks.english);
         $("#sMarks").val(data[index].marks.science);
         $("#cMarks").val(data[index].marks.computers);
         $("#hMarks").val(data[index].marks.hardware);
         });
    
    // update entry form submit method
    $("#modify").click( function() {
        
        var updateEntryObj = 
            {
			"firstname" : $('#fname').val(),
			"lastname" : $('#lname').val(),
			"email" : $('#emailid').val(),
			"location" : $('#loc').val(),
			"phone" : $('#ph').val(),
			"current_class" : $('#cls').val(),
			"address" : 
			{
				"communication": $('#commAdd').val(),
				"permanent" : $('#permAdd').val()
			},
			"marks" : 
			{
				"english" : $('#eMarks').val(),
				"science" : $('#sMarks').val(),
				"computers" : $('#cMarks').val(),
				"hardware" : $('#hMarks').val()
			}
		}
        console.log("Modifing event index : " + updateEntryObj);
        data[index] = updateEntryObj;
        console.log(data[index]);
        localStorage.setItem("studentData", JSON.stringify(data));
        displayData(data);
   });    
           
   // delete entry 
    $(document).on('click', ".deletebutton", function() {
        var index = $(this).attr("myID");
        console.log("Deleting Index : " + index);
        data.splice(index,1);
        localStorage.setItem("studentData", JSON.stringify(data));
        end = data.length;
        displayData(data);
    });

    // search through data
    $("#search").on("keyup", function() {
        //alert();
        var result =[];
        var term = $(this).val();
        console.log( " ssearching for " +term);
        for (var i=0 ; i < data.length ; i++) {
             
                if((JSON.stringify(data[i])).includes(term)){
                    result.push(data[i]);
                }
        }
        
        start= 0;
        end = result.length;
        displayData(result);
        
    });
   
    
});
       
