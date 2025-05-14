import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { AlertController, IonButtons } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput,IonButton,IonIcon,IonList,IonItemSliding,IonItemOptions,IonItemOption,IonLabel,IonCheckbox} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, createOutline, trashOutline, informationCircleOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButtons, RouterLink , CommonModule,FormsModule,IonHeader,IonToolbar,IonTitle,IonContent,IonItem,IonInput,IonButton,IonIcon,IonList,IonItemSliding,IonItemOptions,IonItemOption,IonLabel,IonCheckbox]
})
export class HomePage implements OnInit {
  newTask = '';
  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private alertController: AlertController
  ) {
    addIcons({add,createOutline,trashOutline,informationCircleOutline});
  }

  ngOnInit() {
    this.loadTodos();
    this.todoService.todos.subscribe(todos => {
      this.todos = todos;
    });
  }

  async loadTodos() {
    await this.todoService.fetchTodos();
  }

  async addTodo() {
    if (!this.newTask.trim()) return;
    
    await this.todoService.addTodo(this.newTask);
    this.newTask = '';
  }

  async toggleComplete(todo: Todo) {
    const updatedTodo = { ...todo, is_completed: !todo.is_completed };
    await this.todoService.updateTodo(updatedTodo);
  }

  async deleteTodo(id: number) {
    await this.todoService.deleteTodo(id);
  }

  async editTodo(todo: Todo) {
    const alert = await this.alertController.create({
      header: 'แก้ไขรายการ',
      inputs: [
        {
          name: 'task',
          type: 'text',
          value: todo.task,
          placeholder: 'กรุณาใส่รายการ'
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel'
        },
        {
          text: 'บันทึก',
          handler: (data) => {
            if (data.task.trim() !== '') {
              const updatedTodo = { ...todo, task: data.task };
              this.todoService.updateTodo(updatedTodo);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}