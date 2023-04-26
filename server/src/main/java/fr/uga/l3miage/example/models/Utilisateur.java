package fr.uga.l3miage.example.models;

import javax.persistence.*;

@Entity
@Table(name="Utilisateur")
public class Utilisateur{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String login;

    @Column(nullable = false)
    private String password;
}
