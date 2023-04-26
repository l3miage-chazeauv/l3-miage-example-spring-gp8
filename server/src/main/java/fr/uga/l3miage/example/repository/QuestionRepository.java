package fr.uga.l3miage.example.repository;


import fr.uga.l3miage.example.models.Miahoot;
import fr.uga.l3miage.example.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long>  {

    List<Question> findAllByMiahoot(final Miahoot miahoot);

    Optional<Question> findById(final Long id);

    void deleteById(final Long id);

    void deleteAllByMiahoot(final Miahoot miahoot);
}
