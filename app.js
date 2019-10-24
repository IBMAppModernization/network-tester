 //window.$ = window.jQuery = require('jquery');
 var isReachable = require('is-reachable');


 async function checkURL(url, progress, testName) {
    console.log("checkURL called");

    const reachable  = await isReachable(url, {timeout: 10000});
    console.log(typeof reachable);
    console.log("URL " + url + " returned " + reachable);
    var resultTable = window.document.getElementById("resultTable");
    var row = resultTable.insertRow(-1);
    row.className = "resultRow";
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.className = "col1";
    cell2.className = "col2";
    cell1.innerHTML = testName;

    if (reachable) {
      console.log('URL is reachable');
      cell2.innerHTML = '<img class="check" src="green_check.png" /> Verified';
    }
    else {
      console.log('URL is not reachable');
      cell2.innerHTML = '<img class="check" src="red_x.png" /> Failed';
    }
    window.document.getElementById("progressBar").style.width = progress + "%";
    window.document.getElementById('progressBar').setAttribute("aria-valuenow", progress);
    window.document.getElementById('progressBar').innerHTML = progress + "%";

    return reachable;

 }

global.handleClick = async function() {
  //console.log("button clicked "  + window.url);
  if (window.document.getElementById("resultsSection").style.display === "block")
     window.document.getElementById("resultsSection").style.display = "none";
  window.document.getElementById("resultTable").innerHTML="";
  window.document.getElementById("progressBar").removeAttribute("style");
  window.document.getElementById("progressBarSection").style.display = "block";

  var results = [];
  results.push(await checkURL("https://github.com",20,"Verifying access to github.com"));
  results.push(await checkURL("https://cloud.ibm.com",40,"Verifying access to IBM Cloud"));
  results.push(await checkURL("https://workshop.shell.cloud.ibm.com",60,"Verifying access to Terminal Server"));
  results.push(await checkURL("https://petclinic-postgresql-petclinic.apps.ocp.kubernetes-workshops.com",80,"Verifying access to OpenShift master"));
  results.push(await checkURL("http://petclinic-postgresql-petclinic.apps.ocp.kubernetes-workshops.com",100,"Verifying access to OpenShift applications"));

  var allPassed = true;
  for (var i = 0; i < results.length; i++) {
     if (!results[i]) {
        allPassed = false;
        break;
     }

  }

  if (allPassed)
     window.document.getElementById("resultBanner").innerHTML = 'Your network is &nbsp;<img class="check" src="green_check.png" /><span style="font-weight: bold">COMPATIBLE</span>';
  else
     window.document.getElementById("resultBanner").innerHTML = 'Your network is &nbsp;<img class="check" src="red_x.png" /><span style="font-weight: bold">INCOMPATIBLE</span>';

  window.document.getElementById("resultsSection").style.display = "block";
}
