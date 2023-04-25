package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.exception.rest.TestEntityNotDeletedRestException;
import fr.uga.l3miage.example.models.Personne;
import fr.uga.l3miage.example.models.TestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class PersonneRepository implements CRUDRepository<Long,Personne>{
    private EntityManager entityManager;

    @Autowired
    public PersonneRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Personne save(Personne entity) {
        entityManager.persist(entity);
        return  entity;
    }

    @Override
    public Personne get(Long id) {
        return entityManager.find(Personne.class, id);
    }

    @Override
    public void delete(Personne entity) throws TestEntityNotDeletedRestException {
        entityManager.remove(entity);
    }

    public List<Personne> all() {
        return null;
    }

}
