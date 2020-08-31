import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cansat';

  data = [{id: 1, value: '5'}, {id: 2, value: '5'}, {id: 3, value: '5'}, {id: 4, value: '5'}];
}
