import { Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild, Output } from '@angular/core';
import CallCategoryOpening from '../call-opening-form/models/callCategoryOpening';
import { TreeViewCategoriesConfig } from './models/tree-view-categories-config';
import { TreeviewItem, TreeviewConfig,TreeItem, TreeviewComponent } from 'ngx-treeview';
import { CallsCategoryService } from '../services/calls-category.service';
import { ToastrService } from 'ngx-toastr';
import CallCategoryOpeningResponse from '../call-opening-form/models/callCategoryOpeningResponse';
import { finalize } from 'rxjs/operators';
import SendItensSelected from './models/send-itens-selected';

@Component({
  selector: 'app-tree-view-categories',
  templateUrl: './tree-view-categories.component.html',
  styleUrls: ['./tree-view-categories.component.css']
})
export class TreeViewCategoriesComponent implements OnInit,OnDestroy {

  /*parametros que vão controlar os dados da CI*/
  public callCategoriesParentCI:Array<CallCategoryOpening>  = [];
  public isValidcallCategoriesParentCI:boolean = false;
  public isAnycallCategoriesParentCI:boolean = false;


  /*parametros que vão controlar os dados da CI*/
  public callCategoriesCI:Array<CallCategoryOpening>  = [];
  public isValidcallCategoriesCI:boolean = false;
  public isAnycallCategoriesCI:boolean = false;

  @Input() configTreeViewCategories:TreeViewCategoriesConfig = new TreeViewCategoriesConfig();
  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent | undefined;
  subsgetCallCategoriesParents:any;
  subsgetCallCategoriesFromText:any;

  /*emissor de evento das CI Selecionada*/
  @Output() sendItensSelected = new EventEmitter<SendItensSelected>()
  callCategoriesOpeningResponse:CallCategoryOpeningResponse | undefined = new CallCategoryOpeningResponse();
  /*parametros de requisição do método de expansão dos menus*/
  callCategoriesAll:Array<string> |undefined = [];
  callCategoryOpeningSelected:CallCategoryOpening |undefined = new CallCategoryOpening();
  callCategoryOpeningGet:CallCategoryOpening |undefined = new CallCategoryOpening();
  selectedCategories:Array<string> = [];
  /**/



  items: TreeviewItem[] = [];
  config:TreeviewConfig = TreeviewConfig.create({
   hasAllCheckBox: false,
   hasFilter: false,
   hasCollapseExpand: true,
   decoupleChildFromParent: false,
   maxHeight: 500
  });

  constructor(private toastr: ToastrService,
              private callsCategoryService:CallsCategoryService) {



   }

  ngOnDestroy(): void {
    //this.subsgetCallCategoriesFromText.unsubscribe();
    //this.subsgetCallCategoriesParents.unsubscribe();

  }
/*Mensagens do sistema */
  showMessageError(message:string)
  {
    this.toastr.error(message,'',{"positionClass": "toast-bottom-right"});
  }

  showWarningText(message:string)
  {
    this.toastr.warning(message,'',{"positionClass": "toast-bottom-right"});
  }

  /**selecionando as categorias */
  selectCategories()
  {
    if (this.callCategoriesCI.length == 0)
    {
      this.showWarningText(' Atenção! Selecione pelo menos uma categoria. ');
      return;
    }
    if (this.callCategoriesCI.length > 1)
    {
      this.showWarningText(' Atenção! Selecione uma categoria somente. ');
      return;
    }
    this.sendItensSelected.emit(
      {
         callCategoryOpeningParentCIChecked:this.callCategoriesCI[0]
      });
  }


  /*busca todos os selecionados que são parent CI*/
findcallCategoryOpeningCheckedChildCI(callCategoryOpening:CallCategoryOpening |undefined)
{
  callCategoryOpening?.children.forEach((el)=>{

    if (el.isCI && el.checked)
    {
     this.callCategoriesCI?.push({...el});
    }
    this.findcallCategoryOpeningCheckedChildCI(el);
 })
}

findcallCategoryOpeningCheckedCI()
{

  this.callCategoriesOpeningResponse?.root.children.forEach((el)=>{

     if (el.isCI  && el.checked )
     {
      this.callCategoriesCI?.push({...el});
     }
     this.findcallCategoryOpeningCheckedChildCI(el);

  })

}

  searchCategories(txtSearchCategory:string)
  {

    this.getCallCategoriesFromText(txtSearchCategory);

  }

  /*popula array de categorias carregadas*/
  treatCallCategoriesResponseItem(callCategoryOpening:CallCategoryOpening | undefined)
  {
    callCategoryOpening?.children.forEach(el=>{

      this.callCategoriesAll?.push(el.value);
      this.treatCallCategoriesResponseItem(el)

    });

  }

  treatcallCategoriesCI()
  {
    this.callCategoriesCI = [];
    this.isAnycallCategoriesCI = false;
    this.isValidcallCategoriesCI = false;
    this.findcallCategoryOpeningCheckedCI();
    this.isAnycallCategoriesCI = this.callCategoriesCI.length > 0;
    this.isValidcallCategoriesCI = this.callCategoriesCI.length == 1;
  }

  treatcallCategoriesParentCI()
  {
    this.callCategoriesParentCI = [];
    this.isAnycallCategoriesParentCI = false;
    this.isValidcallCategoriesParentCI = false;
    this.findcallCategoryOpeningCheckedParentCI();
    this.isAnycallCategoriesParentCI = this.callCategoriesParentCI.length > 0;
    this.isValidcallCategoriesParentCI = this.callCategoriesParentCI.length == 1;
  }

