import {Routes} from '@angular/router';
import {ConnectTwitterComponent} from './connect-twitter.component';

export const ConnectTwitterRoutes: Routes = [{
  path: '',
  component: ConnectTwitterComponent,
  data: {
    heading: 'Connect Twitter'
  }

},
];
