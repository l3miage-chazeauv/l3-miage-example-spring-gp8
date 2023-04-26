package fr.uga.l3miage.example.mapper;

import fr.uga.l3miage.example.models.Concepteur;

import fr.uga.l3miage.example.response.ConcepteurDTO;


import java.util.Collection;

public interface ConcepteurMapper {
    ConcepteurDTO entityToDTO(Concepteur concepteur);
    Collection<ConcepteurDTO> entityToDTO(Iterable<Concepteur> concepteurs);
    Concepteur DTOToEntity(ConcepteurDTO concepteurDTO);
    Collection<Concepteur> DTOToEntity(Iterable<ConcepteurDTO> concepteurDTOS);
}
