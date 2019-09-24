import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListLabsComponent } from './list-labs.component';
import { EditLabsComponent } from './edit-labs.component';
import { CreateLabsComponent } from './create-labs.component';
import { EditUnitsComponent } from './edit-units.component';
import { ListThemeComponent } from './list-theme.component';
import { ListExercisesComponent } from './list-exercises.component';
import { InstituicaoLabsComponent } from './list-instituicao.component';
import { cursoComponent } from './list-curso.component';
import { CreateCursoComponent } from './create-curso.component';
import { EditCursoComponent } from './edit-curso.component';
import { alunoComponent } from './list-aluno.component';
import { CreateAlunoComponent } from './create-aluno.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Lab'
    },
    children: [
      {
        path: 'ListLab',
        component: ListLabsComponent,
        data: {
          title: 'ListLab'
        }
      },

      {
        path: 'ListExercises',
        component: ListExercisesComponent,
        data: {
          title: 'ListExercises'
        }
      },
      {
        path: "EditLab",
        component: EditLabsComponent,
        data: {
          title: 'EditLab'
        }
      },
      {
        path: "EditCurso",
        component: EditCursoComponent,
        data: {
          title: 'EditCurso'
        }
      },

      {
        path: "ListInst",
        component: InstituicaoLabsComponent,
        data: {
          title: 'ListInst'
        }
      },
      {
        path: "ListCurso",
        component: cursoComponent,
        data: {
          title: 'ListCurso'
        }
      },
      {
        path: "ListAluno",
        component: alunoComponent,
        data: {
          title: 'ListAluno'
        }
      },

      {
        path: "EditUnit",
        component: EditUnitsComponent,
        data: {
          title: 'EditUnit'
        }
      },

      {
        path: "CreateLab",
        component: CreateLabsComponent,
        data: {
          title: 'CreateLab'
        },

      },
      {
        path: "CreateAluno",
        component: CreateAlunoComponent,
        data: {
          title: 'CreateAluno'
        },

      },
      {
        path: "CreateCurso",
        component: CreateCursoComponent,
        data: {
          title: 'CreateCurso'
        },

      },

      {
        path: "ListTheme",
        component: ListThemeComponent,
        data: {
          title: 'ListTheme'
        },

      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule {}
