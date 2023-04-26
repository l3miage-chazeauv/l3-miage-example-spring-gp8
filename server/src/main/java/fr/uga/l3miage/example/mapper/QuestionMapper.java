package fr.uga.l3miage.example.mapper;


import fr.uga.l3miage.example.models.Question;
import fr.uga.l3miage.example.models.TestEntity;
import fr.uga.l3miage.example.request.CreateTestRequest;
import fr.uga.l3miage.example.response.QuestionDTO;
import fr.uga.l3miage.example.response.Test;
import org.mapstruct.Mapper;

@Mapper
public interface QuestionMapper {

    QuestionDTO toDto(Question entity);

    Question toEntity(CreateTestRequest request);


}
