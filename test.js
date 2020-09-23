function makeFunc() {
    var name = 'Mozilla';
    console.log("outer"); 
    function displayName() {
      console.log(name);      
    }
    return displayName;
  }
  
  var myFunc = makeFunc();
  myFunc();