package pe.edu.trentino.matricula.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pe.edu.trentino.matricula.config.HandlerException;
import pe.edu.trentino.matricula.dto.DetalleMatriculaDto;
import pe.edu.trentino.matricula.dto.DetalleMatriculaResponseDto;
import pe.edu.trentino.matricula.dto.MatriculaDto;
import pe.edu.trentino.matricula.dto.MatriculaDtoRequest;
import pe.edu.trentino.matricula.models.Alumno;
import pe.edu.trentino.matricula.models.Matricula;
import pe.edu.trentino.matricula.repositories.*;
import pe.edu.trentino.matricula.response.PaginatedResponseDto;
import pe.edu.trentino.matricula.response.ResponseDto;
import pe.edu.trentino.matricula.services.MatriculaService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MatriculaServiceImpl implements MatriculaService {

    private final MatriculaRepository matriculaRepository;
    private final AlumnoRepository alumnoRepository;
    private final GradoRepository gradoRepository;
    private final SeccionRepository seccionRepository;
    private final NivelRepository nivelRepository;
    private final ApoderadoRepository apoderadoRepository;
    private final PagoRepository pagoRepository;

    @Override
    public ResponseDto matricularAlumno(MatriculaDtoRequest matriculaDto) {
        var response = new ResponseDto();
        try {
            // Obtener datos del alumno
            Alumno alumno = alumnoRepository.findById(matriculaDto.getAlumnoId()).orElseThrow(() -> new HandlerException(HttpStatus.NOT_FOUND, "Alumno no encontrado"));

            int anioActual = LocalDate.now().getYear();
            Matricula matricula = new Matricula();
            matricula.setCodigo(generarCodigoMatricula(alumno.getNombres(), alumno.getApellidos(), alumno.getDni(), anioActual));
            matricula.setApoderado(apoderadoRepository.findById(matriculaDto.getApoderadoId()).orElseThrow(()-> new HandlerException(HttpStatus.NOT_FOUND, "Apoderado no encontrado")));
            matricula.setSeccion(seccionRepository.findById(matriculaDto.getSeccionId()).orElseThrow(()-> new HandlerException(HttpStatus.NOT_FOUND, "Seccion no encontrado")));
            matricula.setNivel(nivelRepository.findById(matriculaDto.getNivelId()).orElseThrow(()-> new HandlerException(HttpStatus.NOT_FOUND, "Nivel educativo no encontrado")));
            matricula.setGrado(gradoRepository.findById(matriculaDto.getGradoId()).orElseThrow(()-> new HandlerException(HttpStatus.NOT_FOUND, "Grado no encontrado")));
            matricula.setFechaMatricula(LocalDateTime.now());
            matricula.setSituacion(matriculaDto.getSituacion());
            matricula.setProcedencia(matriculaDto.getProcedencia());
            matricula.setParentesco(matriculaDto.getParentesco());
            matricula.setInstitucionProcedencia(matriculaDto.getInstitucionProcedencia());
            matricula.setCostoMatricula(matriculaDto.getCostoMatricula());
            matricula.setCostoMensualidad(matriculaDto.getCostoMensualidad());
            matricula.setDescuentoMensualidad(matriculaDto.getDescuentoMensualidad());
            matricula.setMensualidadFinal(matriculaDto.getMensualidadFinal());

            // Guarda la data en base de datos
            matriculaRepository.save(matricula);

            response.setStatus(200);
            response.setMessage("Alumno(a) " + alumno.getNombres() + " " + alumno.getApellidos() + " Matriculado correctamente");
        } catch (Exception e) {
            throw new HandlerException(HttpStatus.NOT_FOUND, "El Alumno(a) ya se encuentra matriculado");
        }
        return response;
    }

    @Override
    public PaginatedResponseDto<MatriculaDto> obtnerMatriculas(String nombre, int page, int perPage) {
        Pageable pageable = PageRequest.of(page - 1, perPage);
        Page<MatriculaDto> matriculaPage = matriculaRepository.buscarMatriculaPorNombredeAlumno(nombre, pageable);
        return new PaginatedResponseDto<>(
                matriculaPage.getContent(),
                page,
                perPage,
                matriculaPage.getTotalElements()
        );
    }

    @Override
    public List<DetalleMatriculaDto> mostrarDetalleMatricula(String codigo) {
        Matricula matricula = matriculaRepository.findByCodigo(codigo)
                .orElseThrow(() -> new HandlerException(HttpStatus.NOT_FOUND, "No se encontró ninguna matrícula con el código proporcionado"));

        BigDecimal totalPagado = pagoRepository.sumarPagosPorMatriculaId(matricula.getId());
        Long mesesPagados = pagoRepository.contarMesesPagados(matricula.getId(), "mensualidad");

        BigDecimal montoTotal = matricula.getCostoMatricula().add(matricula.getMensualidadFinal().multiply(BigDecimal.valueOf(10)));
        BigDecimal montoRestante = montoTotal.subtract(totalPagado);

        DetalleMatriculaDto detalle = new DetalleMatriculaDto(
                matricula.getId(),
                matricula.getCodigo(),
                matricula.getAlumno().getNombres() + " " + matricula.getAlumno().getApellidos(),
                matricula.getAlumno().getFechaNac(),
                matricula.getAlumno().getGenero(),
                matricula.getNivel().getNombre(),
                matricula.getGrado().getNombre(),
                matricula.getSeccion().getNombre(),
                matricula.getFechaMatricula(),
                matricula.getSituacion(),
                matricula.getApoderado().getNombres() + " " + matricula.getApoderado().getApellidos(),
                matricula.getParentesco(),
                matricula.getApoderado().getTelefono(),
                matricula.getCostoMatricula(),
                matricula.getDescuentoMensualidad(),
                matricula.getMensualidadFinal(),
                montoTotal.intValue(),
                montoRestante.intValue(),
                mesesPagados.intValue(),
                totalPagado.intValue()
        );
        return Collections.singletonList(detalle);
    }

    @Override
    public List<DetalleMatriculaResponseDto> mostrarEstudianteCodigo(String codigo) {
        Matricula matricula = matriculaRepository.findByCodigo(codigo)
                .orElseThrow(() -> new HandlerException(HttpStatus.NOT_FOUND, "No se encontró ninguna matrícula con el código proporcionado"));

        DetalleMatriculaResponseDto detalle = new DetalleMatriculaResponseDto(
                matricula.getId(),
                matricula.getAlumno().getNombres() + " " + matricula.getAlumno().getApellidos(),
                matricula.getNivel().getNombre() + " " + matricula.getGrado().getNombre() + " " + matricula.getSeccion().getNombre(),
                matricula.getCostoMatricula(),
                matricula.getMensualidadFinal()
        );
        return Collections.singletonList(detalle);
    }


    private String generarCodigoMatricula(String nombre, String apellidos, String dni, int anio) {
        String inicialNombre = !nombre.isEmpty() ? nombre.substring(0, 1).toUpperCase() : "";
        String inicialApellido = !apellidos.isEmpty() ? apellidos.split(" ")[0].substring(0, 1).toUpperCase() : "";
        return inicialNombre + inicialApellido + dni + anio;
    }
}
