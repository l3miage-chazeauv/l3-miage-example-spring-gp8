package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.models.Presentateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;



@Repository
public interface PresentateurRepository extends JpaRepository<Presentateur,Long> {

    List<Presentateur> findAllByUserId(final long userId);

    List<Presentateur> findAllByNom(final String nom);

    Optional<Presentateur> findByUserIdAndNom(final long userId, final String nom);

    int deleteByUserIdAndNom(final long userId, final String nom);
}