public with sharing class heroInfoController {
    
    @AuraEnabled
    public static Contact heroInfoController() {
        String contact = [SELECT ContactId FROM User WHERE Id =: UserInfo.getUserId()].ContactId;
        return [SELECT AccountId, Email FROM Contact WHERE Id ='0030900000BZQRTAA5'];
    }
}