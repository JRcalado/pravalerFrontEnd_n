import { EditLabsComponent } from './edit-labs.component';
import { CreateLabsComponent } from './create-labs.component';

// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';



import { ListLabsComponent } from './list-labs.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Carousel Component
import { CarouselModule } from 'ngx-bootstrap/carousel';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Popover Component
import { PopoverModule } from 'ngx-bootstrap/popover';

// Progress Component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Data Picker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// Components Routing
import { LabRoutingModule } from './lab-routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditUnitsComponent } from './edit-units.component';
import { ListThemeComponent } from './list-theme.component';
import { ListExercisesComponent } from './list-exercises.component';
import { InstituicaoLabsComponent } from './list-instituicao.component';
import { cursoComponent } from './list-curso.component';
import { CreateCursoComponent } from './create-curso.component';
import { EditCursoComponent } from './edit-curso.component';
import { alunoComponent } from './list-aluno.component';
import { CreateAlunoComponent } from './create-aluno.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule,
    LabRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule,
    NgbModule

  ],
  entryComponents: [],
  declarations: [
    ListLabsComponent,
    InstituicaoLabsComponent,
    cursoComponent,
    ListThemeComponent,
    ListExercisesComponent,
    EditLabsComponent,
    EditUnitsComponent,
    CreateLabsComponent,
    CreateCursoComponent,
    EditCursoComponent,
    alunoComponent,
    CreateAlunoComponent

  ]
})
export class LabModule {



  constructor(){

  }


 }
