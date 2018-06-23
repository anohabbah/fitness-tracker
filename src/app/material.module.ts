import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

const matModules = [
  MatIconModule,
  MatCardModule,
  MatTabsModule,
  MatSortModule,
  MatListModule,
  MatInputModule,
  MatTableModule,
  MatButtonModule,
  MatSelectModule,
  MatDialogModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [...matModules],
  exports: [...matModules]
})
export class MaterialModule {}
