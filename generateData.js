$(document).ready(function(){
    
   var AllInfo = [];
    var start=0;
    var pagelimit,  totalpages;
    var pagenumber =1;
 var index;
    // generating JSON data 
  function generateData(){
            for (var i = 0; i < 100; i++)
        {
        var dataObj = 
        {
            "firstname" : "Arungopan_" + i,
            "lastname" : "Gopakumar_" + i,
            "email" : "arun.gopan_" + i +"@marlabs.com",
            "location" : "Piscataway, Newyork, Atlanta",
            "phone" : "34324324323",
            "current_class" : "10th",
            "address" : 
            {
                "communication": "Marlabs, Piscataway, New Jersey",
                "permanent" : "Trivandrum, Kerala, India"
            },
            "marks" : 
            {
                "english" : "70",
                "science" : "80",
                "computers" : "90",
                "hardware" : "80"
            }
        }
        AllInfo.push(dataObj);
        }
        localStorage.setItem("studentData", JSON.stringify(AllInfo));   
        }
      
  //if(localStorage.getItem('studentData') == 0 )
   // {
      generateData();
   // }
    
// retrieving our data and converting it back into an array
var retrievedStudentData = localStorage.getItem("studentData");
var data = JSON.parse(retrievedStudentData);
 var end = data.length;   
    
    // function to generate start and end of the values for moving to next page
    $(document).on('click', "#nextpage", function()
    {
       totalpages = Math.ceil(data.length / pagelimit);
            console.log(pagenumber);
        
        if(pagenumber >= totalpages)
            {
               pagenumber = totalpages;   
            }
       else{
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
        displayData();
    });

    // function to generate start and end of the values for moving to previous page
    $(document).on('click', "#previouspage", function() {
        totalpages = Math.ceil(data.length / pagelimit);
            console.log(pagenumber);
        
        if(pagenumber > 1)
            {
              pagenumber--;   
            }
       else{
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
        displayData();
    });
     
    //new student button
     $('.entry').on('click', function(event) {        
             $('#newentry').slideDown();
             $('.entry').slideUp(); 
        });
   
    // cancel button  new entry form 
    $('#cancelbutton').on('click', function(event) {        
             $('#newentry').slideUp(); 
            $('.entry').slideDown();
        });
    
    // cancel button update records form 
    $('#cancel').on('click', function(event) {        
             $('#updateEntry').slideUp();
             $('.entry').slideDown();
        });
    
    // sliding up and down between two rows
     $(document).on('click', ".sliderow1", function(){
         $(this).next().slideToggle();
   // $(this).parent().(".sliderow2").slideToggle();            
});
    
    
// function to display data on table
    function displayData(){
      $('.mytable tr').slice(1).remove();
        for(i = start; i < end; i++)
        {
            var formrow = '<tr class=\"sliderow1\"><td>'+[i]+'</td><td>'+data[i].firstname+'</td><td>'+data[i].lastname+'</td><td>'+data[i].email+'</td><td>'+data[i].phone+'</td><td>'+data[i].location+'</td><td>'+data[i].current_class+'</td></tr>';
            $('.myTable').append(formrow);

            var formrow1 = 
                '<tr class=\"sliderow2\"><td><p class=\"detailsrow\">Communication Address : </p>'+data[i].address.communication+'</td><td><p class=\"detailsrow\">Permanent Address : </p>'+data[i].address.permanent+'</td><td><p class=\"detailsrow\">English: </p>'+data[i].marks.english+'</td><td><p class=\"detailsrow\">Science: </p>'+data[i].marks.science +'</td><td><p class=\"detailsrow\">Computers:</p>'+data[i].marks.computers +'</td><td><p class=\"detailsrow\">Hardware: </p>'+data[i].marks.hardware+'</td><td><div class=\"changebuttons\"><button myID=\"' + i +'\" class=\"editbutton\" name=\"edit\" value=\"edit\"> Edit </button><button myID=\"' + i +'\" class=\"deletebutton\" name=\"delete\" value=\"delete\"> Delete </b utton> </div></td></tr>';
            $('.myTable').append(formrow1); 
        }
    }    

    
//change the number of contents displaying in tabular format and displaying it
//$('#display').append(data[1]);
    $( "select" ).change(function() {
          $( "select option:selected" ).each(function() {
                pagelimit = $( this ).val();
            });
            if(start == 0 && pagelimit == "150"){
                end = data.length;
            }
            else{
                end = pagelimit;
            }
          displayData();
        })
        .trigger( "change" );
    
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
        console.log(newEntryObj);
        data.push(newEntryObj);
        console.log(data);
        localStorage.setItem("studentData", JSON.stringify(data));
        displayData();
    });
    
    // update entry form calling method
    $(document).on('click', ".editbutton", function() { 
         index = $(this).attr("myID");
          console.log(index); 
         $('#updateEntry').slideDown();
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
        console.log(updateEntryObj);
        data[index] = updateEntryObj;
        console.log(data[index]);
        localStorage.setItem("studentData", JSON.stringify(data));
        displayData();
   });    
           
   // delete entry 
    $(document).on('click', ".deletebutton", function() {
        var index = $(this).attr("myID");
        console.log(index);
        data.splice(index,1);
        localStorage.setItem("studentData", JSON.stringify(data));
        end = data.length;
        displayData();
    });

    // search through data
   $("#search").on("keyup", function() {
        //alert();
        var result =[];
        var term = $(this).val();
        console.log(term);
        for (var i=0 ; i < data.length ; i++) {
             
                if((JSON.stringify(data[i])).includes(term)){
                    result.push(data[i]);
                }
        }
        
        start= 0;
        end = result.length;
         $('.mytable tr').slice(1).remove();
        for(i = start; i < end; i++)
        {
            var formrow = '<tr class=\"sliderow1\"><td>'+[i]+'</td><td>'+result[i].firstname+'</td><td>'+result[i].lastname+'</td><td>'+result[i].email+'</td><td>'+result[i].phone+'</td><td>'+result[i].location+'</td><td>'+result[i].current_class+'</td></tr>';
            $('.myTable').append(formrow);

            var formrow1 = 
                '<tr class=\"sliderow2\"><td><p class=\"detailsrow\">Communication Address : </p>'+result[i].address.communication+'</td><td><p class=\"detailsrow\">Permanent Address : </p>'+result[i].address.permanent+'</td><td><p class=\"detailsrow\">English: </p>'+result[i].marks.english+'</td><td><p class=\"detailsrow\">Science: </p>'+result[i].marks.science +'</td><td><p class=\"detailsrow\">Computers:</p>'+result[i].marks.computers +'</td><td><p class=\"detailsrow\">Hardware: </p>'+result[i].marks.hardware+'</td><td><div class=\"changebuttons\"><button myID=\"' + i +'\" class=\"editbutton\" name=\"edit\" value=\"edit\"> Edit </button><button myID=\"' + i +'\" class=\"deletebutton\" name=\"delete\" value=\"delete\"> Delete </b utton> </div></td></tr>';
            $('.myTable').append(formrow1); 
        }
    });
    
    
    //scroll event
   /* $(window).scroll(function(){
        end = data.length;
        displayData();
    }) */

});