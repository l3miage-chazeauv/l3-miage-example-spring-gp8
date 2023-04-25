package fr.uga.l3miage.example.models;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "Personne")
public class Personne {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String login;

    @Column(nullable = false)
    private String password;

}
