'use strict';
var NewConversationModalInstanceCtrl = ['$scope', '$rootScope', '$modalInstance', 'GroupService', 'RoleService',
    'UserService', 'ConversationService',
    function ($scope, $rootScope, $modalInstance, GroupService, RoleService, UserService, ConversationService) {
        var i;

        var init = function() {
            var isSuperAdmin = UserService.checkRoleExists('GLOBAL_ADMIN', $rootScope.loggedInUser);

            delete $scope.errorMessage;
            $scope.newConversation = {};
            $scope.newConversation.recipients = [];
            $scope.conversationGroups = [];

            GroupService.getMessagingGroupsForUser($scope.loggedInUser.id).then(function(successResult) {

                var myGroups = [];

                for (var i = 0; i < successResult.length; i++) {
                    var group = successResult[i];
                    if (group.code !== 'Generic') {
                        if(!isSuperAdmin) {
                            group.originalGroup = group.groupType.value;
                            if (ConversationService.memberOfGroup(group)) {
                                group.groupType.value = 'MY_GROUP';
                                group.name = group.name + ' (' + group.groupType.description + ')';
                                group.groupType.description = 'My Groups';
                            } else {
                                group.groupType.value = 'OTHER_GROUP';
                                group.name = group.name + ' (' + group.groupType.description + ')';
                                group.groupType.description = 'Other Groups';
                            }
                        }
                        myGroups.push(group);
                    }
                }

                $scope.conversationGroups = $scope.conversationGroups.concat(myGroups);
            }, function(failResult) {
                $scope.errorMessage = failResult.data;
            });
        };

        $scope.ok = function () {
            delete $scope.errorMessage;
            $scope.sendingMessage = true;

            // build correct conversation from newConversation
            var conversation = {};
            conversation.type = 'MESSAGE';
            conversation.title = $scope.newConversation.title;
            conversation.messages = [];
            conversation.open = true;

            // build message
            var message = {};
            message.user = {};
            message.user.id = $scope.loggedInUser.id;
            message.message = $scope.newConversation.message;
            message.type = 'MESSAGE';
            conversation.messages[0] = message;

            // add conversation users from list of users (temp anonymous = false)
            var conversationUsers = [];
            for (i=0; i<$scope.newConversation.recipients.length; i++) {
                conversationUsers[i] = {};
                conversationUsers[i].user = {};
                conversationUsers[i].user.id = $scope.newConversation.recipients[i].id;
                conversationUsers[i].anonymous = false;
            }

            // add logged in user to list of conversation users
            var conversationUser = {};
            conversationUser.user = {};
            conversationUser.user.id = $scope.loggedInUser.id;
            conversationUser.anonymous = false;
            conversationUsers.push(conversationUser);

            conversation.conversationUsers = conversationUsers;

            ConversationService.create($scope.loggedInUser, conversation).then(function() {
                $modalInstance.close();
                delete $scope.sendingMessage;
            }, function(result) {
                if (result.data) {
                    $scope.errorMessage = ' - ' + result.data;
                } else {
                    $scope.errorMessage = ' ';
                }
                delete $scope.sendingMessage;
            });
        };

        $scope.cancel = function () {
            delete $scope.errorMessage;
            $modalInstance.dismiss('cancel');
        };

        init();
    }];
