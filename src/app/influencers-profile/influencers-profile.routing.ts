import {Routes} from '@angular/router';

import {InfluencersProfileComponent} from './influencers-profile.component';
import {ConnectLinkedinComponent} from "./connect-linkedin/connect-linkedin.component";

export const InfluencersProfileRoutes: Routes = [{
  path: '',
  component: InfluencersProfileComponent,
  data: {
    heading: 'Profile'
  }

},
  {
    path: 'connect-linkedin',
    component: ConnectLinkedinComponent,
    data: {
      heading: 'Connecting LinkedIN'
    }
  }
];
