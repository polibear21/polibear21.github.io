function populateRows() {
  $.getJSON("lecture-notes/lecture-notes.json", function(lectureNotes) {
    lectureNotes.lectureNotes.sort(function(a,b) {
      return new Date(a.Date) - new Date(b.Date)
    });
    $.get("lecture-notes/lecture-notes.hbs", function(template) {
      var notesTemplate = Handlebars.compile(template);
      $("#lectureNotes tbody").append(notesTemplate(lectureNotes));
    })
  })
}

$(document).ready(function () {
    populateRows();
})
