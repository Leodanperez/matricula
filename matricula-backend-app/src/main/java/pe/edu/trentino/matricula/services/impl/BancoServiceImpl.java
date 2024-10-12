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
        StringBuilder errorMessage = new StringBuilder();

        if (bancoDto == null) {
            response.setStatus(422);
            response.setMessage("Campos obligatorios");
            return response;
        }

        if (bancoDto.getNombre() == null || bancoDto.getNombre().isEmpty()) {
            errorMessage.append("El nombre el obligatorio. ");
        }

        if (bancoDto.getDireccion() == null || bancoDto.getDireccion().isEmpty()) {
            errorMessage.append("La direccion es obligatorio. ");
        }

        if (bancoDto.getCodigo() == null || bancoDto.getCodigo().isEmpty()) {
            errorMessage.append("El codigo es obligatorio. ");
        }

        if (!errorMessage.isEmpty()) {
            response.setStatus(422);
            response.setMessage(errorMessage.toString());
            return response;
        }

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
    public ResponseDto actualizarBanco(Long id, BancoDto bancoDto) {
        var response = new ResponseDto();

        try {
            Optional<Banco> optionalBanco = bancoRepository.findById(id);
            if (optionalBanco.isPresent()) {
                var banco = optionalBanco.get();
                banco.setNombre(bancoDto.getNombre());
                banco.setDireccion(bancoDto.getDireccion());
                banco.setCodigo(bancoDto.getCodigo());
                bancoRepository.save(banco);

                response.setStatus(200);
                response.setMessage("Banco actualizado correctamente");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return response;
    }

    @Override
    public ResponseDto eliminarBanco(Long id) {
        var response = new ResponseDto();
        try {
            Optional<Banco> optionalBanco = bancoRepository.findById(id);
            if (optionalBanco.isPresent()) {
                bancoRepository.deleteById(id);
                response.setStatus(200);
                response.setMessage("Banco eliminado correctamente");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return response;
    }

}
