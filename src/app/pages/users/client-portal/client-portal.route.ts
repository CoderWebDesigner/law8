import { Route } from "@angular/router";

export const CLIENT_PORTAL_ROUTES:Route[]=[
    { path: '', loadComponent:()=>import('./client-portal.component').then(comp=>comp.ClientPortalComponent) },
    { path: 'add', loadComponent:()=>import('./client-portal-editor/client-portal-editor.component').then(comp=>comp.ClientPortalEditorComponent) },
    { path: 'update/:id', loadComponent:()=>import('./client-portal-editor/client-portal-editor.component').then(comp=>comp.ClientPortalEditorComponent) },
    
]