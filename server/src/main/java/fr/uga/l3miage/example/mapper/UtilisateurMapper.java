package fr.uga.l3miage.example.mapper;

<<<<<<< HEAD
import fr.uga.l3miage.example.models.Utilisateur;
import fr.uga.l3miage.example.request.CreateTestRequest;
import fr.uga.l3miage.example.response.UtilisateurDTO;

import java.util.Collection;

public interface UtilisateurMapper {

    UtilisateurDTO entityToDTO(Utilisateur user);
    Collection<UtilisateurDTO> entityToDTO(Iterable<Utilisateur> utilisateurs);
    Utilisateur DTOToEntity(UtilisateurDTO utilisateurDTO);
    Collection<Utilisateur> DTOToEntity(Iterable<UtilisateurDTO> utilisateurDTOS);

=======
import fr.uga.l3miage.example.models.Reponse;
import fr.uga.l3miage.example.models.Utilisateur;
import fr.uga.l3miage.example.request.CreateTestRequest;
import fr.uga.l3miage.example.response.UtilisateurDTO;
import org.mapstruct.Mapper;

@Mapper(uses = TestMapperUtils.class)
public interface UtilisateurMapper {
    UtilisateurDTO toDto(Utilisateur entity);

    Utilisateur toEntity(CreateTestRequest request);
>>>>>>> origin/master
}
