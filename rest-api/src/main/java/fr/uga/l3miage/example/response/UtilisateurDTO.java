package fr.uga.l3miage.example.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "correspond au DTO de l'entité Personne")
public class UtilisateurDTO {

    @Schema(description = "correspond à l'Id de la personne",example = "1")
    Long id;

    @Schema(description = "correspond au nom de la personne",example = "Salaheddin")
    String nom;

    @Schema(description = "correspond au login de la personne",example = "mesouaks")
    String login;

    @Schema(description = "correspond au password de la personne",example = "123456789")
    String password;



}
