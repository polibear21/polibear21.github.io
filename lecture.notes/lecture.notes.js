function populateRows() {
  $.each(lectureNotes, function (index, lectureNotes) {
    var tableRow = "<tr>";
    tableRow += "<td>" + lectureNotes.Date + "</td>";
    tableRow += "<td>" + '<a href=' + lectureNotes.Link + '>' + lectureNotes.Topic + '</a>' + "</td>";
    tableRow += "<td>" + lectureNotes.Presenter + "</td>";
    tableRow += "<td>" + lectureNotes.Description + "</td>";
    tableRow += "</tr>";
    $("table tbody").append(tableRow);
  });
}

$(document).ready(function () {
    populateRows();
});
