import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'workass';

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: any) {
  //   // Realizar la acción antes de cerrar la ventana
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('role')
  //   localStorage.removeItem('nombre')
  // }

}
