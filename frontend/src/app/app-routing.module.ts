import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: '',
        component: IndexComponent,
      },
    ],
  },
  // {
  //   path: 'stuff',
  //   children: [
  //     {
  //       path: '',
  //       component: DimComparComponent,
  //     },
  //   ],
  // },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
