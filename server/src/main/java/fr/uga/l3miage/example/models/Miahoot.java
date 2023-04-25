package fr.uga.l3miage.example.models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Miahoot {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(nullable = false)
    String nom;

    @OneToMany(mappedBy = "miahoot")
    private List<Question> questions;
}
