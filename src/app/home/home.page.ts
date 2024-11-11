import { Component, ViewChild } from '@angular/core';
import { IonInput, ActionSheetController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { taskModel } from '../model/task-mode';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('taskInput', { static: false }) taskInput!: IonInput;
  tasks: taskModel[] = [];
  segment: string = 'Doing';
  isInputValid: boolean = false;


  constructor(private actionSheetController: ActionSheetController) {}

  async ionViewWillEnter() {
    const task = await Preferences.get({ key: 'tasks' });
    if (!task.value) {
      Preferences.set({ key: 'tasks', value: JSON.stringify(this.tasks) });
    } else {
      this.tasks = JSON.parse(task.value);
    }
  }

  addNewTask(taskName: string) {
    if (taskName && taskName.trim() !== '') {
      this.tasks.push({ name: taskName.trim(), status: false });
      this.saveTask();
      this.taskInput.value = '';
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTask();
  }

  changeStatus(index: number) {
    if (this.tasks[index].status == false) {
      this.tasks[index].status = true;
      this.saveTask();
    }
  }

  saveTask() {
    console.log('Guardando una nueva tarea...');
    Preferences.set({ key: 'tasks', value: JSON.stringify(this.tasks) });
  }

  async presentActionSheet(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteTask(index);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

}