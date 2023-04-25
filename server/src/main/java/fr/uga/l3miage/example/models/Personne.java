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

    public Personne() {
    }

    public Personne(Long id, String nom, String login, String password) {
        this.id = id;
        this.nom = nom;
        this.login = login;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Personne personne = (Personne) o;
        return Objects.equals(id, personne.id) && Objects.equals(nom, personne.nom) && Objects.equals(login, personne.login) && Objects.equals(password, personne.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nom, login, password);
    }
}
