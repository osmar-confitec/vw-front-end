export default class CallCategoryOpening
{
  text:string = '';
  value:string = '';
  checked:boolean = false;
  children:CallCategoryOpening[] = [];
  parentId:string = '';
  path:string = '';
  level:number = 0;
  isCI:boolean = false;
  isParentCI:boolean = false;
  qtdChildren:number = 0;
}