  treatCallCategoriesResponse(callCategoryOpeningResponse:CallCategoryOpeningResponse | undefined)
  {

    this.callCategoriesOpeningResponse = callCategoryOpeningResponse;
    this.callCategoriesAll = [];
    callCategoryOpeningResponse?.root.children.forEach(element => {

      this.callCategoriesAll?.push(element.value);
      this.treatCallCategoriesResponseItem(element)
       });
       this.treatcallCategoriesParentCI();
  }

  getCallCategoriesFromText(text:string)
  {

   this.subsgetCallCategoriesFromText =  this.callsCategoryService.getCallCategoriesFromText(text).subscribe((subs)=>{
   this.treatCallCategoriesResponse(subs.data);
   let root:any =  subs.data?.root
   this.items = [new TreeviewItem(root)]
    }, error =>{
      this.callsCategoryService.serviceError(error)
    });
  }


  onEnterInputSearchCategory(txtSearchCategory:string)
  {
    this.getCallCategoriesFromText(txtSearchCategory);
  }

  selectChildren(i: TreeviewItem) {

    i.collapsed = false;

    if (i.children) {

        this.selectInsideChildren(i);

        i.checked = !i.checked;
    }

    this.treeviewComponent?.raiseSelectedChange();

}

/*busca todos os selecionados que são parent CI*/
findcallCategoryOpeningCheckedChildParentCI(callCategoryOpening:CallCategoryOpening |undefined)
{
  callCategoryOpening?.children.forEach((el)=>{

    if (el.isParentCI && el.checked)
    {
     this.callCategoriesParentCI?.push({...el});
    }
    this.findcallCategoryOpeningCheckedChildParentCI(el);
 })
}

findcallCategoryOpeningCheckedParentCI()
{

  this.callCategoriesOpeningResponse?.root.children.forEach((el)=>{

     if (el.isParentCI  && el.checked )
     {
      this.callCategoriesParentCI?.push({...el});
     }
     this.findcallCategoryOpeningCheckedChildParentCI(el);

  })

}

/*atualiza a lista atual com os checados*/
updateCallCategoryOpeningCheckedChild(callCategoryOpening:CallCategoryOpening |undefined)
{
  callCategoryOpening?.children.forEach((el)=>{

    if (this.selectedCategories.includes(el.value))
    {
      el.checked = true;
    }else
    {
      el.checked = false;
    }
    this.updateCallCategoryOpeningCheckedChild(el);
 })
}

udateCallCategoryOpeningChecked()
{

  this.callCategoriesOpeningResponse?.root.children.forEach((el)=>{

     //selectedCategories
     if (this.selectedCategories.includes(el.value))
     {
       el.checked = true;
     }else
     {
       el.checked = false;
     }
     this.updateCallCategoryOpeningCheckedChild(el);
  })

}



findcallCategoryOpeningSelectedChild(callCategoryOpening:CallCategoryOpening |undefined,id:string)
{
  callCategoryOpening?.children.forEach((el)=>{

    if(el.value == id)
    {
      this.callCategoryOpeningSelected = {...el}
      return;
    }
    this.findcallCategoryOpeningSelectedChild(el,id);
 })
}

findcallCategoryOpeningSelected(id:string)
{

  this.callCategoriesOpeningResponse?.root.children.forEach((el)=>{

     if(el.value == id)
     {
       this.callCategoryOpeningSelected = {...el}
       return;
     }
     this.findcallCategoryOpeningSelectedChild(el,id);

  })

}
selectInsideChildren(item:any) {

  item.children.forEach((i:any) => {

      i.checked = !i.checked;

      if (i.children) {

          this.selectInsideChildren(i);

      }

  });
}

selectedItem(item: TreeviewItem)
{

  this.findcallCategoryOpeningSelected(item.value);

  let test = item as any
  console.log(test);

  this.callsCategoryService.getCallCategoriesChildrenNodes({
    allCallCategoriesCheked: this.selectedCategories,
    callCategoryChecked:this.callCategoryOpeningSelected?.value,
    allCallCategories:this.callCategoriesAll
  })
  .pipe(finalize(()=>{
   // this.loadCategories = false;
  }))
  .subscribe((subs)=>{
     this.treatCallCategoriesResponse(subs.data);
     let root:any =  subs.data?.root
     this.items = [new TreeviewItem(root)]

  }, error => this.callsCategoryService.serviceError(error));

}

onSelectedChange(ev:Array<string>)
  {
    this.selectedCategories = ev;
    this.udateCallCategoryOpeningChecked();
    this.treatcallCategoriesCI();
  }




  onFilterChange(ev:any)
  {


  }

/*busca call category por id*/
getCallCategoryOpeningChild(callCategoryOpening:CallCategoryOpening |undefined, id:string)
{
  callCategoryOpening?.children.forEach((el)=>{

    if (el.value == id)
    {
     this.callCategoryOpeningGet = {...el};
     return;
    }
    this.getCallCategoryOpeningChild(el,id);
 })
}

getCallCategoryOpening(id:string)
{

  this.callCategoriesOpeningResponse?.root.children.forEach((el)=>{

     if (el.value == id)
     {
      this.callCategoryOpeningGet = {...el};
      return;
     }
     this.getCallCategoryOpeningChild(el,id);
  })

}

  ngOnInit(): void {
    this.subsgetCallCategoriesParents =   this.callsCategoryService.getCallCategoriesParentsResponse().subscribe((subs)=>{
      this.treatCallCategoriesResponse(subs.data);
      let root:any =  subs.data?.root
      this.items = [new TreeviewItem(root)]
    }, error =>{
      this.callsCategoryService.serviceError(error)
        console.log(error)
    });

  }
}
