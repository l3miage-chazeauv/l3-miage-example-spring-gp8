package fr.uga.l3miage.example.service;

import fr.uga.l3miage.example.exception.rest.TestEntityNotDeletedRestException;
import fr.uga.l3miage.example.exception.technical.MultipleEntityHaveSameDescriptionException;
import fr.uga.l3miage.example.exception.technical.TestEntityNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UtilisateurService {

    @Transactional
    public void delete(String description) {
        try {
            exampleComponent.deleteTest(description);
        } catch (MultipleEntityHaveSameDescriptionException | TestEntityNotFoundException ex) {
            throw new TestEntityNotDeletedRestException(ex.getMessage());
        }
    }


}
