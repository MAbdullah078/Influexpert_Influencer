import {Routes} from '@angular/router';
import {ConnectLinkedinComponent} from './connect-linkedin.component';

export const ConnectLinkenInRoutes: Routes = [{
  path: '',
  component: ConnectLinkedinComponent,
  data: {
    heading: 'Connect LinkedIn'
  }

},
];
