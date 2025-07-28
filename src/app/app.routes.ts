import { Routes } from '@angular/router';

// Importação dos componentes 
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarroslistComponent } from './components/carros/carroslist/carroslist.component';
import { CarrosdetailsComponent } from './components/carros/carrosdetails/carrosdetails.component';
import { MarcasslistComponent } from './components/marcas/marcasslist/marcasslist.component';
import { MarcasdetailsComponent } from './components/marcas/marcasdetails/marcasdetails.component';


// Definição das rotas
export const routes: Routes = [

    {path:"", redirectTo: "login", pathMatch: "full"},  // Redireciona a rota raiz ("") para a rota de login
    {path:"login", component: LoginComponent}, // Rota para a tela de login
    {path:"admin", component: PrincipalComponent, children: [// Rota para admin, com rotas filhas
        {path:"carros", component: CarroslistComponent}, // Rota para listar os carros
        {path:"carros/new", component: CarrosdetailsComponent}, // Rota para cadastrar um novo carro
        {path:"carros/edit/:id", component: CarrosdetailsComponent},  // Rota para editar um carro existente, recebendo o ID pela URL
        {path:"marcas", component: MarcasslistComponent}, // Rota para listar as marcas
        {path:"marcas/new", component: MarcasdetailsComponent}, // Rota para cadastrar uma nova marca
        {path:"marcas/edit/:id", component: MarcasdetailsComponent} // Rota para editar uma marca existente, recebendo o ID pela URL
    ]}


];
