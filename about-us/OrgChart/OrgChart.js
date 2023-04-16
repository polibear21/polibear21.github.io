function SetOrgChart() {
    $.getJSON("about-us/Members.json", (data) => {
        const people = data.member.concat(data.leader).concat(data.founding);
        var teams = data.teams.map((team) => {
            let leadHTML = '';
            
            for (let i = 0; i < team.leads.length; i++) {
                let imageLink = people.find((person) => person.firstName + " " + person.lastName === team.leads[i]).imageLink;
                leadHTML += '<div class = "leader">' + '<img src="./images/' + imageLink + '" class="avatar"></img>' + '<div>' + team.leads[i] + '</div></div>';
            }
            return [{'v':team.name, 'f':'<div class="teamName">' + team.name + '</div>' + 
            '<div class="leaders">' + leadHTML}, "Wei Ding", '']
        })

        const members = [];
        for (const person of people) {
            let fullName = person.firstName + " " + person.lastName;
            if (!isLead(fullName, data.teams)) {
                let team = data.teams.find(team => team.members.includes(fullName));
                if (team === undefined && fullName != "Wei Ding") {
                    team = 'Wei Ding';
                } else if (fullName === "Wei Ding") {
                    team = '';
                } else {
                    team = team.name;
                }
                members.push([
                    {
                        'v': fullName,
                        'f': '<img src="./images/' + person.imageLink + '" class="avatar"></img>' + '<div>' + fullName + '</div>'
                    },
                    team,
                    '',
                ]);
            }
        }

        google.charts.load('current', { packages: ["orgchart"] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('string', 'Manager');
            data.addColumn('string', 'ToolTip');

            // For each orgchart box, provide the name, manager, and tooltip to show.
            data.addRows(teams);
            data.addRows(members);

            // Create the chart.
            var chart = new google.visualization.OrgChart(document.getElementById('orgchart'));
            // Draw the chart, setting the allowHtml option to true for the tooltips.
            chart.draw(data, { 'allowHtml': true, size: 'small' });
        }
    })
}

function isLead(name, teams) {
    for (const team of teams) {
        if (team.leads.includes(name)) {
            return true;
        }
    }
    return false;
}

$(document).ready(function () {
    SetOrgChart();
})
