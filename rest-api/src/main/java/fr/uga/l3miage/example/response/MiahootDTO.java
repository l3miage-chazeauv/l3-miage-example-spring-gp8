package fr.uga.l3miage.example.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@Schema(description = "correspond au DTO de l'entité Miahoot")
public class MiahootDTO {

    @Schema(description = "correspond à l'Id du miahoot",example = "1")
    Long id;

    @Schema(description = "correspond au nom du miahoot",example = "quizz jpa")
    String nom;

}
