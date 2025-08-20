package com.municipio.servidores.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.municipio.servidores.entity.Servidor;
import com.municipio.servidores.service.ServidorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/servidores")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ServidorController {
    
    public final ServidorService servidorService;

    @GetMapping
    public ResponseEntity<List<Servidor>> listarTodos() {
        log.info("Listando todos os servidores");
        List<Servidor> servidores = servidorService.findAll();
        return ResponseEntity.ok(servidores);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Servidor> buscarPorId(@PathVariable Long id) {
        log.info("Buscando servidor com ID: {}", id);
        Servidor servidor = servidorService.findById(id);
        return ResponseEntity.ok(servidor);
    }
    
    @PostMapping
    public ResponseEntity<Servidor> criar(@Valid @RequestBody Servidor servidor) {
        log.info("Criando novo servidor: {}", servidor.getNome());
        Servidor novoServidor = servidorService.save(servidor);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoServidor);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Servidor> atualizar(@PathVariable Long id, 
                                            @Valid @RequestBody Servidor servidor) {
        log.info("Atualizando servidor com ID: {}", id);
        Servidor servidorAtualizado = servidorService.update(id, servidor);
        return ResponseEntity.ok(servidorAtualizado);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        log.info("Deletando servidor com ID: {}", id);
        servidorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}