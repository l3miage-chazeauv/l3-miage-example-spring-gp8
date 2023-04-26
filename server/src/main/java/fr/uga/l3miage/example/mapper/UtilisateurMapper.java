package fr.uga.l3miage.example.mapper;

import fr.uga.l3miage.example.models.Utilisateur;
import fr.uga.l3miage.example.request.CreateTestRequest;
import fr.uga.l3miage.example.response.UtilisateurDTO;
import org.mapstruct.Mapper;

import java.util.Collection;

@Mapper(uses = TestMapperUtils.class)

public interface UtilisateurMapper {

    UtilisateurDTO entityToDTO(Utilisateur user);
    Collection<UtilisateurDTO> entityToDTO(Iterable<Utilisateur> utilisateurs);
    Utilisateur DTOToEntity(UtilisateurDTO utilisateurDTO);
    Collection<Utilisateur> DTOToEntity(Iterable<UtilisateurDTO> utilisateurDTOS);

    Utilisateur toEntity(CreateTestRequest request);

}
