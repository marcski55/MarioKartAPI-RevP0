import { addNewPartDB } from './AddNew';
import { deletePartDB } from './Delete';
import { getPartDB } from './Get';
import { updatePartDB } from './Update';
export class PartDao {
    constructor() {
        this.addNewPartDB = addNewPartDB;
        this.deletePartDB = deletePartDB;
        this.getPartDB = getPartDB;
        this.updatePartDB = updatePartDB;
    }
}
