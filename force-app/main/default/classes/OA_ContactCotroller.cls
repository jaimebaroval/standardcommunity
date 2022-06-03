public with sharing class OA_ContactCotroller {

    @AuraEnabled
    public static List<Contact> getContacts(String equipoId) {

            return [SELECT Id, FirstName, LastName, Email, EquipoId__c FROM Contact WHERE EquipoId__c != ''];
    }

    @AuraEnabled
    public static Contact cloneCard(Id Id){
        Contact cloneCont = new Contact();
        try {
            Contact contactToClone = [SELECT Id, FirstName, LastName, Email, EquipoId__c FROM Contact WHERE Id =: Id];
            cloneCont = contactToClone.clone(false, false, false, false);
            insert cloneCont;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return cloneCont;
    }

    //OA_ContactCotroller.cloneCard('0030900000BZDa1AAH');

}