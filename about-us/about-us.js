function renderPeople() {
  $.getJSON("about-us/Members.json", function (members) {
    $.get("about-us/member.hbs", function (template) {
      const peopleTemplate = Handlebars.compile(template);
      $("#leader").append(peopleTemplate(members.leader));
      $("#member").append(peopleTemplate(members.member));
    });
  });
}

$(document).ready(function () {
  renderPeople();

  $("#memberdirectorybtn").focus();
  $("#orgchart").hide();
  $("#groupphoto").hide();
  $("#Awards").hide();
  $("#resources").hide();

  $("#memberdirectorybtn").click(function () {
    $("#memberdirectory").show();
    $("#orgchart").hide();
    $("#groupphoto").hide();
    $("#Awards").hide();
    $("#resources").hide();

  });

  $("#orgchartbtn").click(function () {
    $("#memberdirectory").hide();
    $("#groupphoto").hide();
    $("#orgchart").show();
    $("#Awards").hide();
    $("#resources").hide();

  });

  $("#groupphotobtn").click(()=>{
    $("#groupphoto").show();
    $("#memberdirectory").hide();
    $("#orgchart").hide();
    $("#Awards").hide();
    $("#resources").hide();

  })
  $("#awardsbtn").click(()=>{
    $("#groupphoto").hide();
    $("#memberdirectory").hide();
    $("#orgchart").hide();
    $("#Awards").show();
    $("#resources").hide();

  })
  $("#resourcesbtn").click(()=>{
    $("#groupphoto").hide();
    $("#memberdirectory").hide();
    $("#orgchart").hide();
    $("#Awards").hide();
    $("#resources").show();

  })
});
