package com.municipio.servidores.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.municipio.servidores.entity.Secretaria;
import com.municipio.servidores.exception.BusinessException;
import com.municipio.servidores.exception.ResourceNotFoundException;
import com.municipio.servidores.repository.SecretariaRepository;
import com.municipio.servidores.repository.ServidorRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class SecretariaService {

    private final ServidorRepository servidorRepository;
    private final SecretariaRepository secretariaRepository;

    @Transactional(readOnly = true)
    public List<Secretaria> findAll() {
        return secretariaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Secretaria findById(Long id) {
        return secretariaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Secretaria não encontrada com ID: " + id + "."));
    }

    public Secretaria save(Secretaria secretaria) {
        validateSiglaUnica(secretaria.getSigla(), null);
        return secretariaRepository.save(secretaria);
    }

    public Secretaria update(Long id, Secretaria secretaria) {
        Secretaria existente = findById(id);

        if(!existente.getSigla().equals(secretaria.getSigla())) {
            validateSiglaUnica(secretaria.getSigla(), id);
        }

        existente.setNome(secretaria.getNome());
        existente.setSigla(secretaria.getSigla());

        return secretariaRepository.save(existente);
    }

    public void delete(Long id) {
        Secretaria secretaria = findById(id);

        if (!servidorRepository.findBySecretariaId(id).isEmpty())
            throw new BusinessException("Não é possível excluir secretaria com servidores vinculados.");
        
        secretariaRepository.delete(secretaria);
    }

    public void validateSiglaUnica(String sigla, Long id) {
        if (id == null && secretariaRepository.findBySigla(sigla).isPresent()) {
            throw new BusinessException("Sigla já está em uso.");
        } else if (id != null && secretariaRepository.existsBySiglaAndIdNot(sigla, id)) {
            throw new BusinessException("Sigla já está em uso por outro secretaria.");
        }
    }
}