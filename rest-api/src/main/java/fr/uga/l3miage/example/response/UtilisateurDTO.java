package fr.uga.l3miage.example.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "correspond au DTO de l'entité Utilisateur")
public class UtilisateurDTO {

    @Schema(description = "correspond à l'Id de l'utilisateur",example = "1")
    Long userId;

    @Schema(description = "correspond au nom de l'Utilisateur",example = "Salaheddin")
    String nom;

    @Schema(description = "correspond au login de l'Utilisateur",example = "mesouaks")
    String login;

    @Schema(description = "correspond au password de l'Utilisateur",example = "123456789")
    String password;

}
