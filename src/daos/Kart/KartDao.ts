import { addNewKartDB } from './AddNewKart';
import { deleteKartDB } from './DeleteKart';
import { getKartDB } from './GetKart';
import { updateKartDB } from './UpdateKart';

export class KartDao {
  public addNewKartDB = addNewKartDB;
  public deleteKartDB = deleteKartDB;
  public getKartDB = getKartDB;
  public updateKartDB = updateKartDB;
}