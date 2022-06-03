public with sharing class listNombre {

    @AuraEnabled
    
    public static List<Contact> listNombre(String userId) {

        List<Contact> contactList = new List<Contact>([SELECT Name FROM Contact WHERE Id =: userId ]);

        return contactList;

        // '0030900000BZDa1AAH'
    }
}

// List<Contact> contactList = new List<Contact>();
//         try {
//             contactList = [SELECT Name FROM Contact WHERE Id =: userId ];
//             return contactList;
//         } catch (Exception e) {
//             throw new AuraHandledException(e.getMessage());
//         }