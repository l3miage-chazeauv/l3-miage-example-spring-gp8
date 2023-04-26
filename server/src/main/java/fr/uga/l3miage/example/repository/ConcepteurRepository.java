package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.models.Concepteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;



@Repository
public interface ConcepteurRepository extends JpaRepository<Concepteur,Long> {

    List<Concepteur> findAllByUserId(final long userId);

    List<Concepteur> findAllByNom(final String nom);

    Optional<Concepteur> findByUserIdAndNom(final long userId, final String nom);

    int deleteByUserIdAndNom(final long userId, final String nom);
}