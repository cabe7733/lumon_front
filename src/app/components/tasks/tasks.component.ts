import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EditTaskComponent } from '../edit-task/edit-task.component';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  validationForm: FormGroup;
  tasks:any;
  modalRef: MdbModalRef<EditTaskComponent> | null = null;

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
      value:'normal'
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

  constructor(private services:TasksService, private modalService: MdbModalService) {

    this.validationForm = new FormGroup({
      title:new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      incharge: new FormControl(null, Validators.required),
      tags: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getTasks()
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

  onAddTask(){
    this.services.addTasks(this.validationForm.value).subscribe(data=>console.log(data))
    console.log(this.validationForm.value);
    this.validationForm.reset()

  }

  getTasks(){
    this.services.getTasks().subscribe(data=>{
      this.tasks=data;
      console.log(data);

    })
  }

  openModal(datos:any) {
    console.log(datos);

    this.modalRef = this.modalService.open(EditTaskComponent, {
      data: { data: datos },
    });

    this.modalRef.onClose.subscribe(() => {
      this.getTasks()
    });
  }

  deleteTask(id:any){
    this.services.deleteTasks(id).subscribe(()=>{this.getTasks()})
  }

}
