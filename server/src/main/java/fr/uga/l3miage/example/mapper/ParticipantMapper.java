package fr.uga.l3miage.example.mapper;

import fr.uga.l3miage.example.models.Participant;
import fr.uga.l3miage.example.response.ParticipantDTO;

import java.util.Collection;

public interface ParticipantMapper {

    ParticipantDTO entityToDTO(Participant participant);
    Collection<ParticipantDTO> entityToDTO(Iterable<Participant> participants);
    Participant DTOToEntity(ParticipantDTO participantDTO);
    Collection<Participant> DTOToEntity(Iterable<ParticipantDTO> participantDTOS);

}
