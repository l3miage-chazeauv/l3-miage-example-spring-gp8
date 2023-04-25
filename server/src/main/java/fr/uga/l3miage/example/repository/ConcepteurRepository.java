package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.exception.rest.TestEntityNotDeletedRestException;
import fr.uga.l3miage.example.models.Concepteur;
import fr.uga.l3miage.example.models.TestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
public class ConcepteurRepository implements CRUDRepository<Long, Concepteur>{
    private EntityManager entityManager;

    @Autowired
    public ConcepteurRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Concepteur save(Concepteur entity) {
        entityManager.persist(entity);
        return  entity;
    }

    @Override
    public Concepteur get(Long id) {
        return entityManager.find(Concepteur.class, id);
    }

    @Override
    public void delete(Concepteur entity) throws TestEntityNotDeletedRestException {
        entityManager.remove(entity);
    }

    public List<Concepteur> all() {
        return null;
    }
}
