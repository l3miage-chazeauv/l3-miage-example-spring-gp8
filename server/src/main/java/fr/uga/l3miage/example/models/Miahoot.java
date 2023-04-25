package fr.uga.l3miage.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Miahoot {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    String nom;
}
