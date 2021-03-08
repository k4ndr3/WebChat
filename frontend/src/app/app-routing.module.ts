import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './sites/about/about.component';
import { MychatsComponent } from './sites/mychats/mychats.component';

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
  {
    path: 'chat',
    children: [
      {
        path: '',
        component: MychatsComponent,
      },
    ],
  },
  {
    path: 'about',
    children: [
      {
        path: '',
        component: AboutComponent,
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
