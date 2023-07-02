function renderPeople() {
  $.getJSON("about-us/Members.json", function (members) {
    $.get("about-us/member.hbs", function (template) {
      const peopleTemplate = Handlebars.compile(template);
      $("#founding").append(peopleTemplate(members.founding));
      $("#leader").append(peopleTemplate(members.leader));
      $("#member").append(peopleTemplate(members.member));
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
