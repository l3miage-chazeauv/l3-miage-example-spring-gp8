package fr.uga.l3miage.example.repository;


import fr.uga.l3miage.example.exception.rest.TestEntityNotDeletedRestException;
import fr.uga.l3miage.example.models.Question;
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
public class QuestionRepository implements CRUDRepository<Long,Question>  {

    private EntityManager entityManager;
    CriteriaBuilder cb;

    @Autowired
    public QuestionRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.cb = this.entityManager.getCriteriaBuilder();

    }

    @Override
    public Question save(Question entity) {
        entityManager.persist(entity);
        return  entity;
    }

    @Override
    public Question get(Long id) {
        return entityManager.find(Question.class, id);
    }

    @Override
    public void delete(Question entity) throws TestEntityNotDeletedRestException {
        entityManager.remove(entity);
    }

    public List<Question> all() {
        CriteriaQuery<Question> query = this.cb.createQuery(Question.class);
        Root<Question> root = query.from(Question.class); //necessaire pour ne pas avoir de bug à l'execution meme si pas utilisé
        return this.entityManager.createQuery(query).getResultList();
    }

}