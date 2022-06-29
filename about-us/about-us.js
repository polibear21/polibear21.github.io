
function renderPeople() {
    $.getJSON("about-us/Members.json", function(jsonResponse) {

      // founding member section
      jsonResponse.founding = jsonResponse.founding.filter(person => person.firstName + " " + person.lastName !== "Wei Ding");


      // leader section
      jsonResponse.leader = jsonResponse.leader.filter(person => person.firstName + " " + person.lastName !== "Wei Ding");

      // team member section
      jsonResponse.member = jsonResponse.member.filter(person => person.firstName + " " + person.lastName !== "Wei Ding");

      console.log(jsonResponse.founding)
      console.log(jsonResponse.leader)
      console.log(jsonResponse.member)

      $.get("about-us/about-us.hbs", function(template) {
        // Use the handlebars template to generate the HTML
        // from people's information.
        var peopleTemplate = Handlebars.compile(template);
        $("#member").append(peopleTemplate(jsonResponse));
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


  
