package fr.uga.l3miage.example.models;

import javax.persistence.*;

@Entity
@Table(name="Utilisateur")
public class Utilisateur extends Personne{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nom;
}
