package fr.uga.l3miage.example.models;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.ManyToAny;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "Question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String label;

    @ManyToOne
    private Miahoot miahoot;

    @OneToMany(mappedBy = "question")
    private List<Reponse> reponses;


}
