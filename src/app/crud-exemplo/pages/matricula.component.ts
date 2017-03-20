import { Component, OnInit } from '@angular/core';
import { MatriculaService } from "../matricula.service";
import { Matricula } from "../entities/matricula";

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  private matricula: Matricula[] = [];

  constructor(private matriculaService: MatriculaService) { }

  ngOnInit() {
    this.matriculaService.getMatriculas()
      .subscribe(data => this.matricula = data);
  }

  deleteMatricula(matricula) {
    if (confirm("Are you sure you want to delete " + matricula.name + "?")) {
      var index = this.matricula.indexOf(matricula);
      this.matricula.splice(index, 1);

      this.matriculaService.deleteMatricula(matricula.id)
        .subscribe(null,
        err => {
          alert("Could not delete matricula.");
          // Revert the view back to its original state
          this.matricula.splice(index, 0, matricula);
        });
    }
  }

}
