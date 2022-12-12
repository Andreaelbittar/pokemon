import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.sass']
})
export class PokeTableComponent {

  displayedColumns: string[] = ['position', 'name','image'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];

  constructor(private pokeService: PokedexService, private router: Router) {  }

  ngOnInit(): void {
    this.getpokemons();
  }

  getpokemons(){
    let pokemonData 
    for(let i = 1; i <= 150; i++){
      this.pokeService.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
          };
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          console.log(res);
        }, 
        err => {
          console.log(err);
        }
      )
    }
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: any){
    this.router.navigateByUrl(`pokeDetail/${row.position}`);



    console.log(row)
  }

}
