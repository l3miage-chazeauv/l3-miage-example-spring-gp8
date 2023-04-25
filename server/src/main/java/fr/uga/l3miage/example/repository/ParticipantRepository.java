package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.exception.rest.TestEntityNotDeletedRestException;
import fr.uga.l3miage.example.models.Participant;
import fr.uga.l3miage.example.models.TestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
public class ParticipantRepository implements CRUDRepository<Long, Participant> {
    private EntityManager entityManager;

    @Autowired
    public ParticipantRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Participant save(Participant entity) {
        entityManager.persist(entity);
        return  entity;
    }

    @Override
    public Participant get(Long id) {
        return entityManager.find(Participant.class, id);
    }

    @Override
    public void delete(Participant entity) throws TestEntityNotDeletedRestException {
        entityManager.remove(entity);
    }

    public List<Participant> all() {
        return null;
    }
}
