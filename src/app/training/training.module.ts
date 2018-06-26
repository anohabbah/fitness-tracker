import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {TrainingRoutingModule} from './training-routing.module';

import {CurrentTrainingComponent} from './current-training/current-training.component';
import {StopTrainingComponent} from './current-training/stop-training.component';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {TrainingComponent} from './training.component';

@NgModule({
  imports: [
    SharedModule,
    TrainingRoutingModule
  ],
  entryComponents: [StopTrainingComponent],
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    PastTrainingsComponent,
    NewTrainingComponent,
    StopTrainingComponent
  ]
})
export class TrainingModule {
}
