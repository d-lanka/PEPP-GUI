# PEPP-GUI

Folder Structure

build-files - This folder contains gulp task runner tasks, node modules and bower modules which require for client application

client - This folder contains client application. This client application created using angular. This is where user provide parameters require to create config file.

server - This folder contains the server application. This application created using nodejs. This is where config file create and deliver to the client application when it request.

Steps to start the application.

Step 01 - First create two folders call "public" and "views" under "server" folder.

Step 02 - Run command "npm install" inside the "build-flies" folder and "server" folder.

Step 03 - Run command "bower install" inside the "build-flies" folder.

Step 04 - Run command "gulp release" inside the "build-flies" folder.

Step 05 - Run command "node app.js" from server folder.

Step 06 - Open browser and Put the url as "http://localhost:8091/#/tab/"

NOTE: The step 01 to 04 must do only once successfully. The step 05 must repeat if you stop nodejs server. The step 06 must do everytime after step 05.

