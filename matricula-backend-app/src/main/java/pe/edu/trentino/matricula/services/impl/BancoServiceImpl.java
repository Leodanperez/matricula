package pe.edu.trentino.matricula.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pe.edu.trentino.matricula.dto.BancoDto;
import pe.edu.trentino.matricula.models.Banco;
import pe.edu.trentino.matricula.repositories.BancoRepository;
import pe.edu.trentino.matricula.response.PaginatedResponseDto;
import pe.edu.trentino.matricula.response.ResponseDto;
import pe.edu.trentino.matricula.services.BancoService;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BancoServiceImpl implements BancoService {

    // Inyeccion de dependencias
    private final BancoRepository bancoRepository;

    @Override
    public ResponseDto crearBanco(BancoDto bancoDto) {
        var response = new ResponseDto();

        try {
            Banco nuevoBanco = new Banco();
            nuevoBanco.setNombre(bancoDto.getNombre());
            nuevoBanco.setDireccion(bancoDto.getDireccion());
            nuevoBanco.setCodigo(bancoDto.getCodigo());

            bancoRepository.save(nuevoBanco);

            response.setStatus(200);
            response.setMessage("Banco creado correctamente");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return response;
    }

    @Override
    public void actualizarBanco(Long id, BancoDto bancoDto) {
        Optional<Banco> existeBanco = bancoRepository.findById(id);
        if (existeBanco.isPresent()) {
            existeBanco.get().setNombre(bancoDto.getNombre());
            existeBanco.get().setDireccion(bancoDto.getDireccion());
            existeBanco.get().setCodigo(bancoDto.getCodigo());
        }


        bancoRepository.save(existeBanco.get());
    }

    @Override
    public PaginatedResponseDto<Banco> obtenerBancos(String nombre, int page, int perPage) {
        Pageable pageable = PageRequest.of(page - 1, perPage);
        Page<Banco> bancosPage = bancoRepository
                .findByNombreContainingIgnoreCase(nombre, pageable);

        return new PaginatedResponseDto<>(
                bancosPage.getContent(),
                page,
                perPage,
                bancosPage.getTotalElements()
        );
    }


    @Override
    public boolean eliminarBanco(Long id) {
        return false;
    }
}
