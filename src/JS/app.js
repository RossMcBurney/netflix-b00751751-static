//The URIs of the REST endpoint
VUPS = "https://prod-41.northeurope.logic.azure.com:443/workflows/6a6ee0b484034747b89a28025c67fa72/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DDSheFvjrMdqpBjnKXDCBLnDziavgfzx7g1zhuNMvEA";
RAI = "https://prod-07.northeurope.logic.azure.com:443/workflows/69a8c61cab0145028e46f28527346f79/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_MLviZB1Chh1XU5Bj-ufz2cRKx62rkxMxgkziRQt0Ig";

//comments = "https://prod-05.northeurope.logic.azure.com:443/workflows/187d42e6f8884983be4b6e06c4021d98/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MZsV6P6E9hqO3DnHePZ90uQwr9qn1gLyOqdXOT7JJDs"

BLOB_ACCOUNT = "https://blobstorageb00751751.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retVideos").click(function(){

      //Run the get asset list function
      getVideos();


  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});



//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
 //Create a form data object
 submitData = new FormData();

 //Get form variables and append them to the form data object
 submitData.append('FileID', $('#FileID').val());
 submitData.append('FileName', $('#FileName').val());
 submitData.append('userID', $('#userID').val());
 submitData.append('userName', $('#userName').val());
 submitData.append('Producer', $('#Producer').val());
 submitData.append('Publisher', $('#Publisher').val());
 submitData.append('Genre', $('#Genre').val());
 submitData.append('ageRating', $('#ageRating').val());
 submitData.append('File', $("#UpFile")[0].files[0]);

//added these for comment, unsure??
 //submitData.append('commentID', $('#commentID').val());
 //submitData.append('commentText', $('commentText').val());
 

 //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
  url: VUPS,
 //again added for comments, unsure
  //url: comments,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'POST',
  success: function(data){

  }
});

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideos(){

//Replace the current HTML in that div with a loading message
  $('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"></span>');
 
  $.getJSON(RAI, function( data ) {
    
    //Create an array to hold all the retrieved assets
    var items = [];
    
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {
      items.push( "<hr />");
      items.push("<div> <video controls src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400' type='video/mp4'/></div> <br />")
      items.push( "File : " + val["fileName"] + "<br />");
      items.push( "Uploaded by: " + val["userName"] + " (User ID: "+val["userID"]+")<br />");
      items.push( "Producer: " + val["Producer"] + "<br />");
      items.push( "Publisher: " + val["Publisher"] + "<br />");
      items.push( "Genre: " + val["Genre"] + " (Age Rating: "+val["ageRating"]+")<br />");
      
    

      items.push( "<hr />");
    });
    
    //Clear the assetlist div
    $('#VideoList').empty();

    //Append the contents of the items array to the VideoList Div
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "#VideoList" );
  });
}

