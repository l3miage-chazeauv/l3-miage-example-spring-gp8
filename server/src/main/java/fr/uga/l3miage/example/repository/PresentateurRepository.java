package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.exception.rest.TestEntityNotDeletedRestException;
import fr.uga.l3miage.example.models.Concepteur;
import fr.uga.l3miage.example.models.Presentateur;
import fr.uga.l3miage.example.models.TestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
public class PresentateurRepository implements CRUDRepository<Long, Presentateur> {
    private EntityManager entityManager;

    @Autowired
    public PresentateurRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Presentateur save(Presentateur entity) {
        entityManager.persist(entity);
        return  entity;
    }

    @Override
    public Presentateur get(Long id) {
        return entityManager.find(Presentateur.class, id);
    }

    @Override
    public void delete(Presentateur entity) throws TestEntityNotDeletedRestException {
        entityManager.remove(entity);
    }

    public List<Presentateur> all() {
        return null;
    }
}
