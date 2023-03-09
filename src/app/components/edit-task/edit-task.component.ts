import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {

  data: any| null = null;
  validationForm: FormGroup;
  prioritys: any = [
    {
      name:'Urgente',
      value:'urgente'
    },
    {
      name:'Importante',
      value:'importante'
    },
    {
      name:'Normal',
      value:'urgente'
    },
  ];

  states:any = [
    {
      name:'En proceso',
      value:'proceso'
    },
    {
      name:'Pendiente',
      value:'pendiente'
    },
    {
      name:'Terminada',
      value:'terminada'
    },
  ]

  constructor(public modalRef: MdbModalRef<EditTaskComponent>, private services:TasksService) {
    this.validationForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      incharge: new FormControl(null, Validators.required),
      tags: new FormControl(null, Validators.required),
    });
  }

  get title(): AbstractControl{
    return this.validationForm.get('title')
  }
  get description(): AbstractControl{
    return this.validationForm.get('description')
  }
  get priority(): AbstractControl{
    return this.validationForm.get('priority')
  }
  get state(): AbstractControl{
    return this.validationForm.get('state')
  }
  get incharge(): AbstractControl{
    return this.validationForm.get('incharge')
  }
  get tags(): AbstractControl{
    return this.validationForm.get('tags')
  }

  ngOnInit(): void {
  }

  onEditTask(){
    this.services.editTasks(this.validationForm.value).subscribe(data=>console.log(data))
    console.log(this.validationForm.value);
    this.validationForm.reset()

  }
}
