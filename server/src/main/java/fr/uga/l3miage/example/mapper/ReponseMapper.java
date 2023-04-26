package fr.uga.l3miage.example.mapper;

import fr.uga.l3miage.example.models.Reponse;
import fr.uga.l3miage.example.request.CreateTestRequest;
import fr.uga.l3miage.example.response.QuestionDTO;
import fr.uga.l3miage.example.response.ReponseDTO;
import org.mapstruct.Mapper;

@Mapper
public interface ReponseMapper {

    ReponseDTO toDto(Reponse entity);

    Reponse toEntity(CreateTestRequest request);

}
