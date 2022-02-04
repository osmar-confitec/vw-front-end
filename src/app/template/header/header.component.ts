import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  public users:Users = new Users();
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {

    this.usersService.getUsersLogged().subscribe((subs)=>{
      this.users =  subs.data ?? new Users();
    },error=>this.usersService.serviceError(error))

  }

}
