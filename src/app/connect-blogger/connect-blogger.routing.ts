import {Routes} from '@angular/router';
import {ConnectBloggerComponent} from './connect-blogger.component';

export const ConnectBloggerRoutes: Routes = [{
  path: '',
  component: ConnectBloggerComponent,
  data: {
    heading: 'Connect Blogger'
  }

},
];
