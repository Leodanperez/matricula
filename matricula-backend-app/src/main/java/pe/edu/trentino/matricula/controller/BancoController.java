package pe.edu.trentino.matricula.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.trentino.matricula.dto.BancoDto;
import pe.edu.trentino.matricula.models.Banco;
import pe.edu.trentino.matricula.response.PaginatedResponseDto;
import pe.edu.trentino.matricula.response.ResponseDto;
import pe.edu.trentino.matricula.services.BancoService;

import java.util.Collections;

@RequiredArgsConstructor
@RestController
@CrossOrigin()
public class BancoController {

    //Injeccion de dependencia
    private final BancoService bancoService;

    //Metodo para crear banco
    @PostMapping("/crear-banco")
    public ResponseDto crearBanco(@RequestBody BancoDto dto) {
        return bancoService.crearBanco(dto);
    }

    @GetMapping("/obtener-bancos")
    public ResponseEntity<PaginatedResponseDto<Banco>> obtenerBancos(
            @RequestParam(defaultValue = "") String nombre,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int perPage
    ) {
        return ResponseEntity
                .ok(bancoService.obtenerBancos(nombre, page, perPage));
    }
}
