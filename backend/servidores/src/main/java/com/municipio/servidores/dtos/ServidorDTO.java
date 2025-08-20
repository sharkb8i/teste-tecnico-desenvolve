package com.municipio.servidores.dtos;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ServidorDTO {
  private Long id;

  @NotBlank(message = "Nome é obrigatório")
  private String nome;

  @NotBlank(message = "E-mail é obrigatório")
  @Email(message = "E-mail deve ter formato válido")
  private String email;

  @NotNull(message = "Data de nascimento é obrigatória")
  @Past(message = "Data de nascimento deve estar no passado")
  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate dataNascimento;

  @NotNull(message = "Secretaria é obrigatória")
  private Long secretariaId;
}