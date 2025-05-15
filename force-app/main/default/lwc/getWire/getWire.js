import { LightningElement, api, wire } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import Acc_Name from '@salesforce/schema/Account.Name';
import Acc_Rating from '@salesforce/schema/Account.Rating';
import ID from '@salesforce/schema/Account.Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
export default class GetWire extends LightningElement {
    @api recordId;
    aname;
    arate;
    @wire(getRecord, {
        recordId: "$recordId",
        fields: [Acc_Name, Acc_Rating]
    }) getRecordWire({ data, error }) {
        if (data) {
            console.log(data);
            this.aname = getFieldValue(data, Acc_Name);
            this.arate = getFieldValue(data, Acc_Rating);
        }
        else if (error) {
            console.log(error);
        }
    }
    handleName(event) {
        this.aname = event.target.value;
    }
    handleRate(event) {
        this.arate = event.target.value;
    }
    handleSubmit() {
        const inputFields = {};
        inputFields[Acc_Name.fieldApiName] = this.aname;
        inputFields[Acc_Rating.fieldApiName] = this.arate;
        inputFields[ID.fieldApiName] = this.recordId;
        const recordInput = { fields: inputFields };
        updateRecord(recordInput).then(() => {
            console.log('RecordUpdatedSuccessfully');
            this.dispatchEvent(new ShowToastEvent({
                title: 'RecordUpdated',
                message: 'Record Updated Successfully',
                variant: 'Success'
            }))
        }).catch(error => {
            console.log(error);
        })
    }
    handleDelete()
    {
        deleteRecord(this.recordId).then(()=>{
            console.log('RecordDeletedSuccessfully');
        }).catch(()=>{
            console.log('Error');
        })
    }
}