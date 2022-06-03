trigger triggerCreateContact on Contact (after insert, after update) {

    if(Trigger.isAfter) {
        if(Trigger.isInsert) {
            List<contactPlatformEvent__e> contactList = new List<contactPlatformEvent__e>();

            for(Contact cont : Trigger.new) {
                contactList.add(new contactPlatformEvent__e(contactId__c = cont.Id) );
            }

            EventBus.publish(contactList);
        }

        if(Trigger.isUpdate) {

        }
    }
}