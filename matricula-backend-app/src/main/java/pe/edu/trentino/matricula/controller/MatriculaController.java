package pe.edu.trentino.matricula.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.trentino.matricula.dto.DetalleMatriculaDto;
import pe.edu.trentino.matricula.dto.DetalleMatriculaResponseDto;
import pe.edu.trentino.matricula.dto.MatriculaDto;
import pe.edu.trentino.matricula.dto.MatriculaDtoRequest;
import pe.edu.trentino.matricula.response.PaginatedResponseDto;
import pe.edu.trentino.matricula.response.ResponseDto;
import pe.edu.trentino.matricula.services.MatriculaService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin()
public class MatriculaController {

    private final MatriculaService matriculaService;

    @GetMapping("matriculas")
    public ResponseEntity<PaginatedResponseDto<MatriculaDto>> obtnerBancos(
            @RequestParam(defaultValue = "") String nombres,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int perPage
    ) {
        return ResponseEntity.ok(matriculaService.obtnerMatriculas(nombres, page, perPage));
    }

    @PostMapping("matricular-alumno")
    public ResponseDto matricularAlumno(@RequestBody MatriculaDtoRequest dto) {
        return matriculaService.matricularAlumno(dto);
    }

    @GetMapping("/detalle/{codigo}")
    public ResponseEntity<List<DetalleMatriculaDto>> obtenerDetalleMatricula(@PathVariable("codigo") String codigo) {
        List<DetalleMatriculaDto> detalles = matriculaService.mostrarDetalleMatricula(codigo);
        return ResponseEntity.ok(detalles);
    }

    @GetMapping("/buscar-codigo/{codigo}")
    public ResponseEntity<List<DetalleMatriculaResponseDto>> obtenerAlumnoCodigo(@PathVariable("codigo") String codigo) {
        List<DetalleMatriculaResponseDto> detalles = matriculaService.mostrarEstudianteCodigo(codigo);
        return ResponseEntity.ok(detalles);
    }
}
