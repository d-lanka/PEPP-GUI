angular.module("pepp.templates", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("tabs/home.html", "<div ng-controller=TabsCtrl><div id=tabs><ul><li ng-repeat=\"tab in tabs\" ng-class={active:isActiveTab(tab.title)} ng-click=onClickTab(tab)>{{tab.title}}</li></ul><div id=mainView><div ng-show=\"isActiveTab(\'BasicConfig\')\"><div id=viewOne><h1>Basic Config</h1><p>Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc.</p></div></div><div ng-show=\"isActiveTab(\'DataCollection\')\"><div id=viewTwo><div><h1>Data Collection</h1></div><div><form method=post name=formDataCollection><div class=form-group><label for=recordingId>File Name</label> <input type=text class=form-control required name=fileName ng-model=dataCollection.fileName placeholder=\"File Name\"> <span class=text-danger ng-if=formDataCollection.fileName.$error.required>Please enter file name.</span></div><div class=form-group><label for=recordingId>Recording ID</label> <input type=text class=form-control name=recordingId ng-model=dataCollection.recordingID placeholder=\"Recording ID\"></div><div class=form-group><label for=recordingId>Username</label> <input type=text class=form-control name=username ng-model=dataCollection.username placeholder=Username></div><div class=form-group><label for=recordingId>Identity API Key</label> <input type=text class=form-control name=identityApiKey ng-model=dataCollection.identityAPiKey placeholder=\"Identity API Key\"></div><div class=form-group><label for=recordingId>Start Date</label> <input type=text class=form-control name=startDate ng-model=dataCollection.startDate placeholder=\"Start Date\"></div><div class=form-group><label for=recordingId>End Date</label> <input type=text class=form-control name=endDate ng-model=dataCollection.endDate placeholder=\"End Date\"></div><button type=submit class=\"btn btn-default\" ng-click=\"saveConfigData($event, formDataCollection.$valid);\">Submit</button></form><br><br><div ng-if=isFileCreated><button type=submit class=\"btn btn-default\" ng-click=downloadConfigFile();>Download Config File</button></div></div></div></div><div ng-show=\"isActiveTab(\'Calls\')\"><div id=viewThree><h1>Calls</h1><p>In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu.</p></div></div><div ng-show=\"isActiveTab(\'Validate\')\"><div id=viewThree><h1>Validate</h1><p>In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu.</p></div></div><div ng-show=\"isActiveTab(\'Execute\')\"><div id=viewThree><h1>Execute</h1><p>In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu.</p></div></div></div></div></div>");
}]);