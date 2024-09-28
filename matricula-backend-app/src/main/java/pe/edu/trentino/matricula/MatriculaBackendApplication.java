package pe.edu.trentino.matricula;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MatriculaBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MatriculaBackendApplication.class, args);
	}

}
