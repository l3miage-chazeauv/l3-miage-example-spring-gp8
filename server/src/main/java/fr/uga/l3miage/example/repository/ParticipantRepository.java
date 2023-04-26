package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.models.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;



@Repository
public interface ParticipantRepository extends JpaRepository<Participant,Long> {

    List<Participant> findAllByUserId(final long userId);

    List<Participant> findAllByNom(final String nom);

    Optional<Participant> findByUserIdAndNom(final long userId, final String nom);

    int deleteByUserIdAndNom(final long userId, final String nom);
}
