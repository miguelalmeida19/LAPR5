import {Component} from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {User} from "../../../domain/user";
import {Role} from "../../../domain/role";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = [];
  roles: string[] = [];
  entity: string = "User"
  labels: string[] = [
    "First Name",
    "Last Name",
    "PhoneNumber",
    "Email",
    "Role"
  ]
  props: string[] = [
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "role"
  ]

  constructor(private userService: UsersService, private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe(roles => this.roles = roles.map(role => role.name));
  }

  add = (args: any): void => {
    this.userService.addUser(args)
      .subscribe((response: any) => {
        if (response.userDTO !== undefined) {
          // Remove the password field
          const { password, ...userWithoutPassword } = response.userDTO;
          this.users.push(userWithoutPassword);
        }
      });
  }


}
