package fr.uga.l3miage.example.mapper;

import fr.uga.l3miage.example.models.Miahoot;
import fr.uga.l3miage.example.models.Reponse;
import fr.uga.l3miage.example.request.CreateTestRequest;
import fr.uga.l3miage.example.response.MiahootDTO;
import org.mapstruct.Mapper;

@Mapper
public interface MiahootMapper {

    MiahootDTO toDto(Miahoot entity);

    Miahoot toEntity(CreateTestRequest request);


}
