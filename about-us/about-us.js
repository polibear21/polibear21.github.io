function renderPeople() {
    $.getJSON("about-us/about-us.json", function(jsonResponse) {
      // Sort the people by last name
      jsonResponse.people.sort(function(a,b) {
        return a.lastName.localeCompare(b.lastName);
      });
  
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
  })
  