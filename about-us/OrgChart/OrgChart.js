function SetOrgChart() {
    $.getJSON("about-us/Members.json", function(jsonResponse) {
        var teams = jsonResponse.teams.map(function(team) {
            var leadHTML = '';
            
            for (var i = 0; i < team.leads.length; i++) {
                var imgLink = jsonResponse.people.find(person => person.firstName + " " + person.lastName === team.leads[i]).imageLink;
                leadHTML += '<div class = "leader">' + '<img src="../images/' + imgLink + '" class="avatar"></img>' + '<div>' + team.leads[i] + '</div></div>';
                
            }
            return [{'v':team.name, 'f':'<div class="teamName">' + team.name + '</div>' + 
            '<div>Project/team descriptions here</div>' + '<div class="leaders">' + leadHTML}, "Wei Ding", '']
        })

        var people = [];
        for (var i = 0; i < jsonResponse.people.length; i++) {
            var person = jsonResponse.people[i];
            var fullName = person.firstName + " " + person.lastName;
            if (!isLead(fullName, jsonResponse.teams)) {
              var team = jsonResponse.teams.find(team => team.members.includes(fullName));
            if (team === undefined && fullName != "Wei Ding")
                team = 'Wei Ding';
            else if(fullName === "Wei Ding") 
                team = '';
            else 
                team =  team.name;
            people.push([{'v':fullName, 'f': '<img src="../images/' + person.imageLink + '" class="avatar"></img>' + '<div>' + fullName + '</div>'}, team, ''])  
            }
        }
        console.log(people);

    google.charts.load('current', {packages:["orgchart"]});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');

        // For each orgchart box, provide the name, manager, and tooltip to show.
        data.addRows(teams);
        data.addRows(people);

        // Create the chart.
        var chart = new google.visualization.OrgChart(document.getElementById('orgchart'));
        // Draw the chart, setting the allowHtml option to true for the tooltips.
        chart.draw(data, {'allowHtml':true, size: 'small'});
      }
    })
}

function isLead(name, teams) {
    for (var i = 0; i < teams.length; i++) {
        if (teams[i].leads.find(lead => lead === name))
            return true;
    }

    return false;
}
  
$(document).ready(function () {
    SetOrgChart();
})
  