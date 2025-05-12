import { LightningElement, wire, api } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { createRecord } from 'lightning/uiRecordApi';
import Account from '@salesforce/schema/Account';
import Name from '@salesforce/schema/Account.Name';
import Rating from '@salesforce/schema/Account.Rating';
export default class CreateLightningWire extends LightningElement {
    @api recordId;
    name;
    radio;
    @wire(getObjectInfo, {
        objectApiName: Account
    }) getObject

    @wire(getPicklistValues, {
        recordTypeId: "$getObject.data.defaultRecordTypeId",
        fieldApiName: Rating
    }) getpicklist;
    
    handleSubmit()
    {
        const fields={};
        fields[Name.fieldApiName] = this.name;
        fields[Rating.fieldApiName] = this.radio;
        const recordInput ={
                              apiName : Account.objectApiName,
                              fields :fields
                                
                         };
        console.log(fields);
        createRecord(recordInput).then(()=>{
            console.log('RecordInsertedSuccessfully');
        }).catch(error=>{
            console.log(error);
        })
    }

    handleName(event)
    {
       this.name =event.target.value;
    }
    handleRadio(event)
    {
        this.radio = event.target.value;
        console.log(this.radio);
    }
}