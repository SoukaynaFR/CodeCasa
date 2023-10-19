export class Todo {
    text: any;
    completed: boolean;
    isEditMode: boolean; 
  _id: any;
  
    constructor(text: any, completed: boolean) {
      this.text = text;
      this.completed = completed;
      this.isEditMode = false; 
    }
  }
  