import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayout } from './containers/dashboard-layout/dashboard-layout';

// dashboard-routing.module.ts
const routes: Routes = [
  {
    path: '',
    component: DashboardLayout, // <-- layout + sidebar always visible
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users-module').then((m) => m.UsersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
