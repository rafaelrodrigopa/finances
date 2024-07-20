package br.rafael;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import br.rafael.model.entity.Usuario;
import br.rafael.model.repository.UsuarioRepository;

@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
class MinhasFinancasApplicationTests {

	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Test
	public void deveVerificarAExistenciaDeUmEmail() {
		
		//Cenario
		Usuario usuario = new Usuario();
		usuario.setNome("usuario");
		usuario.setEmail("usuario@email.com");
		usuarioRepository.save(usuario);
		
		//acao/execucao
		boolean result = usuarioRepository.existsByEmail("usuario@email.com");
		
		//verificacao
		Assertions.assertThat(result).isTrue();
	}
	
	@Test
	public void deveRetornarFalsoQuandoNaoHouveUsuarioCadastratadoComOEmail() {
		//cenário
		usuarioRepository.deleteAll();
		
		//acao/execucao
		boolean result = usuarioRepository.existsByEmail("usuario@email.com");
		
		//verificacao
		Assertions.assertThat(result).isFalse();
	}
}
