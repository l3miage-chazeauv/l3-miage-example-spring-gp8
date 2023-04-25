package fr.uga.l3miage.example.repository;


import fr.uga.l3miage.example.exception.rest.TestEntityNotDeletedRestException;
import fr.uga.l3miage.example.models.Question;
import fr.uga.l3miage.example.models.TestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
public class QuestionRepository implements CRUDRepository<Long,Question>  {
    private EntityManager entityManager;

    @Autowired
    public QuestionRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
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
        return null;
    }




}
