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
        for (const team of data.teams) {
            for (const teamMember of team.members) {
                let member = people.find(person => person.firstName + " " + person.lastName === teamMember.trim())
                // https://stackoverflow.com/a/26586606/14095682
                // trim() member name to still be able to get image link
                members.push([
                    {
                        'v': teamMember,
                        'f': `<img src="./images/${member.imageLink}" class="avatar"></img><div>${teamMember}</div>`
                    },
                    team.name,
                    '',
                ]);
            }
        }
        members.push([
            {
                'v': "Wei Ding",
                'f': '<img src="./images/Wei.jpg" class="avatar"></img><div>Wei Ding</div>'
            },
            "",
            '',
        ])

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
