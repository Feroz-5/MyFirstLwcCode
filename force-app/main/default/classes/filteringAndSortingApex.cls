public with sharing class filteringAndSortingApex {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getAccountData()
    {
        return[select id,Name,Email,Title from Contact];
    }
}