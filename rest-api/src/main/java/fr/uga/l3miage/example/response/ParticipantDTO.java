package fr.uga.l3miage.example.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "correspond au DTO de l'entité Participant")
public class ParticipantDTO {

    @Schema(description = "correspond à l'Id du Participant",example = "1")
    Long userId;

    @Schema(description = "correspond au nom du Participant",example = "Salaheddin")
    String nom;

}
