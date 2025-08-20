package com.municipio.servidores.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.municipio.servidores.entity.Servidor;
import com.municipio.servidores.exception.BusinessException;
import com.municipio.servidores.exception.ResourceNotFoundException;
import com.municipio.servidores.repository.ServidorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ServidorService {
    
    private final ServidorRepository servidorRepository;

    @Transactional(readOnly = true)
    public List<Servidor> findAll() {
        return servidorRepository.findAllWithSecretaria();
    }

    @Transactional(readOnly = true)
    public Servidor findById(Long id) {
        return servidorRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Servidor não encontrado com ID: " + id + "."));
    }

    public Servidor save(Servidor servidor) {
        validateServidor(servidor);
        return servidorRepository.save(servidor);
    }

    public Servidor update(Long id, Servidor servidor) {
        Servidor existente = findById(id);

        if(!existente.getEmail().equals(servidor.getEmail()) &&
            servidorRepository.existByEmailAndIdNot(servidor.getEmail(), id)) {
            throw new BusinessException("E-mail já está em uso por outro servidor.");
        }

        validateIdade(servidor.getDataNascimento());

        existente.setNome(servidor.getNome());
        existente.setEmail(servidor.getEmail());
        existente.setDataNascimento(servidor.getDataNascimento());
        existente.setSecretaria(servidor.getSecretaria());

        return servidorRepository.save(existente);
    }

    public void delete(Long id) {
        Servidor servidor = findById(id);
        servidorRepository.delete(servidor);
    }

    public void validateServidor(Servidor servidor) {
        if (servidorRepository.findByEmail(servidor.getEmail()).isPresent()) {
            throw new BusinessException("E-mail já está em uso.");
        }

        validateIdade(servidor.getDataNascimento());
    }

    public void validateIdade(LocalDate dataNascimento) {
        int idade = LocalDate.now().getYear() - dataNascimento.getYear();
        if (idade < 18 || idade > 75)
            throw new BusinessException("Servidor deve ter entre 18 e 75 anos");
    }
}