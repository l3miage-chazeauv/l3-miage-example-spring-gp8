package fr.uga.l3miage.example.service;

import fr.uga.l3miage.example.component.ExampleComponent;
import fr.uga.l3miage.example.component.MiahootComponent;
import fr.uga.l3miage.example.exception.rest.TestEntityNotFoundRestException;
import fr.uga.l3miage.example.exception.technical.TestEntityNotFoundException;
import fr.uga.l3miage.example.mapper.MiahootMapper;
import fr.uga.l3miage.example.mapper.TestMapper;
import fr.uga.l3miage.example.models.Miahoot;
import fr.uga.l3miage.example.response.Test;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor


public class MiahootService {

    private static final String ERROR_DETECTED = "Une erreur lors de la création de l'entité TestConfigWithProperties à été détecté.";
    private final MiahootComponent miahootComponent;
    private final MiahootMapper miahootMapper;

    public Miahoot getMiahoot(final Long id) {
        try {
            return MiahootMapper.toDto(miahootComponent.getMiahoot(id));
        } catch (TestEntityNotFoundException ex) {
            throw new TestEntityNotFoundRestException(String.format("Impossible de charger l'entité. Raison : [%s]",ex.getMessage()),"id",ex);
        }
    }

}
