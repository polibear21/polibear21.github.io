function renderPeople() {
  $.getJSON("about-us/Members.json", function (jsonResponse) {
    $.get("about-us/founding.hbs", function (template) {
      var peopleTemplate = Handlebars.compile(template);
      $("#founding").append(peopleTemplate(jsonResponse));
    });

    $.get("about-us/leader.hbs", function (template) {
      var peopleTemplate = Handlebars.compile(template);
      $("#leader").append(peopleTemplate(jsonResponse));
    });

    $.get("about-us/member.hbs", function (template) {
      var peopleTemplate = Handlebars.compile(template);
      $("#member").append(peopleTemplate(jsonResponse));
    });
  });
}

$(document).ready(function () {
  renderPeople();

  $("#memberdirectorybtn").focus();
  $("#orgchart").hide();

  $("#memberdirectorybtn").click(function () {
    $("#memberdirectory").show();
    $("#orgchart").hide();
  });

  $("#orgchartbtn").click(function () {
    $("#memberdirectory").hide();
    $("#orgchart").show();
  });
});
