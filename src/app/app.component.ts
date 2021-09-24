import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{
  
  displayedColumns: string[] = ['ToDoList', 'DeleteToDoItem'];
   todolist : ToDoList[] = [];
   item : ToDoList = {id : 0, value : ''};
   dataSource = new MatTableDataSource();
   id : number = 1;
   editId : number = 0;

   ngOnInit(): void {
    this.SetToDoList();
    this.dataSource.data = this.ShowAllList();
  }

  SetToDoList() 
  { 
    if(!localStorage.getItem("ToDoList"))
    localStorage.setItem('ToDoList', '{}');
  }
   AddToDoItem( value : string, code : number,  event? : KeyboardEvent)
   {
      this.item.id = this.id;
      this.item.value = value;
     if(event?.key === 'Enter' && code == 1 && value != '')
     {
      this.todolist.push(this.item);
      this.id ++;
     }
     else if(code == 2 && value != '')
     {
      this.todolist.push(this.item);
      this.id ++;
     }
     localStorage.setItem('ToDoList', JSON.stringify(this.todolist));
     this.dataSource.data = this.ShowAllList();
     
   }

   DeleteToDoItem(item: ToDoList)
   {
     var index = this.todolist.findIndex(x => x.id === item.id);
     this.todolist.splice(index,1);
    localStorage.setItem('ToDoList', JSON.stringify(this.todolist));
    this.dataSource.data = this.ShowAllList();
   }

   EditToDoItem(item : ToDoList, value : string)
   {
    this.todolist[this.todolist.findIndex(x => x.id === item.id)].value = value;
    localStorage.setItem('ToDoList', JSON.stringify(this.todolist));
    this.editId = 0;
    this.dataSource.data = this.ShowAllList();
   }

    ShowAllList() : String[]
   {
      var storedToDoList = JSON.parse(localStorage.getItem("ToDoList") || '{}');
      if(Object.keys(storedToDoList).length === 0)
      this.todolist = [];
      else
      this.todolist = storedToDoList;
      return storedToDoList;
   }
}

export interface ToDoList
{
  id : number;
  value : string;
}
