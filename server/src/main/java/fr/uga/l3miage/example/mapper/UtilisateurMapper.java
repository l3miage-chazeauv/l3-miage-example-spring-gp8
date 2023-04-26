package fr.uga.l3miage.example.mapper;

import fr.uga.l3miage.example.models.Reponse;
import fr.uga.l3miage.example.models.Utilisateur;
import fr.uga.l3miage.example.request.CreateTestRequest;
import fr.uga.l3miage.example.response.UtilisateurDTO;
import org.mapstruct.Mapper;

@Mapper(uses = TestMapperUtils.class)
public interface UtilisateurMapper {
    UtilisateurDTO toDto(Utilisateur entity);

    Utilisateur toEntity(CreateTestRequest request);
}
