import { Component, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('taskInput', { static: false }) taskInput!: IonInput;
  tasks: { name: string, status: boolean }[] = [];
  segment: string = 'Doing';

  constructor() {}

  addNewTask(taskName: string) {
    if (taskName && taskName.trim() !== '') {
      this.tasks.push({ name: taskName, status: false });
      this.taskInput.value = '';
    }}

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
