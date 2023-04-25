package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.exception.rest.TestEntityNotDeletedRestException;
import fr.uga.l3miage.example.models.Question;
import fr.uga.l3miage.example.models.Reponse;
import fr.uga.l3miage.example.models.TestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;
import javax.persistence.criteria.Root;
import java.util.Optional;

@Repository
public class ReponseRepository implements CRUDRepository<Long, Reponse> {

    private EntityManager entityManager;
    CriteriaBuilder cb;

    @Autowired
    public ReponseRepository (EntityManager entityManager) {
        this.entityManager = entityManager;
        this.cb = this.entityManager.getCriteriaBuilder();

    }

    @Override
    public Reponse save(Reponse entity) {
        entityManager.persist(entity);
        return entity;
    }

    @Override
    public Reponse get(Long id) {
        return entityManager.find(Reponse.class, id);
    }

    @Override
    public void delete(Reponse entity) throws TestEntityNotDeletedRestException {
        entityManager.remove(entity);
    }

    @Override
    public List<Reponse> all() {
        CriteriaQuery<Reponse> query = this.cb.createQuery(Reponse.class);
        Root<Reponse> root = query.from(Reponse.class); //necessaire pour ne pas avoir de bug à l'execution meme si pas utilisé
        return this.entityManager.createQuery(query).getResultList();
    }
}
