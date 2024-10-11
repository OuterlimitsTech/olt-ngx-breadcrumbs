import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '',
        data: {
            breadcrumbs: 'Home'
        },
        loadComponent: () => import('./pages/layout/layout.page').then((m) => m.LayoutPage),
        children: [
            { 
                path: '', 
                loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage) 
            },
            { 
                path: 'page1', 
                data: {
                    breadcrumbs: 'Page 1'
                },                
                loadComponent: () => import('./pages/page1/page1.page').then((m) => m.Page1Page) 
            },
            { 
                path: 'page2', 
                data: {
                    breadcrumbs: 'Page 2'
                },
                loadComponent: () => import('./pages/page2/page2.page').then((m) => m.Page2Page),
                children: [
                    { 
                        path: '', 
                        pathMatch: 'full', 
                        redirectTo: 'nested-page1'
                    },
                    { 
                        path: 'nested-page1', 
                        data: {
                            breadcrumbs: 'Nested 1'
                        },        
                        loadComponent: () => import('./pages/page2/child/nested-page1/nested-page1.page').then((m) => m.NestedPage1Page) 
                    },
                    { 
                        path: 'nested-page2', 
                        data: {
                            breadcrumbs: 'Nested 2'
                        },                                
                        loadComponent: () => import('./pages/page2/child/nested-page2/nested-page2.page').then((m) => m.NestedPage2Page) 
                    },                
                ]
            },
        ] 
    }    
];
