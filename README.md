# Network Tester

The Network Tester application is a simple website that can be used to test client networks to verify  endpoints required for Application Modernization Workshops. The tests are run via a client browser using Javascript to access the required endpoints.

It can be customized to test any http/https endpoints.

## Running locally

1. Clone this repo

2. Open the file **index.html** with your browser and click on the **Start Test** button

## Running on Cloud Foundry on the IBM Cloud

1. Clone this repo

2. Edit the file **manifest.yml** and enter a unique **host** for the Cloud Foundry application.

3. Push the application using the IBM Cloud CLI

   ```ibmcloud cf push
   ```
## Customizing

To customize you'll need to install (Node.js 8.x)[https://nodejs.org/en/download/] or later with **npm** and (browserify)[]

1. Clone this repo

2. To modify the endpoints tested edit the file **app.js**. Modify the function **global.handleClick** and  replace the http/https endpoints with the ones you want tested.
e.g.
```
  results.push(await checkURL("https://github.com",20,"Verifying access to github"));
  results.push(await checkURL("https://cloud.ibm.com",40,"Verifying access to IBM Cloud"));
  results.push(await checkURL("http://169.62.47.198",60,"Verifying access to Terminal Server"));
  results.push(await checkURL("https://petclinic-postgresql-petclinic.apps.ocp.kubernetes-workshops.com",80,"Verifying access to OpenShift master"));
  results.push(await checkURL("http://petclinic-postgresql-petclinic.apps.ocp.kubernetes-workshops.com",100,"Verifying access to OpenShift applications"));
```  
The **checkURL** function takes 3 parameters for each test:

   i) The URL of the endpoint to test
  ii) The state of the progress bar (ie percent complete) after the test is complete
 iii) The description of the tested

3. Save changes to **app.js** and any other files and then run the following commands to regenerate the Javascript file **bundle.js**.
```
   npm install
   browserify app.js -o bundle.js
```

## Troubleshooting failed tests

Look at your Javascript console in your browser for more details about failed tests.
