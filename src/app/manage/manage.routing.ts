import {Routes} from '@angular/router';
import {ManageComponent} from './manage.component';

export const ManageRoutes: Routes = [{
  path: '',
  component: ManageComponent,
  data: {
    heading: 'Manage Profiles'
  }

},
];
