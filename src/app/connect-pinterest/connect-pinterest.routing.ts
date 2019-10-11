import {Routes} from '@angular/router';
import {ConnectPinterestComponent} from './connect-pinterest.component';

export const ConnectPinterestRoutes: Routes = [{
  path: '',
  component: ConnectPinterestComponent,
  data: {
    heading: 'Connect Pinterest'
  }

},
];
