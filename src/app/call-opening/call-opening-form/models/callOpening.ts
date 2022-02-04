import { CallOpeningFiles } from "./call-opening-files";
import CallCategoryOpening from "./callCategoryOpening";

export default class CallOpening {
  email:string = '';
  name:string = '';
  telephone:string = '';
  userId:string = '';
  plate:string = '';
  cellPhone:string = '';
  workschedule:string = '';
  collaborator:string = '';
  locality:string = '';
  reference:string = '';
  ala:string = '';
  floor:string = '';
  side:string = '';
  column:string = '';
  nameContact:string = '';
  phoneContact:string = '';
  emailContact:string = '';
  title:string = '';
  description:string = '';
  root:CallCategoryOpening = new CallCategoryOpening();
  categoriesSelected:string = '';
  categoryParentCI:string = '';
  callOpeningFiles:Array<CallOpeningFiles> = [];
  categoriesSelectedCollection:Array<string> = [];
  constructor()
  {


  }
}
