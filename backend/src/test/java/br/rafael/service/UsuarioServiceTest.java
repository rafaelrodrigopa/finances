package br.rafael.service;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import br.rafael.exceptions.RegraNegocioException;
import br.rafael.model.entity.Usuario;
import br.rafael.model.repository.UsuarioRepository;
import br.rafael.service.impl.UsuarioServiceImp;

@SpringBootTest
@ActiveProfiles("test")
public class UsuarioServiceTest {

	UsuarioService usuarioService;
	
	@MockBean
	UsuarioRepository usuarioRepository;
	
	@BeforeEach
	public void setUp() {
		usuarioService = new UsuarioServiceImp(usuarioRepository);
	}
	
	@Test
	public void deveAutenticarUmUsuarioComSucesso() {
		//cenario
		String email = "email@email.com";
		String senha = "senha";
		
		Usuario usuario = new Usuario(email, senha);
		Mockito.when(usuarioRepository.findByEmail(email)).thenReturn(Optional.of(usuario));
		
		//acao
		Usuario result = usuarioService.autenticar(email, senha);
		
		//verificação
		Assertions.assertThat(result).isNull();
	}
	
	@SuppressWarnings("unused")
	@Test
	public void deveLancarErroQuandoNaoEncontrarUsuarioCadastradoComOEmailInformado() {
		//cenario
		Mockito.when(usuarioRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());
		
		
		RegraNegocioException thrown = org.junit.jupiter.api.Assertions.assertThrows(
	            RegraNegocioException.class, 
	            () -> {
	            	usuarioService.autenticar("email@email.com", "senha");
	            }
	        );
		//acao
		
	}
	
	@Test
	public void deveValidarEmail() {
		//cenario
		Mockito.when(usuarioRepository.existsByEmail(Mockito.anyString())).thenReturn(false);
		
		//acao
		usuarioService.validarEmail("email@email.com");
	}
	
	@Test
	public void deveLancarErroQuandoExistirEmailCadastrado() {
		//cenario
		Usuario usuario = new Usuario();
		usuario.setNome("usuario");
		usuario.setEmail("email@email.com");
		usuarioRepository.save(usuario);

        // ação
		// ação e verificação
        RegraNegocioException thrown = org.junit.jupiter.api.Assertions.assertThrows(
            RegraNegocioException.class, 
            () -> {
                usuarioService.validarEmail("email@email.com");
            }
        );
        
        org.junit.jupiter.api.Assertions.assertEquals("Já existe um usuário cadastrado com este email.", thrown.getMessage());

	}
}
