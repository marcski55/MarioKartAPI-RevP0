import { addNewPartDB } from './AddNew';
import { deletePartDB } from './Delete';
import { getPartDB } from './Get';
import { updatePartDB } from './Update';

export class PartDao {
  public addNewPartDB = addNewPartDB;
  public deletePartDB = deletePartDB;
  public getPartDB = getPartDB;
  public updatePartDB = updatePartDB;
}