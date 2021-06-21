import { addNewKartDB } from './AddNewKart';
import { deleteKartDB } from './DeleteKart';
import { getKartDB } from './GetKart';
import { updateKartDB } from './UpdateKart';
export class KartDao {
    constructor() {
        this.addNewKartDB = addNewKartDB;
        this.deleteKartDB = deleteKartDB;
        this.getKartDB = getKartDB;
        this.updateKartDB = updateKartDB;
    }
}
