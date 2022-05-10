import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

class ToastNotification {
  constructor(title,description){
    this.title = title;
    this.description = description;
    this.id = this.createId();
  }

  createId(){
    return Math.floor(Math.random() * 1000);
  }
}

export class ToastNotificationSuccess extends ToastNotification{
  constructor(title,description){
    super(title,description)
    this.icon = solid('check-circle');
    this.backgroundColor = "#5CB85C";
  }
}

export class ToastNotificationError extends ToastNotification{
  constructor(title,description){
    super(title,description)
    this.icon = solid('x');
    this.backgroundColor = "#D9534F";
  }
}

export class ToastNotificationInfo extends ToastNotification{
  constructor(title,description){
    super(title,description)
    this.icon = solid('info-circle');
    this.backgroundColor = "#5BC0DE";
  }
}

export class ToastNotificationWarning extends ToastNotification{
  constructor(title,description){
    super(title,description)
    this.icon = solid('warning');
    this.backgroundColor = "#F0AD4E";
  }
}