import { Route } from "@angular/router";

export const USERS_ROUTES:Route[]=[
    { path: '', loadComponent:()=>import('./users.component').then(comp=>comp.UsersComponent) },
    { path: 'add', loadComponent:()=>import('./user-editor/user-editor.component').then(comp=>comp.UserEditorComponent) },
    { path: 'update/:id', loadComponent:()=>import('./user-editor/user-editor.component').then(comp=>comp.UserEditorComponent) },
]