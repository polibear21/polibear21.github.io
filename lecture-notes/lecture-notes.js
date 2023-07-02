function populateRows() {
  $.getJSON("lecture-notes/lecture-notes.json", (jsonResponse) => {
    // Sort the lecture notes by date
    jsonResponse.lectureNotes.sort((a, b) => {
      return -(new Date(a.Date) - new Date(b.Date));
    });

    $.get("lecture-notes/lecture-notes.hbs", (template) => {
      // Use the handlebars template to generate the HTML
      // from the lecture notes.
      var notesTemplate = Handlebars.compile(template);
      $("#lectureNotes tbody").append(notesTemplate(jsonResponse));
    });
  });
}

$(document).ready(() => {
  populateRows();
});

Handlebars.registerHelper("inc", (value, options) => {
  return parseInt(value) + 1;
});
