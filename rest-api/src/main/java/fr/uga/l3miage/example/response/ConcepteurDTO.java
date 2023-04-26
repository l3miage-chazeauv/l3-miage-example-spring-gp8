package fr.uga.l3miage.example.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "correspond au DTO de l'entité Concepteur")
public class ConcepteurDTO {

    @Schema(description = "correspond à l'Id du Concepteur",example = "1")
    Long userId;

    @Schema(description = "correspond au nom du Concepteur",example = "Salaheddin")
    String nom;
}
