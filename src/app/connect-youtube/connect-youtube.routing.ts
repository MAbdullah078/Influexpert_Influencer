import {Routes} from '@angular/router';
import {ConnectYoutubeComponent} from './connect-youtube.component';

export const ConnectYoutubeRoutes: Routes = [{
  path: '',
  component: ConnectYoutubeComponent,
  data: {
    heading: 'Connect Youtube'
  }

},
];
