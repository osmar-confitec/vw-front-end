import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private usersService:UsersService,private toastr: ToastrService) { }

  public usersSeach:Array<Users> = [];
  public usersEmpty:boolean = false;
  @Output() selectedUser = new EventEmitter<Users>();

  ngOnInit(): void {
    this.usersEmpty  = this.usersSeach.length == 0 ;
  }


  showMessageAlert(message:string)
  {
    this.toastr.warning(message,'',{"positionClass": "toast-bottom-right"});
  }

  selectUser(user:Users)
  {
    this.selectedUser.emit(user);
  }

  searchUsers(txt:string)
  {
    if (!txt || txt.length <= 3)
    {
        this.showMessageAlert('Atenção digite pelo menos três caracteres para pesquisa');
        return;
    }
    let user = new Users();
    user.name = txt;
    this.usersService.getUsers(user).subscribe((subs)=>{
      this.usersSeach = subs.data ?? [];
      this.usersEmpty  = this.usersSeach.length == 0 ;
    },error=>this.usersService.serviceError(error))
  }

}
