import { LightningElement, wire, track, api } from 'lwc';
import APEX_CLASS from '@salesforce/apex/filteringAndSortingApex.getAccountData';
export default class FilteringAndSorting extends LightningElement {

    heading = ["Id", "Name", "Email", "Title"];
    fullTableData = [];
    filterData = [];
    timer;
    filterBy = "Name";
    sortBy = "Name"
    sortDirection = 'asc';
    @wire(APEX_CLASS) controller({ data, error }) {
        if (data) {
            console.log(data);
            this.fullTableData = data;
            this.filterData = data;
        }
        else if (error) {
            console.log(error);
        }
    }

    handleFilter(event) {
        const { value } = event.target;
        if (value) {
            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                console.log(value);
                this.filterData = this.fullTableData.filter(eachObj => {
                    if (this.filterBy == 'ALL') {
                        return Object.keys(eachObj).some(key => {
                            return eachObj[key].toLowerCase().includes(value);
                        })
                    }
                    else {
                        const val = eachObj[this.filterBy] ? eachObj[this.filterBy] : ''
                        return val.toLowerCase().includes(value);
                    }
                })
            }, 500)

        }
        else {
            this.filterData = [...this.fullTableData];
        }
    }

    get FilterByValue() {
        return [
            { label: 'ALL', value: 'ALL' },
            { label: 'Id', value: 'Id' },
            { label: 'Name', value: 'Name' },
            { label: 'Email', value: 'Email' },
            { label: 'Title', value: 'Title' },
        ]
    }

    handle(event) {
        this.filterBy = event.target.value;
    }
    callSort(event) {
        this.sortBy = event.target.value;
        this.filterData = [...this.sortingTech(this.filterData)];
    }
    sortingTech(data) {
        const clone = [...data];
        clone.sort((a, b) => {
            if (a[this.sortBy == b[this.sortBy]]) {
                return 0;
            }
            return this.sortDirection == 'desc' ? a[this.sortBy] > b[this.sortBy] ? -1 : 1 :
                a[this.sortBy] < b[this.sortBy] ? -1 : 1
        })
        return clone;
    }
}
