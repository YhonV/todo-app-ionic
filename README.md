# Todo List App

Una sencilla aplicación de lista de tareas creada con Ionic. Actualmente, está en desarrollo y cuenta con funcionalidades básicas de gestión de tareas.

## Características

- **Agregar Tareas**: Permite ingresar nuevas tareas a la lista de tareas pendientes.
- **Eliminar Tareas**: Posibilidad de eliminar tareas completadas.
- **Marcar Tareas como Hechas**: Puedes marcar una tarea como "hecha" para moverla a la sección correspondiente.
- **Vista de Preferencias**: Guardará la configuración en caché para personalizar la experiencia del usuario (en desarrollo).

## Tecnologías

- **Ionic Framework**
- **Angular**

## Estructura de la Interfaz

### HTML de la Aplicación

```html
<ion-header>
  <ion-toolbar>
    <ion-title>
      Todo List
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding ion-text-center">
  <ion-segment [(ngModel)]="segment" mode="ios">
    <ion-segment-button value="Doing">
      <ion-label>Doing</ion-label>
    </ion-segment-button>
    <ion-segment-button value="Done">
      <ion-label>Done</ion-label>
    </ion-segment-button>
  </ion-segment>

  <ion-list *ngIf="segment === 'Doing'">
    <ng-container *ngFor="let task of tasks; let i = index">
      <ion-item *ngIf="task.status === false">
        <ion-label>{{task.name}}</ion-label>
        <ion-checkbox [(ngModel)]="task.status" class="checkbox" justify="end" ></ion-checkbox>
      </ion-item>
    </ng-container>
  </ion-list>

  <ion-list *ngIf="segment === 'Done'">
    <ng-container *ngFor="let task of tasks; let i = index">
      <ion-item *ngIf="task.status === true">
        <ion-label>{{task.name}}</ion-label>
        <ion-button (click)="deleteTask(i)" fill="outline" color="danger">
          Remove
        </ion-button>
      </ion-item>
    </ng-container>
  </ion-list>

  <ion-list>
    <ion-item *ngIf="segment === 'Doing'">
      <ion-input label="New Task" placeholder="Enter text" #taskInput fill="outline" color="tertiary"></ion-input>
    </ion-item>
  </ion-list>
  
  <ion-button (click)="addNewTask(taskInput.value ? taskInput.value.toString() : '')" fill="outline" color="tertiary" *ngIf="segment === 'Doing'">
    Add a new task
  </ion-button>
</ion-content>

<ion-footer>
  <ion-toolbar>
    <ion-title>Done by: CactuDev</ion-title>
  </ion-toolbar>
</ion-footer>
