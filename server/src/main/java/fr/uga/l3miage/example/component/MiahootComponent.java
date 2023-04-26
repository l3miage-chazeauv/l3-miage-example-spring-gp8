package fr.uga.l3miage.example.component;

import fr.uga.l3miage.example.exception.technical.TestEntityNotFoundException;
import fr.uga.l3miage.example.mapper.MiahootMapper;
import fr.uga.l3miage.example.mapper.TestMapper;
import fr.uga.l3miage.example.models.Miahoot;
import fr.uga.l3miage.example.models.TestEntity;
import fr.uga.l3miage.example.repository.MiahootRepository;
import fr.uga.l3miage.example.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MiahootComponent {
    private final MiahootRepository miahootRepository;
    private final MiahootMapper miahootMapper;


    public Miahoot getMiahoot(final Long id) throws TestEntityNotFoundException {
        if(miahootRepository.get(id)==null) {
            throw new TestEntityNotFoundException("Erreur","Erreur zebi");
        } else {
            return miahootRepository.get(id);
        }
    }
}
