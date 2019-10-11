import {Routes} from '@angular/router';
import {ConnectFacebookComponent} from './connect-facebook.component';

export const ConnectFacebookRoutes: Routes = [{
  path: '',
  component: ConnectFacebookComponent,
  data: {
    heading: 'Connect Facebook'
  }

},
];
