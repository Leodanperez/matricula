package pe.edu.trentino.matricula.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.trentino.matricula.dto.BancoDto;
import pe.edu.trentino.matricula.services.BancoService;

import java.util.Collections;

@RequiredArgsConstructor
@RestController
public class BancoController {

    //Injeccion de dependencia
    private final BancoService bancoService;

    //Metodo para crear banco
    @PostMapping("/crear-banco")
    public ResponseEntity<?> crearBanco(@RequestBody BancoDto dto) {
        bancoService.crearBanco(dto);
        return ResponseEntity.ok(
                Collections
                .singletonMap("message", "Creado correctamente")
        );
    }

    @GetMapping("/obtener-bancos")
    public ResponseEntity<?> obtenerBancos() {
        return ResponseEntity.ok(bancoService.obtenerBancos());
    }
}
