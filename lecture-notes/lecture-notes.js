function populateRows() {
  $.getJSON("lecture-notes/lecture-notes.json", function(jsonResponse) {
    // Sort the lecture notes by date
    jsonResponse.lectureNotes.sort(function(a,b) {
      return new Date(a.Date) - new Date(b.Date)
    });

    $.get("lecture-notes/lecture-notes.hbs", function(template) {
      // Use the handlebars template to generate the HTML
      // from the lecture notes.
      var notesTemplate = Handlebars.compile(template);
      $("#lectureNotes tbody").append(notesTemplate(jsonResponse));
    })
  })
}

$(document).ready(function () {
    populateRows();
})


Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});