function getChemicals()
{
  var xhttp = new XMLHttpRequest

  // Response Parsing on state change
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Clear old table in case of update/multiple requests
      var oldData = document.getElementById("rtrndata");
      oldData.parentNode.removeChild(oldData);

      // Parse JSON object into variable
      var responseObject = JSON.parse(this.responseText);

      // Generate Table
      var usrRtrn = document.getElementById("userReturn");
      var tbl = document.createElement("table");
      tbl.setAttribute("id", "rtrndata");

      // Table Headers
      var thd = document.createElement("thead");
      for (var i = 0; i < 6; i++) {
        var th = document.createElement("th");
        switch (i) {
          case 0:
            th.innerHTML = "Chemical ID";
            break;
          case 1:
            th.innerHTML = "Chemical Name";
            break;
          case 2:
            th.innerHTML = "Purpose";
            break;
          case 3:
            th.innerHTML = "Company Name";
            break;
          case 4:
            th.innerHTML = "Ingredients";
            break;
          case 5:
            th.innerHTML = "Manual Link";
            break;
        }
        thd.appendChild(th);
      }
      tbl.appendChild(thd);

      // Table Body
      var tbod = document.createElement("tbody")
      for (var i = 0; i < responseObject.chemicals.length; i++) {
        var trow = document.createElement("tr");
        for (var j = 0; j < 6; j++) {
          var td = document.createElement("td");
          switch (j) {
            case 0:
              td.innerHTML = responseObject.chemicals[i].id;
              break;
            case 1:
              td.innerHTML = responseObject.chemicals[i].name;
              break;
            case 2:
              td.innerHTML = responseObject.chemicals[i].purpose;
              break;
            case 3:
              td.innerHTML = responseObject.chemicals[i].company_name;
              break;
            case 4:
              td.innerHTML = responseObject.chemicals[i].ingredients;
              break;
            case 5:
              td.innerHTML = responseObject.chemicals[i].manual_link;
              break;
          }
          trow.appendChild(td);
        }
        tbod.appendChild(trow);
      }
      tbl.appendChild(tbod);
      usrRtrn.appendChild(tbl);
    }
  };

  // Send Get Request
  xhttp.open("GET", database + "/", true);
  xhttp.send();
}
