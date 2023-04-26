package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;



@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long> {

    List<Utilisateur> findAllByUserId(final long userId);

    List<Utilisateur> findAllByNom(final String nom);

    Optional<Utilisateur> findByUserIdAndNom(final long userId, final String nom);

    int deleteByUserIdAndNom(final long userId, final String nom);
}