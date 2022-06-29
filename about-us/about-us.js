function renderPeople() {
    $.getJSON("about-us/Members.json", function(jsonResponse) {

      // founding member section
      jsonResponse.founding = jsonResponse.founding.filter(person => person.firstName + " " + person.lastName !== "Wei Ding");

      $.get("about-us/about-us.hbs", function(template) {
        // Use the handlebars template to generate the HTML
        // from people's information.
        var peopleTemplate = Handlebars.compile(template);
        $("#founding").append(peopleTemplate(jsonResponse));
      })

      // leader section
      jsonResponse.leader = jsonResponse.leader.filter(person => person.firstName + " " + person.lastName !== "Wei Ding");

      $.get("about-us/about-us.hbs", function(template) {
        // Use the handlebars template to generate the HTML
        // from people's information.
        var peopleTemplate = Handlebars.compile(template);
        $("#leader").append(peopleTemplate(jsonResponse));
      })

      // team member section
      jsonResponse.member = jsonResponse.member.filter(person => person.firstName + " " + person.lastName !== "Wei Ding");

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


  
