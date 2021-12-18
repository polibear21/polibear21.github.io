function renderPeople() {
    $.getJSON("about-us/Members.json", function(jsonResponse) {
      // Sort the people by last name
      jsonResponse.people.sort(function(a,b) {
        return a.lastName.localeCompare(b.lastName);
      });
  
      jsonResponse.people = jsonResponse.people.filter(person => person.firstName + " " + person.lastName !== "Wei Ding");

      $.get("about-us/about-us.hbs", function(template) {
        // Use the handlebars template to generate the HTML
        // from people's information.
        var peopleTemplate = Handlebars.compile(template);
        $("#us").append(peopleTemplate(jsonResponse));
      })
    })
  }
  
  $(document).ready(function () {
      renderPeople();
      
      $("#memberdirectorybtn").focus();
      $("#orgchart").hide();

      $("#memberdirectorybtn").click(function() {
        $("#memberdirectory").show();
        $("#orgchart").hide();
      });

      $("#orgchartbtn").click(function() {
        $("#memberdirectory").hide();
        $("#orgchart").show();
      });
 
  })


  
