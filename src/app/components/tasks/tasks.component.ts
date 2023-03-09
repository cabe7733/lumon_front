import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  validationForm: FormGroup;
  tasks:any;

  constructor(private services:TasksService) {
    this.validationForm = new FormGroup({
      desc: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      incharge: new FormControl(null, Validators.required),
      tags: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getTasks()
  }


  get desc(): AbstractControl {
    return this.validationForm.get('firstName')!;
  }

  get priority(): AbstractControl {
    return this.validationForm.get('lastName')!;
  }

  onAddTask(){
    this.services.addTasks(this.validationForm.value).subscribe(data=>console.log(data))
  }

  getTasks(){
    let id = localStorage.getItem('id')
    this.services.getTasks(id).subscribe(data=>{
      this.tasks=data;
    })
  }

}
