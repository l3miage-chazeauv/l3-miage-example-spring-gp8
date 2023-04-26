package fr.uga.l3miage.example.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@Schema(description = "correspond au DTO de l'entité Reponse")
public class ReponseDTO {

    @Schema(description = "correspond à l'Id de la réponse",example = "1")
    private Long id;

    @Schema(description = "correspond à la réponse",example = "Oui")
    private String label;

    @Schema(description = "correspond au statut de la réponse",example = "Vraie")
    private boolean estValide;
}
