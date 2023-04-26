package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.exception.rest.TestEntityNotDeletedRestException;
import fr.uga.l3miage.example.models.Miahoot;
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
public interface ReponseRepository extends JpaRepository<Reponse,Long> {

    List<Reponse> findAllByQuestion(final Question question);

    Optional<Reponse> findById(final Long id);

    void deleteById(final Long id);

    void deleteAllByQuestion(final Question question);

}
