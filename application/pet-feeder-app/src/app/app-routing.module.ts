import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'feeding-machine',
    loadChildren: () => import('./feeding-machine/feeding-machine.module').then( m => m.FeedingMachinePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'feeding-machines',
    loadChildren: () => import('./feeding-machines/feeding-machines.module').then( m => m.FeedingMachinesPageModule)
  },
  {
    path: 'fm-form',
    loadChildren: () => import('./feeding-machine-form/feeding-machine-form.module').then( m => m.FeedingMachineFormPageModule)
  },
  {
    path: 'video-stream',
    loadChildren: () => import('./video-stream/video-stream.module').then( m => m.VideoStreamPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
