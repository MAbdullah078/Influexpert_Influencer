import {Routes} from '@angular/router';
import {CreateShowcaseComponent} from './create-showcase.component';

export const CreateShowCaseRoutes: Routes = [{
  path: '',
  component: CreateShowcaseComponent,
  data: {
    heading: 'Create ShowCase'
  }

},
];
