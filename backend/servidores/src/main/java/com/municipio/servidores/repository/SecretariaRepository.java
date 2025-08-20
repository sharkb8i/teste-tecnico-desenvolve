package com.municipio.servidores.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.municipio.servidores.entity.Secretaria;

@Repository
public interface SecretariaRepository extends JpaRepository<Secretaria, Long> {
    
    Optional<Secretaria> findBySigla(String sigla);

    boolean existsBySiglaAndIdNot(String sigla, Long id);
}