import {Routes} from '@angular/router';
import {ConnectInstagramComponent} from './connect-instagram.component';

export const ConnectInstagramRoutes: Routes = [{
  path: '',
  component: ConnectInstagramComponent,
  data: {
    heading: 'Connect Instagram'
  }

},
];
