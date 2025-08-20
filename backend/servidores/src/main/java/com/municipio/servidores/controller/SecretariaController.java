package com.municipio.servidores.controller;

import com.municipio.servidores.entity.Secretaria;
import com.municipio.servidores.service.SecretariaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/secretarias")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class SecretariaController {
    
    private final SecretariaService secretariaService;
    
    @GetMapping
    public ResponseEntity<List<Secretaria>> listarTodas() {
        log.info("Listando todas as secretarias");
        List<Secretaria> secretarias = secretariaService.findAll();
        return ResponseEntity.ok(secretarias);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Secretaria> buscarPorId(@PathVariable Long id) {
        log.info("Buscando secretaria com ID: {}", id);
        Secretaria secretaria = secretariaService.findById(id);
        return ResponseEntity.ok(secretaria);
    }
    
    @PostMapping
    public ResponseEntity<Secretaria> criar(@Valid @RequestBody Secretaria secretaria) {
        log.info("Criando nova secretaria: {}", secretaria.getNome());
        Secretaria novaSecretaria = secretariaService.save(secretaria);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaSecretaria);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Secretaria> atualizar(@PathVariable Long id, 
                                              @Valid @RequestBody Secretaria secretaria) {
        log.info("Atualizando secretaria com ID: {}", id);
        Secretaria secretariaAtualizada = secretariaService.update(id, secretaria);
        return ResponseEntity.ok(secretariaAtualizada);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        log.info("Deletando secretaria com ID: {}", id);
        secretariaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}