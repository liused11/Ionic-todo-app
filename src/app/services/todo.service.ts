// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Todo } from '../models/todo.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos = new BehaviorSubject<Todo[]>([]);

  constructor(private supabaseService: SupabaseService) { }

  get todos() {
    return this._todos.asObservable();
  }

  async fetchTodos() {
    try {
      const { data, error } = await this.supabaseService.supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      this._todos.next(data || []);
      return data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      return null;
    }
  }

  async addTodo(task: string) {
    try {
        const newTodo: Partial<Todo> = {
        task,
        is_completed: false
        };

      const { data, error } = await this.supabaseService.supabase
        .from('todos')
        .insert(newTodo)
        .select();

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const currentTodos = this._todos.value;
        this._todos.next([data[0], ...currentTodos]);
        return data[0];
      }
      return null;
    } catch (error) {
      console.error('Error adding todo:', error);
      return null;
    }
  }

  async updateTodo(todo: Todo) {
    try {
      const { data, error } = await this.supabaseService.supabase
        .from('todos')
        .update({ 
          task: todo.task,
          is_completed: todo.is_completed 
        })
        .eq('id', todo.id)
        .select();

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const currentTodos = this._todos.value;
        const index = currentTodos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
          currentTodos[index] = data[0];
          this._todos.next([...currentTodos]);
        }
        return data[0];
      }
      return null;
    } catch (error) {
      console.error('Error updating todo:', error);
      return null;
    }
  }

  async deleteTodo(id: number) {
    try {
      const { error } = await this.supabaseService.supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      const currentTodos = this._todos.value;
      this._todos.next(currentTodos.filter(todo => todo.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      return false;
    }
  }
}