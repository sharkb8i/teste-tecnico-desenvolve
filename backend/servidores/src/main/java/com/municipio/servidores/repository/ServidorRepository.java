package com.municipio.servidores.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.municipio.servidores.entity.Servidor;

@Repository
public interface ServidorRepository extends JpaRepository<Servidor, Long> {
    
    Optional<Servidor> findByEmail(String email);

    @Query("SELECT s FROM Servidor s JOIN FETCH s.secretaria")
    List<Servidor> findAllWithSecretaria();

    List<Servidor> findBySecretariaId(Long secretariaId);

    boolean existsByEmailAndIdNot(String email, Long id);
}