package fr.uga.l3miage.example.mapper;

import fr.uga.l3miage.example.models.Presentateur;
import fr.uga.l3miage.example.response.PresentateurDTO;

import java.util.Collection;

public interface PresentateurMapper {

    PresentateurDTO entityToDTO(Presentateur presentateur);
    Collection<PresentateurDTO> entityToDTO(Iterable<Presentateur> presentateurs);
    Presentateur DTOToEntity(PresentateurDTO presentateurDTO);
    Collection<Presentateur> DTOToEntity(Iterable<PresentateurDTO> presentateurDTOS);

}
