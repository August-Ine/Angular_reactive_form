import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CodeSandbox';
  pjStatuses = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      projectName: [null, [Validators.required], [this.forbiddenNameAsync]],
      email: [null, [Validators.required, Validators.email]],
      status: [null, Validators.required],
    });
  }

  // ngOnInit() {
  //   this.projectForm = new FormGroup({
  //     projectName: new FormControl(null, [
  //       Validators.required,
  //     ], [this.forbiddenNameAsync]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     status: new FormControl(null, Validators.required),
  //   });
  // }

  // forbiddenName(control: FormControl): { [s: string]: boolean } {
  //   if (control.value === 'Test') {
  //     return { nameIsForbidden: true };
  //   } else {
  //     return undefined!;
  //   }
  // }

  forbiddenNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ nameIsForbidden: true });
        } else {
          resolve(undefined);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
