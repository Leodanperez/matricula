package pe.edu.trentino.matricula.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.trentino.matricula.dto.BancoDto;
import pe.edu.trentino.matricula.models.Banco;
import pe.edu.trentino.matricula.repositories.BancoRepository;
import pe.edu.trentino.matricula.services.BancoService;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BancoServiceImpl implements BancoService {

    // Inyeccion de dependencias
    private final BancoRepository bancoRepository;

    @Override
    public void crearBanco(BancoDto bancoDto) {
        Banco nuevoBanco = new Banco();
        nuevoBanco.setNombre(bancoDto.getNombre());
        nuevoBanco.setDireccion(bancoDto.getDireccion());
        nuevoBanco.setCodigo(bancoDto.getCodigo());

        bancoRepository.save(nuevoBanco);
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
    public List<Banco> obtenerBancos() {
        return bancoRepository.findAll().stream().toList();
    }

    @Override
    public boolean eliminarBanco(Long id) {
        return false;
    }
}
